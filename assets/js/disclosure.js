/**
 * RewardsBrief Disclosure Placement
 * Handles affiliate disclosure positioning based on region
 */

(function() {
  'use strict';

  // Disclosure is now always at top for both US and CA
  // per updated trust system
  function init() {
    var topDisc = document.getElementById('disclosure-top');
    
    if (topDisc) {
      topDisc.style.display = 'flex';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();