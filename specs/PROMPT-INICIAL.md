# Prompt inicial — Portfolio Next.js

Você vai construir do zero o portfolio de Danilo Nobre em Next.js 14 (App Router).

Antes de escrever qualquer código, leia obrigatoriamente todos os arquivos em `/specs/`:

- `architecture.md` — stack, estrutura de pastas, decisões técnicas
- `content-model.md` — estrutura dos posts MDX, frontmatter e conteúdo dinâmico da home
- `components.md` — todos os componentes com props e classes CSS
- `design-system.md` — tokens, tipografia, breakpoints, conteúdo, SVG icons, CSS Modules
- `auth.md` — fluxo de autenticação para posts privados
- `dev-mode.md` — sistema de edição local (dev mode)
- `DECISIONS.md` — registro de decisões técnicas
- `GLOSSARY.md` — termos e definições do projeto

---

## Pré-requisito antes de começar

Os seguintes assets já foram copiados manualmente do projeto Gatsby e estão disponíveis:

- `/public/images/danilonobre-ui-designer.png`
- `/public/images/danilonobre-ui-designer-full.png`
- `/public/fonts/circular/*.woff2`
- `/styles/` com todos os arquivos SCSS
- `/content/works/` com todos os posts MDX e imagens

Se algum desses não estiver presente, pare e avise antes de continuar.

---

## Tarefa

Inicialize o projeto Next.js 14 com App Router e implemente na seguinte ordem:

1. **Setup do projeto**
   - `next.config.js` com suporte a MDX e SCSS
   - `package.json` com as dependências necessárias
   - `app/layout.tsx` importando `styles/styles.scss` e injetando GTM (`GTM-T8C7JHT`)
   - `lib/config.ts` com `siteConfig`
   - `middleware.ts` para proteção de rotas privadas

2. **Componentes de layout**
   - `Header`, `Footer`, `Contacts`, `Layout`
   - Usar exatamente as classes CSS definidas em `components.md`
   - SVG icons copiados de `design-system.md` — não substituir por bibliotecas

3. **Home**
   - `lib/works.ts` com função para listar works e exportar `PRIVATE_SLUGS`
   - `WorkCard` e `WorkList`
   - `app/page.tsx`

4. **Template de post**
   - `WorkTemplate`
   - `Gallery`, `GalleryNarrow`, `Texts`, `WorkVideo`, `FigmaEmbed`
   - `mdx-components.tsx` registrando todos os componentes
   - `app/[slug]/page.tsx`

5. **Autenticação**
   - `lib/auth.ts`
   - `app/api/auth/route.ts`
   - `app/[slug]/password/page.tsx`

---

## Workflow SDD — para todas as mudanças após o setup inicial

Este projeto usa Spec-Driven Development. Após o setup inicial estar funcionando, todo bug e toda feature seguem este fluxo obrigatório. As regras completas de cada step estão em `.cursor/rules/`:

| Step | Arquivo | Quando invocar |
|---|---|---|
| 1 — Spec Pack | `sdd-1-spec-pack.mdc` | Ao receber bugs ou features para documentar |
| 2 — Plans & Tasks | `sdd-2-plans-and-tasks.mdc` | Após spec pack aprovado |
| 3a — Implement | `sdd-3a-implement.mdc` | Após plano aprovado |
| 3b — Test | `sdd-3b-test.mdc` | Após implementação (quando recomendado pelo 3a) |
| 4 — Spec Sync | `sdd-4-spec-sync.mdc` | Após implementação validada |
| 5 — Deploy | `sdd-5-deploy.mdc` | Após spec sync confirmado |

Para invocar um step, diga por exemplo: `"rode o spec pack para [descrição do bug/feature]"` ou `"implemente o pack [nome]"`.

---

## Regra mais importante

Leia `.cursor/rules/portfolio.mdc` antes de qualquer coisa. Se em algum momento uma tarefa exigir CSS novo ou modificação de CSS existente, aplique o protocolo de bloqueio definido nesse arquivo — não implemente, informe o bloqueio e aguarde instrução.
