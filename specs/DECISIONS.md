# DECISIONS.md

Registro de decisões técnicas não-óbvias tomadas durante o desenvolvimento.

---

## D001 — CSS Modules para componentes novos

**Contexto:** O SCSS legado do Gatsby é imutável. Componentes novos precisam de estilos.

**Decisão:** Usar CSS Modules (`.module.scss`) para qualquer componente que não existia no Gatsby (Highlight, ResearchBlock, HypothesisStatement, ResearchResult, DevMode).

**Motivo:** Isolamento total — não há risco de conflito com o CSS legado, e não polui o namespace global.

---

## D002 — PRIVATE_SLUGS em arquivo separado

**Contexto:** O middleware roda no Edge runtime, que não suporta `fs`. A lista de slugs privados precisa estar disponível sem ler o filesystem.

**Decisão:** Criar `lib/private-slugs.ts` como arquivo estático (gerado no build) com um array hardcoded. `lib/works.ts` re-exporta para conveniência.

**Motivo:** Compatibilidade com Edge runtime sem comprometer a API de `lib/works.ts`.

---

## D003 — Serving de assets via route handler

**Contexto:** Imagens dos works ficam em `content/works/[slug]/` mas não são servidas automaticamente pelo Next.js (não estão em `public/`).

**Decisão:** Criar `app/works-asset/[...path]/route.ts` que serve arquivos de `content/works/` sob demanda.

**Motivo:** Permite manter imagens co-localizadas com seus MDX sem duplicar em `public/`. Inclui validação de path traversal.

---

## D004 — GalleryImage com classe `.gatsby-image-wrapper`

**Contexto:** O CSS legado tem regras para `.gatsby-image-wrapper` que controlam renderização de imagens dentro de galerias.

**Decisão:** Manter a classe `.gatsby-image-wrapper` nas `<img>` geradas pelo `GalleryImage`, mesmo sem usar Gatsby.

**Motivo:** Compatibilidade com o CSS legado sem modificá-lo.

---

## D005 — Conteúdo do hero dinâmico via JSON

**Contexto:** O hero da home tinha conteúdo hardcoded nos componentes.

**Decisão:** Extrair para `content/home-content.json` com edição inline via dev mode.

**Motivo:** Permite atualizar o hero (cargo, empresa, descrição) sem alterar código — basta editar no browser em dev e commitar o JSON.

---

## D006 — Dev mode gated por NODE_ENV

**Contexto:** Funcionalidades de edição (reorder, inline editing) não devem existir em produção.

**Decisão:** Toda a árvore de dev mode (`DevModeProvider`, toggle, save bars) só renderiza quando `NODE_ENV === 'development'`. As API routes de admin retornam 403 em produção.

**Motivo:** Segurança por design — nenhum código de edição é exposto ao usuário final.

---

## D007 — `p` tag unwrap no MDX

**Contexto:** MDX envolve conteúdo inline em `<p>`, mas componentes de bloco dentro de `<p>` causam hydration mismatch no React.

**Decisão:** Override do `p` em `mdx-components.tsx` que detecta filhos de bloco e renderiza `<>{children}</>` em vez de `<p>`.

**Motivo:** Evita warnings de hydration sem alterar o conteúdo MDX.

---

## D008 — `@phosphor-icons/react` para ícones de componentes MDX

**Contexto:** Componentes de conteúdo (Highlight, ResearchBlock) precisam de ícones variados por post.

**Decisão:** Usar `@phosphor-icons/react` com resolução dinâmica por nome string. Os SVGs inline do design system legado continuam sendo usados para layout (header, footer, cards).

**Motivo:** Flexibilidade para autores de conteúdo escolherem ícones sem editar código. Os ícones de layout permanecem hardcoded para garantir consistência visual.

---

## D009 — Draft visibility em dev mode

**Contexto:** Works com `published: false` não devem aparecer em produção, mas precisam ser visíveis durante desenvolvimento.

**Decisão:** `getWorks()` inclui works não publicados quando `NODE_ENV === 'development'`. No card, recebem overlay branco semitransparente e badge "Draft".

**Motivo:** Permite pré-visualizar works em progresso sem publicá-los acidentalmente.
