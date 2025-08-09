(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const year = document.getElementById('year');

  if (year) year.textContent = String(new Date().getFullYear());

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    root.setAttribute('data-theme', savedTheme);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(savedTheme === 'dark'));
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
    });
  }

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
      'about.body': 'Тут будут располагаться небольшие проекты, которые я делаю от скуки и не использую в коммерческих целях.',
      'projects.title': 'Проекты',
      'projects.items.1.title': 'Проект 2',
      'projects.items.1.desc': 'Короткое описание проекта.',
      'projects.items.1.more': 'Подробнее →',
      'projects.mlf.desc': 'Лаунчер для Factorio. Описание подгружается из GitHub.',
      'projects.mlf.latest': 'Последний релиз:',
      'projects.mlf.no_release': 'Релизов нет',
      'projects.actions.github': 'Открыть на GitHub →',
      'projects.actions.download': 'Скачать последний релиз →',
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
      'about.body': 'This section hosts small projects I build for fun and do not use for commercial purposes.',
      'projects.title': 'Projects',
      'projects.items.1.title': 'Project 2',
      'projects.items.1.desc': 'Short project description.',
      'projects.items.1.more': 'Learn more →',
      'projects.mlf.desc': 'Launcher for Factorio. Description is loaded from GitHub.',
      'projects.mlf.latest': 'Latest release:',
      'projects.mlf.no_release': 'No releases',
      'projects.actions.github': 'Open on GitHub →',
      'projects.actions.download': 'Download latest →',
      'contact.title': 'Contact',
      'contact.body': 'Use the repository issue form to get in touch. Email is not published.',
      'contact.cta': 'Open contact form →',
      'footer.made': 'Made with love.',
      'notfound.title': 'This page does not exist',
      'notfound.body': 'The link may be outdated or has been removed.',
      'notfound.back': 'Back to home',
    },
  };

  let currentLang = 'en';
  function setPressed(lang) {
    const ru = document.getElementById('langRu');
    const en = document.getElementById('langEn');
    if (ru && en) {
      ru.setAttribute('aria-pressed', String(lang === 'ru'));
      en.setAttribute('aria-pressed', String(lang === 'en'));
    }
  }
  function t(key) {
    return (dictionaries[currentLang] && dictionaries[currentLang][key]) || dictionaries.en[key] || key;
  }

  function applyLanguage(lang) {
    currentLang = ['ru', 'en'].includes(lang) ? lang : 'en';
    const dict = dictionaries[currentLang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if (typeof value === 'string') el.textContent = value;
    });
    document.documentElement.lang = currentLang;

    const contactLink = document.getElementById('contactLink');
    if (contactLink) {
      const base = 'https://github.com/starstack14/starstacksite/issues/new?labels=contact&title=';
      if (currentLang === 'en') {
        contactLink.href = base + encodeURIComponent('Contact') + '&body=' + encodeURIComponent('Describe your question and a contact for reply.');
      } else {
        contactLink.href = base + encodeURIComponent('Обращение') + '&body=' + encodeURIComponent('Опишите ваш вопрос и контакт для обратной связи.');
      }
    }

    setPressed(currentLang);
  }

  function initLanguage() {
    const saved = localStorage.getItem('lang');
    let initial = saved || 'en';
    if (!['ru', 'en'].includes(initial)) initial = 'en';
    applyLanguage(initial);

    const ru = document.getElementById('langRu');
    const en = document.getElementById('langEn');
    if (ru) ru.addEventListener('click', () => { localStorage.setItem('lang', 'ru'); applyLanguage('ru'); });
    if (en) en.addEventListener('click', () => { localStorage.setItem('lang', 'en'); applyLanguage('en'); });
  }

  async function initRepoInfo() {
    const titleEl = document.getElementById('mlfTitle');
    const descEl = document.getElementById('mlfDesc');
    const starsEl = document.getElementById('mlfStars');
    const releaseEl = document.getElementById('mlfRelease');
    const downloadEl = document.getElementById('mlfDownload');
    const repo = 'starstack14/Multi-LauncherFactorio';

    try {
      const repoRes = await fetch(`https://api.github.com/repos/${repo}`);
      if (repoRes.ok) {
        const repoData = await repoRes.json();
        if (descEl && repoData.description) descEl.textContent = repoData.description;
        if (starsEl && typeof repoData.stargazers_count === 'number') starsEl.textContent = `★ ${repoData.stargazers_count}`;
        if (titleEl && repoData.html_url) titleEl.href = repoData.html_url;
      }
    } catch {}

    try {
      const relRes = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
      if (relRes.ok) {
        const rel = await relRes.json();
        if (releaseEl) releaseEl.textContent = `${t('projects.mlf.latest')} ${rel.tag_name || rel.name || ''}`.trim();
        if (downloadEl && rel.html_url) downloadEl.href = rel.html_url;
      } else {
        if (releaseEl) releaseEl.textContent = t('projects.mlf.no_release');
      }
    } catch {
      if (releaseEl) releaseEl.textContent = t('projects.mlf.no_release');
    }
  }

  initLanguage();
  initRepoInfo();
})();
