## Замена фонового видео в секции «Вакансії»

### Что меняем

- `public/video/vacancies-bg.mp4` ← новый файл `REDBACK_VAC_HD-2.mp4`
- `public/video/vacancies-bg.webm` ← пересобрать из нового источника
- `public/video/vacancies-bg-poster.webp` ← новый кадр в максимальном качестве

Код в `src/pages/Vacancies.tsx` не трогаем — пути остаются прежними.

### Параметры конвертации (максимальное качество)

```bash
# H.264 mp4 — визуально без потерь, без аудио, faststart
ffmpeg -y -i REDBACK_VAC_HD-2.mp4 -an \
  -c:v libx264 -preset slow -crf 17 \
  -pix_fmt yuv420p -movflags +faststart \
  public/video/vacancies-bg.mp4

# VP9 webm — высокое качество для Chrome/Firefox
ffmpeg -y -i REDBACK_VAC_HD-2.mp4 -an \
  -c:v libvpx-vp9 -crf 28 -b:v 0 \
  -row-mt 1 -tile-columns 2 -pix_fmt yuv420p \
  public/video/vacancies-bg.webm

# Постер — максимальное качество WebP, кадр на 1.0s
ffmpeg -y -ss 1.0 -i REDBACK_VAC_HD-2.mp4 -frames:v 1 \
  -c:v libwebp -quality 100 -compression_level 6 -m 6 \
  public/video/vacancies-bg-poster.webp
```

CRF понижен с 20→17 (mp4) и 31→28 (webm), постер q=100 — заметно выше прежнего, ценой большего веса.
