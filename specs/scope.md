<!-- mentor:file
Defines the boundary of the current phase.
priority: high
-->

# Scope

## Included in this phase

- Portfolio home page with hero section (dynamic content from JSON) and works listing
- Work detail pages rendered from MDX with rich content components (Gallery, GalleryNarrow, Slideshow, Cover, WorkVideo, Highlight, HypothesisStatement, ResearchBlock, ResearchResult)
- Figma prototype embeds (full-screen) for works with `figma` frontmatter
- Private works with password authentication (single shared password, cookie-based)
- Draft works visible only in development
- Dev mode: drag-and-drop reorder, inline hero editing, post creation, frontmatter editing
- Static site generation with Next.js 14 App Router
- CircularStd custom font (local @font-face)
- SEO: Open Graph per post, GTM, robots noindex for Figma posts

## Not included in this phase

- **Multi-user authentication** — single password model is sufficient for portfolio use
- **CMS or admin panel** — content is managed via dev mode + git
- **Blog/articles** — only case studies (works)
- **Comments or social features** — portfolio is read-only for visitors
- **Search** — small number of works doesn't justify search
- **Dark mode** — not part of the design system
- **i18n** — content is in English only
- **Automated testing** — manual verification via dev mode
- **Database** — filesystem-based content (MDX + JSON)
