export default function SupplierTable({ suppliers, onEdit, onDelete }) {
  if (suppliers.length === 0) {
    return (
      <div className="empty-state" id="suppliersEmptyState">
        <i className="fas fa-truck" />
        <p>No suppliers added yet.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Supplier Name</th><th>Contact</th>
            <th>Email</th><th>Phone</th><th>Address</th><th>Items</th><th>Actions</th>
          </tr>
        </thead>
        <tbody id="supplierTableBody">
          {suppliers.map(v => {
            const pc = v.products.split(',').filter(p => p.trim()).length;
            return (
              <tr key={v.id}>
                <td>#{v.id}</td>
                <td><strong>{v.company}</strong></td>
                <td>{v.contact}</td>
                <td>{v.email}</td>
                <td>{v.phone}</td>
                <td style={{ maxWidth: 180 }}><small>{v.address}</small></td>
                <td><span className="cat-badge" style={{ background: '#e0e7ff', color: '#3730a3' }}>{pc} items</span></td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn btn-delete" onClick={() => onDelete(v.id)} title="Delete">
                      <i className="fas fa-trash" />
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
