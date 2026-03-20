<!-- mentor:file
The backend architecture spec.
priority: high
-->

# Backend Architecture

Not applicable — this is a statically generated Next.js site with no traditional backend.

API routes exist only for dev mode operations (`/api/admin/*`) and authentication (`/api/auth`). These are Next.js route handlers, not a separate backend service. See `specs/architecture/frontend.md` for the full stack.
