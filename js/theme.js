(function () {
  'use strict';

  var STORAGE_PREFIX = 'khotwat-theme-';

  function getPageId() {
    return document.body.getAttribute('data-page') || 'default';
  }

  function storageKey() {
    return STORAGE_PREFIX + getPageId();
  }

  function getStoredTheme() {
    try { return localStorage.getItem(storageKey()); } catch (_) { return null; }
  }

  function setStoredTheme(theme) {
    try { localStorage.setItem(storageKey(), theme); } catch (_) {}
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function syncToggles(isDark) {
    document.querySelectorAll('.toggle-cont').forEach(function (el) {
      var input = el.querySelector('.toggle-input');
      if (input) input.checked = isDark;
      el.classList.toggle('is-checked', isDark);
    });
  }

  function initTheme() {
    var stored = getStoredTheme();
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    applyTheme(isDark ? 'dark' : 'light');
    syncToggles(isDark);

    document.addEventListener('change', function (e) {
      var input = e.target;
      if (!input.matches('.toggle-input')) return;
      var isDark = input.checked;
      applyTheme(isDark ? 'dark' : 'light');
      setStoredTheme(isDark ? 'dark' : 'light');
      syncToggles(isDark);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
