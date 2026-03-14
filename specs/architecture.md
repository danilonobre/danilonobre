# architecture.md

## Stack

- **Framework:** Next.js 14 (App Router)
- **Content:** MDX via `@next/mdx` + `next-mdx-remote`
- **Styling:** SCSS existente migrado do Gatsby — arquivos imutáveis (ver `.cursor/rules/portfolio.mdc`)
- **Imagens:** `next/image`
- **Fontes:** CircularStd local via `@font-face` (ver `design-system.md`)
- **Autenticação:** Next.js Middleware nativo
- **Deploy:** Vercel
- **Analytics:** Google Tag Manager (`GTM-T8C7JHT`)

---

## Estrutura de pastas

```
/
├── app/
│   ├── layout.tsx                  # RootLayout — importa styles.scss, GTM
│   ├── page.tsx                    # Home — lista de works
│   ├── [slug]/
│   │   ├── page.tsx                # Work template
│   │   └── password/
│   │       └── page.tsx            # Tela de senha para posts privados
│   └── api/
│       └── auth/
│           └── route.ts            # POST — valida senha e seta cookie
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Contacts.tsx
│   │   └── Layout.tsx
│   ├── works/
│   │   ├── WorkCard.tsx
│   │   └── WorkList.tsx
│   └── post/
│       ├── WorkTemplate.tsx
│       ├── Gallery.tsx
│       ├── GalleryNarrow.tsx
│       ├── Slideshow.tsx
│       ├── Texts.tsx
│       ├── WorkVideo.tsx
│       └── FigmaEmbed.tsx
├── mdx-components.tsx              # Registro global de componentes MDX
├── content/
│   └── works/
│       ├── bleez-ecommerce/
│       │   ├── index.mdx
│       │   └── case/
│       └── [outros-slugs]/
│           ├── index.mdx
│           └── *.png
├── lib/
│   ├── works.ts                    # Listar e ler works + exportar PRIVATE_SLUGS
│   ├── auth.ts                     # Validação de senha
│   └── config.ts                   # siteConfig com URLs, GTM ID, textos estáticos
├── middleware.ts                   # Proteção de rotas privadas
├── public/
│   ├── images/
│   │   ├── danilonobre-ui-designer.png       # logo 160x160 — copiada do Gatsby
│   │   └── danilonobre-ui-designer-full.png  # ícone PWA — copiado do Gatsby
│   └── fonts/
│       └── circular/
│           ├── CircularStd-Book.woff2
│           ├── CircularStd-Medium.woff2
│           ├── CircularStd-Bold.woff2
│           └── CircularStd-Black.woff2       # copiados do Gatsby
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
Todos os arquivos em `/styles/` são migrados do Gatsby sem modificação. Nenhuma propriedade CSS pode ser alterada ou criada. Ver `.cursor/rules/portfolio.mdc` para o protocolo completo.

### Roteamento
Works em `/<slug>`. Posts com `private: true` redirecionam para `/<slug>/password` se sem cookie válido. Após autenticação, retornam para `/<slug>`.

### Conteúdo
Works em `/content/works/[slug]/index.mdx`. Imagens na pasta do próprio work, referenciadas com caminho relativo.

### Imagens
`next/image` com suporte a imagens locais. Imagens dos works importadas via caminho relativo no MDX.

### Fontes
CircularStd via `@font-face` local em `_fonts.scss`. Nome interno: `'Circular DN'`. Sem Google Fonts.

### Metadados e SEO
- Site metadata centralizado em `lib/config.ts`
- GTM injetado no `app/layout.tsx`
- Open Graph por post: `og-image.png` (500x500px) na pasta do work
- Posts com `figma` preenchido recebem `robots: nofollow, noindex`

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
