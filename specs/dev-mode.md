# dev-mode.md

## Visão geral

Sistema de edição local ativo apenas em `NODE_ENV === 'development'`. Permite editar conteúdo da home (hero e ordem dos works), criar novos posts e editar frontmatter de posts existentes diretamente no browser, salvando alterações nos arquivos do projeto.

Nenhum componente ou API do dev mode é acessível em produção.

---

## Funcionalidades

### 1. Reorder de works (drag-and-drop)
Com dev mode ativo, a lista de works na home vira uma lista drag-and-drop. Ao reordenar, o botão "Save order" aparece. Ao salvar, `POST /api/admin/reorder` escreve a nova ordem em `content/works-order.json`.

### 2. Edição inline do hero
Com dev mode ativo, o hero da home se torna editável via `contentEditable`. Cada campo (name, description, role, company) pode ser editado diretamente. Ao alterar, o botão "Save intro" aparece. Ao salvar, `POST /api/admin/home-content` escreve em `content/home-content.json`.

### 3. Visibilidade de drafts
Works com `published: false` aparecem na lista durante dev mode, com overlay visual (branco semitransparente) e badge "Draft".

### 4. Criação de posts
Botão "+" na toolbar da home navega para `/new`. A página exibe um formulário com todos os campos do frontmatter + body. Ao salvar (lock button), `POST /api/admin/create-work` cria o diretório e arquivo MDX no disco e adiciona o slug ao início de `content/works-order.json`. Nada é escrito no disco até o save explícito.

### 5. Edição de frontmatter em posts existentes
Nas páginas de post (`/[slug]`), o lock button (fechado) aparece em dev mode. Ao clicar, a página entra em edit mode com os campos do frontmatter pré-preenchidos. Ao salvar, sobrescreve o arquivo MDX via API e retorna ao preview mode com `router.refresh()` para re-renderizar o MDX server-side. O slug é read-only para posts existentes.

---

## Arquitetura

### Context Provider

**`DevModeProvider`** (`components/dev/DevModeProvider.tsx`)

Client component. Wrapa a home page em dev. Gerencia todo o estado do dev mode:

```tsx
interface DevModeContextValue {
  devMode: boolean
  toggleDevMode: () => void

  // Reorder
  items: WorkItem[]
  setItems: (items: WorkItem[]) => void
  orderDirty: boolean
  orderStatus: 'idle' | 'saving' | 'saved' | 'error'
  saveOrder: () => Promise<void>

  // Home content
  homeContent: HomeContent
  updateHomeField: (field: keyof HomeContent, value: string) => void
  contentDirty: boolean
  contentStatus: 'idle' | 'saving' | 'saved' | 'error'
  saveContent: () => Promise<void>
}
```

O hook `useDevMode()` retorna `null` quando fora do provider (produção).

### Toolbar

**`DevToolbar`** (`components/dev/DevToolbar.tsx`)

Client component. Wrapper fixo (top-right, z-index 900, `display: flex; gap: 8px`) que agrupa os botões de dev mode. Ordem: `CreatePostButton` primeiro, `DevModeToggle` por último (D010).

### Toggle

**`DevModeToggle`** (`components/dev/DevModeToggle.tsx`)

Botão flutuante no `DevToolbar`. Ícone de cadeado fechado (inativo) ou aberto (ativo). Cor de acento: `#f5a623`. Sempre o último botão na toolbar (D010). Tooltip on hover: "Edit" (branco) quando inativo, "Save changes" (accent, always visible) quando ativo.

### Criar post

**`CreatePostButton`** (`components/dev/CreatePostButton.tsx`)

Client component. Botão "+" no `DevToolbar` que navega para `/new`. Mesmo estilo visual base do toggle (44×44px, round, `#1a1a1a`). Envolvido em `.toggleWrapper` com tooltip "Create case" (branco, on hover).

### Formulário de criação/edição

**`CreatePostForm`** (`components/dev/CreatePostForm.tsx`)

Client component. Formulário que gerencia edit/preview mode para posts novos e existentes.

```tsx
interface CreatePostFormProps {
  initialData?: Partial<PostData>
  children?: ReactNode
}
```

- Sem `initialData`: modo criação (page `/new`), inicia em edit mode, campos vazios.
- Com `initialData`: modo edição (page `/[slug]`), inicia em preview mode, campos pré-preenchidos, slug read-only.
- `children`: conteúdo server-rendered (MDX) exibido no preview de posts existentes.

Campos editáveis divididos em dois grupos:
- **Primários (sempre visíveis):** `title`, `slug`, `published`, `project`, `timeline`, `private`, `intro`, `cover`, `body`
- **Avançados (secção colapsável):** `figma`, `figmaMobile` — ocultos por defeito, revelados via botão "Advanced settings" com transição suave. Auto-expandem se `initialData` contém valores preenchidos (D014).

Slug auto-gerado do título (slugify) em posts novos. Editável manualmente.

Lock button integrado com tooltips:
- Edit mode: cadeado aberto, tooltip "Save changes" (accent, always visible, centrada) → salva via API → preview mode.
- Preview mode: cadeado fechado, tooltip "Edit" (branco, on hover, right-aligned) → click → volta ao edit mode.

### Save Actions

**`DevSaveAction`** (`components/dev/DevSaveAction.tsx`)

Componente genérico de save com feedback visual:
- `dirty` → mostra o botão
- `saving` → botão disabled com "Saving…"
- `saved` → texto verde "Saved!"
- `error` → texto vermelho "Error. Try again."

**`DevModeSaveBar`** (`components/dev/DevModeSaveBar.tsx`)

Instância de `DevSaveAction` ligada ao reorder (order state).

### Edição do hero

**`EditableIntro`** (`components/dev/EditableIntro.tsx`)

Substitui o `PageIntro` quando dev mode está ativo. Cada campo de texto usa `contentEditable` com `onBlur` para capturar alterações. Inclui seu próprio `DevSaveAction` para salvar o conteúdo.

### Drag-and-drop

**`WorkListSortable`** (`components/works/WorkListSortable.tsx`)

Lista drag-and-drop usando `@dnd-kit`:
- `DndContext` com `closestCenter` collision detection
- `SortableContext` com `verticalListSortingStrategy`
- Cada work é um `SortableWorkCard` que usa `useSortable`
- Reorder via `arrayMove` no `onDragEnd`

---

## API Routes (dev only)

### `POST /api/admin/reorder`
**Arquivo:** `app/api/admin/reorder/route.ts`

Recebe `{ slugs: string[] }` e escreve em `content/works-order.json`. Retorna 403 se `NODE_ENV !== 'development'`.

### `POST /api/admin/home-content`
**Arquivo:** `app/api/admin/home-content/route.ts`

Recebe campos do `HomeContent` e escreve em `content/home-content.json`. Sanitiza inputs para aceitar apenas os campos permitidos (`name`, `description`, `role`, `company`, `companyUrl`). Retorna 403 se `NODE_ENV !== 'development'`.

### `POST /api/admin/create-work`
**Arquivo:** `app/api/admin/create-work/route.ts`

Recebe campos do frontmatter + `body` + `overwrite` (boolean). Cria `content/works/[slug]/index.mdx` com frontmatter YAML + body. Adiciona slug ao início de `content/works-order.json` (posts novos aparecem primeiro). Com `overwrite: true`, sobrescreve arquivo existente. Retorna 403 se produção, 400 se campos inválidos, 409 se slug já existe sem `overwrite`.

Validação de slug: apenas `[a-z0-9]` e hifens.

---

## Fluxo na home (`app/page.tsx`)

```
Se NODE_ENV !== 'development':
  → <Layout> + <PageIntro> + <WorkList> (estático)

Se NODE_ENV === 'development':
  → <DevModeProvider> + <Layout> + <PageIntro> + <WorkList> + <DevToolbar>
    → DevToolbar renderiza: CreatePostButton + DevModeToggle
    → PageIntro verifica useDevMode():
      - devMode OFF → renderiza conteúdo estático
      - devMode ON  → renderiza EditableIntro
    → WorkList verifica useDevMode():
      - devMode OFF → renderiza WorkCard normal
      - devMode ON  → renderiza WorkListSortable + DevModeSaveBar
```

## Fluxo na página de post (`app/[slug]/page.tsx`)

```
Se NODE_ENV !== 'development':
  → <Layout> + <WorkTemplate> + <MDXRemote> (estático)

Se NODE_ENV === 'development':
  → <Layout> + <CreatePostForm initialData={...}> + <WorkTemplate> + <MDXRemote>
    → CreatePostForm inicia em preview mode:
      - preview → exibe children (WorkTemplate com MDX) + lock button (fechado)
      - click lock → edit mode (formulário com campos pré-preenchidos)
      - save → sobrescreve via API + router.refresh() → volta a preview
```

## Fluxo na página de criação (`app/new/page.tsx`)

```
Se NODE_ENV !== 'development':
  → notFound()

Se NODE_ENV === 'development':
  → <Layout> + <CreatePostForm>
    → CreatePostForm inicia em edit mode:
      - edit → formulário com campos vazios + lock button (aberto, "Save changes")
      - save → cria MDX via API → preview mode (placeholder para componentes MDX)
      - click lock → volta a edit mode
      - saves subsequentes usam overwrite: true
```

---

## Tooltips

Todos os admin buttons têm tooltip. Comportamento:

| Botão | Contexto | Texto | Cor | Visibilidade |
|---|---|---|---|---|
| "+" (CreatePostButton) | Home | "Create case" | branco (#fff) | on hover |
| Lock (DevModeToggle) | Home, OFF | "Edit" | branco (#fff) | on hover |
| Lock (DevModeToggle) | Home, ON | "Save changes" | accent (#f5a623) | always visible |
| Lock (CreatePostForm) | Post, preview | "Edit" | branco (#fff) | on hover |
| Lock (CreatePostForm) | Post/new, edit | "Save changes" | accent (#f5a623) | always visible |

Posicionamento:
- Default: centrado sob o botão (`left: 50%; transform: translateX(-50%)`)
- `.tooltipEnd`: right-aligned (`right: 0`) para botões na borda direita do viewport, com arrow reposicionada ao centro do botão
- `.tooltipVisible`: `opacity: 1 !important` — override do hover pattern para "Save changes"
- Arrow: pseudo-elements `::before`/`::after` formando triângulo com borda, centrada por defeito

---

## Estilos

Todos os estilos do dev mode estão em `components/dev/DevMode.module.scss` (CSS Module).

| Classe | Uso |
|---|---|
| `.devToolbar` | Wrapper fixo top-right para botões (flex, gap 8px) |
| `.toggleWrapper` | Wrapper relativo para toggle + tooltip |
| `.toggle` | Botão circular 44×44px (base para toggle e "+") |
| `.toggleActive` | Estado ativo do toggle (cor #f5a623) |
| `.tooltip` | Tooltip centrada sob o botão, on hover (opacity 0→1), com arrow |
| `.tooltipEnd` | Modifier: right-aligned, arrow reposicionada (para botões na borda) |
| `.tooltipVisible` | Modifier: always visible (opacity 1) |
| `.tooltipWhite` | Variante de cor branca (composes `.tooltip`) |
| `.spinner` | Spinner de loading animado |
| `.editable` | Campos contentEditable (border dashed) |
| `.dragHandle` | Handle de drag (posicionado à esquerda do card) |
| `.formFieldTitle` | Input de título (font-size 50px, bold) |
| `.formFieldInline` | Input inline para company/timeline |
| `.formMetaSection` | Seção de metadata (slug, cover, checkboxes + advanced) |
| `.formMetaRow` | Row dentro da seção de metadata |
| `.formMetaLabel` | Label uppercase para campo de metadata |
| `.formMetaInput` | Input dentro de metadata |
| `.formCheckboxLabel` | Label com checkbox (published, private) |
| `.formMetaAdvancedToggle` | Botão "Advanced settings" (expand/collapse) |
| `.formMetaAdvanced` | Wrapper colapsável (max-height + opacity transition) |
| `.formMetaAdvancedOpen` | Estado expandido da secção avançada |
| `.formFieldIntro` | Textarea para intro (font-size 24px) |
| `.formFieldBody` | Textarea monospace para body MDX |
| `.formError` | Mensagem de erro fixa (bottom center, vermelho) |
| `.mdxPlaceholder` | Bloco placeholder para componentes MDX no preview |
| `.mdxPlaceholderIcon` | Ícone do placeholder (code brackets) |
| `.mdxPlaceholderLabel` | Label monospace do componente (ex: `<Gallery>`) |
