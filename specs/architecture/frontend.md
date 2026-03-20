<!-- mentor:file
The frontend architecture spec. Defines the technology stack and the rules that govern how the frontend is built.
priority: high
-->

# Frontend Architecture

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Content | MDX via `@next/mdx` + `next-mdx-remote` |
| Styling | SCSS legado (migrado do Gatsby, imutável) + CSS Modules para componentes novos |
| Images | `next/image` + route handler `/works-asset/` para assets dos works |
| Icons (layout) | SVG inline copiados do design system — não substituir por bibliotecas |
| Icons (posts) | `@phosphor-icons/react` (usado em componentes MDX: ResearchBlock, Highlight) |
| Fonts | CircularStd local via `@font-face` |
| Drag & Drop | `@dnd-kit/core` + `@dnd-kit/sortable` (dev mode) |
| Carousel | Embla Carousel (`embla-carousel-react`) |
| Auth | Next.js Middleware nativo |
| Analytics | Google Tag Manager (`GTM-T8C7JHT`) |
| Deploy | Vercel |

## Folder Structure

```
/
├── app/
│   ├── layout.tsx                  # RootLayout — importa styles.scss, GTM
│   ├── page.tsx                    # Home — hero dinâmico + lista de works
│   ├── new/
│   │   └── page.tsx                # Criação de post (dev only, 404 em produção)
│   ├── [slug]/
│   │   ├── page.tsx                # Work template (SSG) + edit mode em dev
│   │   └── password/
│   │       └── page.tsx            # Tela de senha para posts privados
│   ├── works-asset/
│   │   └── [...path]/
│   │       └── route.ts            # GET — serve imagens de content/works/
│   └── api/
│       ├── auth/
│       │   └── route.ts            # POST — valida senha e seta cookie
│       └── admin/
│           ├── reorder/
│           │   └── route.ts        # POST — salva works-order.json (dev only)
│           ├── home-content/
│           │   └── route.ts        # POST — salva home-content.json (dev only)
│           └── create-work/
│               └── route.ts        # POST — cria/sobrescreve MDX (dev only)
├── components/
│   ├── layout/                     # Header, Footer, Contacts, Layout
│   ├── home/                       # PageIntro (hero da home)
│   ├── works/                      # WorkCard, WorkList, WorkListSortable
│   ├── post/                       # WorkTemplate, Gallery, Slideshow, etc.
│   └── dev/                        # DevModeProvider, DevToolbar, CreatePostForm, etc.
├── mdx-components.tsx              # Registro global + getMDXComponents(pathSlug)
├── content/
│   ├── home-content.json           # Conteúdo dinâmico do hero da home
│   ├── works-order.json            # Ordem dos works na home
│   └── works/                      # MDX posts + imagens
├── lib/
│   ├── works.ts                    # Listar e ler works + re-exportar PRIVATE_SLUGS
│   ├── auth.ts                     # Validação de senha
│   ├── config.ts                   # siteConfig com URLs, GTM ID
│   ├── home-content.ts             # Leitura de content/home-content.json
│   └── private-slugs.ts            # PRIVATE_SLUGS — gerado no build, importável no Edge
├── middleware.ts                    # Proteção de rotas privadas
├── public/
│   ├── images/                     # Logo + ícone PWA
│   └── fonts/circular/             # CircularStd woff2 files
└── styles/                         # SCSS legado — IMUTÁVEL
```

## Rules

### CSS
All files in `/styles/` are migrated from Gatsby without modification. No CSS properties can be changed or created in these files. New components (Highlight, ResearchBlock, HypothesisStatement, ResearchResult, DevMode) use CSS Modules (`.module.scss`) to avoid conflicts with legacy SCSS.

### Routing
Works at `/<slug>`. Posts with `private: true` redirect to `/<slug>/password` without a valid cookie. After authentication, redirect back to `/<slug>`.

### Content
Works at `/content/works/[slug]/index.mdx`. Images co-located with the MDX, served by the route handler at `/works-asset/[slug]/[filename]`.

### Asset Serving
Images inside `content/works/[slug]/` are not served statically. The route handler `app/works-asset/[...path]/route.ts` serves these files on demand via `GET /works-asset/slug/image.png`. This enables relative references in MDX (`./image.png`) resolved by `getMDXComponents(pathSlug)` in `mdx-components.tsx`.

### Images
`next/image` for images in `public/`. For work images, `<img>` served via `/works-asset/` with `--image-max-width` calculated via `naturalWidth * 0.5`.

### Fonts
CircularStd via local `@font-face` in `_fonts.scss`. Internal name: `'Circular DN'`. No Google Fonts.

### SEO & Metadata
- Site metadata centralized in `lib/config.ts`
- GTM injected in `app/layout.tsx`
- Open Graph per post: `og-image.png` (500x500px) in the work folder
- Posts with `figma` filled receive `robots: nofollow, noindex`

### Dynamic Home Content
The home hero (name, description, role, company) is read from `content/home-content.json` via `lib/home-content.ts`. In dev mode, the content is editable inline and saved via `POST /api/admin/home-content`.

### Dev Mode (development only)
System active only when `NODE_ENV === 'development'`. See `specs/ux/flows/dev-mode.md` for full documentation.

### PWA / Manifest
```json
{
  "name": "Danilo Nobre",
  "short_name": "Danilo Nobre",
  "start_url": "/",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "display": "standalone",
  "icons": [{ "src": "/images/danilonobre-ui-designer-full.png" }]
}
```

### Site Config (`lib/config.ts`)

```ts
export const siteConfig = {
  title: 'Danilo Nobre - Product Designer',
  siteUrl: 'https://danilonobre.com',
  author: 'Danilo Nobre',
  email: 'mailto:danilonobre@gmail.com',
  linkedin: 'https://www.linkedin.com/in/danilonobre',
  gtmId: 'GTM-T8C7JHT',
}
```

### Commands

```bash
npm run dev       # local development
npm run build     # production build (includes generate-private-slugs)
npm run start     # local production server
```
