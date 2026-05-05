## План: підключення шрифту Horta для заголовків

### Що потрібно від вас
Завантажте файл шрифту Horta (бажано `.woff2`, також підійдуть `.ttf` або `.otf`) у наступному повідомленні.

### Що я зроблю після отримання файлу

1. **Розмістити файл шрифту**
   - Скопіювати завантажений файл у `public/fonts/horta.woff2` (або відповідне розширення).

2. **Підключити шрифт через `@font-face`** у `src/index.css`
   - Додати декларацію `@font-face { font-family: 'Horta'; src: url('/fonts/horta.woff2') format('woff2'); font-display: swap; }`
   - Видалити імпорт Oswald з Google Fonts (Inter залишається для body).
   - Замінити CSS-змінну `--font-heading` на `'Horta', sans-serif`.

3. **Оновити Tailwind конфіг** (`tailwind.config.ts`)
   - Замінити `heading: ['Oswald', 'sans-serif']` на `heading: ['Horta', 'sans-serif']`, щоб клас `font-heading` всюди підхопив новий шрифт.

4. **Перевірити заголовки**
   - Усі `h1–h6` та елементи з класом `font-heading` (Header, Hero, About, Footer, Vacancies, About, Fund, News, Blog) автоматично отримають Horta завдяки глобальному правилу в `index.css` та токену Tailwind.
   - За потреби трохи відкоригувати `letter-spacing`/`text-transform` глобального правила, якщо Horta декоративний і uppercase виглядатиме погано (вирішимо після візуальної перевірки).

5. **Оновити пам'ять проєкту**
   - Оновити `mem://index.md` та `mem://design/tokens`: heading-шрифт = Horta замість Oswald.

### Технічні деталі
- Файли, що змінюються: `src/index.css`, `tailwind.config.ts`, `mem://index.md`, `mem://design/tokens`.
- Новий файл: `public/fonts/horta.{woff2|ttf|otf}`.
- Inter (body) і червоний акцент `#dc2626` лишаються без змін.
