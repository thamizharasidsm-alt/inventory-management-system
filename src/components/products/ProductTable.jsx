import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

function BarcodeCell({ value }) {
  const svgRef = useRef(null);
  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: 'CODE128', width: 1.2, height: 30,
          displayValue: true, fontSize: 10, margin: 0,
        });
      } catch(e) { /* ignore invalid barcode */ }
    }
  }, [value]);
  if (!value) return <span>-</span>;
  return <svg ref={svgRef} className="barcode-svg" />;
}

export default function ProductTable({ products, onEdit, onDelete, onUpdateStock }) {
  if (products.length === 0) {
    return (
      <div className="empty-state" id="productsEmptyState">
        <i className="fas fa-box-open" />
        <p>No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-container" style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>SKU</th><th></th><th>Name</th><th>Category</th>
            <th>Price</th><th>Stock</th><th>Units</th><th>Supplier</th>
            <th>Mfg Date</th><th>Exp Date</th><th>Barcode</th><th>Invoice No</th><th>Actions</th>
          </tr>
        </thead>
        <tbody id="productTableBody">
          {products.map(p => {
            const sc = p.stock < 20 ? 'stock-low' : p.stock < 50 ? 'stock-medium' : 'stock-high';
            return (
              <tr key={p.sku}>
                <td><strong>{p.sku}</strong></td>
                <td><div className="product-thumb">📦</div></td>
                <td>
                  <strong>{p.name}</strong><br />
                  <small style={{ color: 'var(--text-light)' }}>{p.description || ''}</small>
                </td>
                <td><span className={`cat-badge cat-${p.category.replace(/\s/g,'')}`}>{p.category}</span></td>
                <td>₹{p.price.toFixed(2)}</td>
                <td><span className={`stock-indicator ${sc}`}><span className="dot" />{p.stock}</span></td>
                <td>{p.units}</td>
                <td>{p.supplier}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{p.mfgDate}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{p.expDate}</td>
                <td style={{ textAlign: 'center' }}><BarcodeCell value={p.barcode} /></td>
                <td>{p.invoiceNo || '-'}</td>
                <td>
                  <div className="action-btns" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => onUpdateStock(p.sku)}
                      title="Update Stock Quantity"
                      style={{ fontSize: '0.8rem', padding: '4px 8px', width: '100%' }}
                    >
                      <i className="fas fa-layer-group" /> Update Stock
                    </button>
                    <button
                      className="action-btn btn-delete"
                      onClick={() => onDelete(p.sku)}
                      title="Delete Product"
                      style={{ width: '100%' }}
                    >
                      <i className="fas fa-trash" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
