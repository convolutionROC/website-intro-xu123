(function () {
  var root = document.documentElement;
  var storageKey = "theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_) {}
  }

  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch (_) {}
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
      return;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  }

  initTheme();

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(root.classList.contains("dark") ? "light" : "dark");
    });
  }

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      try {
        if (!localStorage.getItem(storageKey)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      } catch (_) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
