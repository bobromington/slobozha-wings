## Цель
Заменить body-шрифт Inter на Rubik по всему сайту.

## Изменения
1. **`src/index.css`** (строка 5): подменить Google Fonts импорт Inter → `Rubik:wght@300;400;500;600;700`.
2. **`src/index.css`** (строка 57): `--font-body: 'Rubik', sans-serif;`
3. **`tailwind.config.ts`** (строка 18): `body: ['Rubik', 'sans-serif']`.

Заголовочный шрифт Horta остаётся без изменений.
