Сбалансировать футер в `src/components/Footer.tsx`:

**1. Сетка футера (строка 23)** — заменить:
```
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```
на:
```
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 lg:[grid-template-columns:1.5fr_1fr_1fr_1fr] items-start">
```

**2. Отступ под лого (строка 25)** — `mb-2` → `mb-4` (выравнивание с заголовками других колонок).

**3. Сетка соцсетей (строка 54)** — заменить:
```
<div className="grid grid-cols-3 gap-2 w-fit">
```
на:
```
<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-fit lg:ml-auto">
```

Итого: лого слева получает больше пространства, соцсети прижимаются к правому краю, на мобилке иконки 2×3, на десктопе 3×2.