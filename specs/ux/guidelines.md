<!-- mentor:file
Interaction patterns and UX rules that apply across the entire product.
priority: high
-->

# UX Guidelines

## Interaction patterns to use

- **Static content by default** — The production site is entirely read-only. No interactive elements beyond navigation and password forms.
- **Dev mode toggle** — Lock button toggles between view and edit modes. Closed = viewing, Open = editing.
- **Inline editing** — Home hero fields use `contentEditable` for direct text editing in dev mode.
- **Drag-and-drop reorder** — Works list uses `@dnd-kit` for visual reorder with grip handles in dev mode.
- **Save-on-demand** — Changes are only persisted when the user explicitly clicks save. No auto-save.
- **Tooltips for admin buttons** — Every dev mode button has a tooltip explaining its action. "Save changes" is always visible; others appear on hover.
- **Figma embed as full page** — Works with Figma URLs render as full-screen iframes, replacing the standard post layout.

## Interaction patterns to avoid

- **Auto-save** — Content is only saved when the user explicitly triggers save. This prevents accidental overwrites.
- **Modal dialogs** — No modals in the product. Edit mode uses inline forms, not overlays.
- **Complex navigation** — No breadcrumbs, no sidebar nav, no tabs. The site has two levels: home → work detail.
- **Client-side routing for content** — Works are server-rendered (SSG). No SPA-style transitions.

## Accessibility

- Keyboard navigation supported for all interactive elements.
- Password form is accessible with proper labels.
- Images have alt text via MDX markdown syntax.
- Carousel (Slideshow) has prev/next buttons with disabled states.

## Responsiveness

**Primary platform:** Desktop (≥ 1200px)
**Minimum supported:** Phone (< 600px)

Breakpoints:
| Name | Range |
|------|-------|
| `phone` | < 600px |
| `tablet` | 600px – 979px |
| `laptop` | 980px – 1199px |
| `desktop` | 1200px – 1419px |
| `huge` | ≥ 1420px |

Key responsive behaviors:
- Gallery images stack vertically on mobile
- Padding reduces from 80px (desktop) to 20px (mobile)
- Hero h1 scales from 50px (desktop) to 34px (mobile)
- Decorative grid lines hidden on mobile
- Slideshow remains horizontal with swipe support
