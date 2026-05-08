## Goal
On the About page, the commander's photo currently ends much higher than the bio text. Extend the photo downward so its bottom edge aligns roughly with the last line of text ("...пліч-о-пліч із бійцями.").

## Approach
Re-crop `src/assets/samosudov-cropped.png` from the original `src/assets/samosudov.png`:
- Keep the left eye horizontally centered (current center x ≈ 1298).
- Keep the top of the current crop unchanged.
- Extend the bottom down to include more of the torso, producing a portrait (taller) aspect instead of square.
- Target aspect ≈ 3:4 (e.g. 670 × 893) so the rendered image grows in height to better match the text column.

The exact final height may need a small tweak after a visual check — the text column height depends on viewport, so we aim for a natural portrait crop that visually reaches the end of the paragraphs at desktop widths.

## Files to change
- `src/assets/samosudov-cropped.png` — regenerated with taller crop.
- No code changes required in `src/pages/About.tsx` (image already uses `w-full max-w-md`, so a taller source naturally renders taller).

## Verification
Re-view the regenerated image and the live preview to confirm the bottom of the photo lines up with the end of the bio paragraphs at the current desktop viewport.
