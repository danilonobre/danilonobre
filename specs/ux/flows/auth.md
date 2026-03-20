# Authentication Flow

## Trigger

User accesses `/<slug>` of a post with `private: true` without a valid `portfolio_auth` cookie.

## Model

Single shared password for all private posts. Password is defined as an environment variable and never exposed in the client bundle.

```env
PORTFOLIO_PASSWORD=your-password-here
```

Defined in `.env.local` for development and in Vercel environment variables for production. Never committed to the repository.

## Steps

1. User accesses `/<slug>` of a post with `private: true`
2. Middleware checks for valid `portfolio_auth` cookie
3. If cookie missing: redirect to `/<slug>/password`
4. User submits password in the form
5. `POST /api/auth` with `{ password, slug }`
6. If correct: API sets `portfolio_auth` cookie, returns `{ success: true, redirect: '/<slug>' }`
7. If wrong: returns `{ success: false, error: 'Wrong password' }` with status 401
8. With valid cookie: middleware lets through, post renders normally

## Middleware (`middleware.ts`)

- Intercepted routes: any `/<slug>` where the post has `private: true`
- Exception: `/<slug>/password` is not intercepted (prevents loop)
- Cookie checked: `portfolio_auth`
- Redirect: `/<slug>/password?from=/<slug>`

The middleware imports `PRIVATE_SLUGS` from `lib/private-slugs.ts` — a static file compatible with Edge runtime (no `fs`).

## Private Slugs Identification

`lib/private-slugs.ts` exports a hardcoded array:

```ts
export const PRIVATE_SLUGS: string[] = ["designing-scalable-system-app-settings"]
```

This file is generated at build time by `scripts/generate-private-slugs.mjs`. The separation exists because the middleware runs in the Edge runtime, where `fs` is unavailable. `lib/works.ts` re-exports `PRIVATE_SLUGS` for convenience.

## API Route (`app/api/auth/route.ts`)

```
POST /api/auth
Body: { password: string, slug: string }
Validates against process.env.PORTFOLIO_PASSWORD via lib/auth.ts
Success: Sets cookie 'portfolio_auth' (httpOnly, secure, sameSite: strict, maxAge: 7 days)
         Returns { success: true, redirect: '/<slug>' }
Failure: Returns { success: false, error: 'Wrong password' } with status 401
```

## Validation (`lib/auth.ts`)

```ts
export function validatePassword(password: string): boolean
```

Compares the received password with `process.env.PORTFOLIO_PASSWORD`. Returns `false` if the environment variable doesn't exist.

## Password Page (`app/[slug]/password/page.tsx`)

- Client component
- Simple layout, consistent with the existing design system
- `<input type="password">` field with label
- Submit button with arrow icon
- Inline error message (no page reload — fetch + React state)
- On success: `router.push('/<slug>')`
- Does not display which post is protected in the page title (privacy)

## Cookie

| Property | Value |
|----------|-------|
| Name | `portfolio_auth` |
| httpOnly | true |
| secure | true (production) |
| sameSite | strict |
| maxAge | 7 days |
| path | / |

## Edge Cases

- **Private works on home:** Posts with `private: true` appear normally in the home listing — the project's existence is not secret, only the content. A lock icon (inline SVG) is displayed on the card.
- **Missing env var:** `validatePassword` returns `false` if `PORTFOLIO_PASSWORD` is not set.
- **Cookie expiry:** After 7 days, user must re-authenticate.
