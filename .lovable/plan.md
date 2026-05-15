## Plan: Update brigade name in footer

### Goal
Replace the abbreviated brigade name in the site footer with the full official name including Mykhailo Hrushevsky.

### Changes
- **File:** `src/components/Footer.tsx`
- **Ukrainian text:** change `11 Бригада НГУ` → `11 бригада імені Михайла Грушевського Національної гвардії України`
- **English text:** change `11th Brigade NGU` → `11th Brigade named after Mykhailo Hrushevsky of the National Guard of Ukraine`

### Out of scope
- Meta descriptions and hidden headings in `src/pages/Index.tsx` that also contain the abbreviated name are **not** changed unless explicitly requested.
- `src/pages/About.tsx` description is **not** changed unless explicitly requested.

### Technical details
No new dependencies. No database changes. Pure text edit in one React component.