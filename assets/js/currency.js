/**
 * RewardsBrief Currency Toggle
 * Auto-detects Canadian visitors, shows CAD by default for them
 * USD default for everyone else
 * Fetches USD/CAD rate from Flytrippers once per day per browser
 */

(function() {
  'use strict';

  var STORAGE_KEY = 'rewardsbrief_currency';
  var RATE_STORAGE_KEY = 'rewardsbrief_usd_cad_rate';
  var DEFAULT_CURRENCY = 'usd';
  var RATE_URL = window.REWARDSBRIEF_EXCHANGE_RATE_URL || 'https://flytrippers.com/wp-json/rewardsbrief/v1/exchange-rate/USD/CAD';

  var FLAGS = {
    usd: '🇺🇸',
    cad: '🇨🇦'
  };

  var LABELS = {
    usd: '$US',
    cad: '$C'
  };

  function isCanadian() {
    var locale = navigator.language || navigator.userLanguage || 'en-US';
    return locale.indexOf('CA') !== -1 || locale.indexOf('ca') !== -1;
  }

  function getCurrency() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'usd' || stored === 'cad')) {
      return stored;
    }
    return isCanadian() ? 'cad' : DEFAULT_CURRENCY;
  }

  function setCurrency(currency) {
    localStorage.setItem(STORAGE_KEY, currency);
    updateUI(currency);
    updatePrices(currency);
  }

  function updateUI(currency) {
    var flagEl = document.getElementById('currency-flag');
    var labelEl = document.getElementById('currency-label');

    if (flagEl) flagEl.textContent = FLAGS[currency];
    if (labelEl) labelEl.textContent = LABELS[currency];
  }

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function getCachedRate() {
    try {
      var cached = JSON.parse(localStorage.getItem(RATE_STORAGE_KEY) || '{}');
      if (cached.date === todayKey() && typeof cached.rate === 'number') {
        return Promise.resolve(cached.rate);
      }
    } catch (e) {
      localStorage.removeItem(RATE_STORAGE_KEY);
    }

    return fetch(RATE_URL)
      .then(function(response) {
        if (!response.ok) throw new Error('Exchange rate unavailable');
        return response.json();
      })
      .then(function(data) {
        if (typeof data.rate !== 'number') throw new Error('Exchange rate unavailable');
        localStorage.setItem(RATE_STORAGE_KEY, JSON.stringify({
          date: todayKey(),
          rate: data.rate
        }));
        return data.rate;
      });
  }

  function formatAmount(amount) {
    return '$' + Math.round(amount).toLocaleString('en-US');
  }

  function renderUsdPrices() {
    var prices = document.querySelectorAll('.price-convert[data-usd]');
    for (var i = 0; i < prices.length; i++) {
      var usd = parseFloat(prices[i].getAttribute('data-usd'));
      if (!isNaN(usd)) {
        prices[i].textContent = formatAmount(usd);
      }
    }
  }

  function renderCadPrices(rate) {
    var prices = document.querySelectorAll('.price-convert[data-usd]');
    for (var i = 0; i < prices.length; i++) {
      var usd = parseFloat(prices[i].getAttribute('data-usd'));
      if (!isNaN(usd)) {
        prices[i].textContent = formatAmount(usd * rate);
      }
    }
  }

  function updatePrices(currency) {
    if (currency !== 'cad') {
      renderUsdPrices();
      return;
    }

    getCachedRate()
      .then(renderCadPrices)
      .catch(function() {
        renderUsdPrices();
        updateUI('usd');
      });
  }

  function toggleDropdown() {
    var dropdown = document.getElementById('currency-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  }

  function closeDropdown(e) {
    var toggle = document.getElementById('currency-toggle');
    var dropdown = document.getElementById('currency-dropdown');
    if (dropdown && toggle && !toggle.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  }

  function init() {
    var toggle = document.getElementById('currency-toggle');
    var dropdown = document.getElementById('currency-dropdown');
    if (!toggle || !dropdown) return;

    var currency = getCurrency();
    updateUI(currency);
    updatePrices(currency);

    toggle.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);

    var options = dropdown.querySelectorAll('.currency-option');
    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener('click', function() {
        var value = this.getAttribute('data-value');
        setCurrency(value);
        dropdown.classList.remove('active');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();