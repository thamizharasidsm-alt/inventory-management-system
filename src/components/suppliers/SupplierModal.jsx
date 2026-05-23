import { useState, useEffect } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useToast } from '../../context/InventoryContext';

const EMPTY = { company: '', contact: '', email: '', phone: '', address: '', products: '' };

export default function SupplierModal({ editId, onClose }) {
  const { state, dispatch } = useInventory();
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editId != null) {
      const v = state.suppliers.find(s => s.id === editId);
      if (v) setForm({ company: v.company, contact: v.contact, email: v.email, phone: v.phone, address: v.address, products: v.products });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [editId]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    const { company, contact, email, phone, address } = form;
    if (!company.trim()) e.company = 'Supplier name is required';
    else if (company.trim().length < 2) e.company = 'At least 2 characters';
    else if (editId == null && state.suppliers.some(s => s.company.toLowerCase() === company.toLowerCase()))
      e.company = 'Supplier already exists';

    if (!contact.trim()) e.contact = 'Contact name is required';
    else if (!/^[a-zA-Z\s.]{2,}$/.test(contact)) e.contact = 'Letters, spaces and dots only';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email required';
    if (!phone.trim()) e.phone = 'Phone required';
    else if (!/^(\+91|91)?[6-9]\d{9}$/.test(phone.replace(/\s/g,''))) e.phone = 'Valid Indian phone (e.g. +91 98765 43210)';

    if (!address.trim()) e.address = 'Address required';
    else if (address.trim().length < 5) e.address = 'At least 5 characters';
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const data = {
      company: form.company.trim(), contact: form.contact.trim(),
      email: form.email.trim(), phone: form.phone.trim(),
      address: form.address.trim(), products: form.products.trim(),
    };

    if (editId != null) {
      dispatch({ type: 'EDIT_SUPPLIER', payload: { id: editId, ...data } });
      showToast('Supplier updated!', 'success');
    } else {
      dispatch({ type: 'ADD_SUPPLIER', payload: data });
      showToast('Supplier added!', 'success');
    }
    onClose();
  }

  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 id="supplierModalTitle">{editId != null ? 'Edit Supplier' : 'Add Supplier'}</h3>
          <button className="modal-close" id="closeSupplierModal" onClick={onClose}>&times;</button>
        </div>
        <form id="supplierForm" noValidate onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="supplierCompany">Supplier Name *</label>
              <input id="supplierCompany" type="text" placeholder="Supplier name" value={form.company} onChange={e => set('company', e.target.value)} className={errors.company ? 'error' : ''} />
              <span className="error-msg" id="supplierCompanyError">{errors.company}</span>
            </div>
            <div className="form-group">
              <label htmlFor="supplierName">Contact Name *</label>
              <input id="supplierName" type="text" placeholder="Contact name" value={form.contact} onChange={e => set('contact', e.target.value)} className={errors.contact ? 'error' : ''} />
              <span className="error-msg" id="supplierNameError">{errors.contact}</span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="supplierEmail">Email *</label>
              <input id="supplierEmail" type="email" placeholder="email@company.com" value={form.email} onChange={e => set('email', e.target.value)} className={errors.email ? 'error' : ''} />
              <span className="error-msg" id="supplierEmailError">{errors.email}</span>
            </div>
            <div className="form-group">
              <label htmlFor="supplierPhone">Phone *</label>
              <input id="supplierPhone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} className={errors.phone ? 'error' : ''} />
              <span className="error-msg" id="supplierPhoneError">{errors.phone}</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="supplierAddress">Address *</label>
            <textarea id="supplierAddress" placeholder="Full address" value={form.address} onChange={e => set('address', e.target.value)} className={errors.address ? 'error' : ''} />
            <span className="error-msg" id="supplierAddressError">{errors.address}</span>
          </div>
          <div className="form-group">
            <label htmlFor="supplierProducts">Products Supplied</label>
            <input id="supplierProducts" type="text" placeholder="Rice, Wheat, Oil (comma-separated)" value={form.products} onChange={e => set('products', e.target.value)} />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" id="cancelSupplier" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary"><i className="fas fa-save" /> Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
