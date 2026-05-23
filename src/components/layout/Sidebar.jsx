import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-boxes-stacked" />
          <span>InvManager</span>
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} end>
            <i className="fas fa-tachometer-alt" /><span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <i className="fas fa-box-open" /><span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/suppliers" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <i className="fas fa-truck" /><span>Suppliers</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/billing" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <i className="fas fa-cash-register" /><span>Billing</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <i className="fas fa-chart-bar" /><span>Reports</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <i className="fas fa-cog" /><span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
