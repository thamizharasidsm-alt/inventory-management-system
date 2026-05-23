import { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useToast } from '../../context/InventoryContext';
import ProductsToolbar from './ProductsToolbar';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import UpdateStockModal from './UpdateStockModal';
import ConfirmModal from '../shared/ConfirmModal';
import * as XLSX from 'xlsx';

export default function ProductsPage() {
  const { state, dispatch } = useInventory();
  const { showToast } = useToast();

  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editSku, setEditSku] = useState(null);
  const [showUpdateStock, setShowUpdateStock] = useState(false);
  const [updateStockSku, setUpdateStockSku] = useState(null);
  const [confirmState, setConfirmState] = useState({ show: false, message: '', onConfirm: null });

  /* ── Derived filtered/sorted list ───── */
  let filtered = [...state.products];
  if (category !== 'all') filtered = filtered.filter(p => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) ||
      p.supplier.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
    );
  }
  const [sf, sd] = sort.split('-');
  filtered.sort((a, b) => {
    let va, vb;
    if (sf === 'name') { va = a.name.toLowerCase(); vb = b.name.toLowerCase(); }
    else if (sf === 'price') { va = a.price; vb = b.price; }
    else { va = a.stock; vb = b.stock; }
    return sd === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });

  /* ── Handlers ───────────────────────── */
  function openAdd() { setEditSku(null); setShowProductModal(true); }
  function openEdit(sku) { setEditSku(sku); setShowProductModal(true); }
  function openUpdateStock(sku) { setUpdateStockSku(sku); setShowUpdateStock(true); }

  function handleDelete(sku) {
    const item = state.products.find(p => p.sku === sku);
    setConfirmState({
      show: true,
      message: `Delete <strong>"${item?.name}"</strong>?<br><small style="color:var(--text-light)">Cannot be undone.</small>`,
      onConfirm: () => {
        dispatch({ type: 'DELETE_PRODUCT', payload: sku });
        showToast('Product deleted!', 'warning');
        setConfirmState(s => ({ ...s, show: false }));
      },
    });
  }

  function downloadExcel() {
    const headers = ['SKU','Product Name','Category','Price (₹)','Stock','Units','Supplier','Mfg Date','Exp Date','Barcode','Invoice No','Description'];
    const rows = filtered.map(p => [p.sku,p.name,p.category,p.price.toFixed(2),p.stock,p.units,p.supplier,p.mfgDate,p.expDate,p.barcode||'',p.invoiceNo||'',p.description||'']);
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws['!cols'] = [12,24,14,10,8,8,18,12,12,16,14,30].map(w => ({ wch: w }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products List');
    XLSX.writeFile(wb, 'product_list.xlsx');
    showToast('Excel downloaded successfully!', 'success');
  }

  return (
    <section className="page" id="page-products">
      <ProductsToolbar
        categories={state.categories}
        activeCategory={category}
        onCategoryChange={setCategory}
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
      />

      <div className="products-header">
        <h3>Products List (<span id="productCount">{filtered.length}</span>)</h3>
        <div>
          <button className="btn btn-success" id="downloadProductsExcel" style={{ marginRight: 10 }} onClick={downloadExcel}>
            <i className="fas fa-file-excel" /> Download Excel
          </button>
          <button className="btn btn-primary" id="addProductBtn" onClick={openAdd}>
            <i className="fas fa-plus" /> Add Product
          </button>
        </div>
      </div>

      <ProductTable
        products={filtered}
        onEdit={openEdit}
        onDelete={handleDelete}
        onUpdateStock={openUpdateStock}
      />

      {showProductModal && (
        <ProductModal
          editSku={editSku}
          onClose={() => setShowProductModal(false)}
        />
      )}

      {showUpdateStock && (
        <UpdateStockModal
          sku={updateStockSku}
          onClose={() => setShowUpdateStock(false)}
        />
      )}

      <ConfirmModal
        show={confirmState.show}
        message={confirmState.message}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState(s => ({ ...s, show: false }))}
      />
    </section>
  );
}
