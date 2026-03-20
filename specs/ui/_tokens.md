<!-- mentor:file
The design token system. Single source of truth for all visual values. This project uses SCSS variables in legacy files, not CSS custom properties. Tokens are documented here for AI reference.
priority: critical
-->

# Design Tokens

## Colors

This project uses SCSS variables (defined in `styles/_shared.scss` and legacy `styles/styles.scss`), not CSS custom properties. Legacy SCSS is immutable.

```scss
/* Brand */
$primary:    #FFEC00;   /* yellow — sparingly used */
$roxo:       #6D00AB;   /* purple — HypothesisStatement (action, alignment, value) */
$roxazul:    #6F00F8;   /* purple-blue */
$azul:       #326FF9;   /* blue — HypothesisStatement (outcome, impact) */
$amarelo:    #FDC23E;   /* amber */
$verde:      #04D77E;   /* green — HypothesisStatement (success) */
$brand-red:  #D61408;   /* accent red — password, restricted badge, post h2, ResearchBlock icons */

/* Background */
$bg-page:    #FAFAFA;   /* body background */
$bg-warm:    #FBF6F2;   /* warm card bg (ResearchBlock) */

/* Text */
$black:          #0c0c0c;  /* primary text, headings, links */
$text-primary:   #333333;  /* body text in new components */
$text-secondary: #666666;  /* labels, section h6 */
$text-tertiary:  #6E6E6E;  /* muted text */

/* Border */
$border-light: #efefef;    /* decorative grid lines, subtle dividers */

/* Bars */
$bar-bg: #EBEBEB;          /* progress bar track (ResearchResult) */

/* Highlight backgrounds (HypothesisStatement pills) */
/* green:  #D5F0E2 */
/* blue:   #D5E8F0 */
/* purple: #E6E3F0 */

/* Dev mode */
/* #f5a623 — active toggle, focus borders, spinner, tooltip text */
/* #1a1a1a — toggle/tooltip background */
```

## Typography

```scss
/* Font families */
$font-family: 'Circular DN', sans-serif;
/* body fallback: Helvetica, Arial, sans-serif */
/* mono: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace */

/* Base */
$font-size:      16px;
$font-weight:    400;
$line-height:    1.5;
$letter-spacing: -.025em;

/* Loaded weights */
/* 400 (Book)   — CircularStd-Book.woff2 */
/* 500 (Medium) — CircularStd-Medium.woff2 */
/* 700 (Bold)   — CircularStd-Bold.woff2 */
/* 900 (Black)  — CircularStd-Black.woff2 */
```

### Headings
All headings: `letter-spacing: -0.05em`, `line-height: 1.2`, `color: #0c0c0c`

| Tag | Desktop | Mobile | Weight |
|-----|---------|--------|--------|
| h1 | rem(50px) | rem(40px) | 900 |
| h2 | 2.5rem | 36px | 700 |
| h3 | 20px | — | 700 |

### Typography inside posts (`article.work`)

| Element | Size | Line-height | Letter-spacing |
|---------|------|-------------|----------------|
| h2 | 32px | — | -0.05em |
| h2 mobile | 24px | — | — |
| h3 | 20px | — | — |
| p | 18px | 160% | -0.02em |
| .work-intro | 24px | — | — |

### Component-specific typography

| Context | Size | Weight | Other |
|---------|------|--------|-------|
| Highlight title | 14px | 400 | uppercase, letter-spacing 0.04em |
| ResearchBlock label | 12px | 500 | uppercase, letter-spacing 0.08em |
| ResearchBlock quote | 24px (20px phone) | 700 | letter-spacing -0.03em |
| ResearchResult value | 24px | 700 | — |
| Dev form title field | 50px | 700 | letter-spacing -0.05em |
| Dev form body field | 16px | 400 | monospace font |

## Spacing

SCSS variables (from `styles/_shared.scss`):

```scss
$space-xs:  4px;
$space-sm:  8px;
$space-md:  16px;
$space-lg:  24px;
$space-xl:  48px;
$space-2xl: 80px;
```

Layout spacing (from legacy CSS):

| Context | Desktop | Mobile |
|---------|---------|--------|
| Padding lateral geral | 80px | 25px |
| Padding do header | 80px | 25px |
| Padding dos works (post) | 80px lateral | 40px |
| Gap entre works na home | 40px | 20px |
| Gap entre blocos no post | 40px | 40px |
| Padding bottom do footer | 80px | 20px |
| Gallery gap | 16px | 16px |

## Elevation & Radius

```scss
/* Radius scale (from CSS Modules) */
/* 3px  — ResearchResult progress bar */
/* 4px  — HypothesisStatement highlight pills, dev form meta input */
/* 6px  — dev tooltip */
/* 8px  — HypothesisStatement card, dev form sections, MDX placeholders */
/* 12px — Highlight card, ResearchBlock card */
/* 50%  — dev toggle button (circle) */

/* Shadows */
/* The product is intentionally flat — no elevation system */
/* Gallery .has-shadows: box-shadow on .gallery__item (legacy _works.scss) */
/* Draft overlay: boxShadow inset 0 0 0 9999px rgba(255,255,255,0.25) */
/* Embla button: subtle border (legacy _works.scss) */
```

## Z-Index

```scss
/* Minimal layering — no modals, no drawers */
/* 100  — .block-figma (fullscreen Figma embed, legacy _works.scss) */
/* 900  — .devToolbar (fixed top-right, dev mode only) */
/* 901  — .formError (fixed bottom-center error toast, dev mode only) */
```

## Breakpoints (defined in `core/_grid.scss`)

| Name | Range |
|------|-------|
| `phone` | < 600px |
| `tablet` | 600px – 979px |
| `laptop` | 980px – 1199px |
| `desktop` | 1200px – 1419px |
| `huge` | ≥ 1420px |

Usage via mixin:
```scss
@include display(phone) { ... }
@include display(tablet) { ... }
```

## Decorative Grid

`body::before` and `body::after` create decorative lines in `#efefef` at 80px from edges. Visible only on desktop — hidden on mobile via `content: none`.

## CSS Custom Property — `--image-max-width`

Applied via inline `style` on `GalleryImage` and `Slideshow` items. Value calculated as half the original image width (`Math.round(naturalWidth * 0.5)`).

Used by legacy CSS:
```scss
.slideshow__item,
.gallery__item,
.rt-image {
  width: var(--image-max-width);
}
```

## CSS Modules (new components)

Components not from Gatsby use CSS Modules for style isolation:

| File | Component |
|------|-----------|
| `components/post/Highlight.module.scss` | Highlight |
| `components/post/HypothesisStatement.module.scss` | HypothesisStatement |
| `components/post/ResearchBlock.module.scss` | ResearchBlock |
| `components/post/ResearchResult.module.scss` | ResearchResult |
| `components/dev/DevMode.module.scss` | All dev components |

## Legacy CSS Classes

### Inside `.work-body`

| Class / element | Description |
|-----------------|-------------|
| `.work-cover` | Cover image, `max-width: 1280px` |
| `.work-intro` | Intro text block, `max-width: 680px`, `font-size: 24px` |
| `.gallery` | Gallery container, `display: flex`, `gap: 16px` |
| `.gallery.gallery-narrow` | Gallery with `max-width: 960px` |
| `.gallery.has-shadows` | Gallery with box-shadow on items |
| `.gallery.slideshow` | Gallery in carousel mode |
| `.gallery__item` | Gallery item, `width: var(--image-max-width)` |
| `.slideshow__item` | Slideshow item, same logic |
| `.embla` | Embla Carousel container |
| `.embla__container` | Carousel track, `display: flex`, `gap: 16px` |
| `.embla__slide` | Individual slide |
| `.embla__buttons` | Button container, absolutely positioned |
| `.embla__button` | Prev/next button, 80x80px, subtle border |
| `.embla__button.is-disabled` | Disabled state (opacity 0.3 on SVG) |
| `.restricted-indicator` | "Restricted page" badge in work header |
| `.draft-indicator` | "Draft" badge in work header |
| `.work-body h2` | `font-size: 36px`, `color: #D61408` |
| `.work-body h6` | Uppercase section label, `color: #666666`, `font-size: 16px` |
| `.work-video-wrapper` | Video embed container |

### Password gate

| Class | Description |
|-------|-------------|
| `.block-password-gate` | Container, `width: 420px`, centered |
| `.password-gate` | Form |
| `.fields` | Row with input + button, `gap: 8px` |
| `.password-error` | Error message, background `rgba(213,19,7,0.05)` |
