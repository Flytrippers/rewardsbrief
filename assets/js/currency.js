/**
 * RewardsBrief Currency Switcher
 * Handles region/currency preference with localStorage persistence
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'rewardsbrief_currency';
  const DEFAULT_CURRENCY = 'usd';

  // Exchange rate (approximate, update as needed)
  const RATES = {
    usd: 1,
    cad: 1.35
  };

  /**
   * Detect currency from browser locale
   */
  function detectCurrency() {
    const locale = navigator.language || navigator.userLanguage || 'en-US';
    if (locale.includes('CA') || locale.includes('ca')) {
      return 'cad';
    }
    return 'usd';
  }

  /**
   * Get stored or detected currency preference
   */
  function getCurrency() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'usd' || stored === 'cad')) {
      return stored;
    }
    return detectCurrency();
  }

  /**
   * Save currency preference
   */
  function setCurrency(currency) {
    localStorage.setItem(STORAGE_KEY, currency);
    updateUI(currency);
    updatePrices(currency);
  }

  /**
   * Update the UI elements
   */
  function updateUI(currency) {
    const select = document.getElementById('currency-select');
    const activeLabel = document.getElementById('active-currency');

    if (select) {
      select.value = currency;
    }

    if (activeLabel) {
      activeLabel.textContent = currency.toUpperCase();
    }
  }

  /**
   * Update prices in content (Phase 2: full implementation)
   * For now, marks the container with active currency class
   */
  function updatePrices(currency) {
    const content = document.querySelector('.post-content');
    if (content) {
      content.setAttribute('data-currency', currency);
    }

    // Phase 2: Add price swapping logic here
    // Look for elements with data-usd or data-cad attributes
    // and swap their displayed values
  }

  /**
   * Initialize on page load
   */
  function init() {
    const select = document.getElementById('currency-select');
    if (!select) return;

    const currency = getCurrency();
    updateUI(currency);
    updatePrices(currency);

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