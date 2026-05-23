export default function AdminModal({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-sm">
        <div className="modal-header">
          <h3>Admin Profile</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="admin-profile-content">
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e0e7ff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'var(--primary)', marginBottom: 15 }}>
            <i className="fas fa-user-tie" />
          </div>
          <h3 style={{ marginBottom: 5, color: 'var(--text-primary)' }}>Admin User</h3>
          <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: 15 }}>System Administrator</p>
          <div className="admin-info-box" style={{ textAlign: 'left', background: '#f8fafc', padding: 15, borderRadius: 8 }}>
            <p style={{ marginBottom: 10 }}><i className="fas fa-phone" style={{ width: 25, color: 'var(--text-light)' }} /> <strong>+91 98765 43210</strong></p>
            <p style={{ marginBottom: 10 }}><i className="fas fa-envelope" style={{ width: 25, color: 'var(--text-light)' }} /> <strong>admin@invmanager.com</strong></p>
            <p><i className="fas fa-map-marker-alt" style={{ width: 25, color: 'var(--text-light)' }} /> <strong>Chennai, India</strong></p>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
