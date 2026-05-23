import * as XLSX from 'xlsx';
import { useInventory } from '../../context/InventoryContext';
import { useToast } from '../../context/InventoryContext';

export default function LowStockTable() {
  const { state } = useInventory();
  const { showToast } = useToast();
  const lowStockItems = state.products.filter(p => p.stock < 20);

  function downloadExcel() {
    const headers = ['Product Name','Category','Stock','Supplier','Price (₹)','Units','SKU','Mfg Date','Exp Date','Invoice No'];
    const rows = lowStockItems.map(p => [p.name, p.category, p.stock, p.supplier, p.price.toFixed(2), p.units, p.sku, p.mfgDate, p.expDate, p.invoiceNo || '']);
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws['!cols'] = [24,14,8,18,10,8,12,12,12,14].map(w => ({ wch: w }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Low Stock Alerts');
    XLSX.writeFile(wb, 'low_stock_alerts.xlsx');
    showToast('Excel downloaded successfully!', 'success');
  }

  return (
    <div className="recent-section" id="lowStockSection">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <h3><i className="fas fa-exclamation-circle" /> Low Stock Alerts (Below 20 units)</h3>
        <button className="btn btn-success" id="downloadLowStockExcel" onClick={downloadExcel}>
          <i className="fas fa-file-excel" /> Download Excel
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr><th>Product</th><th>Category</th><th>Stock</th><th>Supplier</th></tr>
          </thead>
          <tbody id="lowStockTableBody">
            {lowStockItems.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--success)', padding: 20 }}>✅ All products have healthy stock levels!</td></tr>
            ) : lowStockItems.map(p => (
              <tr key={p.sku} style={{ background: '#fef2f2' }}>
                <td><strong>{p.name}</strong></td>
                <td><span className={`cat-badge cat-${p.category.replace(/\s/g,'')}`}>{p.category}</span></td>
                <td><span className="stock-indicator stock-low"><span className="dot" />{p.stock}</span></td>
                <td>{p.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
