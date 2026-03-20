# Spec Pack

We have an existing implementation. We need to fix bugs and/or add features. Keep /specs as the source of truth.
Do NOT implement yet.

Before starting, read /specs/PRODUCT_CONTEXT.md, /specs/DECISIONS.md, and /specs/GLOSSARY.md to align with existing product intent. Do not read Figma at this stage.

---

## Step 1: Bugfix Spec Pack (skip if no bugs provided)

Create `work/changes/YYYY-MM-DD_bug_[name].md` documenting each bug with:

- **Repro steps** — how to reproduce the issue
- **Actual behavior** — what is currently happening
- **Expected behavior** — what should happen instead
- **Rationale** — why the fix is correct (edge cases, business rules, etc.). Fill using PRODUCT_CONTEXT.md and existing specs where possible. Mark anything you cannot fill with confidence as `[NEEDS INPUT: description of what's missing]`.

Then populate **Spec corrections**:
- Identify which spec files describe the incorrect behavior and must be corrected after the fix is implemented.
- List each file with a brief description of what needs to change.

Present the Spec corrections list and stop for user confirmation before proceeding.

---

## Step 2: Feature Spec Pack (skip if no features provided)

Create `work/changes/YYYY-MM-DD_feature_[name].md` documenting each feature with:

- **Description** — what the feature is
- **Expected behavior** — how it should work
- **Acceptance criteria** — testable conditions for completion
- **Rationale** — why this feature belongs in the product. Fill using PRODUCT_CONTEXT.md and existing specs where possible. Mark anything you cannot fill with confidence as `[NEEDS INPUT: description of what's missing]`.

Then populate **Spec artifacts** by analyzing the feature and applying these rules. Only flag artifacts that are genuinely required. If uncertain whether an artifact is needed, ask the user before including it:

- New user-facing interaction or journey → `specs/ux/flows/[name].md` (CREATE)
- New distinct UI surface or page → `specs/ui/screens/[name].md` (CREATE)
- Significant change to existing screen layout or behavior → `specs/ui/screens/[name].md` (UPDATE)
- New UI element with variants or reuse potential → `specs/ui/components/[name].md` (CREATE)
- New visual property not covered by existing tokens → `specs/ui/_tokens.md` (UPDATE)
- New data entity or field → `specs/domain/entities.md` (UPDATE)
- New AI processing rule or pipeline behavior → `specs/domain/pipeline-rules.md` (UPDATE)
- New term not in glossary → `specs/GLOSSARY.md` (UPDATE)
- Non-obvious decision made → `specs/DECISIONS.md` (UPDATE)
- Change in what the product does or who it serves → `specs/PRODUCT_CONTEXT.md` (FLAG for user review)
- Change in scope → `specs/scope.md` (UPDATE)

Present the Spec artifacts list and stop for user confirmation before proceeding.

---

## Step 3: Check GLOSSARY and DECISIONS

- If any new term or concept was introduced, add it to `specs/GLOSSARY.md`.
- If any non-obvious design decision was made, add it to `specs/DECISIONS.md` with explicit justification.

---

$ARGUMENTS

After completing all steps, list all `[NEEDS INPUT]` items clearly and stop for confirmation before proceeding.
