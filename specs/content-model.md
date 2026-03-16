# content-model.md

## Estrutura de pastas

```
/content/
├── home-content.json       # Conteúdo dinâmico do hero da home
├── works-order.json        # Ordem dos works na home (array de pathSlug)
└── works/
    └── [slug]/
        ├── index.mdx       # conteúdo + frontmatter
        ├── og-image.png    # 500x500px, Open Graph
        └── *.png / *.jpg   # imagens do post, referenciadas no MDX
```

---

## Home content (`content/home-content.json`)

Conteúdo do hero da home, editável via dev mode.

```json
{
  "name": "Danilo Nobre",
  "description": "a product designer focused on bringing results from user-centered experiences.",
  "role": "Lead Product Designer",
  "company": "OutSystems",
  "companyUrl": "https://outsystems.com"
}
```

| Campo | Tipo | Uso |
|---|---|---|
| `name` | string | Nome exibido no h1 |
| `description` | string | Frase após o nome no h1 |
| `role` | string | Cargo atual exibido no p |
| `company` | string | Nome da empresa exibido como link |
| `companyUrl` | string | URL da empresa |

Lido por `lib/home-content.ts` com fallback para valores default se o arquivo não existir.

---

## Work frontmatter

```yaml
title: string        # obrigatório — título do work
slug: string         # obrigatório — único, define a URL (/slug)
published: boolean   # obrigatório — false oculta da home e bloqueia a rota (visível apenas em dev)
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

**Regra:** se `published: false`, o work só aparece em development. Em produção, retorna 404.

---

## Ordenação dos works na home

A ordem é controlada pelo arquivo `/content/works-order.json` — um array de `pathSlug` strings. A posição no array define a posição na home.

```json
[
  "designing-the-system-first-and-my-meal-planning-app",
  "designing-scalable-system-app-settings",
  "push-notification-composer",
  "camera-capabilities-outsystems-mobile-apps"
]
```

- Works ausentes do arquivo aparecem no final da lista.
- Se o arquivo não existir, os works são exibidos sem ordenação específica (fallback).
- Em dev mode, a reordenação é feita via drag-and-drop e salva com `POST /api/admin/reorder`.
- Posts novos criados via `/new` são inseridos no **início** do array (aparecem primeiro na home).

---

## Criação de works via API

Em dev mode, works podem ser criados ou editados via `POST /api/admin/create-work`. A API:

1. Recebe campos do frontmatter + `body` (MDX raw) + `overwrite` (boolean).
2. Cria `content/works/[slug]/index.mdx` com frontmatter YAML + body.
3. Adiciona slug ao início de `works-order.json` (se ainda não existir).
4. Com `overwrite: true`, sobrescreve arquivo existente (usado para edição).
5. Nada é escrito no disco até o save explícito (o formulário em `/new` mantém tudo em memória até o user clicar save).

---

## Resolução de assets

Imagens nos MDX usam caminhos relativos (`./image.png`). A resolução acontece em dois níveis:

1. **`getMDXComponents(pathSlug)`** em `mdx-components.tsx` — converte `./image.png` para `/works-asset/{pathSlug}/image.png`
2. **`app/works-asset/[...path]/route.ts`** — serve o arquivo de `content/works/{slug}/image.png`

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

### `<Cover>`
Imagem de capa isolada, `max-width: 1280px`, centralizada. `basePath` é injetado automaticamente pelo `getMDXComponents`.

```mdx
<Cover src="delivery-truck.jpg" alt="Capa" />
```

### `<WorkVideo>`
Embed de vídeo (iframe ou `<video>`).

```mdx
<WorkVideo src="https://youtube.com/embed/..." />
```

### `<Highlight>`
Bloco de destaque com ícone Phosphor e conteúdo livre.

```mdx
<Highlight icon="Lightbulb" title="Key insight">
  Texto do destaque.
</Highlight>
```

### `<HypothesisStatement>`
Declaração de hipótese estruturada com trechos coloridos (roxo/azul/verde).

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

### `<ResearchBlock>`
Bloco de pesquisa: citação de entrevista ou escala de usabilidade.

```mdx
<ResearchBlock variant="quote" question="How do you manage notifications?">
  "I usually just ignore them because there are too many."
</ResearchBlock>

<ResearchBlock variant="rating" question="Ease of use" rating={5.8} maxRating={7} />
```

### `<ResearchResults>` / `<ResearchResult>`
Barras de resultado percentual.

```mdx
<ResearchResults>
  <ResearchResult percentage="85" text="Found the feature useful" />
  <ResearchResult percentage="72" text="Would use it daily" />
</ResearchResults>
```

### `<FigmaEmbed>`
Renderizado automaticamente quando `figma` está no frontmatter. Não é usado diretamente no body do MDX.

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
published: true
project: Nome da Empresa
timeline: '2023'
cover: "cover.png"
intro: "Texto de introdução do work."
---

## Seção principal

Texto explicativo em markdown.

<Gallery>
  ![Imagem 1](imagem1.png)
  ![Imagem 2](imagem2.png)
</Gallery>

<Highlight icon="Target" title="Goal">
  Objetivo principal do projeto.
</Highlight>

<HypothesisStatement
  action="..."
  alignment="..."
  value="..."
  outcome="..."
  impact="..."
  success="..."
/>
```

---

## Post com Figma (body vazio)

```mdx
---
title: Nome do Work
slug: "nome-do-work"
published: true
project: Nome da Empresa
timeline: '2023'
figma: "https://www.figma.com/proto/..."
figmaMobile: "https://www.figma.com/proto/..."
---
```

Body vazio — o template detecta `figma` no frontmatter e renderiza `FigmaEmbed` automaticamente.
