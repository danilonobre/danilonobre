# Dev Mode Flow

## Trigger

`NODE_ENV === 'development'`. No dev mode components or APIs are accessible in production.

## Overview

Local editing system for the portfolio. Allows editing home content (hero and works order), creating new posts, and editing frontmatter of existing posts directly in the browser, saving changes to project files.

## Features

### 1. Work Reorder (drag-and-drop)
With dev mode active, the works list on home becomes a drag-and-drop list. On reorder, the "Save order" button appears. On save, `POST /api/admin/reorder` writes the new order to `content/works-order.json`.

### 2. Inline Hero Editing
With dev mode active, the home hero becomes editable via `contentEditable`. Each field (name, description, role, company) can be edited directly. On change, "Save intro" button appears. On save, `POST /api/admin/home-content` writes to `content/home-content.json`.

### 3. Draft Visibility
Works with `published: false` appear in the list during dev mode, with a visual overlay (semi-transparent white) and "Draft" badge.

### 4. Post Creation
"+" button in home toolbar navigates to `/new`. The page displays a form with all frontmatter fields + body. On save (lock button), `POST /api/admin/create-work` creates the directory and MDX file on disk and adds the slug to the beginning of `content/works-order.json`. Nothing is written to disk until explicit save.

### 5. Existing Post Frontmatter Editing
On post pages (`/[slug]`), the lock button (closed) appears in dev mode. Clicking it enters edit mode with frontmatter fields pre-filled. On save, overwrites the MDX file via API and returns to preview mode with `router.refresh()` to re-render server-side MDX. Slug is read-only for existing posts.

## Architecture

### Context Provider — `DevModeProvider`

Client component wrapping the home page in dev. Manages all dev mode state:

```tsx
interface DevModeContextValue {
  devMode: boolean
  toggleDevMode: () => void
  items: WorkItem[]
  setItems: (items: WorkItem[]) => void
  orderDirty: boolean
  orderStatus: 'idle' | 'saving' | 'saved' | 'error'
  saveOrder: () => Promise<void>
  homeContent: HomeContent
  updateHomeField: (field: keyof HomeContent, value: string) => void
  contentDirty: boolean
  contentStatus: 'idle' | 'saving' | 'saved' | 'error'
  saveContent: () => Promise<void>
}
```

`useDevMode()` returns `null` when outside the provider (production).

### CreatePostForm

Manages edit/preview mode for new and existing posts:

- Without `initialData`: creation mode (`/new`), starts in edit mode, empty fields.
- With `initialData`: edit mode (`/[slug]`), starts in preview mode, pre-filled fields, slug read-only.
- `children`: server-rendered content (MDX) displayed in preview for existing posts.

Form fields split into two groups:
- **Primary (always visible):** title, slug, published, project, timeline, private, intro, cover, body
- **Advanced (collapsible section):** figma, figmaMobile — hidden by default, revealed via "Advanced settings" button. Auto-expands if `initialData` contains filled values (D014).

## API Routes (dev only)

### `POST /api/admin/reorder`
Receives `{ slugs: string[] }`, writes to `content/works-order.json`. Returns 403 if not development.

### `POST /api/admin/home-content`
Receives HomeContent fields, writes to `content/home-content.json`. Sanitizes inputs. Returns 403 if not development.

### `POST /api/admin/create-work`
Receives frontmatter fields + `body` + `overwrite`. Creates/overwrites MDX file. Returns 403 if production, 400 if invalid fields, 409 if slug exists without `overwrite`.

Slug validation: only `[a-z0-9]` and hyphens.

## Page Flows

### Home (`app/page.tsx`)
```
Production:
  → <Layout> + <PageIntro> + <WorkList> (static)

Development:
  → <DevModeProvider> + <Layout> + <PageIntro> + <WorkList> + <DevToolbar>
    → DevToolbar: CreatePostButton + DevModeToggle
    → PageIntro: devMode OFF → static | devMode ON → EditableIntro
    → WorkList: devMode OFF → WorkCard | devMode ON → WorkListSortable + DevModeSaveBar
```

### Post Page (`app/[slug]/page.tsx`)
```
Production:
  → <Layout> + <WorkTemplate> + <MDXRemote> (static)

Development:
  → <Layout> + <CreatePostForm initialData={...}> + <WorkTemplate> + <MDXRemote>
    → preview → shows children (WorkTemplate + MDX) + lock button (closed)
    → click lock → edit mode (form with pre-filled fields)
    → save → overwrite via API + router.refresh() → back to preview
```

### Create Post Page (`app/new/page.tsx`)
```
Production:
  → notFound()

Development:
  → <Layout> + <CreatePostForm>
    → edit → form with empty fields + lock button (open, "Save changes")
    → save → create MDX via API → preview mode (placeholder for MDX components)
    → click lock → back to edit mode
    → subsequent saves use overwrite: true
```

## Tooltips

| Button | Context | Text | Color | Visibility |
|--------|---------|------|-------|------------|
| "+" (CreatePostButton) | Home | "Create case" | white (#fff) | on hover |
| Lock (DevModeToggle) | Home, OFF | "Edit" | white (#fff) | on hover |
| Lock (DevModeToggle) | Home, ON | "Save changes" | accent (#f5a623) | always visible |
| Lock (CreatePostForm) | Post, preview | "Edit" | white (#fff) | on hover |
| Lock (CreatePostForm) | Post/new, edit | "Save changes" | accent (#f5a623) | always visible |

Positioning:
- Default: centered under button (`left: 50%; transform: translateX(-50%)`)
- `.tooltipEnd`: right-aligned (`right: 0`) for buttons at viewport edge
- `.tooltipVisible`: `opacity: 1 !important` — override for "Save changes"
- Arrow: pseudo-elements `::before`/`::after` forming a triangle with border

## Dev Mode Styles

All styles in `components/dev/DevMode.module.scss` (CSS Module). See `specs/ui/components/_map.md` for the full class list.
