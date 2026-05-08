## Оптимизация фоновых видео и постеров

### Текущее состояние

| Файл | Размер | Параметры |
|---|---|---|
| `about-bg.mp4` | 16.5 MB | 1920×1080, 24fps, H.264 ~8 Mbps + аудио 320 kbps |
| `vacancies-bg.mp4` | 14.2 MB | 1920×1080, 24fps, H.264 ~8 Mbps + аудио 320 kbps |
| `about-bg-poster.webp` | 30 KB | низкое качество (q=80, 1 кадр на 0.5s) |
| `vacancies-bg-poster.webp` | 9 KB | низкое качество |

Видео используются как фон (muted, без звука) — аудиодорожка лишняя. Битрейт 8 Mbps избыточен для фонового видео; H.264 на CRF 20 при 1080p даёт визуально идентичное качество в 3–4 раза меньшим весом. Дополнительно WebM/VP9 даст ещё меньший файл для современных браузеров.

### План

1. **Перекодировать видео** (с сохранением 1920×1080 и 24fps, без аудио, `+faststart` для быстрого старта стриминга):
   - `about-bg.mp4` и `vacancies-bg.mp4` → H.264, **CRF 20**, preset `slow`, `-pix_fmt yuv420p`, `-an`, `-movflags +faststart`. Ожидаемый размер: ~3–5 MB каждый.
   - Доп. вариант `about-bg.webm` и `vacancies-bg.webm` → VP9, **CRF 31**, `-b:v 0`, `row-mt 1`, `tile-columns 2`, `-an`. Ожидаемый размер: ~2–3 MB каждый. Браузеры с поддержкой WebM (Chrome/Firefox) загрузят меньший файл, Safari останется на mp4.
2. **Перегенерировать постеры** в высоком качестве:
   - Кадр на ~1.0s, `libwebp -q:v 92 -compression_level 6 -m 6`, без даунскейла (1920×1080). Ожидаемый размер: ~150–250 KB — приемлемо для первого LCP-кадра.
3. **Обновить `<video>`** в `src/pages/About.tsx` и `src/pages/Vacancies.tsx`: вернуть `<source ... .webm>` первым, `<source ... .mp4>` вторым.

### Технические детали ffmpeg

```bash
# H.264 mp4
ffmpeg -y -i IN.mp4 -an -c:v libx264 -preset slow -crf 20 \
  -pix_fmt yuv420p -movflags +faststart OUT.mp4

# VP9 webm (двухпроходное опционально, но CRF режим ок для фона)
ffmpeg -y -i IN.mp4 -an -c:v libvpx-vp9 -crf 31 -b:v 0 \
  -row-mt 1 -tile-columns 2 -pix_fmt yuv420p OUT.webm

# Poster
ffmpeg -y -ss 1.0 -i IN.mp4 -frames:v 1 -c:v libwebp \
  -q:v 92 -compression_level 6 -m 6 OUT.webp
```

### Примечания

- Имена файлов прежние — у вернувшихся посетителей подтянется новая версия при следующей загрузке.
- Если после сравнения качество видео покажется недостаточным, понижаем CRF до 18 (mp4) / 28 (webm) — файлы вырастут на ~30–40%.
