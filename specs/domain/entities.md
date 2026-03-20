<!-- mentor:file
The data model. This project uses the filesystem instead of a database. Entities are defined as frontmatter schemas, JSON files, and TypeScript interfaces.
priority: critical
-->

# Domain Entities

## Entity Map

```
[HomeContent] (1..1)          ← content/home-content.json
[WorkOrder] (1..1)            ← content/works-order.json
[Work] (1..n)                 ← content/works/[slug]/index.mdx
```

No database — all data lives in the filesystem as JSON and MDX files.

---

## Work

A case study or design project in the portfolio. Each work is a directory in `content/works/` with an `index.mdx`.

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Work title |
| `slug` | string | Yes | Unique identifier, defines the URL (`/<slug>`). Validation: `[a-z0-9-]` only |
| `published` | boolean | Yes | `false` hides from home and blocks route (visible only in dev) |
| `project` | string | No | Company/client name |
| `timeline` | string | No | e.g. `'2021 - 2023'` |
| `private` | boolean | No (default: false) | Requires password to access |
| `figma` | string | No | Figma prototype URL (desktop). If set, renders FigmaEmbed instead of MDX body |
| `figmaMobile` | string | No | Figma prototype URL (mobile) |
| `intro` | string | No | Introduction text displayed in post header (`.work-intro`) |
| `cover` | string | No | Cover image filename (in work folder), e.g. `"delivery-truck.jpg"` |

### Business Rules

- If `figma` is set → post renders `FigmaEmbed` instead of MDX body. Body can be empty.
- If `private: true` → middleware blocks route, redirects to `/<slug>/password`.
- If `published: false` → work only appears in development. Returns 404 in production.

### Assets

Images co-located in the work directory (`content/works/[slug]/*.png`), referenced in MDX with relative paths (`./image.png`), resolved by `getMDXComponents(pathSlug)` to `/works-asset/{slug}/image.png`.

Open Graph image: `og-image.png` (500×500px) in the work folder.

---

## HomeContent

Dynamic content for the home page hero. Stored in `content/home-content.json`, editable via dev mode.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Name displayed in h1 |
| `description` | string | Phrase after the name in h1 |
| `role` | string | Current role displayed in p |
| `company` | string | Company name displayed as link |
| `companyUrl` | string | Company URL |

Default values (if JSON file doesn't exist):
```json
{
  "name": "Danilo Nobre",
  "description": "a product designer focused on bringing results from user-centered experiences.",
  "role": "Lead Product Designer",
  "company": "OutSystems",
  "companyUrl": "https://outsystems.com"
}
```

Read by `lib/home-content.ts` with fallback to defaults.

---

## WorkOrder

Controls the display order of works on the home page. Stored in `content/works-order.json` as an array of `pathSlug` strings.

```json
[
  "designing-the-system-first-and-my-meal-planning-app",
  "designing-scalable-system-app-settings",
  "push-notification-composer",
  "camera-capabilities-outsystems-mobile-apps"
]
```

### Rules

- Works absent from the file appear at the end of the list.
- If the file doesn't exist, works are displayed without specific ordering (fallback).
- In dev mode, reordering is done via drag-and-drop and saved with `POST /api/admin/reorder`.
- New posts created via `/new` are inserted at the **beginning** of the array (appear first on home).

---

## Asset Resolution

Images in MDX use relative paths (`./image.png`). Resolution happens at two levels:

1. **`getMDXComponents(pathSlug)`** in `mdx-components.tsx` — converts `./image.png` to `/works-asset/{pathSlug}/image.png`
2. **`app/works-asset/[...path]/route.ts`** — serves the file from `content/works/{slug}/image.png`

---

## Work Creation via API

In dev mode, works can be created or edited via `POST /api/admin/create-work`:

1. Receives frontmatter fields + `body` (MDX raw) + `overwrite` (boolean).
2. Creates `content/works/[slug]/index.mdx` with YAML frontmatter + body.
3. Adds slug to the beginning of `works-order.json` (if not already present).
4. With `overwrite: true`, overwrites existing file (used for editing).
5. Nothing is written to disk until explicit save (the form in `/new` keeps everything in memory until save).

---

## MDX Components Available

All registered in `mdx-components.tsx`. Always use as explicit JSX — never as raw HTML.

**Image convention inside components:** Use markdown syntax `![alt](src.png)` as direct children. Gallery, GalleryNarrow, and Slideshow receive `children` and wrap each `<img>` in a `<figure class="gallery__item">` with `--image-max-width` via CSS custom property calculated from actual file dimensions.

| Component | Purpose | Usage |
|-----------|---------|-------|
| `<Gallery>` | Inline image gallery, full width | `<Gallery>![alt](img.png)</Gallery>` |
| `<GalleryNarrow>` | Narrow gallery, `max-width: 960px` | `<GalleryNarrow>![alt](img.png)</GalleryNarrow>` |
| `<Slideshow>` | Horizontal carousel with Embla | `<Slideshow>![alt](img.png)</Slideshow>` |
| `<Cover>` | Standalone cover image, 1280px | `<Cover src="img.jpg" alt="..." />` |
| `<WorkVideo>` | Video embed | `<WorkVideo src="https://..." />` |
| `<Highlight>` | Highlight block with Phosphor icon | `<Highlight icon="Lightbulb" title="...">text</Highlight>` |
| `<HypothesisStatement>` | Structured hypothesis with colored segments | See props: action, alignment, value, outcome, impact, success |
| `<ResearchBlock>` | Interview quote or usability rating | `variant="quote"` or `variant="rating"` |
| `<ResearchResults>` / `<ResearchResult>` | Percentage result bars | `<ResearchResult percentage="85" text="..." />` |
| `<FigmaEmbed>` | Auto-rendered when `figma` frontmatter is set | Not used directly in MDX body |

### Heading Conventions in MDX

```mdx
## Section name     ← h2, red highlight (#D61408)
### Subsection      ← h3, 24px bold
#### Detail         ← h4, 20px medium
###### Label        ← h6, uppercase, gray, section spacing
```
