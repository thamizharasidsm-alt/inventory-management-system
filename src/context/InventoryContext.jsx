import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { initialProducts, initialSuppliers, initialCustomers, initialInvoices, initialCategories } from '../data/initialData';

const STORAGE_KEY = 'invmanager_data';

/* ── State shape ───────────────────────────────────────────── */
const defaultState = {
  products:   initialProducts,
  suppliers:  initialSuppliers,
  categories: initialCategories,
  customers:  initialCustomers,
  invoices:   initialInvoices,
  nextProductId:  initialProducts.length + 1,
  nextSupplierId: initialSuppliers.length + 1,
  nextCustomerId: initialCustomers.length + 1,
  nextInvoiceNo:  1003,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    }
  } catch { /* ignore corrupt data */ }
  return defaultState;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* storage full or unavailable */ }
}

/* ── Reducer ───────────────────────────────────────────────── */
function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, { id: state.nextProductId, ...action.payload }],
        nextProductId: state.nextProductId + 1,
      };
    case 'EDIT_PRODUCT': {
      const idx = state.products.findIndex(p => p.sku === action.payload.originalSku);
      if (idx === -1) return state;
      const updated = [...state.products];
      updated[idx] = { ...updated[idx], ...action.payload.data };
      return { ...state, products: updated };
    }
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.sku !== action.payload) };
    case 'UPDATE_STOCK': {
      const idx = state.products.findIndex(p => p.sku === action.payload.sku);
      if (idx === -1) return state;
      const updated = [...state.products];
      updated[idx] = { ...updated[idx], stock: action.payload.stock };
      return { ...state, products: updated };
    }
    case 'ADD_SUPPLIER':
      return {
        ...state,
        suppliers: [...state.suppliers, { id: state.nextSupplierId, ...action.payload }],
        nextSupplierId: state.nextSupplierId + 1,
      };
    case 'EDIT_SUPPLIER': {
      const idx = state.suppliers.findIndex(s => s.id === action.payload.id);
      if (idx === -1) return state;
      const updated = [...state.suppliers];
      updated[idx] = { ...updated[idx], ...action.payload };
      return { ...state, suppliers: updated };
    }
    case 'DELETE_SUPPLIER':
      return { ...state, suppliers: state.suppliers.filter(s => s.id !== action.payload) };
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, { id: state.nextCustomerId, ...action.payload }],
        nextCustomerId: state.nextCustomerId + 1,
      };
    case 'DELETE_CUSTOMER':
      return { ...state, customers: state.customers.filter(c => c.id !== action.payload) };
    case 'ADD_INVOICE':
      return {
        ...state,
        invoices: [...state.invoices, { id: state.invoices.length + 1, invoiceNo: `INV-${state.nextInvoiceNo}`, date: new Date().toISOString().split('T')[0], ...action.payload }],
        nextInvoiceNo: state.nextInvoiceNo + 1,
      };
    case 'DEDUCT_STOCK': {
      const updates = {};
      action.payload.forEach(({ sku, qty }) => { updates[sku] = qty; });
      const updatedProducts = state.products.map(p => {
        if (updates[p.sku] != null) {
          return { ...p, stock: Math.max(0, p.stock - updates[p.sku]) };
        }
        return p;
      });
      return { ...state, products: updatedProducts };
    }
    case 'ADD_CATEGORY':
      if (state.categories.includes(action.payload)) return state;
      return { ...state, categories: [...state.categories, action.payload] };
    case 'RESET_DATA':
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
      return { ...defaultState };
    default:
      return state;
  }
}

/* ── Contexts ──────────────────────────────────────────────── */
export const InventoryContext = createContext(null);
export const ToastContext     = createContext(null);

/* ── Provider ──────────────────────────────────────────────── */
export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, undefined, loadState);

  // Persist state to localStorage on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Toast state
  const [toast, setToast] = React.useState({ msg: '', type: 'success', visible: false });
  const toastTimer = useRef(null);

  const showToast = useCallback((msg, type = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      <ToastContext.Provider value={{ toast, showToast }}>
        {children}
      </ToastContext.Provider>
    </InventoryContext.Provider>
  );
}

/* ── Hooks ─────────────────────────────────────────────────── */
export function useInventory() {
  return useContext(InventoryContext);
}
export function useToast() {
  return useContext(ToastContext);
}
