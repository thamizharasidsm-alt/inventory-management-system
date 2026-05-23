import { useState, useEffect } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useToast } from '../../context/InventoryContext';

export default function UpdateStockModal({ sku, onClose }) {
  const { state, dispatch } = useInventory();
  const { showToast } = useToast();
  const product = state.products.find(p => p.sku === sku);
  const [quantity, setQuantity] = useState(product?.stock ?? 0);

  useEffect(() => { setQuantity(product?.stock ?? 0); }, [sku]);

  function handleSave() {
    const newStock = parseInt(quantity);
    if (isNaN(newStock) || newStock < 0) { showToast('Stock must be 0 or greater', 'error'); return; }
    dispatch({ type: 'UPDATE_STOCK', payload: { sku, stock: newStock } });
    showToast('Stock updated successfully!', 'success');
    onClose();
  }

  if (!product) return null;
  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-sm">
        <div className="modal-header">
          <h3>Update Stock Quantity</h3>
          <button className="modal-close" id="closeUpdateStock" onClick={onClose}>&times;</button>
        </div>
        <div id="updateStockContent" style={{ padding: 15 }}>
          <p style={{ marginBottom: 15 }}>Product: <strong id="updateStockName" style={{ color: 'var(--primary)' }}>{product.name}</strong></p>
          <div className="form-group">
            <label htmlFor="newStockQuantity">New Stock Quantity *</label>
            <input
              type="number" id="newStockQuantity" min="0"
              value={quantity} onChange={e => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" id="cancelUpdateStockBtn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" id="saveUpdateStockBtn" onClick={handleSave}>
            <i className="fas fa-save" /> Update
          </button>
        </div>
      </div>
    </div>
  );
}
