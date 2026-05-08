## Виявлені проблеми з англійським перекладом

### 1. `src/pages/About.tsx` — критично
`historyParagraphsEN` містить лише 1 абзац, тоді як українська версія має 13. EN-користувачі бачать майже порожній блок «History».
**Виправлення:** перекласти всі 13 абзаців історії підрозділу.

### 2. `src/components/ApplicationForm.tsx` — bug для EN
Toast про помилку надсилання захардкоджений українською: `toast.error('Помилка відправлення')`. EN-користувач отримає кириличне повідомлення.
**Виправлення:** додати `application.errorSubmit` в `i18n.ts` (UA: «Помилка відправлення», EN: «Failed to send application»), використати `tr.errorSubmit`.

### 3. `src/lib/i18n.ts` — категорія Logistics
EN має `vacancies.categories.supply: 'Logistics'`, але насправді UA «Забезпечення» = ширше «Support / Logistics». У `Vacancies.tsx` категорія `'Logistics'` ще й містить позиції `Logistics Specialist` + `Supply Specialist` — тавтологія.
**Виправлення:**
- `categories.supply`: `'Support'`
- `vacancyDataEN[4].category`: `'Support'`
- залишити позиції `Logistics Specialist`, `Supply Specialist` — стане логічно

### 4. `src/lib/i18n.ts` — branches
- `dpsu: 'SBGS'` → `'Border Guard'` (зрозуміліше для не-військових)
- `mp: 'Marines'` ✓
- `dshv: 'Air Assault'` ✓
- решта ОК

### 5. `src/lib/i18n.ts` — повідомлення про помилку телефону
EN: `'Enter a valid Ukrainian number: 0XX XXX XX XX'` — формат показує пробіли, але регекс їх не приймає.
**Виправлення:** EN → `'Enter a valid Ukrainian mobile number (10 digits, e.g. 0501234567)'`. Аналогічно адаптувати UA-повідомлення.

### 6. `src/lib/i18n.ts` — application.success
Поточний EN: «Thank you! Your application has been received. We will contact you shortly.» — ОК, без змін.

### 7. `src/lib/i18n.ts` — інше дрібне
- `recruit.btn`: `'View Vacancies'` ✓
- `support.btn`: `'Support the Fund'` ✓
- `hero.subtitle`: `'AIRSPACE COVER DETACHMENT'` ✓
- `about.facts[2].label`: `'Combat Readiness'` — точніше було б `'Combat Duty'` (бойове чергування ≠ готовність). **Виправити на `'Combat Duty'`.**
- `vacancies.categories.tech`: `'Technical Specialists'` ✓
- `application.fields.consent`: «I consent to the processing of my personal data» ✓

### 8. `src/components/ApplicationForm.tsx` — placeholder телефону
Зараз `placeholder="0XXXXXXXXX"`. Залишається для обох мов — ОК, не локалізується.

### Файли, які зміняться
- `src/lib/i18n.ts` — нові/виправлені рядки (errorSubmit, errors.phone, branches.dpsu, vacancies.categories.supply, about.facts[2].label)
- `src/components/ApplicationForm.tsx` — використати `tr.errorSubmit` замість хардкоду
- `src/pages/Vacancies.tsx` — `vacancyDataEN[4].category` → `'Support'`
- `src/pages/About.tsx` — повний переклад 12 додаткових абзаців історії

### Поза скоупом
Контент новин/блогу (descUA/descEN) — заголовки вже замінені на placeholder, описи коротко перекладені, лишаємо як є.