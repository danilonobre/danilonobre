<!-- mentor:file
The icon inventory. Documents both inline SVG icons and the Phosphor library usage.
priority: low
-->

# Icon Map

**Library (posts):** `@phosphor-icons/react` — used in MDX components (Highlight, ResearchBlock)
**Layout icons:** SVG inline, copied from design system — never replace with libraries

## Inline SVG Icons

| Icon name | Usage | Custom? |
|-----------|-------|---------|
| Company (house) | WorkCard, WorkTemplate header | Yes — inline SVG |
| Timeline (calendar) | WorkCard, WorkTemplate header | Yes — inline SVG |
| Lock (padlock) | WorkCard (private), DevModeToggle | Yes — inline SVG |
| Draft (pencil) | WorkCard (draft indicator) | Yes — inline SVG |
| Grip (drag dots) | WorkCard drag handle (dev mode) | Yes — inline SVG |
| Email | Contacts component (footer) | Yes — inline SVG |
| LinkedIn | Contacts component (footer) | Yes — inline SVG |
| Slideshow prev (arrow left) | Slideshow navigation | Yes — inline SVG |
| Slideshow next (arrow right) | Slideshow navigation | Yes — inline SVG |
| Submit (arrow right) | Password page submit button | Yes — inline SVG |
| Lock closed | DevModeToggle inactive state | Yes — inline SVG |
| Lock open | DevModeToggle active state | Yes — inline SVG |

All inline SVGs are defined in `specs/_legacy/design-system.md` (SVG Icons section) with exact markup to copy.

## Phosphor Icons (MDX components)

Used dynamically by name string in:
- `Highlight` — any Phosphor icon via `icon` prop (e.g. "Lightbulb", "Target")
- `ResearchBlock` — ChatText, ClipboardText, Star, StarHalf
