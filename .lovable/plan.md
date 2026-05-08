## Goal

Replace the background videos used on the **About** (`/about`) and **Vacancies** (`/vacancies`) pages with the two uploaded clips:

- `REDBACK_ABOUT.mov` → About page background
- `REDBACK_VAC.mov` → Vacancies page background

## Source files

Both uploads are 4K (3840×2160) HEVC `.mov` with audio:
- `REDBACK_ABOUT.mov` — 15.8s, 6.0 MB
- `REDBACK_VAC.mov` — 13.6s, 4.2 MB

## Steps

1. Re‑encode each clip to web‑optimized backgrounds at **1920×1080**, **no audio**, looping‑friendly:
   - `.webm` (VP9, CRF ~33) — primary, lighter file
   - `.mp4` (H.264 high profile, CRF ~23, `+faststart`) — Safari/iOS fallback
   - `.webp` poster from frame ~0.5s
2. Overwrite the existing files in `public/video/` (paths already wired in code):
   - `about-bg.webm`, `about-bg.mp4`, `about-bg-poster.webp`
   - `vacancies-bg.webm`, `vacancies-bg.mp4`, `vacancies-bg-poster.webp`
3. No code changes needed — `src/pages/About.tsx` and `src/pages/Vacancies.tsx` already reference these exact paths.
4. Verify file sizes are reasonable (target each `.webm` < ~3 MB, `.mp4` < ~5 MB) and that the poster renders correctly.

## Notes

- Keeping the same filenames means cached visitors will get the new video on next load (Vite asset hash doesn't apply to `public/`). If you want forced cache‑busting, say so and I'll add a `?v=2` query param in the `<source>` tags.
- Audio is stripped (these are muted backgrounds anyway).
