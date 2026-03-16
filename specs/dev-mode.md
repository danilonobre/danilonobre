# dev-mode.md

## Visão geral

Sistema de edição local ativo apenas em `NODE_ENV === 'development'`. Permite editar conteúdo da home (hero e ordem dos works) diretamente no browser, salvando alterações nos arquivos JSON do projeto.

Nenhum componente ou API do dev mode é acessível em produção.

---

## Funcionalidades

### 1. Reorder de works (drag-and-drop)
Com dev mode ativo, a lista de works na home vira uma lista drag-and-drop. Ao reordenar, o botão "Save order" aparece. Ao salvar, `POST /api/admin/reorder` escreve a nova ordem em `content/works-order.json`.

### 2. Edição inline do hero
Com dev mode ativo, o hero da home se torna editável via `contentEditable`. Cada campo (name, description, role, company) pode ser editado diretamente. Ao alterar, o botão "Save intro" aparece. Ao salvar, `POST /api/admin/home-content` escreve em `content/home-content.json`.

### 3. Visibilidade de drafts
Works com `published: false` aparecem na lista durante dev mode, com overlay visual (branco semitransparente) e badge "Draft".

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

### Toggle

**`DevModeToggle`** (`components/dev/DevModeToggle.tsx`)

Botão flutuante fixo (top-right, z-index 900). Ícone de cadeado fechado (inativo) ou aberto (ativo). Cor de acento: `#f5a623`.

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

---

## Fluxo na home (`app/page.tsx`)

```
Se NODE_ENV !== 'development':
  → <Layout> + <PageIntro> + <WorkList> (estático)

Se NODE_ENV === 'development':
  → <DevModeProvider> + <Layout> + <PageIntro> + <WorkList> + <DevModeToggle>
    → PageIntro verifica useDevMode():
      - devMode OFF → renderiza conteúdo estático
      - devMode ON  → renderiza EditableIntro
    → WorkList verifica useDevMode():
      - devMode OFF → renderiza WorkCard normal
      - devMode ON  → renderiza WorkListSortable + DevModeSaveBar
```

---

## Estilos

Todos os estilos do dev mode estão em `components/dev/DevMode.module.scss` (CSS Module).

| Classe | Uso |
|---|---|
| `.toggle` | Botão flutuante de toggle |
| `.toggleActive` | Estado ativo do toggle (cor #f5a623) |
| `.saveAction` | Container do botão de save |
| `.saveButton` | Botão de save |
| `.feedback` | Texto "Saved!" (verde) |
| `.feedbackError` | Texto de erro (vermelho) |
| `.editable` | Campos contentEditable (border dashed) |
| `.dragHandle` | Handle de drag (posicionado à esquerda do card) |
