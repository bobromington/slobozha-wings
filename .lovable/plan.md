## Goal
Trim the bottom of `src/assets/samosudov-cropped.png` so the photo ends at the lower third of the lower camo patch (top two-thirds of that patch remain visible, bottom third and the dark space below are cut off).

## Approach
Re-crop from the original `src/assets/samosudov.png`:
- Horizontal crop unchanged (x: 963 → 1633, width 670, left eye centered).
- Top: y = 0.
- Bottom: y ≈ 1030 (cut just at the lower third of the lower camo patch).

Final size: 670 × 1030.

## Files to change
- `src/assets/samosudov-cropped.png` — regenerated.

No code changes in `src/pages/About.tsx`.

## Verification
View the regenerated image to confirm the photo ends at the lower third of the lower camo patch — the upper 2/3 of the patch remains, and the dark strip below is gone.
