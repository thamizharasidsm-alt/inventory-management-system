import { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';

export default function InvoiceHistory({ onViewBill }) {
  const { state } = useInventory();
  const [search, setSearch] = useState('');

  const filtered = state.invoices.filter(inv =>
    inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
    (inv.customer?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  if (state.invoices.length === 0) return null;

  return (
    <div className="billing-panel" style={{ marginTop: 22 }}>
      <div className="invoice-history-header">
        <h3><i className="fas fa-history" /> Invoice History</h3>
        <div className="search-box" style={{ maxWidth: 260, marginBottom: 0 }}>
          <i className="fas fa-search" />
          <input type="text" placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 20, color: 'var(--text-light)' }}>No invoices found</td></tr>
            ) : filtered.map(inv => (
              <tr key={inv.id} className="invoice-row" onClick={() => onViewBill && onViewBill(inv)}>
                <td><strong>{inv.invoiceNo}</strong></td>
                <td>{inv.date}</td>
                <td>{inv.customer?.name || 'Walk-in'}</td>
                <td>{inv.items.length}</td>
                <td>₹{inv.grandTotal?.toFixed(2)}</td>
                <td><span className="badge-paid">Paid</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
