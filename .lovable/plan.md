## Цель

Ускорить появление фоновых видео на Главной, /about и /vacancies без заметной потери качества: перекодировать MOV → MP4 (H.264 + faststart) и WebM (VP9), сгенерировать постер первого кадра и обновить теги `<video>` для корректного preload + плавной подмены постера.

## Текущее состояние

- `public/video/hero-bg.mov` — 19 МБ (используется в `Index.tsx`)
- `public/video/vacancies-bg.mov` — 21 МБ (`Vacancies.tsx`)
- `public/video/about-bg.mov` — 7.7 МБ, есть `about-bg.mp4` 5.9 МБ (`About.tsx`)
- Все три рендерятся через `<motion.video autoPlay muted loop playsInline src="...mov">` без `poster`, без `preload`, без альтернативных кодеков. `.mov` (ProRes/HEVC из Apple) грузится целиком до начала проигрывания.

## Что сделаю

### 1. Перекодирование (через ffmpeg в /dev-server)

Для каждого из трёх исходников (`hero-bg`, `vacancies-bg`, `about-bg`) создам:

- **MP4 (H.264)** — `-c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -an` — универсальный, faststart двигает moov atom в начало → видео начинает играть до полной загрузки. Без аудиодорожки (фон всё равно muted).
- **WebM (VP9)** — `-c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -an` — лучше сжатие в Chrome/Firefox при том же визуальном качестве.
- **Постер WebP** — первый кадр: `ffmpeg -i src -frames:v 1 -q:v 75 poster.webp` (~30–80 КБ).

Ожидаемый итоговый размер: ~2–4 МБ MP4 и ~1.5–3 МБ WebM на ролик (×5–8 меньше исходного MOV) при визуально неотличимом качестве для затемнённого фона.

Файлы лягут в `public/video/`:
```
hero-bg.mp4 / hero-bg.webm / hero-bg-poster.webp
vacancies-bg.mp4 / vacancies-bg.webm / vacancies-bg-poster.webp
about-bg.mp4 / about-bg.webm / about-bg-poster.webp
```

Старые `.mov` оставлю в репозитории на случай повторного перекодирования (если хочешь — удалю, скажи).

### 2. Обновить теги `<video>` в трёх страницах

В `Index.tsx`, `Vacancies.tsx`, `About.tsx` заменю одиночный `src` на:

```tsx
<motion.video
  autoPlay muted loop playsInline
  preload="auto"
  poster="/video/hero-bg-poster.webp"
  className="fixed inset-0 w-full h-[140%] object-cover z-0 will-change-transform scale-110"
  style={{ y: bgY, top: '-20%' }}
>
  <source src="/video/hero-bg.webm" type="video/webm" />
  <source src="/video/hero-bg.mp4" type="video/mp4" />
</motion.video>
```

- `poster` — мгновенно показывается, пока грузится видео (воспринимаемая скорость → почти ноль).
- `preload="auto"` — браузер начинает буферизацию сразу.
- WebM первым в списке — Chrome/Firefox возьмут его, Safari пропустит и возьмёт MP4.

### 3. Preload-хинт для главного фона (опционально, но полезно)

В `index.html` добавлю:
```html
<link rel="preload" as="video" href="/video/hero-bg.mp4" type="video/mp4" />
```
только для hero-bg (он на главной — критичен для LCP). Для /about и /vacancies preload-хинт не нужен — браузер начнёт грузить сам при переходе.

## Что НЕ меняю

- Параллакс, размеры, затемняющий оверлей `bg-black/60..70` — без изменений.
- Логику `useParallaxY` и motion-обёртки.
- Старые `.mov` (оставляю как мастер-исходники).

## Технические детали кодирования

CRF подобран под фон с тёмным оверлеем — артефакты сжатия не видны:
- H.264 CRF 23 = «визуально lossless» для контента под затемнением
- VP9 CRF 32 ≈ эквивалент H.264 CRF 23 по качеству, но меньше по размеру

Если после перекодирования какой-то ролик окажется визуально хуже — пересниму с CRF 20 (H.264) / 28 (VP9).
