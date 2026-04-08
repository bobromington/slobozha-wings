

## Plan: Replace Samosud Team image in header

### What
Replace the current `samosud-team-header.png` with the uploaded `SAMOSUD_TEAM_WIDE.png` and make its width match the "СЛОБОДА" logo above it.

### Steps

1. **Copy the uploaded image** to `src/assets/samosud-team-wide.png`

2. **Update `src/components/Header.tsx`**:
   - Change the import from `samosud-team-header.png` to `samosud-team-wide.png`
   - Remove the fixed width classes (`w-20 md:w-24`) from the Samosud Team `<img>`
   - Instead, make both images share the same width by setting the "СЛОБОДА" image with a specific width and making the Samosud Team image match it — e.g., both use `w-full` inside a container with a fixed width, or both use the same explicit width class like `w-28 md:w-36`

### Technical detail
The "СЛОБОДА" image currently uses `h-5 md:h-6 w-auto`, so its rendered width depends on the image aspect ratio. To ensure both match, we'll wrap both in a container with a fixed width and set both images to `w-full h-auto`.

