# architecture.md

## Stack

- **Framework:** Next.js 14 (App Router)
- **Content:** MDX via `@next/mdx` + `next-mdx-remote`
- **Styling:** SCSS existente migrado do Gatsby — arquivos imutáveis (ver `.cursor/rules/portfolio.mdc`) + CSS Modules para componentes novos
- **Imagens:** `next/image` + route handler `/works-asset/` para assets dos works
- **Fontes:** CircularStd local via `@font-face` (ver `design-system.md`)
- **Autenticação:** Next.js Middleware nativo
- **Drag & Drop:** `@dnd-kit/core` + `@dnd-kit/sortable` (dev mode)
- **Ícones (posts):** `@phosphor-icons/react` (usado em componentes MDX: ResearchBlock, Highlight)
- **Deploy:** Vercel
- **Analytics:** Google Tag Manager (`GTM-T8C7JHT`)

---

## Estrutura de pastas

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
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Contacts.tsx
│   │   └── Layout.tsx
│   ├── home/
│   │   └── PageIntro.tsx           # Hero da home (estático ou editável)
│   ├── works/
│   │   ├── WorkCard.tsx
│   │   ├── WorkList.tsx
│   │   └── WorkListSortable.tsx    # Lista drag-and-drop (dev mode)
│   ├── post/
│   │   ├── WorkTemplate.tsx
│   │   ├── Gallery.tsx
│   │   ├── GalleryNarrow.tsx
│   │   ├── GalleryImage.tsx        # Wrapper de img dentro de Gallery/Slideshow
│   │   ├── Slideshow.tsx
│   │   ├── Cover.tsx
│   │   ├── WorkVideo.tsx
│   │   ├── FigmaEmbed.tsx
│   │   ├── MoreWorks.tsx
│   │   ├── Highlight.tsx           # Bloco de destaque com ícone Phosphor
│   │   ├── HypothesisStatement.tsx # Declaração de hipótese estruturada
│   │   ├── ResearchBlock.tsx       # Bloco de research (quote/rating)
│   │   ├── ResearchResult.tsx      # Barra de resultado percentual
│   │   ├── Highlight.module.scss
│   │   ├── HypothesisStatement.module.scss
│   │   ├── ResearchBlock.module.scss
│   │   └── ResearchResult.module.scss
│   └── dev/
│       ├── DevModeProvider.tsx     # Context provider (dev mode state)
│       ├── DevModeToggle.tsx       # Botão flutuante para toggle dev mode
│       ├── DevToolbar.tsx          # Wrapper fixo que agrupa botões dev
│       ├── CreatePostButton.tsx    # Botão "+" que navega para /new
│       ├── CreatePostForm.tsx      # Formulário de criação/edição de posts
│       ├── DevModeSaveBar.tsx      # Barra de save para reorder
│       ├── DevSaveAction.tsx       # Botão genérico de save com feedback
│       ├── EditableIntro.tsx       # Hero editável via contentEditable
│       └── DevMode.module.scss     # Estilos do dev mode
├── mdx-components.tsx              # Registro global + getMDXComponents(pathSlug)
├── content/
│   ├── home-content.json           # Conteúdo dinâmico do hero da home
│   ├── works-order.json            # Ordem dos works na home
│   └── works/
│       ├── bleez-ecommerce/
│       │   ├── index.mdx
│       │   └── case/
│       └── [outros-slugs]/
│           ├── index.mdx
│           └── *.png
├── lib/
│   ├── works.ts                    # Listar e ler works + re-exportar PRIVATE_SLUGS
│   ├── auth.ts                     # Validação de senha
│   ├── config.ts                   # siteConfig com URLs, GTM ID
│   ├── home-content.ts             # Leitura de content/home-content.json
│   └── private-slugs.ts            # PRIVATE_SLUGS — gerado no build, importável no Edge
├── middleware.ts                   # Proteção de rotas privadas
├── public/
│   ├── images/
│   │   ├── danilonobre-ui-designer.png       # logo 160x160
│   │   └── danilonobre-ui-designer-full.png  # ícone PWA
│   └── fonts/
│       └── circular/
│           ├── CircularStd-Book.woff2
│           ├── CircularStd-Medium.woff2
│           ├── CircularStd-Bold.woff2
│           └── CircularStd-Black.woff2
└── styles/
    ├── styles.scss                 # Entry point — imutável
    ├── _fonts.scss                 # @font-face — imutável
    ├── _general.scss               # imutável
    ├── _layout.scss                # imutável
    ├── _works.scss                 # imutável
    ├── _shots.scss                 # imutável
    ├── _password.scss              # tela de senha — imutável
    ├── core/
    │   ├── _reset.scss             # imutável
    │   ├── _mixins.scss            # imutável
    │   └── _grid.scss              # imutável
    └── vendor/
        └── _slick.scss             # imutável
```

---

## Decisões técnicas

### CSS
Todos os arquivos em `/styles/` são migrados do Gatsby sem modificação. Nenhuma propriedade CSS pode ser alterada ou criada nesses arquivos. Componentes novos (Highlight, ResearchBlock, HypothesisStatement, ResearchResult, DevMode) usam **CSS Modules** (`.module.scss`) para não conflitar com o SCSS legado.

### Roteamento
Works em `/<slug>`. Posts com `private: true` redirecionam para `/<slug>/password` se sem cookie válido. Após autenticação, retornam para `/<slug>`.

### Conteúdo
Works em `/content/works/[slug]/index.mdx`. Imagens na pasta do próprio work, servidas pelo route handler `/works-asset/[slug]/[filename]`.

### Serving de assets dos works
Imagens dentro de `content/works/[slug]/` não são servidas estaticamente. O route handler `app/works-asset/[...path]/route.ts` serve esses arquivos sob demanda via `GET /works-asset/slug/image.png`. Isso permite referências relativas no MDX (`./image.png`) que são resolvidas por `getMDXComponents(pathSlug)` em `mdx-components.tsx`.

### Imagens
`next/image` para imagens em `public/`. Para imagens dos works, `<img>` servido via `/works-asset/` com `--image-max-width` calculado via `naturalWidth * 0.5`.

### Fontes
CircularStd via `@font-face` local em `_fonts.scss`. Nome interno: `'Circular DN'`. Sem Google Fonts.

### Metadados e SEO
- Site metadata centralizado em `lib/config.ts`
- GTM injetado no `app/layout.tsx`
- Open Graph por post: `og-image.png` (500x500px) na pasta do work
- Posts com `figma` preenchido recebem `robots: nofollow, noindex`

### Conteúdo dinâmico da home
O hero da home (nome, descrição, role, empresa) é lido de `content/home-content.json` via `lib/home-content.ts`. Em dev mode, o conteúdo é editável inline e salvo via `POST /api/admin/home-content`.

### Dev mode (apenas desenvolvimento)
Sistema ativo apenas quando `NODE_ENV === 'development'`. Permite:
- Reordenar works via drag-and-drop (`@dnd-kit`)
- Editar o conteúdo do hero inline
- Criar novos posts via formulário (`/new`)
- Editar frontmatter de posts existentes via lock toggle
- Salvar alterações que persistem nos arquivos JSON e MDX do projeto

Ver `specs/dev-mode.md` para documentação completa.

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

---

## Migração de assets do Gatsby

Antes de qualquer desenvolvimento, copiar manualmente:

```bash
# Imagens
cp src/images/danilonobre-ui-designer.png       public/images/
cp src/images/danilonobre-ui-designer-full.png  public/images/

# Fontes (apenas woff2)
cp src/fonts/circular/*.woff2  public/fonts/circular/
```

Os arquivos abaixo **já estão incluídos no starter** e não precisam ser copiados manualmente:
- `/styles/` — SCSS completo da branch main
- `/content/works/` — todos os MDX reescritos com componentes React (`Gallery`, `GalleryNarrow`, `Slideshow`) + imagens

---

## Comandos

```bash
npm run dev       # desenvolvimento local
npm run build     # build de produção
npm run start     # servidor local de produção
```
