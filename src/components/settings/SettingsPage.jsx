import { useEffect } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useToast } from '../../context/InventoryContext';
import { initialProducts, initialSuppliers, initialCategories } from '../../data/initialData';

export default function SettingsPage() {
  const { dispatch } = useInventory();
  const { showToast } = useToast();

  const isDark = document.body.classList.contains('dark-mode');

  function activateDark() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('invTheme', 'dark');
    showToast('Dark Mode activated 🌙', 'success');
    // Force re-render
    document.dispatchEvent(new Event('themechange'));
  }

  function activateLight() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('invTheme', 'light');
    showToast('Light Mode activated ☀️', 'success');
    document.dispatchEvent(new Event('themechange'));
  }

  function resetData() {
    if (window.confirm('⚠️ Reset All Data?\n\nThis will restore all products, suppliers, and settings to their original default values.\n\nThis action cannot be undone.')) {
      dispatch({ type: 'RESET_DATA' });
      document.body.classList.remove('dark-mode');
      localStorage.removeItem('invTheme');
      showToast('Data reset to defaults!', 'warning');
    }
  }

  const dark = document.body.classList.contains('dark-mode');

  return (
    <section className="page" id="page-settings">
      <div className="settings-container">
        <div className="settings-hero">
          <div className="settings-hero-icon"><i className="fas fa-cog" /></div>
          <div>
            <h2>Settings</h2>
            <p>Customize your inventory system preferences</p>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-header">
            <i className="fas fa-palette" />
            <h3>Appearance</h3>
          </div>
          <div className="settings-section-body">
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-label">Theme Mode</span>
                <span className="settings-desc">Choose between light and dark interface</span>
              </div>
              <div className="theme-toggle-group">
                <button
                  className={`theme-btn ${!dark ? 'active' : ''}`}
                  id="lightModeBtn"
                  title="Switch to Light Mode"
                  onClick={activateLight}
                >
                  <i className="fas fa-sun" /> Light
                </button>
                <button
                  className={`theme-btn ${dark ? 'active' : ''}`}
                  id="darkModeBtn"
                  title="Switch to Dark Mode"
                  onClick={activateDark}
                >
                  <i className="fas fa-moon" /> Dark
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-header">
            <i className="fas fa-database" />
            <h3>Data Management</h3>
          </div>
          <div className="settings-section-body">
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-label">Reset All Data</span>
                <span className="settings-desc">Restore all products, suppliers and settings to their default values</span>
              </div>
              <button className="btn btn-danger" id="resetDataBtn" onClick={resetData}>
                <i className="fas fa-rotate-left" /> Reset Data
              </button>
            </div>
          </div>
        </div>

        <div className="settings-current-mode" id="currentModeIndicator">
          <i className="fas fa-circle-check" />
          <span id="currentModeText">{dark ? 'Dark Mode is active' : 'Light Mode is active'}</span>
        </div>
      </div>
    </section>
  );
}
