/**
 * RewardsBrief Currency Toggle
 * Auto-detects Canadian visitors, shows CAD by default for them
 * USD default for everyone else
 * Shows flag badge based on active currency
 */

(function() {
  'use strict';

  var STORAGE_KEY = 'rewardsbrief_currency';
  var DEFAULT_CURRENCY = 'usd';

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
  }

  function updateUI(currency) {
    var flagEl = document.getElementById('currency-flag');
    var labelEl = document.getElementById('currency-label');

    if (flagEl) flagEl.textContent = FLAGS[currency];
    if (labelEl) labelEl.textContent = LABELS[currency];
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