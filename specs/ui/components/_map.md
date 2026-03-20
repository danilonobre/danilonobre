<!-- mentor:file
The component inventory. Every reusable UI component in the product.
priority: medium
-->

# Component Map

All UI components in this product.

## Layout

| Component | Description | File | Status |
|-----------|-------------|------|--------|
| Layout | Page wrapper — controls logo size via `isHome`, adds `.page-work` via `pageWork` | `components/layout/Layout.tsx` | Built |
| Header | Logo + nav. Logo 80x80 on work, 160x160 on home | `components/layout/Header.tsx` | Built |
| Footer | Static text ("Get in touch") + Contacts component | `components/layout/Footer.tsx` | Built |
| Contacts | Contact links with inline SVG icons (email, LinkedIn) | `components/layout/Contacts.tsx` | Built |

## Home

| Component | Description | File | Status |
|-----------|-------------|------|--------|
| PageIntro | Home hero — renders HomeContent. In dev mode, delegates to EditableIntro | `components/home/PageIntro.tsx` | Built |
| WorkList | Work list on home. In dev mode, renders WorkListSortable + DevModeSaveBar | `components/works/WorkList.tsx` | Built |
| WorkCard | Clickable work card with context icons (lock, pencil, grip). Uses `forwardRef` for dnd-kit | `components/works/WorkCard.tsx` | Built |
| WorkListSortable | Drag-and-drop work list via `@dnd-kit` (dev mode only) | `components/works/WorkListSortable.tsx` | Built |

## Post

| Component | Description | File | Status |
|-----------|-------------|------|--------|
| WorkTemplate | Complete work post template — handles Figma embed, draft/restricted indicators, cover, intro, body, MoreWorks | `components/post/WorkTemplate.tsx` | Built |
| MoreWorks | "More works" section at the end of each post | `components/post/MoreWorks.tsx` | Built |
| Gallery | Inline image gallery, full width, `display: flex`, `gap: 16px` | `components/post/Gallery.tsx` | Built |
| GalleryNarrow | Gallery wrapper with `narrow={true}`, `max-width: 960px` | `components/post/GalleryNarrow.tsx` | Built |
| GalleryImage | Client component. Individual image wrapper inside Gallery/Slideshow. Calculates `--image-max-width` via `naturalWidth × 0.5`. Uses `.gatsby-image-wrapper` class for legacy CSS compat | `components/post/GalleryImage.tsx` | Built |
| Slideshow | Horizontal carousel with Embla Carousel. Prev/next buttons with disabled state | `components/post/Slideshow.tsx` | Built |
| Cover | Standalone cover image, `max-width: 1280px`, centered | `components/post/Cover.tsx` | Built |
| WorkVideo | Video embed (iframe or `<video>`) | `components/post/WorkVideo.tsx` | Built |
| FigmaEmbed | Full-screen Figma prototype embed. Auto-rendered by WorkTemplate when `frontmatter.figma` is set | `components/post/FigmaEmbed.tsx` | Built |
| Highlight | Client component. Highlight block with dynamic Phosphor icon and free content | `components/post/Highlight.tsx` | Built |
| HypothesisStatement | Structured hypothesis declaration with colored segments (purple/blue/green) | `components/post/HypothesisStatement.tsx` | Built |
| ResearchBlock | Client component. Research block — `quote` (interview citation) or `rating` (usability scale with stars) | `components/post/ResearchBlock.tsx` | Built |
| ResearchResult | Percentage result bar for research data. Container: `ResearchResults` | `components/post/ResearchResult.tsx` | Built |
| PasswordPage | Client component. Password page for private works | `app/[slug]/password/page.tsx` | Built |

## Dev Mode

| Component | Description | File | Status |
|-----------|-------------|------|--------|
| DevModeProvider | Context provider — manages all dev mode state (reorder, home content, mode toggle) | `components/dev/DevModeProvider.tsx` | Built |
| DevToolbar | Fixed wrapper (top-right) grouping dev buttons. Order: "+" first, lock last (D010) | `components/dev/DevToolbar.tsx` | Built |
| DevModeToggle | Lock toggle button. Closed=inactive, Open=active. Accent: `#f5a623` | `components/dev/DevModeToggle.tsx` | Built |
| CreatePostButton | "+" button that navigates to `/new`. Tooltip "Create case" on hover | `components/dev/CreatePostButton.tsx` | Built |
| CreatePostForm | Full form for post creation/editing. Manages edit/preview mode with lock toggle | `components/dev/CreatePostForm.tsx` | Built |
| DevModeSaveBar | Save bar instance for reorder (order state) | `components/dev/DevModeSaveBar.tsx` | Built |
| DevSaveAction | Generic save button with visual feedback (dirty/saving/saved/error) | `components/dev/DevSaveAction.tsx` | Built |
| EditableIntro | Editable hero via `contentEditable`. Replaces PageIntro when dev mode is active | `components/dev/EditableIntro.tsx` | Built |

## MDX Registration (`mdx-components.tsx`)

Two APIs:

- **`getMDXComponents(pathSlug)`** — used in `app/[slug]/page.tsx`. Resolves relative image paths to `/works-asset/{pathSlug}/`. Registers all MDX components.
- **`useMDXComponents(components)`** — global fallback. Same components without pathSlug resolution.

Registered components: `img` → GalleryImage, `p` → unwrap block elements, Gallery, GalleryNarrow, Slideshow, FigmaEmbed, Cover, WorkVideo, Highlight, ResearchBlock, HypothesisStatement, ResearchResults, ResearchResult.
