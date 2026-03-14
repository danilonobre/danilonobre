# content-model.md

## Estrutura de pastas

```
/content/works/
└── [slug]/
    ├── index.mdx          # conteúdo + frontmatter
    ├── og-image.png       # 500x500px, Open Graph
    └── *.png / *.jpg      # imagens do post, referenciadas no MDX
```

---

## Frontmatter

```yaml
title: string        # obrigatório — título do work
slug: string         # obrigatório — único, define a URL (/slug)
order: number        # obrigatório — ordem na home (menor = primeiro)
published: boolean   # obrigatório — false oculta da home e bloqueia a rota
project: string      # opcional — nome da empresa/cliente
timeline: string     # opcional — ex: '2021 - 2023'
private: boolean     # opcional (default: false) — exige senha para acessar
figma: string        # opcional — URL do protótipo Figma (desktop)
figmaMobile: string  # opcional — URL do protótipo Figma (mobile)
intro: string        # opcional — texto de introdução exibido no header do post (.work-intro)
cover: string        # opcional — nome do arquivo da imagem de capa (na pasta do work), ex: "delivery-truck.jpg"
```

**Regra:** se `figma` estiver preenchido, o post renderiza `FigmaEmbed` em vez do body MDX. O body pode ficar vazio.

**Regra:** se `private: true`, o middleware bloqueia a rota e redireciona para `/<slug>/password`.

---

## Componentes disponíveis no MDX

Todos registrados em `mdx-components.tsx`. Usar sempre como JSX explícito — nunca como HTML raw.

**Convenção de imagens dentro de componentes:** usar sintaxe markdown `![alt](src.png)` como filhos diretos. Os componentes Gallery, GalleryNarrow e Slideshow recebem `children` e envolvem cada `<img>` num `<figure class="gallery__item">` com `--image-max-width` via CSS custom property calculado a partir das dimensões reais do arquivo.

### `<Gallery>`
Galeria em linha, largura total. Imagens lado a lado com `gap: 16px`. No mobile empilha verticalmente.

```mdx
<Gallery>
  ![Descrição](imagem1.png)
  ![Descrição](imagem2.png)
  ![Descrição](imagem3.png)
</Gallery>
```

Suporta prop `shadows` para adicionar box-shadow nos itens:
```mdx
<Gallery shadows>
  ![Descrição](imagem.png)
</Gallery>
```

### `<GalleryNarrow>`
Mesma lógica da Gallery, mas limitada a `max-width: 960px`. Ideal para 2 imagens lado a lado.

```mdx
<GalleryNarrow>
  ![Mobile](mobile.png)
  ![Desktop](desktop.png)
</GalleryNarrow>
```

### `<Slideshow>`
Carrossel horizontal com Embla Carousel. Botões prev/next com estado disabled. Mesmo visual da Gallery mas navegável.

```mdx
<Slideshow>
  ![Slide 1](slide1.png)
  ![Slide 2](slide2.png)
  ![Slide 3](slide3.png)
</Slideshow>
```

Suporta prop `shadows`:
```mdx
<Slideshow shadows>
  ![Slide](slide.png)
</Slideshow>
```

### `<Cover>`
Imagem de capa isolada, `max-width: 1280px`, centralizada. Para imagens de destaque que não pertencem a uma galeria.

```mdx
<Cover src="delivery-truck.jpg" alt="Capa" />
```

**Nota:** imagens com sintaxe markdown `![alt](src.png)` fora de qualquer componente são renderizadas como `<img>` padrão com `max-width: 100%`.

### `<WorkVideo>`
Embed de vídeo (iframe ou `<video>`). Largura de 846px, height de 528px, border-radius de 10px.

```mdx
<WorkVideo src="https://youtube.com/embed/..." />
```

Ou vídeo local:
```mdx
<WorkVideo src="video.mp4" />
```

### `<FigmaEmbed>`
Renderizado automaticamente quando `figma` está no frontmatter. Não é usado diretamente no body do MDX.

Renderiza dois blocos:
- `.block-figma` — desktop, oculto no mobile/tablet
- `.block-figma-mobile` — mobile/tablet, oculto no desktop

---

## Headings no MDX

Usados diretamente como Markdown — não como componente:

```mdx
## Nome da seção     ← h2, destaque vermelho (#D61408)
### Subsection       ← h3, 24px bold
#### Detail          ← h4, 20px medium
###### Label         ← h6, uppercase, cinza, espaçamento de seção
```

---

## Padrão de um post completo (MDX body)

```mdx
---
title: Nome do Work
slug: "nome-do-work"
order: 1
published: true
project: Nome da Empresa
timeline: '2023'
---

Introdução do work (parágrafos em markdown).

<Cover src="cover.png" alt="Cover" />

## Seção principal

Texto explicativo em markdown.

<Gallery>
  ![Imagem 1](imagem1.png)
  ![Imagem 2](imagem2.png)
</Gallery>
```

---

## Post com Figma (body vazio)

```mdx
---
title: Nome do Work
slug: "nome-do-work"
order: 1
published: true
project: Nome da Empresa
timeline: '2023'
figma: "https://www.figma.com/proto/..."
figmaMobile: "https://www.figma.com/proto/..."
---
```

Body vazio — o template detecta `figma` no frontmatter e renderiza `FigmaEmbed` automaticamente.
