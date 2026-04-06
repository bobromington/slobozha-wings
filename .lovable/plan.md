

## Video Background for Entire Homepage

**Goal:** Make the hero video a fixed background visible behind all sections while scrolling.

### Approach

Move the `<video>` element out of the Hero section and make it a **fixed full-screen background** behind the entire page. All sections will need semi-transparent or adjusted backgrounds so the video shows through.

### Changes (single file: `src/pages/Index.tsx`)

1. **Move video to page root level** — Place it as the first child of the outer `<div>`, with `fixed inset-0 z-0` positioning so it stays behind everything during scroll.

2. **Add a persistent dark overlay** on top of the video (also fixed) for readability.

3. **Make all sections semi-transparent** — Replace opaque `bg-background` and `bg-secondary` classes with `bg-background/80` or `bg-black/60` (with backdrop-blur if needed) so the video is visible through them.

4. **Hero section** — Remove the video and overlay from inside it (they're now global). Keep the hero content as-is.

5. **Image-based sections** (Key Directions, Recruiting, Support) — These already have their own background images, so they can stay opaque or keep a slight transparency — the video won't need to show through drone photos.

6. **About, Commander, News sections** — Use semi-transparent backgrounds (e.g. `bg-background/85 backdrop-blur-sm`) so video subtly shows through.

### Result
- Video plays behind the entire page in a fixed position
- Sections with background images remain unchanged
- Text sections get semi-transparent backgrounds revealing the video underneath
- Smooth parallax-like feel while scrolling

