<!-- mentor:file
The database architecture spec.
priority: high
-->

# Database Architecture

Not applicable — this project uses the filesystem instead of a database.

All data lives as:
- **MDX files** — `content/works/[slug]/index.mdx` (work content + frontmatter)
- **JSON files** — `content/home-content.json` (hero content), `content/works-order.json` (work ordering)

See `specs/domain/entities.md` for the full data model.
