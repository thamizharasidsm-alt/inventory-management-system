import { useState, useMemo, useRef, useEffect } from 'react';
import { useInventory, useToast } from '../../context/InventoryContext';
import BarcodeScanner from './BarcodeScanner';
import BillPreviewModal from './BillPreviewModal';
import InvoiceHistory from './InvoiceHistory';

const EMPTY_CUSTOMER = { name: '', phone: '', address: '', gst: '' };

export default function BillingPage() {
  const { state, dispatch } = useInventory();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');
  const [discount, setDiscount] = useState(0);
  const [showBill, setShowBill] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchRef = useRef(null);

  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return [];
    return state.products
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.barcode && p.barcode.includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      )
      .slice(0, 10);
  }, [search, state.products]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target !== searchRef.current && !e.target.closest('.search-suggestions')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addToCart = (product) => {
    if (!product) return;
    if (product.stock <= 0) { showToast(`${product.name} is out of stock!`, 'error'); return; }
    setCart(prev => {
      const exist = prev.find(c => c.productSku === product.sku);
      if (exist) {
        if (exist.qty >= product.stock) { showToast(`Only ${product.stock} in stock!`, 'error'); return prev; }
        return prev.map(c => c.productSku === product.sku ? { ...c, qty: c.qty + 1, total: (c.qty + 1) * c.price } : c);
      }
      return [...prev, { productSku: product.sku, productName: product.name, price: product.price, gstRate: product.gstRate, qty: 1, total: product.price }];
    });
    setSearch('');
    setShowSuggestions(false);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
        addToCart(suggestions[selectedSuggestion]);
      } else if (search.trim()) {
        const product = state.products.find(p =>
          p.sku === search.trim() || p.barcode === search.trim() || p.name.toLowerCase() === search.trim().toLowerCase()
        );
        if (product) addToCart(product);
        else showToast('Product not found!', 'error');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleBarcodeDetected = (code) => {
    setShowScanner(false);
    const product = state.products.find(p => p.barcode === code);
    if (!product) { showToast(`No product with barcode: ${code}`, 'error'); return; }
    addToCart(product);
    showToast(`Scanned: ${product.name}`, 'success');
  };

  const updateQty = (sku, delta) => {
    setCart(prev => {
      const item = prev.find(c => c.productSku === sku);
      if (!item) return prev;
      const product = state.products.find(p => p.sku === sku);
      const newQty = item.qty + delta;
      if (newQty <= 0) return prev.filter(c => c.productSku !== sku);
      if (delta > 0 && product && newQty > product.stock) { showToast(`Only ${product.stock} in stock!`, 'error'); return prev; }
      return prev.map(c => c.productSku === sku ? { ...c, qty: newQty, total: newQty * c.price } : c);
    });
  };

  const removeItem = (sku) => setCart(prev => prev.filter(c => c.productSku !== sku));

  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.total, 0), [cart]);
  const totalGst = useMemo(() => cart.reduce((s, c) => s + (c.total * c.gstRate / 100), 0), [cart]);
  const discAmount = useMemo(() => Math.min(discount, subtotal + totalGst), [discount, subtotal, totalGst]);
  const grandTotal = useMemo(() => Math.max(0, subtotal + totalGst - discAmount), [subtotal, totalGst, discAmount]);

  const handleCustomerSelect = (id) => {
    setCustomerId(id);
    if (id) {
      const c = state.customers.find(cu => cu.id === parseInt(id));
      if (c) setCustomer({ name: c.name, phone: c.phone, address: c.address, gst: c.gst });
    }
  };

  const handleGenerateBill = () => {
    if (cart.length === 0) { showToast('Cart is empty!', 'error'); return; }
    if (customer.phone && customer.phone.length !== 10) { showToast('Phone must be exactly 10 digits', 'error'); setSaving(false); return; }
    setSaving(true);
    const billData = {
      customer: customer.name ? { name: customer.name, phone: customer.phone, address: customer.address, gst: customer.gst } : { name: 'Walk-in', phone: '', address: '', gst: '' },
      items: cart.map(c => ({ ...c })),
      subtotal,
      totalGst,
      discount: discAmount,
      grandTotal,
      paymentMode,
      status: 'paid',
    };
    if (customer.name && customerId === 'new') {
      dispatch({ type: 'ADD_CUSTOMER', payload: { name: customer.name, phone: customer.phone, address: customer.address, gst: customer.gst } });
    }
    dispatch({ type: 'ADD_INVOICE', payload: billData });
    dispatch({ type: 'DEDUCT_STOCK', payload: cart.map(c => ({ sku: c.productSku, qty: c.qty })) });
    showToast(`Bill ${billData.invoiceNo || ''} generated!`, 'success');
    setShowBill({ ...billData, invoiceNo: `INV-${state.nextInvoiceNo}`, date: new Date().toISOString().split('T')[0] });
    setSaving(false);
  };

  const handleCloseBill = () => {
    setShowBill(null);
    setCart([]);
    setCustomer(EMPTY_CUSTOMER);
    setCustomerId('');
    setDiscount(0);
    setPaymentMode('cash');
  };

  const viewPastBill = (inv) => {
    setShowBill(inv);
  };

  return (
    <section className="page billing-page" id="page-billing">
      <div className="billing-layout">
        {/* LEFT PANEL - Search + Cart */}
        <div className="billing-panel">
          <h3><i className="fas fa-shopping-cart" style={{ color: 'var(--primary)' }} /> New Bill</h3>
          <div className="billing-search-row" style={{ position: 'relative' }}>
            <div className="search-box" style={{ marginBottom: 0 }}>
              <i className="fas fa-search" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search product by name, SKU or barcode... (min 2 chars)"
                value={search}
                onChange={e => { setSearch(e.target.value); setShowSuggestions(true); setSelectedSuggestion(-1); }}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => search.trim().length >= 2 && setShowSuggestions(true)}
              />
            </div>
            <button className="btn-scan" onClick={() => setShowScanner(true)} title="Scan barcode with camera">
              <i className="fas fa-camera" /> Scan
            </button>
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions" style={{
                position: 'absolute', top: '100%', left: 0, right: 80, zIndex: 100,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-lg)',
                maxHeight: 280, overflowY: 'auto', marginTop: 4,
              }}>
                {suggestions.map((p, i) => {
                  const sc = p.stock < 20 ? 'var(--danger)' : p.stock < 50 ? 'var(--warning)' : 'var(--success)';
                  return (
                    <div key={p.sku}
                      onClick={() => addToCart(p)}
                      onMouseEnter={() => setSelectedSuggestion(i)}
                      style={{
                        padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                        borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                        background: selectedSuggestion === i ? 'var(--bg-body)' : 'transparent',
                      }}>
                      <div style={{ width: 32, height: 32, borderRadius: 6, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--text-light)', flexShrink: 0 }}>📦</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', gap: 8 }}>
                          <span>{p.sku}</span>
                          <span>₹{p.price}</span>
                          {p.barcode && <span>Barcode: {p.barcode}</span>}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.82rem', color: sc }}>{p.stock}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>in stock</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="fas fa-box-open" />
              <p>Search or scan products to add to cart</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th style={{ width: 50 }}>Price</th>
                      <th style={{ width: 80 }}>Qty</th>
                      <th style={{ width: 60 }}>Total</th>
                      <th style={{ width: 30 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => {
                      const product = state.products.find(p => p.sku === item.productSku);
                      return (
                        <tr key={item.productSku}>
                          <td>
                            <span className="item-name">{item.productName}</span>
                            <span className="item-gst"><br />GST: {item.gstRate}%</span>
                          </td>
                          <td>₹{item.price}</td>
                          <td>
                            <div className="qty-controls">
                              <button className="qty-btn" onClick={() => updateQty(item.productSku, -1)} disabled={item.qty <= 1}>−</button>
                              <span className="qty-value">{item.qty}</span>
                              <button className="qty-btn" onClick={() => updateQty(item.productSku, 1)} disabled={product && item.qty >= product.stock}>+</button>
                            </div>
                          </td>
                          <td><strong>₹{item.total.toFixed(2)}</strong></td>
                          <td><button className="cart-remove" onClick={() => removeItem(item.productSku)} title="Remove"><i className="fas fa-times" /></button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="billing-summary">
                <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="summary-row"><span>GST</span><span>₹{totalGst.toFixed(2)}</span></div>
                {discAmount > 0 && <div className="summary-row"><span>Discount</span><span>-₹{discAmount.toFixed(2)}</span></div>}
                <div className="summary-row total"><span>Grand Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL - Customer + Discount + Actions */}
        <div>
          <div className="billing-panel" style={{ marginBottom: 14 }}>
            <h3><i className="fas fa-user" style={{ color: 'var(--success)' }} /> Customer</h3>
            <div className="customer-select-row">
              <select value={customerId} onChange={e => handleCustomerSelect(e.target.value)}>
                <option value="">Walk-in Customer</option>
                {state.customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                <option value="new">+ New Customer</option>
              </select>
              {customerId === 'new' && (
                <button className="btn-add-customer" onClick={() => setShowNewCustomer(!showNewCustomer)}>
                  {showNewCustomer ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}
                </button>
              )}
            </div>
            {(customerId === 'new' || customerId === '' && customer.name) ? (
              <div className="customer-form">
                <div className="form-row">
                  <input type="text" placeholder="Customer name" value={customer.name} onChange={e => setCustomer(c => ({ ...c, name: e.target.value }))} />
                  <input type="text" placeholder="Phone (10 digits)" value={customer.phone} onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 10); setCustomer(c => ({ ...c, phone: v })); setPhoneError(v.length > 0 && v.length !== 10 ? 'Must be exactly 10 digits' : ''); }} />
                </div>
                {phoneError && <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: -6, marginBottom: 6 }}>{phoneError}</p>}
                <div className="form-row">
                  <input type="text" placeholder="Address" value={customer.address} onChange={e => setCustomer(c => ({ ...c, address: e.target.value }))} />
                  <input type="text" placeholder="GST No." value={customer.gst} onChange={e => setCustomer(c => ({ ...c, gst: e.target.value }))} />
                </div>
              </div>
            ) : customerId && customer.name ? (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '4px 0' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{customer.name}</strong>
                {customer.phone && <span> | {customer.phone}</span>}
                {customer.gst && <span> | GST: {customer.gst}</span>}
              </div>
            ) : null}
          </div>

          <div className="billing-panel">
            <h3><i className="fas fa-calculator" style={{ color: 'var(--warning)' }} /> Summary</h3>
            <div className="billing-summary">
              <div className="summary-row"><span>Items</span><span>{cart.length}</span></div>
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="summary-row"><span>GST</span><span>₹{totalGst.toFixed(2)}</span></div>
              <div className="summary-row"><span>Total (incl. GST)</span><span>₹{(subtotal + totalGst).toFixed(2)}</span></div>
              <div className="discount-row" style={{ marginTop: 8 }}>
                <label>Discount (₹)</label>
                <input type="number" min="0" step="1" value={discount} onChange={e => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))} />
              </div>
              <div className="discount-row">
                <label>Payment</label>
                <div style={{ display: 'flex', gap: 6, flex: 1 }}>
                  {['cash', 'card', 'upi'].map(mode => (
                    <button key={mode} type="button"
                      onClick={() => setPaymentMode(mode)}
                      style={{
                        flex: 1, padding: '7px 6px', border: `2px solid ${paymentMode === mode ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)', background: paymentMode === mode ? '#eff6ff' : 'var(--bg-card)',
                        color: paymentMode === mode ? 'var(--primary)' : 'var(--text-secondary)',
                        fontWeight: paymentMode === mode ? 700 : 500, fontSize: '0.78rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, transition: 'var(--transition)',
                      }}>
                      <i className={`fas fa-${mode === 'cash' ? 'money-bill-wave' : mode === 'card' ? 'credit-card' : 'mobile-alt'}`} />
                      {mode === 'upi' ? 'UPI' : mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="summary-row total"><span>Grand Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
            </div>
            <div className="billing-actions">
              <button
                className="btn btn-primary btn-generate"
                disabled={cart.length === 0 || saving}
                onClick={handleGenerateBill}
              >
                {saving ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-receipt" />}
                {saving ? 'Generating...' : 'Generate Bill'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <InvoiceHistory onViewBill={viewPastBill} />

      {showScanner && <BarcodeScanner onDetected={handleBarcodeDetected} onClose={() => setShowScanner(false)} />}
      {showBill && <BillPreviewModal bill={showBill} onClose={handleCloseBill} />}
    </section>
  );
}
