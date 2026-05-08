## Цель
Сделать body-шрифт Rubik визуально тоньше по умолчанию (light, 300).

## Изменения в `src/index.css`

1. Строка 5 — расширить набор весов в Google Fonts импорте, добавив 200:
   ```
   @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@200;300;400;500;600;700&display=swap');
   ```

2. Блок `body` (строки 70–73) — добавить `font-weight: 300;`:
   ```css
   body {
     @apply bg-background text-foreground;
     font-family: var(--font-body);
     font-weight: 300;
   }
   ```

Тонкие 300 станут дефолтом для всего обычного текста. Места, где явно стоят `font-bold`, `font-semibold`, `font-medium` (включая заголовки на Horta), останутся без изменений. Если позже захотим ещё тоньше — переключимся на 200.
