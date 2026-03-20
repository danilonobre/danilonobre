<!-- mentor:file
The non-negotiables. Rules that cannot be violated under any circumstance during development.
priority: critical
-->

# Constitution

## Authority Hierarchy

- Behavioral authority: spec files in this repository.
- Visual authority: `specs/ui/_tokens.md` and Figma (when available).
- On conflict, behavioral specs win.

---

## Non-Negotiables

### CSS Immutability
- All files in `/styles/` are migrated from Gatsby and represent the visual baseline. **Never** modify any existing CSS rules in these files.
- If a task requires new styles, use a CSS Module (`.module.scss`) co-located with the component.
- If a task appears to require changing legacy CSS, stop and report the conflict to the user.

### Dev Mode Isolation
- All dev mode components and APIs must be gated by `NODE_ENV === 'development'`.
- API routes under `/api/admin/` must return 403 in production.
- No dev mode code (editing UI, drag-and-drop, save actions) may be exposed to end users.

### Edge Runtime Compatibility
- The middleware runs in the Edge runtime. `lib/private-slugs.ts` must never use `fs`.
- `PRIVATE_SLUGS` is a static file generated at build time — not computed at runtime.

### Content Isolation
- Images of works stay in `content/works/[slug]/` and are served via the `/works-asset/` route handler.
- Never copy work images to `public/`.
- MDX assets use relative paths resolved by `getMDXComponents(pathSlug)`.

### Security
- `PORTFOLIO_PASSWORD` environment variable is never committed to the repository.
- The password is never exposed in the client bundle.
- Cookie `portfolio_auth` is httpOnly, secure, sameSite strict.

### Icon Separation
- SVG icons for layout (header, footer, cards) are inline and copied from the design system. Never replace with icon libraries.
- `@phosphor-icons/react` is used only in MDX components (Highlight, ResearchBlock).

---

## Definition of Done

A feature is complete only if:
- Behavior matches specs.
- Edge cases are handled as specified.
- No regressions against the non-negotiables above.
- UI uses correct design tokens from `specs/ui/_tokens.md`.
- Legacy CSS in `/styles/` is untouched.
- Dev mode features are properly gated by `NODE_ENV`.
