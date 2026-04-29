/**
 * RewardsBrief Currency Converter
 * Fetches live USD→CAD rate, caches for 24 hours
 * Converts all USD prices to CAD for Canadian visitors
 * All prices in articles written in USD only
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'rewardsbrief_currency';
  const RATE_CACHE_KEY = 'rewardsbrief_rate';
  const RATE_DATE_KEY = 'rewardsbrief_rate_date';
  const DEFAULT_CURRENCY = 'usd';

  // Free exchange rate API (no key needed)
  const API_URL = 'https://api.frankfurter.app/latest?from=USD&to=CAD';

  const FLAGS = {
    usd: '🇺🇸',
    cad: '🇨🇦'
  };

  const LABELS = {
    usd: 'USD',
    cad: 'CAD'
  };

  /**
   * Check if we have a valid cached rate (from today)
   */
  function hasValidCache() {
    const cachedDate = localStorage.getItem(RATE_DATE_KEY);
    const today = new Date().toISOString().split('T')[0];
    return cachedDate === today && localStorage.getItem(RATE_CACHE_KEY) !== null;
  }

  /**
   * Get cached rate
   */
  function getCachedRate() {
    const rate = parseFloat(localStorage.getItem(RATE_CACHE_KEY));
    return isNaN(rate) ? null : rate;
  }

  /**
   * Save rate to cache with today's date
   */
  function cacheRate(rate) {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(RATE_CACHE_KEY, rate.toString());
    localStorage.setItem(RATE_DATE_KEY, today);
  }

  /**
   * Fetch live USD→CAD rate from API
   */
  async function fetchRate() {
    if (hasValidCache()) {
      return getCachedRate();
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      const rate = data.rates.CAD;
      cacheRate(rate);
      return rate;
    } catch (err) {
      console.warn('RewardsBrief: Could not fetch exchange rate, using fallback', err);
      // Fallback: use cached rate even if expired, or 1.35 as last resort
      return getCachedRate() || 1.35;
    }
  }

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
    updatePrices(currency);
  }

  /**
   * Format currency display
   */
  function formatPrice(amount) {
    return '$' + parseFloat(amount).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  /**
   * Update all price elements on the page
   */
  async function updatePrices(currency) {
    const flagEl = document.getElementById('currency-flag');
    const labelEl = document.getElementById('currency-label');

    if (flagEl) flagEl.textContent = FLAGS[currency];
    if (labelEl) labelEl.textContent = LABELS[currency];

    const rate = await fetchRate();
    const prices = document.querySelectorAll('.price-convert');

    prices.forEach(function(el) {
      const usdAmount = parseFloat(el.getAttribute('data-usd'));
      if (isNaN(usdAmount)) return;

      if (currency === 'cad') {
        const cadAmount = Math.round(usdAmount * rate);
        el.textContent = formatPrice(cadAmount);
      } else {
        el.textContent = formatPrice(usdAmount);
      }
    });
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
  async function init() {
    const toggle = document.getElementById('currency-toggle');
    const dropdown = document.getElementById('currency-dropdown');
    if (!toggle || !dropdown) return;

    const currency = getCurrency();
    await updatePrices(currency);

    // Click toggle to open/close dropdown
    toggle.addEventListener('click', toggleDropdown);

    // Click outside to close
    document.addEventListener('click', closeDropdown);

    // Click option to select
    dropdown.querySelectorAll('.currency-option').forEach(function(option) {
      option.addEventListener('click', async function() {
        const value = this.getAttribute('data-value');
        await setCurrency(value);
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