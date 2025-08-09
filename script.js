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

    navMenu.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('a')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Лёгкая i18n
  const dictionaries = {
    ru: {
      'meta.title': 'StarStack — Небольшой сайт',
      'meta.404_title': 'Страница не найдена — StarStack',
      'common.brand': 'StarStack',
      'header.nav.home': 'Главная',
      'header.nav.about': 'О сайте',
      'header.nav.projects': 'Проекты',
      'header.nav.contact': 'Контакты',
      'hero.title': 'Привет! Это StarStack',
      'hero.subtitle': 'Минимальный сайт, который легко разместить на GitHub Pages.',
      'hero.cta': 'Смотреть проекты',
      'about.title': 'О сайте',
      'about.body': 'Этот шаблон — чистый HTML/CSS/JS без сборки. Его можно быстро развернуть и дополнять по мере необходимости.',
      'projects.title': 'Проекты',
      'projects.items.0.title': 'Проект 1',
      'projects.items.0.desc': 'Короткое описание проекта.',
      'projects.items.0.more': 'Подробнее →',
      'projects.items.1.title': 'Проект 2',
      'projects.items.1.desc': 'Короткое описание проекта.',
      'projects.items.1.more': 'Подробнее →',
      'contact.title': 'Контакты',
      'contact.body': 'Чтобы связаться, используйте форму обращения в репозитории. Email не публикуется.',
      'contact.cta': 'Открыть форму обращения →',
      'footer.made': 'Сделано с любовью.',
      'notfound.title': 'Такой страницы нет',
      'notfound.body': 'Возможно, ссылка устарела или была удалена.',
      'notfound.back': 'Вернуться на главную',
    },
    en: {
      'meta.title': 'StarStack — Minimal site',
      'meta.404_title': 'Page not found — StarStack',
      'common.brand': 'StarStack',
      'header.nav.home': 'Home',
      'header.nav.about': 'About',
      'header.nav.projects': 'Projects',
      'header.nav.contact': 'Contact',
      'hero.title': 'Hi! This is StarStack',
      'hero.subtitle': 'A minimal site that is easy to host on GitHub Pages.',
      'hero.cta': 'View projects',
      'about.title': 'About',
      'about.body': 'This template is plain HTML/CSS/JS without a build step. Deploy fast and extend as you go.',
      'projects.title': 'Projects',
      'projects.items.0.title': 'Project 1',
      'projects.items.0.desc': 'Short project description.',
      'projects.items.0.more': 'Learn more →',
      'projects.items.1.title': 'Project 2',
      'projects.items.1.desc': 'Short project description.',
      'projects.items.1.more': 'Learn more →',
      'contact.title': 'Contact',
      'contact.body': 'Use the repository issue form to get in touch. Email is not published.',
      'contact.cta': 'Open contact form →',
      'footer.made': 'Made with love.',
      'notfound.title': 'This page does not exist',
      'notfound.body': 'The link may be outdated or has been removed.',
      'notfound.back': 'Back to home',
    },
  };

  function getLangSelect() {
    return document.getElementById('langSelect') || document.getElementById('langSelect404');
  }

  function applyLanguage(lang) {
    const dict = dictionaries[lang] || dictionaries.ru;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if (typeof value === 'string') {
        if (el.tagName === 'TITLE' || el.tagName === 'META') {
          el.textContent = value;
        } else {
          el.textContent = value;
        }
      }
    });
    // HTML lang attr
    document.documentElement.lang = lang;

    // Подменяем ссылку на Issues, чтобы текст тела был на нужном языке
    const contactLink = document.getElementById('contactLink');
    if (contactLink) {
      const base = 'https://github.com/starstack14/starstacksite/issues/new?labels=contact&title=';
      if (lang === 'en') {
        contactLink.href = base + encodeURIComponent('Contact') + '&body=' + encodeURIComponent('Describe your question and a contact for reply.');
      } else {
        contactLink.href = base + encodeURIComponent('Обращение') + '&body=' + encodeURIComponent('Опишите ваш вопрос и контакт для обратной связи.');
      }
    }
  }

  function initLanguage() {
    const select = getLangSelect();
    const saved = localStorage.getItem('lang');
    let initial = saved || (navigator.language || 'ru').slice(0, 2);
    if (!['ru', 'en'].includes(initial)) initial = 'ru';
    if (select) select.value = initial;
    applyLanguage(initial);

    if (select) {
      select.addEventListener('change', () => {
        const lang = select.value;
        localStorage.setItem('lang', lang);
        applyLanguage(lang);
      });
    }
  }

  initLanguage();
})();
