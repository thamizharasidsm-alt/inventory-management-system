export default function ConfirmModal({ show, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal modal-sm">
        <div className="modal-header">
          <h3>Confirm Delete</h3>
          <button className="modal-close" onClick={onCancel}>&times;</button>
        </div>
        <p className="confirm-message" dangerouslySetInnerHTML={{ __html: message }} />
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
