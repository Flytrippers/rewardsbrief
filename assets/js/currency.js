/**
 * RewardsBrief Currency Toggle
 * Simple click-to-toggle between USD and CAD
 * Auto-detects Canadian visitors, defaults USD for everyone else
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'rewardsbrief_currency';
  const DEFAULT_CURRENCY = 'usd';

  const FLAGS = {
    usd: '🇺🇸',
    cad: '🇨🇦'
  };

  const LABELS = {
    usd: 'USD',
    cad: 'CAD'
  };

  /**
   * Detect if visitor is Canadian from browser locale
   */
  function isCanadian() {
    const locale = navigator.language || navigator.userLanguage || 'en-US';
    return locale.includes('CA') || locale.includes('ca');
  }

  /**
   * Get stored or detected currency preference
   */
  function getCurrency() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'usd' || stored === 'cad')) {
      return stored;
    }
    return isCanadian() ? 'cad' : DEFAULT_CURRENCY;
  }

  /**
   * Save currency preference
   */
  function setCurrency(currency) {
    localStorage.setItem(STORAGE_KEY, currency);
    updateUI(currency);
  }

  /**
   * Update the toggle display
   */
  function updateUI(currency) {
    const flagEl = document.getElementById('currency-flag');
    const labelEl = document.getElementById('currency-label');

    if (flagEl) flagEl.textContent = FLAGS[currency];
    if (labelEl) labelEl.textContent = LABELS[currency];

    // Phase 2: Add price swapping here
  }

  /**
   * Toggle dropdown visibility
   */
  function toggleDropdown() {
    const dropdown = document.getElementById('currency-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  }

  /**
   * Close dropdown when clicking outside
   */
  function closeDropdown(e) {
    const toggle = document.getElementById('currency-toggle');
    const dropdown = document.getElementById('currency-dropdown');
    if (dropdown && toggle && !toggle.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  }

  /**
   * Initialize on page load
   */
  function init() {
    const toggle = document.getElementById('currency-toggle');
    const dropdown = document.getElementById('currency-dropdown');
    if (!toggle || !dropdown) return;

    const currency = getCurrency();
    updateUI(currency);

    // Click toggle to open/close dropdown
    toggle.addEventListener('click', toggleDropdown);

    // Click outside to close
    document.addEventListener('click', closeDropdown);

    // Click option to select
    dropdown.querySelectorAll('.currency-option').forEach(function(option) {
      option.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        setCurrency(value);
        dropdown.classList.remove('active');
      });
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();