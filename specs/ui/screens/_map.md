<!-- mentor:file
The screen inventory. Every distinct screen in the product.
priority: medium
-->

# Screen Map

All screens in this product.

| Screen | Description | Route | Auth | Status |
|--------|-------------|-------|------|--------|
| Home | Hero + works list. Dev mode: drag-and-drop reorder, editable hero | `/` | Public | Built |
| Work Detail | Work post template with MDX content. Dev mode: edit frontmatter | `/[slug]` | Public (unless private) |Built |
| Password | Password gate for private works | `/[slug]/password` | Public | Built |
| Create Post | Post creation form (dev only, 404 in production) | `/new` | Dev only | Built |
| Figma Embed | Full-screen Figma prototype (auto-rendered when `figma` frontmatter is set) | `/[slug]` | Public (unless private) | Built |
