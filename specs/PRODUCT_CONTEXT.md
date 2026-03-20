<!-- mentor:file
This file is the north star of the project. Every decision — product, design, technical — should be traceable back to something here. The Mentor uses it to evaluate whether features make sense, whether scope creep is happening, and whether the product has a clear identity. An incomplete or vague product context makes every other spec unreliable.
priority: critical
-->

# Product Context

## What is [Product Name]?

<!-- mentor
State clearly what the product is, what it does, and — equally important — what it deliberately does not do. Avoid marketing language. Write as if explaining to a new team member who needs to make decisions without asking questions.

quality signals:
- The product's purpose is explained in 2-3 sentences without jargon
- The "does not do" boundary is explicit, not implied
- Someone could read this and know whether a given feature belongs in the product or not
-->

---

## Target User

<!-- mentor
Define the primary user with enough specificity to make design and product decisions from. "Solo builders" is better than "developers". "Solo builders shipping web products with AI tools" is better still. Vague personas produce vague decisions.

quality signals:
- Primary persona has a role, context, and a specific problem they face
- Behavioral profile explains how they work, not just who they are
- "Not the target" list is explicit — it prevents scope creep from edge-case users
-->

**Primary persona:**

**Behavioral profile:**

**Not (in this phase):**

---

## Core Value Proposition

<!-- mentor
One sentence that captures why this product is worth using over doing nothing or using something else. Then 2-3 supporting values that expand on it. If you can't write the one sentence without hedging, the product doesn't have a clear value proposition yet.

quality signals:
- The headline sentence is specific — it names the outcome, not the mechanism
- Supporting values are distinct from each other, not rephrasing the same thing
- A user reading this would understand why they should care
-->

>

**Value 1 —**

**Value 2 —**

---

## The Main Use Case

<!-- mentor
Describe the primary workflow that drove product design, step by step. This is the scenario the product is optimized for. If edge cases and secondary use cases have contaminated this section, the product will end up optimized for nothing in particular.

quality signals:
- Written as a concrete sequence of user actions, not as a feature list
- The scenario starts with a real motivation, not "the user opens the app"
- The end state makes clear what the user got out of it
-->

---

## Phase Scope

<!-- mentor
What is in scope for this phase, stated as a domain/feature table. This section exists to prevent both under-building (missing something important) and over-building (shipping things that belong in v2). Update it whenever scope changes.

quality signals:
- Every item in scope has a domain assigned — no orphaned features
- "Explicitly out of scope" is populated, not empty
- The scope is tight enough that it could realistically ship as a coherent v1
-->

| Domain | Feature |
|--------|---------|
| | |

**Explicitly out of scope:**

---

## Platform

<!-- mentor
State the primary platform and the designed experience. If the product is desktop-first, say so and explain what that means for layout and interaction. Secondary platforms should be described in terms of their role, not just named.

quality signals:
- Primary platform is stated with a specific experience description (not just "web")
- Secondary platform is described in terms of its role, not just its existence
- A developer could make layout and interaction decisions from this section
-->

**Primary:**

**Secondary:**

---

## Sessions

<!-- mentor
Describe 2-3 distinct usage patterns — how users actually engage with the product over time. This section reveals whether the product has a repeatable loop or is a one-time setup. Products with no recurring loop usually struggle with retention.

quality signals:
- Each session type is named and described in 2-3 sentences
- Sessions are distinct from each other, not variations of the same thing
- Together, they reveal the product's engagement model
-->

---

## Design Philosophy

<!-- mentor
3-5 principles that guide all product decisions. These should be opinionated and specific enough to resolve disagreements. "Simple" is not a principle. "One action per screen" is. These principles should be testable — you should be able to look at a design and say whether it follows them or not.

quality signals:
- Each principle is specific enough to use as a decision criterion
- Principles are in tension with each other where appropriate (real constraints trade off)
- A designer could use these to reject a proposed feature or layout
-->

---

## Future Direction

<!-- mentor
What comes after this phase? This section is not a roadmap — it's a signal to the AI about what to leave room for and what not to over-engineer for. Vague future direction leads to under-building foundations and over-building features that won't survive v2.

quality signals:
- Future versions are described at the level of capability, not feature lists
- The progression from v1 to v2 to v3 follows a coherent arc
- There are no plans in here that belong in the current phase scope
-->
