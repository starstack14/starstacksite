# StarStack — статичный сайт для GitHub Pages

Минимальный шаблон на чистых HTML/CSS/JS. Подходит для быстрого деплоя на GitHub Pages.

## Структура
- `index.html` — главная страница
- `styles.css` — стили (поддержка светлой/тёмной темы)
- `script.js` — переключатель темы и мобильное меню
- `404.html` — кастомная страница 404 (рекомендуется для Pages)
- `.nojekyll` — отключает обработку Jekyll

## Локальный запуск
Дважды кликните `index.html` или откройте через простой http-сервер.

## Публикация на GitHub Pages
1) Создайте репозиторий на GitHub (например, `starstacksite`).
2) Инициализируйте git и сделайте первый коммит:
```powershell
git init
git add .
git commit -m "Initial commit: StarStack static site"
```
3) Добавьте удалённый репозиторий и запушьте:
```powershell
git branch -M main
git remote add origin https://github.com/<ВАШ_АККАУНТ>/<ВАШ_РЕПОЗИТОРИЙ>.git
git push -u origin main
```
4) В настройках репозитория включите Pages: Settings → Pages → Build and deployment → Source: `Deploy from a branch`, Branch: `main` и `/ (root)`.
5) Откройте выданный URL. Обычно это `https://<ВАШ_АККАУНТ>.github.io/<ВАШ_РЕПОЗИТОРИЙ>/`.

### Контакты без раскрытия email
- В `index.html` ссылка ведёт на форму обращения через GitHub Issues вашего репозитория (`Issues → New`). Email при этом не публикуется.
- По желанию можно подключить приватную форму через Formspree:
  1. Зарегистрируйтесь на `https://formspree.io` и создайте форму.
  2. Замените ссылку в блоке "Контакты" на `<form action="https://formspree.io/f/<ID>" method="POST">...`.
  3. Добавьте поле `email` и включите reCAPTCHA/спам-фильтры.

### Вариант «пользовательский сайт» (один на аккаунт)
Создайте репозиторий с именем `<username>.github.io` и деплойте в `main`. Урл будет `https://<username>.github.io/`.

---
Удачи! Вы можете менять содержимое в `index.html`, добавлять разделы и картинки, новые страницы и т.п.
