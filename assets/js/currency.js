/**
 * RewardsBrief Currency Switcher
 * Auto-detects Canadian visitors, shows CAD by default for them
 * USD default for everyone else
 * Shows flag badge based on active currency
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'rewardsbrief_currency';
  const DEFAULT_CURRENCY = 'usd';

  /**
   * Detect if visitor is Canadian from browser locale
   */
  function isCanadian() {
    const locale = navigator.language || navigator.userLanguage || 'en-US';
    return locale.includes('CA') || locale.includes('ca');
  }

  /**
   * Get stored or detected currency preference
   * Canadians see CAD by default, everyone else sees USD
   */
  function getCurrency() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'usd' || stored === 'cad')) {
      return stored;
    }
    // First visit: detect locale
    return isCanadian() ? 'cad' : DEFAULT_CURRENCY;
  }

  /**
   * Save currency preference
   */
  function setCurrency(currency) {
    localStorage.setItem(STORAGE_KEY, currency);
    updateUI(currency);
    // Phase 2: Add price swapping here when ready
  }

  /**
   * Update the UI elements
   */
  function updateUI(currency) {
    const select = document.getElementById('currency-select');
    const generalBadge = document.getElementById('region-badge-general');

    if (select) {
      select.value = currency;
    }

    // Update general content flag badge
    if (generalBadge) {
      generalBadge.textContent = currency === 'cad' ? '🇨🇦' : '🇺🇸';
      generalBadge.className = 'region-badge region-' + currency;
    }
  }

  /**
   * Initialize on page load
   */
  function init() {
    const select = document.getElementById('currency-select');
    if (!select) return;

    const currency = getCurrency();
    updateUI(currency);

    select.addEventListener('change', function(e) {
      setCurrency(e.target.value);
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();