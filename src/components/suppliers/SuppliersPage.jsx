import { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useToast } from '../../context/InventoryContext';
import SupplierTable from './SupplierTable';
import SupplierModal from './SupplierModal';
import ConfirmModal from '../shared/ConfirmModal';

export default function SuppliersPage() {
  const { state, dispatch } = useInventory();
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmState, setConfirmState] = useState({ show: false, message: '', onConfirm: null });

  function openAdd() { setEditId(null); setShowModal(true); }
  function openEdit(id) { setEditId(id); setShowModal(true); }

  function handleDelete(id) {
    const item = state.suppliers.find(s => s.id === id);
    setConfirmState({
      show: true,
      message: `Delete <strong>"${item?.company}"</strong>?<br><small style="color:var(--text-light)">Cannot be undone.</small>`,
      onConfirm: () => {
        dispatch({ type: 'DELETE_SUPPLIER', payload: id });
        showToast('Supplier deleted!', 'warning');
        setConfirmState(s => ({ ...s, show: false }));
      },
    });
  }

  return (
    <section className="page" id="page-suppliers">
      <div className="suppliers-header">
        <h3>Suppliers</h3>
        <button className="btn btn-primary" id="addSupplierBtn" onClick={openAdd}>
          <i className="fas fa-plus" /> Add Supplier
        </button>
      </div>

      <SupplierTable
        suppliers={state.suppliers}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <SupplierModal
          editId={editId}
          onClose={() => setShowModal(false)}
        />
      )}

      <ConfirmModal
        show={confirmState.show}
        message={confirmState.message}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState(s => ({ ...s, show: false }))}
      />
    </section>
  );
}
