## Що робимо

Додаємо повноцінну анкету в кінець сторінки `/vacancies` (якір `#application-form`, до якого вже веде кнопка ЗАПОВНИТИ АНКЕТУ). Форма повторює структуру з lubart.army: дві вкладки **Цивільний / Військовий**, поля з валідацією, чекбокс згоди, кнопка submit. Стиль — у нашій dark/red військовій темі (не копіюємо колір/шрифт Любарта, а використовуємо наші токени: Oswald headings, red accent `#dc2626`, dark surfaces).

## Структура секції

```text
[ ОБЕРІТЬ ВАШ СТАТУС ]
[ Цивільний  | Військовий ]   ← таби (Tabs з shadcn)

— Civilian tab —
Ім'я *           Прізвище *
Номер телефону * (+38 prefix)
Електронна пошта *
Дата народження * (DD / MM / YYYY — три інпути)
Коментар (textarea)
[x] Згода на обробку персональних даних *
[ Надіслати ]

— Military tab —
Все те ж саме + поле «Рід військ» (Select: ЗСУ / ТрО / НГУ / ДПСУ / МП / ДШВ / ССО / Інше)
```

## Файли

**1. `src/components/ApplicationForm.tsx`** (новий)
- React Hook Form + Zod валідація (бібліотеки вже в проєкті)
- shadcn компоненти: `Tabs`, `Form`, `Input`, `Textarea`, `Select`, `Checkbox`, `Button`
- Дві Zod-схеми: `civilianSchema`, `militarySchema` (military extends civilian + `branch`)
- Валідація: ім'я/прізвище 1-50 символів, телефон рівно 9 цифр (після +38), email, дата народження — валідна дата, вік 18-65
- При submit: поки що `toast` з повідомленням "Дякуємо! Заявка отримана" (без backend — окремим кроком за потреби можна додати Lovable Cloud + edge function для прийому)
- Всі тексти двомовні через `useLanguage()` + `t(lang)`

**2. `src/lib/i18n.ts`**
Додати блок `application` в `ua` та `en`:
```
application: {
  title, subtitle, statusLabel,
  tabs: { civilian, military },
  fields: { firstName, lastName, phone, email, birthDate, branch, comment, consent },
  branches: { zsu, tro, ngu, dpsu, mp, dshv, sso, other, placeholder },
  submit, success, errors: {...}
}
```

**3. `src/pages/Vacancies.tsx`**
Перед `<Footer />` додати:
```tsx
<section id="application-form" className="py-16 md:py-24">
  <div className="container max-w-3xl">
    <ApplicationForm />
  </div>
</section>
```

## Деталі дизайну (наша тема)

- Заголовок секції: `font-heading text-4xl md:text-6xl uppercase` червоним акцентом на «АНКЕТА»
- Картка форми: `bg-card/70 backdrop-blur-md border border-border/50 rounded p-6 md:p-10`
- Таби: активна вкладка з червоною підкресленою рамкою, неактивна — приглушена
- Інпути: вже стилізовані (dark bg, border)
- Кнопка submit: `variant="hero"` (червона), full-width на мобільному

## Що НЕ робимо в цьому кроці

- Не підключаємо реальний backend/email — submit показує toast. Якщо потрібна відправка на email/Telegram/в БД — це окремий етап (Lovable Cloud + edge function).
- Не копіюємо точні шрифти/кольори Любарта — лишаємось у нашій айдентиці.
