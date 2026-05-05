## Що робимо

Після успішного submit анкети на `/vacancies#application-form`:
1. Лист рекрутеру на **slobodangu@gmail.com** з усіма даними анкети.
2. Лист-підтвердження кандидату на вказаний ним email («Дякуємо, заявку отримано»).

## Передумови (інфраструктура)

1. **Увімкнути Lovable Cloud** — потрібен бекенд для edge-функцій і відправки пошти.
2. **Налаштувати email-домен** Lovable Emails (вбудований сервіс, без зовнішніх акаунтів). Користувачу буде показано діалог setup для вибору домену-відправника (напр. `notify.sloboda-drones.lovable.app` або власний домен, якщо буде підключено).
3. Розгорнути інфраструктуру черги (`setup_email_infra`) і шаблони (`scaffold_transactional_email`).

## Файли

**Edge Function `supabase/functions/send-application/index.ts`** (нова) — приймає payload анкети, валідує через Zod, далі робить два виклики `send-transactional-email`:
- темплейт `application-internal` → на `slobodangu@gmail.com`
- темплейт `application-confirmation` → на email кандидата

**Шаблони React Email у `supabase/functions/_shared/transactional-email-templates/`:**
- `application-internal.tsx` — внутрішній лист зі структурованим списком полів (ПІБ, телефон +38…, email, дата народження, статус civilian/military, рід військ, коментар).
- `application-confirmation.tsx` — брендований лист кандидату («Дякуємо! Ми отримали вашу заявку…»), з подякою і контактами загону.
- Обидва зареєструвати у `registry.ts`.

**`src/components/ApplicationForm.tsx`** — у `onSubmit` замість простого `toast.success` викликати `supabase.functions.invoke('send-application', { body: {...} })`. На успіх — `toast.success(tr.success)` + reset; на помилку — `toast.error`. Кнопка submit показує loading-стан.

**`src/lib/i18n.ts`** — додати рядок `errors.sendFailed` («Не вдалося надіслати заявку, спробуйте ще раз / Failed to send»).

## Безпека

- Валідація на сервері через Zod (повторюємо клієнтську схему: ім'я/прізвище 2-50, телефон UA, email, дата 18-65, consent).
- Idempotency key = `application-${uuid}-internal|confirmation`, щоб ретраї не дублювали листи.
- Жодних секретів у фронтенді — все через edge-функцію.

## Що НЕ робимо

- Не зберігаємо заявки в БД (можна додати окремим кроком, якщо потрібно).
- Не використовуємо Resend/сторонні сервіси — лише вбудовані Lovable Emails.
