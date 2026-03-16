# components.md

Todos os componentes em TypeScript. Props sempre tipadas. Sem `any`.

CSS legado (`/styles/`) é imutável. Componentes novos usam CSS Modules (`.module.scss`).

---

## Layout

### `Layout`
**Arquivo:** `components/layout/Layout.tsx`

Wrapper de todas as páginas. Controla o tamanho do logo via `isHome` e adiciona `.page-work` via `pageWork`.

```tsx
interface LayoutProps {
  children: React.ReactNode
  wrapperClass?: string
  isHome?: boolean    // true = logo 160px, false = logo 80px
  pageWork?: boolean  // true = adiciona .page-work ao wrapper
}
```

HTML:
```html
<div class="page-wrapper [page-work]">
  <div class="container">
    <Header isHome={isHome} />
    <main class={wrapperClass}>{children}</main>
    <Footer />
  </div>
</div>
```

---

### `Header`
**Arquivo:** `components/layout/Header.tsx`

Logo + nav. Logo em `public/images/danilonobre-ui-designer.png`, 80x80 no work, 160x160 na home (controlado por prop `isHome`).

Classes CSS: `.header`, `.header__logo`

---

### `Footer`
**Arquivo:** `components/layout/Footer.tsx`

Texto estático + componente `Contacts`.

Conteúdo:
- Título: `"Get in touch"`
- Subtítulo: `"Want to discuss a project, collaborate or say hello?"`

Classes CSS: `.footer`

---

### `Contacts`
**Arquivo:** `components/layout/Contacts.tsx`

Links de contato com SVG icons inline. Ícones copiados de `design-system.md` — não substituir por bibliotecas.

```tsx
// Sem props — conteúdo estático
```

Links:
- `mailto:danilonobre@gmail.com` → ícone email
- `https://www.linkedin.com/in/danilonobre` → ícone LinkedIn

Classes CSS: `.contacts`, `.contact-link`

---

## Home

### `PageIntro`
**Arquivo:** `components/home/PageIntro.tsx`

Hero da home page. Recebe `HomeContent` e renderiza o título e subtítulo. Em dev mode, delega para `EditableIntro`.

```tsx
interface PageIntroProps {
  content: HomeContent
}
```

HTML (modo normal):
```html
<div class="page-intro">
  <h1>Hi, I'm <span>{name}</span>, {description}</h1>
  <p>Currently <span class="role">{role}</span> at <a class="outsystems" ...>{company}</a>.</p>
</div>
```

Em dev mode: renderiza `EditableIntro` em vez do conteúdo estático.

---

## Works (home)

### `WorkList`
**Arquivo:** `components/works/WorkList.tsx`

Client component. Lista de works na home. Em dev mode, renderiza `WorkListSortable` + `DevModeSaveBar`. Em modo normal, renderiza `WorkCard` para cada work.

```tsx
interface WorkListProps {
  works: WorkItem[]
}
```

Classes CSS: `.block-works`, `.block-works-banner`

---

### `WorkCard`
**Arquivo:** `components/works/WorkCard.tsx`

Card clicável de um work. Usa `forwardRef` para suportar drag-and-drop do `@dnd-kit`. Background color via CSS inline. Exibe ícones contextuais: lock (private), pencil (draft), grip (dev mode drag handle).

```tsx
interface WorkCardProps {
  work: WorkItem
  devMode?: boolean
  dragListeners?: SyntheticListenerMap
  dragHandleClass?: string
  sortableStyle?: CSSProperties
  sortableAttributes?: Record<string, unknown>
}
```

Classes CSS: `.work`, `.work-title`, `.work-info`, `.work-company`, `.work-timeline`, `.work-draft`

SVG icons inline: casa (company), calendário (timeline), cadeado (private), lápis (draft), grip dots (drag handle).

Works não publicados (`published: false`) recebem overlay branco via `boxShadow: 'inset 0 0 0 9999px rgba(255, 255, 255, 0.25)'` e só são visíveis em dev.

---

### `WorkListSortable`
**Arquivo:** `components/works/WorkListSortable.tsx`

Lista de works com drag-and-drop via `@dnd-kit`. Visível apenas em dev mode. Cada work é envolvido por `SortableWorkCard` que usa `useSortable` para tracking de posição.

Dependências: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`

Ao reordenar, atualiza o estado via `DevModeProvider.setItems()` e marca `orderDirty` para habilitar o botão de save.

---

## Post

### `WorkTemplate`
**Arquivo:** `components/post/WorkTemplate.tsx`

Template completo de um work post.

Lógica:
- Se `frontmatter.figma` está preenchido → renderiza `FigmaEmbed` diretamente (sem Layout, sem work-body)
- Se `!published` → exibe `draft-indicator` no header
- Se `frontmatter.private` → exibe `restricted-indicator` com tooltip no header
- Renderiza `work-cover` se `cover` fornecido via props (resolvido com `assetBasePath`)
- Renderiza `work-intro` se `intro` fornecido via props
- Renderiza `work-body` com `children` (conteúdo MDX compilado)
- Renderiza `MoreWorks` no fim

```tsx
interface WorkTemplateProps {
  frontmatter: WorkFrontmatter
  children?: React.ReactNode
  pathSlug: string
  cover?: string
  intro?: string
  assetBasePath?: string  // ex: /works-asset/slug
}
```

Estrutura HTML (render padrão):
```html
<section class="block-works block-works-full">
  <article class="work">
    <header class="work-header">
      <!-- só se !published -->
      <div class="draft-indicator"><svg .../> <span>Draft</span></div>
      <!-- só se private: true -->
      <div class="restricted-indicator">
        <a href="javascript:void(0);" class="indicator">
          <svg .../> <span>Restricted page</span>
        </a>
        <div class="tooltip">...</div>
      </div>
      <h1 class="work-title">{title}</h1>
      <div class="work-info">
        <div class="work-company"><i><svg .../></i><span>{project}</span></div>
        <div class="work-timeline"><i><svg .../></i><span>{timeline}</span></div>
      </div>
    </header>
    <!-- só se cover fornecido -->
    <div class="work-cover"><img src="{assetBasePath}/{cover}" /></div>
    <!-- só se intro fornecido -->
    <div class="work-intro"><p>...</p></div>
    <div class="work-body">{children}</div>
  </article>
</section>
<MoreWorks exclude={pathSlug} />
```

SVG icons: cadeado, casa, calendário, lápis — copiar de `design-system.md`.

---

### `MoreWorks`
**Arquivo:** `components/post/MoreWorks.tsx`

Seção "More works" no fim de cada post. Exibe works relacionados excluindo o atual.

```tsx
interface MoreWorksProps {
  exclude: string  // slug do work atual
}
```

Classes CSS: `.works-related`

---

### `Gallery`
**Arquivo:** `components/post/Gallery.tsx`

Galeria de imagens em linha. Recebe `children` — imagens markdown que são renderizadas como `GalleryImage` via `mdx-components.tsx`.

```tsx
interface GalleryProps {
  children: React.ReactNode
  shadows?: boolean
  narrow?: boolean
  className?: string
}
```

HTML:
```html
<div class="gallery [gallery-narrow] [has-shadows] [className]">
  <!-- cada filho → GalleryImage → figure.gallery__item -->
</div>
```

Classes CSS: `.gallery`, `.gallery-narrow`, `.has-shadows` — em `styles/_works.scss`. Não modificar.

---

### `GalleryNarrow`
**Arquivo:** `components/post/GalleryNarrow.tsx`

Wrapper de `Gallery` com `narrow={true}`. Mesma lógica, `max-width: 960px`.

```tsx
interface GalleryNarrowProps {
  children: React.ReactNode
  shadows?: boolean
  className?: string
}
```

---

### `GalleryImage`
**Arquivo:** `components/post/GalleryImage.tsx`

Client component. Wrapper de imagem individual dentro de Gallery ou Slideshow. Registrado como `img` no `mdx-components.tsx`.

Calcula `--image-max-width` via `onLoad` com `naturalWidth × 0.5` (mesma lógica do `getVisualImageWidth` do Contentful). Aplica classe `.gatsby-image-wrapper` na `<img>` para compatibilidade com o CSS legado.

```tsx
interface GalleryImageProps {
  src: string
  alt?: string
}
```

HTML:
```html
<figure class="gallery__item" style="--image-max-width: Xpx">
  <img class="gatsby-image-wrapper" src="..." alt="..." />
  <figcaption>alt text</figcaption>   <!-- só se alt não for vazio -->
</figure>
```

Classes CSS: `.gallery__item` — em `styles/_works.scss`. Não modificar.

---

### `Slideshow`
**Arquivo:** `components/post/Slideshow.tsx`

Carrossel horizontal com Embla Carousel.

```tsx
interface SlideshowProps {
  children: React.ReactNode
  shadows?: boolean
  className?: string
}
```

HTML:
```html
<div class="gallery slideshow [has-shadows]">
  <div class="embla">
    <div class="embla__container">
      <div class="embla__slide">
        <figure class="slideshow__item" style="--image-max-width: Xpx">
          <img ... />
          <figcaption>alt</figcaption>
        </figure>
      </div>
    </div>
  </div>
  <div class="embla__buttons">
    <button class="embla__button embla__button--prev [is-disabled]">...</button>
    <button class="embla__button embla__button--next [is-disabled]">...</button>
  </div>
</div>
```

Classes CSS: `.gallery.slideshow`, `.embla*`, `.slideshow__item`, `.embla__button`, `.is-disabled` — em `styles/_works.scss`. Não modificar.

---

### `Cover`
**Arquivo:** `components/post/Cover.tsx`

Imagem de capa isolada, `max-width: 1280px`, centralizada. Suporta resolução de caminhos relativos via `basePath`.

```tsx
interface CoverProps {
  src: string
  alt: string
  basePath?: string  // ex: /works-asset/slug
}
```

Usa `next/image` para imagens locais e `<img>` para URLs externas.

Classes CSS: `.work-cover`

---

### `WorkVideo`
**Arquivo:** `components/post/WorkVideo.tsx`

Embed de vídeo (iframe ou `<video>`).

```tsx
interface WorkVideoProps {
  src: string
}
```

Classes CSS: `.work-video-wrapper`

---

### `FigmaEmbed`
**Arquivo:** `components/post/FigmaEmbed.tsx`

Embed de protótipo Figma em tela cheia. Renderizado automaticamente pelo `WorkTemplate` quando `frontmatter.figma` está preenchido.

```tsx
interface FigmaEmbedProps {
  url: string
  urlMobile?: string
}
```

Classes CSS: `.block-figma`, `.block-figma-mobile` — em `styles/_works.scss`. Não modificar.

---

### `Highlight`
**Arquivo:** `components/post/Highlight.tsx`

Client component. Bloco de destaque com ícone Phosphor e conteúdo livre. O ícone é resolvido dinamicamente de `@phosphor-icons/react` pelo nome string.

```tsx
interface HighlightProps {
  icon: string       // nome do ícone Phosphor (ex: "Lightbulb", "Target")
  title?: string
  children: React.ReactNode
}
```

Uso no MDX:
```mdx
<Highlight icon="Lightbulb" title="Key insight">
  Texto do destaque.
</Highlight>
```

Estilos: `Highlight.module.scss`

---

### `HypothesisStatement`
**Arquivo:** `components/post/HypothesisStatement.tsx`

Declaração de hipótese estruturada com trechos coloridos. Segue o template: "We believe that [action] will align with [alignment] by [value]. This solution is expected to [outcome], thereby [impact]. We will know we are successful when [success]."

```tsx
interface HypothesisStatementProps {
  action: string
  alignment: string
  value: string
  outcome: string
  impact: string
  success: string
}
```

Cores dos destaques:
- Roxo: action, alignment, value
- Azul: outcome, impact
- Verde: success

Uso no MDX:
```mdx
<HypothesisStatement
  action="redesigning the settings page"
  alignment="the platform's scalability goals"
  value="providing a modular architecture"
  outcome="reduce configuration time"
  impact="increasing developer satisfaction"
  success="task completion time drops by 30%"
/>
```

Estilos: `HypothesisStatement.module.scss`

---

### `ResearchBlock`
**Arquivo:** `components/post/ResearchBlock.tsx`

Client component. Bloco de pesquisa com dois variantes: `quote` (citação de entrevista) e `rating` (escala de usabilidade com estrelas).

Usa `@phosphor-icons/react` para ícones (ChatText, ClipboardText, Star, StarHalf).

```tsx
interface ResearchBlockProps {
  variant: 'quote' | 'rating'
  label?: string
  question: string
  children?: React.ReactNode   // conteúdo da citação (variant=quote)
  rating?: number | string
  maxRating?: number | string  // default: 7
}
```

Uso no MDX:
```mdx
<ResearchBlock variant="quote" question="How do you manage notifications?">
  "I usually just ignore them because there are too many."
</ResearchBlock>

<ResearchBlock variant="rating" question="Ease of use" rating={5.8} maxRating={7} />
```

Estilos: `ResearchBlock.module.scss`

---

### `ResearchResult` / `ResearchResults`
**Arquivo:** `components/post/ResearchResult.tsx`

Barra de resultado percentual para exibir dados de pesquisa. `ResearchResults` é o container, `ResearchResult` é cada item.

```tsx
// Container
function ResearchResults({ children }: { children: React.ReactNode })

// Item
function ResearchResult({ percentage, text }: { percentage: string; text: string })
```

Uso no MDX:
```mdx
<ResearchResults>
  <ResearchResult percentage="85" text="Found the feature useful" />
  <ResearchResult percentage="72" text="Would use it daily" />
</ResearchResults>
```

Estilos: `ResearchResult.module.scss`

---

### `PasswordPage`
**Arquivo:** `app/[slug]/password/page.tsx`

Client component. Página de senha para works com `private: true`. Chama `POST /api/auth`, seta cookie e redireciona para `/<slug>` no sucesso.

Classes CSS: `.block-password-gate`, `.password-gate`, `.fields`, `.password-error` — em `styles/_password.scss`. Não modificar.

---

## Dev Mode Components

### `DevToolbar`
**Arquivo:** `components/dev/DevToolbar.tsx`

Client component. Wrapper fixo (top-right) que agrupa `CreatePostButton` e `DevModeToggle`. O lock button é sempre o último (D010).

Classe CSS: `.devToolbar` (CSS Module)

---

### `CreatePostButton`
**Arquivo:** `components/dev/CreatePostButton.tsx`

Client component. Botão "+" que navega para `/new`. Usa `useRouter().push('/new')`. Envolvido em `.toggleWrapper` com tooltip "Create case" (branco, on hover, centrada).

Classes CSS: `.toggle`, `.toggleWrapper`, `.tooltipWhite` (CSS Module)

---

### `CreatePostForm`
**Arquivo:** `components/dev/CreatePostForm.tsx`

Client component. Formulário completo para criação e edição de posts. Gerencia edit/preview mode com lock toggle integrado.

```tsx
interface CreatePostFormProps {
  initialData?: Partial<PostData>
  children?: ReactNode
}
```

- Sem `initialData`: modo criação (inicia em edit mode, campos vazios, slug auto-gerado).
- Com `initialData` + `children`: modo edição de post existente (inicia em preview mode com conteúdo server-rendered, slug read-only).
- Preview de posts novos: markdown renderizado + placeholders visuais para componentes MDX.
- Preview de posts existentes: exibe `children` (MDX renderizado server-side).
- Lock toggle: cadeado aberto + tooltip "Save changes" (always visible, centrada) → salva via API → preview. Cadeado fechado + tooltip "Edit" (on hover, right-aligned) → edit.
- State `advancedOpen`: controla a secção colapsável "Advanced settings" (Figma URLs). Auto-expande se `initialData` contém `figma` ou `figmaMobile` preenchidos.

Demais componentes de dev mode documentados em `specs/dev-mode.md`.

---

## `mdx-components.tsx`

Duas APIs:

### `getMDXComponents(pathSlug: string): MDXComponents`
Usada em `app/[slug]/page.tsx`. Resolve caminhos relativos de imagens para `/works-asset/{pathSlug}/`. Registra todos os componentes MDX com resolução de assets.

### `useMDXComponents(components: MDXComponents): MDXComponents`
Fallback global. Mesmos componentes, sem resolução de pathSlug.

Componentes registrados:
- `img` → `GalleryImage` (com resolução de src)
- `GalleryImage` → `GalleryImage` dentro de `.gallery.has-shadows`
- `p` → unwrap de `<p>` quando contém elementos de bloco (evita hydration mismatch)
- `Gallery`, `GalleryNarrow`, `Slideshow`, `FigmaEmbed`
- `Cover` (com `basePath`), `WorkVideo`
- `Highlight`, `ResearchBlock`, `HypothesisStatement`
- `ResearchResults`, `ResearchResult`
