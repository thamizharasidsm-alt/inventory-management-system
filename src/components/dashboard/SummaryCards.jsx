import { useInventory } from '../../context/InventoryContext';

export default function SummaryCards({ onLowStockClick }) {
  const { state } = useInventory();
  const { products, suppliers } = state;
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter(p => p.stock < 20).length;

  return (
    <div className="summary-cards">
      <div className="summary-card card-blue">
        <div className="card-icon"><i className="fas fa-box" /></div>
        <div className="card-info"><h3>Total Products</h3><p id="totalProducts">{products.length}</p></div>
      </div>
      <div className="summary-card card-green">
        <div className="card-icon"><i className="fas fa-layer-group" /></div>
        <div className="card-info"><h3>Total Stock</h3><p id="totalStock">{totalStock.toLocaleString()}</p></div>
      </div>
      <div className="summary-card card-orange" id="lowStockCard" onClick={onLowStockClick} title="Click to view low stock products">
        <div className="card-icon"><i className="fas fa-exclamation-triangle" /></div>
        <div className="card-info"><h3>Low Stock</h3><p id="lowStock">{lowStock}</p></div>
      </div>
      <div className="summary-card card-purple">
        <div className="card-icon"><i className="fas fa-users" /></div>
        <div className="card-info"><h3>Suppliers</h3><p id="totalSuppliers">{suppliers.length}</p></div>
      </div>
    </div>
  );
}
