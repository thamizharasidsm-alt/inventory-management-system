import { useState, useEffect } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useToast } from '../../context/InventoryContext';

const EMPTY_FORM = {
  sku: '', name: '', category: '', newCategory: '',
  price: '', stock: '', units: 'pcs',
  mfgDate: '', expDate: '', barcode: '', invoiceNo: '',
  supplier: '', description: '',
};

export default function ProductModal({ editSku, onClose }) {
  const { state, dispatch } = useInventory();
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  /* Prefill on edit */
  useEffect(() => {
    if (editSku) {
      const p = state.products.find(pr => pr.sku === editSku);
      if (p) {
        setForm({
          sku: p.sku, name: p.name, category: p.category, newCategory: '',
          price: p.price, stock: p.stock, units: p.units || 'pcs',
          mfgDate: p.mfgDate || '', expDate: p.expDate || '',
          barcode: p.barcode || '', invoiceNo: p.invoiceNo || '',
          supplier: p.supplier, description: p.description || '',
        });
      }
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [editSku]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    const isNew = !editSku;

    if (!form.sku.trim()) e.sku = 'SKU is required';
    else if (isNew && state.products.some(p => p.sku === form.sku.trim())) e.sku = 'SKU must be unique';

    if (!form.name.trim()) e.name = 'Product name is required';
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';

    const cat = form.category === 'NEW_CATEGORY' ? form.newCategory.trim() : form.category;
    if (!cat) e.category = 'Please select or enter a category';

    if (!form.price || parseFloat(form.price) <= 0) e.price = 'Price must be greater than 0';
    if (isNaN(parseInt(form.stock)) || parseInt(form.stock) < 0) e.stock = 'Stock must be 0 or greater';
    if (!form.units) e.units = 'Units required';

    if (!form.mfgDate) {
      e.mfgDate = 'Mfg date required';
    } else {
      const today = new Date(); today.setHours(0,0,0,0);
      if (new Date(form.mfgDate) >= today) e.mfgDate = 'Must be a past date';
    }
    if (!form.expDate) e.expDate = 'Exp date required';
    else if (form.mfgDate && new Date(form.expDate) <= new Date(form.mfgDate)) e.expDate = 'Expiry date must be after Mfg date';

    if (!form.supplier) e.supplier = 'Please select a supplier';
    return e;
  }

  function generateBarcode() {
    const lastBarcode = state.products
      .map(p => parseInt(p.barcode))
      .filter(n => !isNaN(n))
      .sort((a, b) => b - a)[0];
    return String(lastBarcode ? lastBarcode + 1 : 890123456001);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    let finalCategory = form.category === 'NEW_CATEGORY' ? form.newCategory.trim() : form.category;
    if (form.category === 'NEW_CATEGORY') dispatch({ type: 'ADD_CATEGORY', payload: finalCategory });

    const data = {
      sku: form.sku.trim(), name: form.name.trim(), category: finalCategory,
      price: parseFloat(form.price), stock: parseInt(form.stock),
      units: form.units, mfgDate: form.mfgDate, expDate: form.expDate,
      barcode: form.barcode.trim() || generateBarcode(),
      invoiceNo: form.invoiceNo.trim(),
      supplier: form.supplier, description: form.description.trim(),
      gstRate: (state.categories.includes(finalCategory) && state.products.find(p => p.category === finalCategory)?.gstRate) ||
               ({ 'Grocery': 5, 'Medicine': 12, 'Dal & Pulses': 0, 'Snacks': 18 }[finalCategory]) || 18,
    };

    if (editSku) {
      dispatch({ type: 'EDIT_PRODUCT', payload: { originalSku: editSku, data } });
      showToast('Product updated successfully!', 'success');
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: data });
      showToast('Product added successfully!', 'success');
    }
    onClose();
  }

  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 id="productModalTitle">{editSku ? 'Edit Product' : 'Add Product'}</h3>
          <button className="modal-close" id="closeProductModal" onClick={onClose}>&times;</button>
        </div>
        <form id="productForm" noValidate onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productSku">SKU Number *</label>
              <input id="productSku" type="text" placeholder="e.g. SKU1001" value={form.sku} onChange={e => set('sku', e.target.value)} className={errors.sku ? 'error' : ''} />
              <span className="error-msg" id="productSkuError">{errors.sku}</span>
            </div>
            <div className="form-group">
              <label htmlFor="productName">Product Name *</label>
              <input id="productName" type="text" placeholder="Enter product name" value={form.name} onChange={e => set('name', e.target.value)} className={errors.name ? 'error' : ''} />
              <span className="error-msg" id="productNameError">{errors.name}</span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productCategory">Category *</label>
              <select id="productCategory" value={form.category} onChange={e => set('category', e.target.value)} className={errors.category ? 'error' : ''}>
                <option value="">Select Category</option>
                {state.categories.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="NEW_CATEGORY">+ Add New Category</option>
              </select>
              {form.category === 'NEW_CATEGORY' && (
                <input type="text" id="newCategoryInput" placeholder="Enter new category" style={{ marginTop: 5 }} value={form.newCategory} onChange={e => set('newCategory', e.target.value)} />
              )}
              <span className="error-msg" id="productCategoryError">{errors.category}</span>
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Price (₹) *</label>
              <input id="productPrice" type="number" placeholder="0.00" min="0.01" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} className={errors.price ? 'error' : ''} />
              <span className="error-msg" id="productPriceError">{errors.price}</span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productStock">Stock *</label>
              <input id="productStock" type="number" placeholder="0" min="0" value={form.stock} onChange={e => set('stock', e.target.value)} className={errors.stock ? 'error' : ''} />
              <span className="error-msg" id="productStockError">{errors.stock}</span>
            </div>
            <div className="form-group">
              <label htmlFor="productUnits">Units *</label>
              <select id="productUnits" value={form.units} onChange={e => set('units', e.target.value)} className={errors.units ? 'error' : ''}>
                <option value="pcs">Pieces (pcs)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="l">Liters (L)</option>
                <option value="ml">Milliliters (ml)</option>
                <option value="box">Boxes</option>
              </select>
              <span className="error-msg" id="productUnitsError">{errors.units}</span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productMfgDate">Mfg Date *</label>
              <input id="productMfgDate" type="date" value={form.mfgDate} onChange={e => set('mfgDate', e.target.value)} className={errors.mfgDate ? 'error' : ''} />
              <span className="error-msg" id="productMfgDateError">{errors.mfgDate}</span>
            </div>
            <div className="form-group">
              <label htmlFor="productExpDate">Expiry Date *</label>
              <input id="productExpDate" type="date" value={form.expDate} onChange={e => set('expDate', e.target.value)} className={errors.expDate ? 'error' : ''} />
              <span className="error-msg" id="productExpDateError">{errors.expDate}</span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productBarcode">Barcode</label>
              <input id="productBarcode" type="text" placeholder="Scan or enter barcode" value={form.barcode} onChange={e => set('barcode', e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="productInvoiceNo">Invoice Number</label>
              <input id="productInvoiceNo" type="text" placeholder="Invoice #" value={form.invoiceNo} onChange={e => set('invoiceNo', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="productSupplier">Supplier *</label>
            <select id="productSupplier" value={form.supplier} onChange={e => set('supplier', e.target.value)} className={errors.supplier ? 'error' : ''}>
              <option value="">Select Supplier</option>
              {state.suppliers.map(s => <option key={s.id} value={s.company}>{s.company}</option>)}
            </select>
            <span className="error-msg" id="productSupplierError">{errors.supplier}</span>
          </div>
          <div className="form-group">
            <label htmlFor="productDescription">Description</label>
            <textarea id="productDescription" placeholder="Optional" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" id="cancelProduct" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary"><i className="fas fa-save" /> Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
