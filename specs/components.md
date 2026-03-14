# components.md

Todos os componentes em TypeScript. Props sempre tipadas. Sem `any`. Ver `.cursor/rules/portfolio.mdc` para regras completas de CSS.

---

## Layout

### `Layout`
**Arquivo:** `components/layout/Layout.tsx`

Wrapper de todas as páginas com conteúdo (não usado em posts Figma). Recebe `wrapperClass` para adicionar classe no `<main>`.

```tsx
interface LayoutProps {
  children: React.ReactNode
  wrapperClass?: string
}
```

HTML: `<div class="container"><Header /><main class={wrapperClass}>{children}</main><Footer /></div>`

---

### `Header`
**Arquivo:** `components/layout/Header.tsx`

Logo + nav. Logo em `public/images/danilonobre-ui-designer.png`, 80x80 no header do work, 160x160 na home.

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

## Works (home)

### `WorkList`
**Arquivo:** `components/works/WorkList.tsx`

Lista de works na home. Recebe array de frontmatters, renderiza `WorkCard` para cada um.

```tsx
interface WorkListProps {
  works: WorkFrontmatter[]
}
```

Classes CSS: `.block-works`, `.block-works-banner`

---

### `WorkCard`
**Arquivo:** `components/works/WorkCard.tsx`

Card clicável de um work. Background color via `style={{ backgroundColor: work.color }}`. Exibe lock icon se `private: true`.

```tsx
interface WorkCardProps {
  work: WorkFrontmatter
}
```

Classes CSS: `.work`, `.work-title`, `.work-info`, `.work-company`, `.work-timeline`

SVG icons inline (de `design-system.md`): casa (company), calendário (timeline), cadeado (private).

---

## Post

### `WorkTemplate`
**Arquivo:** `components/post/WorkTemplate.tsx`

Template completo de um work post. Replica o `WorkContent.jsx` do Gatsby/Contentful, sem dependências dele.

Lógica:
- Se `frontmatter.figma` está preenchido → renderiza `FigmaEmbed` diretamente (sem Layout, sem work-body), igual ao original
- Se `frontmatter.private` → exibe `restricted-indicator` com tooltip no header
- Renderiza `work-cover` se `cover` fornecido via props
- Renderiza `work-intro` se `intro` fornecido via props
- Renderiza `work-body` com `children` (conteúdo MDX compilado)
- Renderiza `MoreWorks` no fim

```tsx
interface WorkTemplateProps {
  frontmatter: WorkFrontmatter
  children: React.ReactNode  // conteúdo MDX compilado
  cover?: string             // caminho da imagem de capa (opcional)
  intro?: string             // texto de intro (opcional)
}
```

Estrutura HTML (render padrão — idêntico ao WorkContent.jsx original):
```html
<section class="block-works block-works-full">
  <article class="work">
    <header class="work-header">

      <!-- só se private: true -->
      <div class="restricted-indicator">
        <a href="javascript:void(0);" class="indicator">
          [svg cadeado] <span>Restricted page</span>
        </a>
        <div class="tooltip">
          This study case aims to design demonstration only and does not intend
          to breach any NDA agreements or disclose sensitive information.
        </div>
      </div>

      <h1>{title}</h1>
      <div class="work-info">
        <!-- só se project -->
        <div class="work-company"><i>[svg casa]</i><span>{project}</span></div>
        <!-- só se timeline -->
        <div class="work-timeline"><i>[svg calendário]</i><span>{timeline}</span></div>
      </div>
    </header>

    <!-- só se cover fornecido -->
    <div class="work-cover"><img ... /></div>

    <!-- só se intro fornecido -->
    <div class="work-intro"><p>...</p></div>

    <div class="work-body">
      {children}
    </div>
  </article>
</section>
<MoreWorks exclude={slug} />
```

SVG icons: cadeado, casa e calendário — copiar de `design-system.md`.

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

Galeria de imagens em linha. Replica o `Gallery.jsx` do Gatsby/Contentful sem dependência dele.

A diferença do original: em vez de receber `media` (array de assets Contentful), recebe `children` — imagens markdown (`![alt](src)`) que são automaticamente renderizadas como `GalleryImage` via `mdx-components.tsx`.

```tsx
interface GalleryProps {
  children: React.ReactNode
  shadows?: boolean    // adiciona has-shadows → box-shadow nos .gatsby-image-wrapper
  narrow?: boolean     // adiciona gallery-narrow
  className?: string   // ex: "gallery--meu-slug" para overrides específicos no CSS
}
```

HTML gerado (idêntico ao original):
```html
<div class="gallery [gallery-narrow] [has-shadows] [className]">
  <!-- cada filho → GalleryImage → figure.gallery__item -->
</div>
```

Uso no MDX:
```mdx
<Gallery>
  ![Descrição](./img1.png)
  ![Descrição](./img2.png)
</Gallery>

<Gallery narrow>
  ![Descrição](./img-mobile.png)
  ![Descrição](./img-desktop.png)
</Gallery>

<Gallery shadows className="gallery--meu-slug">
  ![Descrição](./img.png)
</Gallery>
```

Classes CSS: `.gallery`, `.gallery-narrow`, `.has-shadows` — em `styles/_works.scss`. Não modificar.

---

### `GalleryImage`
**Arquivo:** `components/post/GalleryImage.tsx`

Wrapper de imagem individual dentro de Gallery ou Slideshow. Registrado globalmente como `img` no `mdx-components.tsx`.

Replica exatamente o HTML do `Gallery.jsx` original do Contentful:
- Envolve cada imagem em `figure.gallery__item`
- Calcula `--image-max-width` via `onLoad` com `naturalWidth × 0.5` (mesma lógica do `getVisualImageWidth`)
- Renderiza `figcaption` se `alt` não for vazio

```tsx
interface GalleryImageProps {
  src: string
  alt?: string
}
```

HTML gerado:
```html
<figure class="gallery__item" style="--image-max-width: Xpx">
  <img src="..." alt="..." />
  <figcaption>alt text</figcaption>   <!-- só se alt não for vazio -->
</figure>
```

Classes CSS: `.gallery__item` — em `styles/_works.scss`. Não modificar.

---

### `Slideshow`
**Arquivo:** `components/post/Slideshow.tsx`

Carrossel horizontal com Embla Carousel. Replica o `Slideshow.jsx` do Gatsby/Contentful sem dependência dele.

Em vez de receber `media` (array Contentful), recebe `children` — imagens markdown que são envolvidas em `embla__slide` + `figure.slideshow__item` internamente.

`--image-max-width` calculado via `onLoad` em cada slide, mesma lógica do original.

```tsx
interface SlideshowProps {
  children: React.ReactNode
  shadows?: boolean
  className?: string
}
```

HTML gerado (idêntico ao original):
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

Uso no MDX:
```mdx
<Slideshow>
  ![Descrição](./img1.png)
  ![Descrição](./img2.png)
  ![Descrição](./img3.png)
</Slideshow>
```

Classes CSS: `.gallery.slideshow`, `.embla*`, `.slideshow__item`, `.embla__button`, `.is-disabled` — em `styles/_works.scss`. Não modificar.

SVG dos botões (copiar exatamente):
```svg
<!-- prev -->
<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M18 28.5L7.5 18M7.5 18L18 7.5M7.5 18H28.5" stroke="#0C0C0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<!-- next -->
<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M7.5 18H28.5M28.5 18L18 7.5M28.5 18L18 28.5" stroke="#0C0C0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

---

### `FigmaEmbed`
**Arquivo:** `components/post/FigmaEmbed.tsx`

Embed de protótipo Figma em tela cheia. Replica o `figma.js` do Gatsby/Contentful.

Renderizado automaticamente pelo `WorkTemplate` quando `frontmatter.figma` está preenchido — sem precisar adicionar no MDX. Pode ser usado diretamente no MDX se necessário.

```tsx
interface FigmaEmbedProps {
  url: string
  urlMobile?: string
}
```

HTML gerado (idêntico ao original):
```html
<!-- oculto no mobile/tablet via CSS -->
<div class="block-figma">
  <iframe src="{url}" />
</div>

<!-- oculto no desktop via CSS — só se urlMobile fornecida -->
<div class="block-figma-mobile">
  <iframe src="{urlMobile}" />
</div>
```

Classes CSS: `.block-figma`, `.block-figma-mobile` — em `styles/_works.scss`. Não modificar.

---

### `PasswordPage`
**Arquivo:** `app/[slug]/password/page.tsx`

Página de senha para works com `private: true`. Client Component. Chama `POST /api/auth`, seta cookie e redireciona para `/<slug>` no sucesso.

Classes CSS: `.block-password-gate`, `.password-gate`, `.fields`, `.password-error` — em `styles/_password.scss`. Não modificar.

SVG do botão submit (seta direita):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

---

## `mdx-components.tsx`

Registro global de componentes MDX. O `img` padrão é sobrescrito por `GalleryImage` para que toda imagem dentro de `Gallery` e `Slideshow` gere automaticamente `figure.gallery__item` com `--image-max-width`.

```tsx
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ src, alt }) => <GalleryImage src={src ?? ''} alt={alt} />,
    Gallery,
    Slideshow,
    FigmaEmbed,
    ...components,
  }
}
```
