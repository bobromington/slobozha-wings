## Що робимо

Після успішного submit анкети на `/vacancies#application-form`:
- Лист рекрутеру на **slobodangu@gmail.com** з усіма даними анкети.
- Підтвердження кандидату НЕ надсилаємо (за рішенням користувача).

## Передумови (інфраструктура)

1. Lovable Cloud — увімкнено.
2. Налаштувати email-домен Lovable Emails (діалог setup).
3. `setup_email_infra` + `scaffold_transactional_email`.

## Файли

- `supabase/functions/send-application/index.ts` — приймає payload, валідує Zod, викликає `send-transactional-email` з шаблоном `application-internal` → `slobodangu@gmail.com`.
- `supabase/functions/_shared/transactional-email-templates/application-internal.tsx` + реєстрація в `registry.ts`.
- `src/components/ApplicationForm.tsx` — `onSubmit` викликає `supabase.functions.invoke('send-application', ...)`, loading-стан, toast success/error.
- `src/lib/i18n.ts` — `errors.sendFailed`.

## Безпека
- Серверна валідація Zod, idempotency key `application-${uuid}`.

## Що НЕ робимо
- Не зберігаємо в БД.
- Не надсилаємо лист-підтвердження кандидату.
