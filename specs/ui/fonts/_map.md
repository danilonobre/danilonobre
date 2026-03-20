<!-- mentor:file
The font inventory.
priority: low
-->

# Font Map

**Strategy:** Local `@font-face` via `_fonts.scss`. No external font services.

| Font | Role | Source |
|------|------|--------|
| CircularStd | Primary font — all text | `/public/fonts/circular/*.woff2` |

## CircularStd

**CSS name:** `'Circular DN'`
**Fallback:** `Helvetica, Arial, sans-serif`

| Weight | File |
|--------|------|
| 400 (Book) | CircularStd-Book.woff2 |
| 500 (Medium) | CircularStd-Medium.woff2 |
| 700 (Bold) | CircularStd-Bold.woff2 |
| 900 (Black) | CircularStd-Black.woff2 |

Files in `/public/fonts/circular/`, referenced in `_fonts.scss` via the `fontface` mixin.
