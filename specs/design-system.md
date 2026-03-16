# design-system.md

## Fonte

**CircularStd** — fonte primária, carregada localmente via `@font-face` em `_fonts.scss`.
Nome interno (usado no CSS): `'Circular DN'`
Fallback: `Helvetica, Arial, sans-serif`

| Peso | Arquivo woff2 |
|---|---|
| 400 (Book) | CircularStd-Book.woff2 |
| 500 (Medium) | CircularStd-Medium.woff2 |
| 700 (Bold) | CircularStd-Bold.woff2 |
| 900 (Black) | CircularStd-Black.woff2 |

Arquivos ficam em `/public/fonts/circular/` e são referenciados no `_fonts.scss` com o mixin `fontface`.

---

## Variáveis SCSS

Definidas em `styles.scss`, disponíveis em todos os arquivos via import:

```scss
$font-family:    'Circular DN', sans-serif;
$font-size:      16px;
$font-weight:    400;
$line-height:    1.5;
$letter-spacing: -.025em;

$primary: #FFEC00;
$roxo:    #6D00AB;
$roxazul: #6F00F8;
$azul:    #326FF9;
$amarelo: #FDC23E;
$verde:   #04D77E;
$black:   #0c0c0c;
```

---

## Breakpoints (definidos em `core/_grid.scss`)

| Nome | Intervalo |
|---|---|
| `phone` | < 600px |
| `tablet` | 600px – 979px |
| `laptop` | 980px – 1199px |
| `desktop` | 1200px – 1419px |
| `huge` | ≥ 1420px |

Uso via mixin:
```scss
@include display(phone) { ... }
@include display(tablet) { ... }
```

---

## Tipografia

### Base
Body: `400 16px / 1.5` `'Circular DN'`, `letter-spacing: -0.025em`, `color: #0c0c0c`

### Headings
Todos com `letter-spacing: -0.05em`, `line-height: 1.2`, `color: #0c0c0c`

| Tag | Desktop | Mobile | Peso |
|---|---|---|---|
| h1 | rem(50px) | rem(34px) | 700 |
| h2 | 3rem | 36px | 700 |
| h3 | 20px | — | 700 |

### Tipografia dentro de posts (`article.work`)

| Elemento | Tamanho | Line-height | Letter-spacing |
|---|---|---|---|
| h2 | 32px | — | -0.05em |
| h2 mobile | 24px | — | — |
| h3 | 20px | — | — |
| p | 18px | 160% | -0.02em |

---

## Espaçamentos de layout

| Contexto | Desktop | Mobile |
|---|---|---|
| Padding lateral geral | 80px | 20px |
| Padding do header | 80px | 20px |
| Padding dos works (post) | 80px lateral | 40px (com padding vertical) |
| Gap entre works na home | 40px | 20px |
| Gap entre blocos no post | 40px | 40px |
| Padding bottom do footer | 80px | 20px |

---

## Grid decorativo

O `body::before` e `body::after` criam linhas decorativas em `#efefef` a 80px das bordas. Visível apenas no desktop — ocultado no mobile via `content: none`.

---

## Conteúdo do hero (home)

O conteúdo do hero é dinâmico, lido de `content/home-content.json`. Ver `content-model.md` para o schema.

Estrutura do HTML:
```tsx
// H1
"Hi, I'm " + <span>{name}</span> + ", " + {description}

// P
"Currently " + <span className="role">{role}</span> + " at " + <a className="outsystems" href={companyUrl}>{company}</a> + "."
```

Valores default (caso o JSON não exista):
```json
{
  "name": "Danilo Nobre",
  "description": "a product designer focused on bringing results from user-centered experiences.",
  "role": "Lead Product Designer",
  "company": "OutSystems",
  "companyUrl": "https://outsystems.com"
}
```

---

## Conteúdo estático — footer

```
Título:    "Get in touch"
Subtítulo: "Want to discuss a project, collaborate or say hello?"
```

Links de contato (componente `Contacts`):

| Label | URL |
|---|---|
| Send me an email | `mailto:danilonobre@gmail.com` |
| Get in touch on Linkedin | `https://www.linkedin.com/in/danilonobre` |

---

## SVG Icons (inline)

Usados nos cards de work, header do post e dev mode. Copiar exatamente — não substituir por bibliotecas de ícones.

**Ícone de company (casa):**
```svg
<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.67885 0.407986C8.40801 0.197338 8.02877 0.197338 7.75794 0.407986L0.539544 6.02229C0.356855 6.16438 0.25 6.38286 0.25 6.61431V15.4368C0.25 16.0611 0.498019 16.6599 0.939496 17.1014C1.38097 17.5429 1.97974 17.7909 2.60409 17.7909L5.8122 17.7909H10.6245L13.8327 17.7909C14.457 17.7909 15.0558 17.5429 15.4973 17.1014C15.9388 16.6599 16.1868 16.0611 16.1868 15.4368V6.61431C16.1868 6.38286 16.0799 6.16438 15.8972 6.02229L8.67885 0.407986ZM11.3745 16.2909H13.8327C14.0592 16.2909 14.2765 16.2009 14.4366 16.0407C14.5968 15.8805 14.6868 15.6633 14.6868 15.4368V6.98112L8.21839 1.95015L1.75 6.98112V15.4368C1.75 15.6633 1.83998 15.8805 2.00016 16.0407C2.16033 16.2009 2.37757 16.2909 2.60409 16.2909H5.0622V9.02044C5.0622 8.60622 5.39798 8.27044 5.8122 8.27044H10.6245C11.0387 8.27044 11.3745 8.60622 11.3745 9.02044V16.2909ZM6.5622 16.2909V9.77044H9.87446V16.2909H6.5622Z" fill="white"/>
</svg>
```

**Ícone de timeline (calendário):**
```svg
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0227 0.818176C13.0227 0.403963 12.6869 0.0681763 12.2727 0.0681763C11.8585 0.0681763 11.5227 0.403963 11.5227 0.818176V1.70454H6.47726V0.818176C6.47726 0.403963 6.14148 0.0681763 5.72726 0.0681763C5.31305 0.0681763 4.97726 0.403963 4.97726 0.818176V1.70454H3.27272C1.95476 1.70454 0.886353 2.77295 0.886353 4.0909V7.36363V15.5454C0.886353 16.8634 1.95476 17.9318 3.27272 17.9318H14.7273C16.0452 17.9318 17.1136 16.8634 17.1136 15.5454V7.36363V4.0909C17.1136 2.77295 16.0452 1.70454 14.7273 1.70454H13.0227V0.818176ZM15.6136 6.61363V4.0909C15.6136 3.60138 15.2168 3.20454 14.7273 3.20454H13.0227V4.0909C13.0227 4.50512 12.6869 4.8409 12.2727 4.8409C11.8585 4.8409 11.5227 4.50512 11.5227 4.0909V3.20454H6.47726V4.0909C6.47726 4.50512 6.14148 4.8409 5.72726 4.8409C5.31305 4.8409 4.97726 4.50512 4.97726 4.0909V3.20454H3.27272C2.78319 3.20454 2.38635 3.60138 2.38635 4.0909V6.61363H15.6136ZM2.38635 8.11363H15.6136V15.5454C15.6136 16.035 15.2168 16.4318 14.7273 16.4318H3.27272C2.78319 16.4318 2.38635 16.035 2.38635 15.5454V8.11363Z" fill="white"/>
</svg>
```

**Ícone de cadeado (private — cards):**
```svg
<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.66667 7.33331V4.66665C4.66667 3.78259 5.01786 2.93474 5.64298 2.30962C6.2681 1.6845 7.11595 1.33331 8 1.33331C8.88406 1.33331 9.7319 1.6845 10.357 2.30962C10.9821 2.93474 11.3333 3.78259 11.3333 4.66665V7.33331M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**Ícone de draft (lápis):**
```svg
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.75 2.25L15.75 5.25M1.5 16.5L2.18 13.44C2.22 13.26 2.31 13.1 2.44 12.97L11.69 3.72C12.08 3.33 12.71 3.33 13.1 3.72L14.28 4.9C14.67 5.29 14.67 5.92 14.28 6.31L5.03 15.56C4.9 15.69 4.74 15.78 4.56 15.82L1.5 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

**Ícone de grip (drag handle — dev mode):**
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="6" cy="3.5" r="1.25" fill="currentColor"/>
  <circle cx="10" cy="3.5" r="1.25" fill="currentColor"/>
  <circle cx="6" cy="8" r="1.25" fill="currentColor"/>
  <circle cx="10" cy="8" r="1.25" fill="currentColor"/>
  <circle cx="6" cy="12.5" r="1.25" fill="currentColor"/>
  <circle cx="10" cy="12.5" r="1.25" fill="currentColor"/>
</svg>
```

**Ícone de email:**
```svg
<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.10666 2.55395C2.27204 2.22692 2.61212 2 3.00009 2H19.0001C19.3881 2 19.7281 2.22692 19.8935 2.55395L11.0001 8.77934L2.10666 2.55395ZM0.000135348 2.98266C-2.68281e-05 2.99253 -4.31758e-05 3.00239 8.58362e-05 3.01225V15C8.58362e-05 16.6523 1.3478 18 3.00009 18H19.0001C20.6524 18 22.0001 16.6523 22.0001 15V3.01236C22.0002 3.00242 22.0002 2.99247 22 2.98251C21.9906 1.33822 20.6465 0 19.0001 0H3.00009C1.35359 0 0.00952624 1.3383 0.000135348 2.98266ZM20.0001 4.92066V15C20.0001 15.5477 19.5478 16 19.0001 16H3.00009C2.45237 16 2.00009 15.5477 2.00009 15V4.92066L10.4266 10.8192C10.7709 11.0603 11.2292 11.0603 11.5735 10.8192L20.0001 4.92066Z" fill="black"/>
</svg>
```

**Ícone de LinkedIn:**
```svg
<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2C3.55228 2 4 2.44772 4 3C4 3.55228 3.55228 4 3 4C2.44772 4 2 3.55228 2 3ZM3 0C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6C4.65685 6 6 4.65685 6 3C6 1.34315 4.65685 0 3 0ZM15 8C13.6739 8 12.4021 8.52678 11.4645 9.46447C10.5268 10.4021 10 11.6739 10 13V19H12V13C12 12.2043 12.3161 11.4413 12.8787 10.8787C13.4413 10.3161 14.2043 10 15 10C15.7957 10 16.5587 10.3161 17.1213 10.8787C17.6839 11.4413 18 12.2043 18 13V19H20V13C20 11.6739 19.4732 10.4021 18.5355 9.46447C17.5979 8.52678 16.3261 8 15 8ZM15 6C13.1435 6 11.363 6.7375 10.0503 8.05025C8.7375 9.36301 8 11.1435 8 13V20C8 20.5523 8.44771 21 9 21H13C13.5523 21 14 20.5523 14 20V13C14 12.7348 14.1054 12.4804 14.2929 12.2929C14.4804 12.1054 14.7348 12 15 12C15.2652 12 15.5196 12.1054 15.7071 12.2929C15.8946 12.4804 16 12.7348 16 13V20C16 20.5523 16.4477 21 17 21H21C21.5523 21 22 20.5523 22 20V13C22 11.1435 21.2625 9.36301 19.9497 8.05025C18.637 6.7375 16.8565 6 15 6ZM0 8C0 7.44772 0.447715 7 1 7H5C5.55228 7 6 7.44772 6 8V20C6 20.5523 5.55228 21 5 21H1C0.447715 21 0 20.5523 0 20V8ZM2 9V19H4V9H2Z" fill="black"/>
</svg>
```

**Ícones do Slideshow (prev/next):**
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

**Ícone do submit (senha — seta direita):**
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

**Ícones do Dev Mode (lock closed/open):**
```svg
<!-- lock closed -->
<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.66667 7.33331V4.66665C4.66667 3.78259 5.01786 2.93474 5.64298 2.30962C6.2681 1.6845 7.11595 1.33331 8 1.33331C8.88406 1.33331 9.7319 1.6845 10.357 2.30962C10.9821 2.93474 11.3333 3.78259 11.3333 4.66665V7.33331M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<!-- lock open -->
<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.3333 4.66665C11.3333 3.78259 10.9821 2.93474 10.357 2.30962C9.7319 1.6845 8.88406 1.33331 8 1.33331C7.11595 1.33331 6.2681 1.6845 5.64298 2.30962C5.01786 2.93474 4.66667 3.78259 4.66667 4.66665M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

---

## Cor de acento — restricted/password

`#D61408` — usado em:
- Botão submit da tela de senha (`.block-password-gate button`)
- `h1` da tela de senha
- Mensagem de erro de senha (`.password-error`)
- `h1` do work header em `.block-works-full`
- `h2` dentro do `.work-body`
- Ícones do `ResearchBlock` (ChatText, ClipboardText)

---

## CSS Custom Property — `--image-max-width`

Aplicado via `style` inline em `GalleryImage` e `Slideshow` items. Valor calculado como metade da largura original da imagem (`Math.round(naturalWidth * 0.5)`).

Usado pelo CSS em:
```scss
.slideshow__item,
.gallery__item,
.rt-image {
  width: var(--image-max-width);
}
```

A largura natural vem do `onLoad` no `<img>` — `img.naturalWidth`.

---

## CSS Modules (componentes novos)

Componentes que não existiam no Gatsby usam CSS Modules para isolar estilos:

| Arquivo | Componente |
|---|---|
| `components/post/Highlight.module.scss` | Highlight |
| `components/post/HypothesisStatement.module.scss` | HypothesisStatement |
| `components/post/ResearchBlock.module.scss` | ResearchBlock |
| `components/post/ResearchResult.module.scss` | ResearchResult |
| `components/dev/DevMode.module.scss` | Todos os componentes dev |

---

## Classes do CSS legado

### Dentro de `.work-body`

| Classe / elemento | Descrição |
|---|---|
| `.work-cover` | Imagem de capa, `max-width: 1280px` |
| `.work-intro` | Bloco de texto intro, `max-width: 680px`, `font-size: 24px` |
| `.gallery` | Container de galeria, `display: flex`, `gap: 16px` |
| `.gallery.gallery-narrow` | Gallery com `max-width: 960px` |
| `.gallery.has-shadows` | Gallery com box-shadow nos items |
| `.gallery.slideshow` | Gallery no modo carrossel |
| `.gallery__item` | Item da gallery, `width: var(--image-max-width)` |
| `.slideshow__item` | Item do slideshow, mesma lógica |
| `.embla` | Container Embla Carousel |
| `.embla__container` | Track do carrossel, `display: flex`, `gap: 16px` |
| `.embla__slide` | Slide individual |
| `.embla__buttons` | Container dos botões, posicionado absolutamente |
| `.embla__button` | Botão prev/next, 80x80px, borda sutil |
| `.embla__button.is-disabled` | Estado disabled (opacity 0.3 no SVG) |
| `.restricted-indicator` | Badge "Restricted page" no work header |
| `.draft-indicator` | Badge "Draft" no work header |
| `.work-body h2` | `font-size: 36px`, `color: #D61408` |
| `.work-body h6` | Uppercase label de seção, `color: #666666`, `font-size: 16px` |
| `.work-video-wrapper` | Container do embed de vídeo |

### Password gate

| Classe | Descrição |
|---|---|
| `.block-password-gate` | Container, `width: 420px`, centralizado |
| `.password-gate` | Formulário |
| `.fields` | Row com input + botão, `gap: 8px` |
| `.password-error` | Mensagem de erro, background `rgba(213,19,7,0.05)` |

---

## Configuração do site (`lib/config.ts`)

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
