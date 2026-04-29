/**
 * RewardsBrief Currency Switcher
 * Simple USD/CAD toggle with localStorage persistence
 * Default is always USD
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'rewardsbrief_currency';
  const DEFAULT_CURRENCY = 'usd';

  /**
   * Get stored currency preference (defaults to USD)
   */
  function getCurrency() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === 'usd' || stored === 'cad') ? stored : DEFAULT_CURRENCY;
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
    if (select) {
      select.value = currency;
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