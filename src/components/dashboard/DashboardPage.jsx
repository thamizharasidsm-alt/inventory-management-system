import { useRef } from 'react';
import { useInventory } from '../../context/InventoryContext';
import SummaryCards from './SummaryCards';
import ChartsSection from './ChartsSection';
import LowStockTable from './LowStockTable';

export default function DashboardPage() {
  const { state } = useInventory();
  const lowStockRef = useRef(null);
  const totalSales = state.invoices.reduce((s, inv) => s + inv.grandTotal, 0);
  const today = new Date().toISOString().split('T')[0];
  const todaySales = state.invoices.filter(inv => inv.date === today).reduce((s, inv) => s + inv.grandTotal, 0);
  const invoiceCount = state.invoices.length;

  const scrollToLowStock = () => {
    if (lowStockRef.current) {
      lowStockRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const el = lowStockRef.current;
      el.style.transition = 'all 0.5s ease';
      el.style.backgroundColor = '#fff7ed';
      el.style.boxShadow = '0 0 0 2px #f59e0b';
      el.style.borderRadius = '8px';
      setTimeout(() => {
        el.style.backgroundColor = '';
        el.style.boxShadow = '';
      }, 2000);
    }
  };

  return (
    <section className="page" id="page-dashboard">
      <SummaryCards onLowStockClick={scrollToLowStock} />
      <ChartsSection />
      <div ref={lowStockRef}>
        <LowStockTable />
      </div>
      <div className="recent-section" style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <h3><i className="fas fa-chart-line" style={{ color: 'var(--primary)' }} /> Billing Overview</h3>
        </div>
        <div className="summary-cards" style={{ marginBottom: 0 }}>
          <div className="summary-card card-teal">
            <div className="card-icon"><i className="fas fa-rupee-sign" /></div>
            <div className="card-info"><h3>Total Sales</h3><p>₹{totalSales.toFixed(2)}</p></div>
          </div>
          <div className="summary-card card-rose">
            <div className="card-icon"><i className="fas fa-calendar-day" /></div>
            <div className="card-info"><h3>Today's Sales</h3><p>₹{todaySales.toFixed(2)}</p></div>
          </div>
          <div className="summary-card card-amber">
            <div className="card-icon"><i className="fas fa-file-invoice" /></div>
            <div className="card-info"><h3>Total Invoices</h3><p>{invoiceCount}</p></div>
          </div>
          <div className="summary-card card-emerald">
            <div className="card-icon"><i className="fas fa-users" /></div>
            <div className="card-info"><h3>Customers</h3><p>{state.customers.length}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
