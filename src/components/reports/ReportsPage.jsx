import { useMemo } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useToast } from '../../context/InventoryContext';
import * as XLSX from 'xlsx';

export default function ReportsPage() {
  const { state } = useInventory();
  const { showToast } = useToast();

  const today = new Date().toISOString().split('T')[0];
  const currentMonth = today.slice(0, 7);

  const lowStockItems = useMemo(() => state.products.filter(p => p.stock < 20), [state.products]);
  const todayInvoices = useMemo(() => state.invoices.filter(inv => inv.date === today), [state.invoices, today]);
  const monthInvoices = useMemo(() => state.invoices.filter(inv => inv.date && inv.date.startsWith(currentMonth)), [state.invoices, currentMonth]);

  const todayTotal = useMemo(() => todayInvoices.reduce((s, inv) => s + inv.grandTotal, 0), [todayInvoices]);
  const monthTotal = useMemo(() => monthInvoices.reduce((s, inv) => s + inv.grandTotal, 0), [monthInvoices]);

  function downloadExcel(headers, rows, filename, sheetName) {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws['!cols'] = headers.map(() => ({ wch: 18 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename);
    showToast(`${filename} downloaded!`, 'success');
  }

  function downloadLowStock() {
    const headers = ['SKU', 'Product Name', 'Category', 'Price (₹)', 'Stock', 'Units', 'Supplier', 'Barcode'];
    const rows = lowStockItems.map(p => [p.sku, p.name, p.category, p.price, p.stock, p.units, p.supplier, p.barcode || '']);
    downloadExcel(headers, rows, 'low_stock_report.xlsx', 'Low Stock');
  }

  function downloadDailyReport() {
    const headers = ['Invoice No', 'Date', 'Customer', 'Items', 'Subtotal (₹)', 'GST (₹)', 'Discount (₹)', 'Grand Total (₹)'];
    const rows = todayInvoices.map(inv => [
      inv.invoiceNo, inv.date, inv.customer?.name || 'Walk-in',
      inv.items.length, inv.subtotal.toFixed(2), inv.totalGst.toFixed(2),
      inv.discount.toFixed(2), inv.grandTotal.toFixed(2),
    ]);
    downloadExcel(headers, rows, `daily_report_${today}.xlsx`, 'Daily Report');
  }

  function downloadMonthlyReport() {
    const headers = ['Invoice No', 'Date', 'Customer', 'Items', 'Subtotal (₹)', 'GST (₹)', 'Discount (₹)', 'Grand Total (₹)'];
    const rows = monthInvoices.map(inv => [
      inv.invoiceNo, inv.date, inv.customer?.name || 'Walk-in',
      inv.items.length, inv.subtotal.toFixed(2), inv.totalGst.toFixed(2),
      inv.discount.toFixed(2), inv.grandTotal.toFixed(2),
    ]);
    downloadExcel(headers, rows, `monthly_report_${currentMonth}.xlsx`, 'Monthly Report');
  }

  function downloadProducts() {
    const headers = ['SKU', 'Product Name', 'Category', 'Price (₹)', 'Stock', 'Units', 'Supplier', 'Barcode', 'Mfg Date', 'Exp Date', 'GST Rate (%)'];
    const rows = state.products.map(p => [p.sku, p.name, p.category, p.price, p.stock, p.units, p.supplier, p.barcode || '', p.mfgDate, p.expDate, p.gstRate]);
    downloadExcel(headers, rows, 'product_list.xlsx', 'Products');
  }

  return (
    <section className="page" id="page-reports">
      <div className="summary-cards" style={{ marginBottom: 25 }}>
        <div className="summary-card card-blue">
          <div className="card-icon"><i className="fas fa-box" /></div>
          <div className="card-info"><h3>Total Products</h3><p>{state.products.length}</p></div>
        </div>
        <div className="summary-card card-orange">
          <div className="card-icon"><i className="fas fa-exclamation-triangle" /></div>
          <div className="card-info"><h3>Low Stock Items</h3><p>{lowStockItems.length}</p></div>
        </div>
        <div className="summary-card card-teal" style={{ borderLeftColor: '#06b6d4' }}>
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}><i className="fas fa-calendar-day" /></div>
          <div className="card-info"><h3>Today's Sales</h3><p>₹{todayTotal.toFixed(2)}</p></div>
        </div>
        <div className="summary-card card-purple">
          <div className="card-icon"><i className="fas fa-calendar-alt" /></div>
          <div className="card-info"><h3>Monthly Sales</h3><p>₹{monthTotal.toFixed(2)}</p></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
        {/* Low Stock */}
        <div className="billing-panel">
          <h3><i className="fas fa-exclamation-circle" style={{ color: 'var(--danger)' }} /> Low Stock Report</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 14 }}>
            {lowStockItems.length} products with stock below 20 units
          </p>
          <div className="table-container" style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 14 }}>
            <table>
              <thead><tr><th>Product</th><th>Stock</th><th>Price</th></tr></thead>
              <tbody>
                {lowStockItems.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--success)', padding: 20 }}>✅ All stock levels healthy</td></tr>
                ) : lowStockItems.slice(0, 10).map(p => (
                  <tr key={p.sku} style={{ background: '#fef2f2' }}>
                    <td><strong>{p.name}</strong></td>
                    <td><span className="stock-indicator stock-low"><span className="dot" />{p.stock}</span></td>
                    <td>₹{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-danger" onClick={downloadLowStock} style={{ width: '100%' }}>
            <i className="fas fa-file-excel" /> Download Excel
          </button>
        </div>

        {/* Daily Report */}
        <div className="billing-panel">
          <h3><i className="fas fa-calendar-day" style={{ color: 'var(--primary)' }} /> Daily Report</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 14 }}>
            {today} — {todayInvoices.length} invoices, ₹{todayTotal.toFixed(2)} total
          </p>
          <div className="table-container" style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 14 }}>
            <table>
              <thead><tr><th>Invoice</th><th>Customer</th><th>Amount</th></tr></thead>
              <tbody>
                {todayInvoices.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-light)', padding: 20 }}>No sales today</td></tr>
                ) : todayInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td><strong>{inv.invoiceNo}</strong></td>
                    <td>{inv.customer?.name || 'Walk-in'}</td>
                    <td>₹{inv.grandTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-primary" onClick={downloadDailyReport} style={{ width: '100%' }}>
            <i className="fas fa-file-excel" /> Download Excel
          </button>
        </div>

        {/* Monthly Report */}
        <div className="billing-panel">
          <h3><i className="fas fa-calendar-alt" style={{ color: 'var(--warning)' }} /> Monthly Report</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 14 }}>
            {currentMonth} — {monthInvoices.length} invoices, ₹{monthTotal.toFixed(2)} total
          </p>
          <div className="table-container" style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 14 }}>
            <table>
              <thead><tr><th>Invoice</th><th>Date</th><th>Customer</th><th>Amount</th></tr></thead>
              <tbody>
                {monthInvoices.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-light)', padding: 20 }}>No sales this month</td></tr>
                ) : monthInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td><strong>{inv.invoiceNo}</strong></td>
                    <td>{inv.date}</td>
                    <td>{inv.customer?.name || 'Walk-in'}</td>
                    <td>₹{inv.grandTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-warning" onClick={downloadMonthlyReport} style={{ width: '100%', background: 'var(--warning)', color: '#fff' }}>
            <i className="fas fa-file-excel" /> Download Excel
          </button>
        </div>

        {/* Product List */}
        <div className="billing-panel">
          <h3><i className="fas fa-list" style={{ color: 'var(--success)' }} /> Product List</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 14 }}>
            {state.products.length} products across {state.categories.length} categories
          </p>
          <div className="table-container" style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 14 }}>
            <table>
              <thead><tr><th>SKU</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead>
              <tbody>
                {state.products.slice(0, 10).map(p => (
                  <tr key={p.sku}>
                    <td>{p.sku}</td>
                    <td><strong>{p.name}</strong></td>
                    <td><span className={`cat-badge cat-${p.category.replace(/\s/g,'')}`}>{p.category}</span></td>
                    <td>₹{p.price}</td>
                    <td><span className={`stock-indicator ${p.stock < 20 ? 'stock-low' : p.stock < 50 ? 'stock-medium' : 'stock-high'}`}><span className="dot" />{p.stock}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-success" onClick={downloadProducts} style={{ width: '100%' }}>
            <i className="fas fa-file-excel" /> Download Excel
          </button>
        </div>
      </div>
    </section>
  );
}
