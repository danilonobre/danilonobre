# auth.md

## Modelo de autenticação

Senha única para todos os posts privados. A senha é definida como variável de ambiente e nunca exposta no bundle client-side.

---

## Variável de ambiente

```env
PORTFOLIO_PASSWORD=sua-senha-aqui
```

Definida no `.env.local` para desenvolvimento e nas variáveis de ambiente do Vercel para produção. Nunca commitada no repositório.

---

## Como funciona o fluxo

1. Usuário acessa `/<slug>` de um post com `private: true`
2. Middleware verifica se existe cookie de autenticação válido (`portfolio_auth`)
3. Se não existe: redireciona para `/<slug>/password`
4. Usuário submete a senha no formulário
5. POST para `/api/auth` com `{ password, slug }`
6. Se senha correta: API seta cookie `portfolio_auth` e retorna `{ success: true, redirect: '/<slug>' }`
7. Se senha errada: retorna `{ success: false, error: 'Wrong password' }`
8. Com cookie válido: middleware deixa passar, post renderiza normalmente

---

## Middleware (`middleware.ts`)

```ts
// Rotas interceptadas: qualquer /<slug> onde o post tenha private: true
// Exceção: /<slug>/password não é interceptada (evita loop)
// Cookie verificado: 'portfolio_auth'
// Redirecionamento: /<slug>/password?from=/<slug>
```

O middleware importa `PRIVATE_SLUGS` de `lib/private-slugs.ts` — um arquivo estático compatível com Edge runtime (sem `fs`).

---

## Identificação de slugs privados

`lib/private-slugs.ts` exporta um array hardcoded:

```ts
export const PRIVATE_SLUGS: string[] = ["designing-scalable-system-app-settings"]
```

Este arquivo é gerado no build por `scripts/generate-private-slugs.mjs`. A separação existe porque o middleware roda no Edge runtime, onde `fs` não está disponível. `lib/works.ts` re-exporta `PRIVATE_SLUGS` para conveniência.

---

## API Route (`app/api/auth/route.ts`)

```ts
// POST /api/auth
// Body: { password: string, slug: string }
// Compara com process.env.PORTFOLIO_PASSWORD via lib/auth.ts
// Se correto:
//   - Seta cookie 'portfolio_auth' (httpOnly, secure, sameSite: strict, maxAge: 7 dias)
//   - Retorna { success: true, redirect: '/<slug>' }
// Se incorreto:
//   - Retorna { success: false, error: 'Wrong password' } com status 401
```

---

## Validação (`lib/auth.ts`)

```ts
export function validatePassword(password: string): boolean
```

Compara a senha recebida com `process.env.PORTFOLIO_PASSWORD`. Retorna `false` se a variável de ambiente não existir.

---

## Tela de senha (`app/[slug]/password/page.tsx`)

- Client component
- Layout simples, consistente com o design system existente
- Campo `<input type="password">` com label
- Botão de submit com ícone de seta
- Mensagem de erro inline (sem reload de página — fetch + estado React)
- Após sucesso: `router.push('/<slug>')`
- Sem exibir qual post está protegido no título da página (privacidade)

---

## Cookie

| Propriedade | Valor |
|---|---|
| Nome | `portfolio_auth` |
| httpOnly | true |
| secure | true (produção) |
| sameSite | strict |
| maxAge | 7 dias |
| path | / |

---

## Posts privados na home

Posts com `private: true` aparecem normalmente na listagem da home — a existência do projeto não é sigilosa, apenas o conteúdo. Um ícone de cadeado (SVG inline) é exibido no card para indicar que o conteúdo é protegido.
