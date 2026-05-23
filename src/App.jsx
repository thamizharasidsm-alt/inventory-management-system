import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Toast from './components/shared/Toast';
import DashboardPage from './components/dashboard/DashboardPage';
import ProductsPage from './components/products/ProductsPage';
import SuppliersPage from './components/suppliers/SuppliersPage';
import BillingPage from './components/billing/BillingPage';
import ReportsPage from './components/reports/ReportsPage';
import SettingsPage from './components/settings/SettingsPage';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  // Apply saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('invTheme') || 'light';
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');

    // Listen for theme changes triggered from SettingsPage
    const handler = () => { /* triggers re-render for settings page */ };
    document.addEventListener('themechange', handler);
    return () => document.removeEventListener('themechange', handler);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <BrowserRouter>
      <InventoryProvider>
        <div className={`app-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
          <Sidebar collapsed={collapsed} />
          <main className="main-content" style={{ marginLeft: collapsed ? 72 : 260 }}>
            <Topbar onMenuToggle={() => setCollapsed(c => !c)} />
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <Toast />
        </div>
      </InventoryProvider>
    </BrowserRouter>
  );
}
