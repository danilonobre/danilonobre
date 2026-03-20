<!-- mentor:file
This file is the north star of the project. Every decision — product, design, technical — should be traceable back to something here.
priority: critical
-->

# Product Context

## What is danilonobre.com?

A personal portfolio website for Danilo Nobre, a Product Designer. It showcases case studies (works) written in MDX, with support for rich content components (galleries, slideshows, research blocks, hypothesis statements), Figma prototype embeds, and a local development editing system.

It does **not** do: blog posts, comments, analytics dashboards, user accounts, CMS admin panel, or multi-author content.

---

## Target User

**Primary persona:** Danilo Nobre himself — the sole author and maintainer.

**Behavioral profile:** Creates and updates case studies infrequently (a few times per year). Uses the dev mode editing system to manage content locally, then commits changes via git. Expects the portfolio to work as a static site with minimal maintenance.

**Secondary audience:** Recruiters, hiring managers, potential clients, and design peers who visit to evaluate Danilo's work. They browse the home page, click into case studies, and occasionally access restricted (private) works with a shared password.

**Not (in this phase):** Other designers, content contributors, or anyone who needs to edit the site without local development setup.

---

## Core Value Proposition

> A portfolio that presents design case studies as first-class content — rich, structured, and maintainable without a CMS.

**Value 1 — Rich content authoring:** MDX enables embedding interactive components (galleries, slideshows, research data, hypothesis frameworks) directly in case studies without custom page builds.

**Value 2 — Zero-dependency content management:** Content lives in the repository as MDX files and JSON. No external CMS, database, or API dependency. Dev mode provides a local editing UI.

**Value 3 — Selective privacy:** Case studies can be marked as private, requiring a password. The existence of private works is visible (builds trust), but content is protected.

---

## Platform

**Primary:** Web, desktop-first. The portfolio is designed for desktop viewing with responsive adaptations for tablet and mobile.

**Secondary:** Mobile web — works are readable on mobile but the primary experience (large images, galleries, Figma embeds) is optimized for desktop viewports.

---

## Design Philosophy

1. **Content-first layout** — The design serves the case study content. No decorative elements that don't support readability.
2. **Visual consistency via constraint** — Legacy CSS is immutable. New components use CSS Modules. This prevents visual drift.
3. **Dev mode as a tool, not a feature** — Editing capabilities exist only in development. The production site is static and read-only.
4. **Privacy without obscurity** — Private works are listed on the home page with a lock icon. The visitor knows the work exists; they just can't see it without a password.
