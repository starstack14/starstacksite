(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const year = document.getElementById('year');

  // Текущий год в подвале
  if (year) year.textContent = String(new Date().getFullYear());

  // Инициализация темы
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    root.setAttribute('data-theme', savedTheme);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(savedTheme === 'dark'));
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
  }

  // Переключение темы
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
    });
  }

  // Мобильное меню
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Закрытие при клике по ссылке
    navMenu.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('a')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
