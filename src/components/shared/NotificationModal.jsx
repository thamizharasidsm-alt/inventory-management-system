import { useInventory } from '../../context/InventoryContext';

export default function NotificationModal({ show, onClose }) {
  const { state } = useInventory();
  const lowStock = state.products.filter(p => p.stock < 20);

  if (!show) return null;
  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3><i className="fas fa-bell" style={{ color: '#f59e0b' }} /> Low Stock Alerts</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="table-container" style={{ maxHeight: 400, overflowY: 'auto', margin: '15px 0' }}>
          <table>
            <thead>
              <tr><th>Product</th><th>Category</th><th>Stock</th></tr>
            </thead>
            <tbody>
              {lowStock.length === 0 ? (
                <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--success)', padding: 20 }}>✅ All products have healthy stock levels!</td></tr>
              ) : lowStock.map(p => (
                <tr key={p.sku} style={{ background: '#fef2f2' }}>
                  <td><strong>{p.name}</strong></td>
                  <td><span className={`cat-badge cat-${p.category.replace(/\s/g,'')}`}>{p.category}</span></td>
                  <td><span className="stock-indicator stock-low"><span className="dot" />{p.stock}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
