<!-- mentor:file
The design token system. This is the single source of truth for all visual values used in the product — colors, typography, spacing, elevation, and z-index. The AI uses this file as the reference when generating CSS and component styles. If a color, size, or shadow appears in the code that isn't defined here, it's a bug. Keep this file in sync with Figma using /tokens-sync.
priority: critical

extensions:
- tokens-sync: Extracts all design tokens from the Figma file and updates this document automatically. Essential if the design is managed in Figma.
-->

# Design Tokens

<!-- mentor
The complete token system for the product. Tokens must be defined as CSS custom properties. Every value must be filled — empty tokens are invisible bugs that the AI will fill with arbitrary values when generating code. If a Figma file exists, use /tokens-sync to populate this file.

quality signals:
- No empty values in any token definition
- Color tokens cover all semantic categories: background, text, border, brand, status
- Typography tokens include font families, sizes, and weights
- Spacing follows a consistent scale (4px base is the standard)
- Elevation tokens include both radius and shadow definitions
- Z-index scale is defined and follows a logical hierarchy
-->

## Colors

```css
/* Background */
--bg-base: ;
--bg-surface: ;
--bg-overlay: ;

/* Text */
--text-primary: ;
--text-secondary: ;
--text-muted: ;

/* Border */
--border-default: ;
--border-muted: ;

/* Brand */
--color-primary: ;
--color-primary-hover: ;

/* Status */
--color-success: ;
--color-warning: ;
--color-error: ;
```

## Typography

```css
--font-sans: ;
--font-mono: ;

--text-xs: ;
--text-sm: ;
--text-base: ;
--text-lg: ;
--text-xl: ;
--text-2xl: ;

--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

## Elevation & Radius

```css
--radius-sm: ;
--radius-md: ;
--radius-lg: ;
--radius-full: ;

--shadow-sm: ;
--shadow-md: ;
--shadow-lg: ;
```

## Z-Index

```css
--z-base: 0;
--z-overlay: 10;
--z-modal: 20;
--z-toast: 30;
--z-tooltip: 40;
```
