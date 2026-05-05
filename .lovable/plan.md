## План: підтримка `prefers-reduced-motion` для паралаксу

### Що зробити

1. **Створити хук `src/hooks/useParallaxY.ts`**
   - Використовує `useReducedMotion()` з framer-motion + `useScroll` + `useTransform`.
   - Якщо користувач увімкнув reduced motion — повертає статичну `'0%'` (фон не рухається).
   - Інакше повертає `MotionValue<string>` з паралакс-зсувом.
   - Сигнатура: `useParallaxY(distance = 1500, offset = '30%')`.

2. **Замінити локальні `useScroll/useTransform` на хук** у:
   - `src/pages/Index.tsx`
   - `src/pages/About.tsx`
   - `src/pages/Vacancies.tsx`
   - `src/pages/Fund.tsx`
   - `src/pages/News.tsx`
   - `src/pages/Blog.tsx`

3. **Додатково: зменшити анімації появи блоків** для reduced-motion
   - В `Index.tsx` варіант `fadeUp` робимо умовним: якщо `useReducedMotion()` — `y:0`, `duration:0`, тобто без зсуву й анімації.

### Технічні деталі
- Файли, що змінюються: `src/hooks/useParallaxY.ts` (новий), 6 сторінок у `src/pages/`.
- `useReducedMotion` повертає `true | null`, тому перевірка через `if (prefersReducedMotion)`.
- `MotionValue` і статична строка обидва приймаються `style={{ y: ... }}` у framer-motion.
