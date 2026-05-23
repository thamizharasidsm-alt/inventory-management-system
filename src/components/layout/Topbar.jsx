import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import AdminModal from '../shared/AdminModal';
import NotificationModal from '../shared/NotificationModal';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/suppliers': 'Suppliers',
  '/billing': 'Billing',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

export default function Topbar({ onMenuToggle }) {
  const { state } = useInventory();
  const location = useLocation();
  const [showAdmin, setShowAdmin] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const lowStockCount = state.products.filter(p => p.stock < 20).length;
  const title = PAGE_TITLES[location.pathname] || 'Inventory';

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <button className="menu-toggle" onClick={onMenuToggle} id="menuToggle">
            <i className="fas fa-bars" />
          </button>
          <h2 id="pageTitle">{title}</h2>
        </div>
        <div className="topbar-right">
          <div
            className="notification-badge"
            id="notificationBtn"
            title="View Notifications"
            onClick={() => setShowNotif(true)}
          >
            <i className="fas fa-bell" />
            <span className="badge" id="lowStockBadge">{lowStockCount}</span>
          </div>
          <div
            className="user-info"
            id="adminProfileBtn"
            title="View Admin Profile"
            onClick={() => setShowAdmin(true)}
          >
            <i className="fas fa-user-circle" />
            <span>Admin</span>
          </div>
        </div>
      </header>

      <AdminModal show={showAdmin} onClose={() => setShowAdmin(false)} />
      <NotificationModal show={showNotif} onClose={() => setShowNotif(false)} />
    </>
  );
}
