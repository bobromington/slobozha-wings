## Цель
Фоны (картинки и видео) должны появляться быстро — сейчас они «тяжёлые» и тормозят первый показ.

## Что не так сейчас
**Видео-фоны (главная боль):**
- `public/video/hero-bg.mov` — **19 MB** (.mov / QuickTime, плохо стримится в браузере)
- `public/video/vacancies-bg.mov` — **21 MB**
- `public/video/about-bg.mov` — **7.4 MB** (но используется .mp4 — 5.7 MB, ок)
- На страницах Index и Vacancies используется именно `.mov` — Safari/Chrome грузят весь файл, без постера, и до его загрузки экран чёрный.

**Картинки-фоны:**
- `bg-fire.png` 872 KB, `bg-fire-new.png` 769 KB, `bg-red*.png` ~650–711 KB, `bg-white*.png` 514–754 KB, `sloboda-pattern.png` 183 KB, `samosudov.png` 1.1 MB.
- Это PNG без сжатия и без WebP-версии. На странице Fund паттерн стоит `background-attachment: fixed` + `cover` — дополнительно дорого на мобильных.
- В `Index.tsx` импортируются сразу 4 фоновых PNG (~2.7 MB), даже если пользователь не доскроллил.

**Также:** нет `poster` у видео, нет `preload="metadata"`, нет `loading="lazy"` / `decoding="async"` у `<img>`, нет `fetchPriority` у логотипа.

## План оптимизации

### 1. Перекодировать видео в web-friendly форматы
Для каждого видео сгенерировать 2 варианта прямо в `public/video/`:
- `*.mp4` (H.264, CRF 28, `-movflags +faststart`, аудио убрать) — основной
- `*.webm` (VP9 или AV1, ещё меньше) — для Chromium/Firefox
- `*-poster.jpg` (первый кадр, ~80–120 KB) — мгновенный показ

Целевой размер: hero/vacancies ~2–4 MB вместо 19–21 MB (≈ 5–10× быстрее).

В JSX:
```tsx
<video autoPlay muted loop playsInline preload="metadata"
       poster="/video/hero-bg-poster.jpg"
       className="fixed inset-0 w-full h-full object-cover z-0">
  <source src="/video/hero-bg.webm" type="video/webm" />
  <source src="/video/hero-bg.mp4"  type="video/mp4" />
</video>
```
Постер показывается мгновенно — фон «появляется сразу», видео догружается фоном.

### 2. Сжать картинки-фоны
Через `sharp` пересохранить все `src/assets/bg-*.png` и `sloboda-pattern.png` в:
- `.webp` (quality 75) — основной
- ширина max 1920 px (для фонов больше не нужно)

Ожидание: 700 KB PNG → ~80–150 KB WebP (5–7× меньше). `samosudov.png` 1.1 MB → ~150 KB.

Использовать через обычный `import` — Vite сам захэширует и положит в bundle.

### 3. Точечные правки в коде
- **`src/pages/Index.tsx`**: заменить `src="/video/hero-bg.mov"` на пару `<source>` + poster + `preload="metadata"`. Перевести импорты `bg-*-new.png` на новые `.webp`.
- **`src/pages/Vacancies.tsx`**: то же для `vacancies-bg.mov`.
- **`src/pages/About.tsx`**: добавить poster + `preload="metadata"`, заменить mp4 на сжатую версию + webm.
- **`src/pages/News.tsx`**: импорты PNG → WebP.
- **`src/pages/Fund.tsx`**: `sloboda-pattern.png` → WebP; на мобильных убрать `background-attachment: fixed` (сильно тормозит iOS) — оставить fixed только для `md:` и выше.
- **`src/components/Header.tsx`**: у `<img src={logo}>` добавить `fetchPriority="high"` `decoding="async"` `width`/`height`.
- Везде у декоративных `<img>` (новости, бг-карточки) добавить `loading="lazy" decoding="async"`.

### 4. Удалить лишние исходники
После пересжатия удалить `.mov`-оригиналы из `public/video/` (оставить только mp4+webm+poster) и неиспользуемые PNG-дубликаты (`bg-*-new.png` vs `bg-*.png` — оставить один комплект). Это уменьшит размер репозитория и деплоя.

## Технические детали (для разработчика)
- ffmpeg команды:
  - `ffmpeg -i hero-bg.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart hero-bg.mp4`
  - `ffmpeg -i hero-bg.mov -an -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 34 -b:v 0 hero-bg.webm`
  - `ffmpeg -i hero-bg.mov -vframes 1 -vf "scale=1920:-2" -q:v 4 hero-bg-poster.jpg`
- Картинки: Node-скрипт на `sharp` (`.webp({ quality: 75 })`, `resize({ width: 1920, withoutEnlargement: true })`).
- QA: после конвертации проверить размеры (`ls -lah`) и открыть превью на /, /vacancies, /about, /fund, /news.

## Ожидаемый эффект
- Первый показ фона: было 5–15 с (на 4G) → станет <1 с (постер мгновенно, видео ~2–3 с).
- Вес страницы Index: ~22 MB → ~3–4 MB.
- LCP/CLS улучшатся, особенно на мобильных.
