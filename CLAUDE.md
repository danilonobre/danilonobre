<!-- scofield:base:start -->
# CLAUDE.md — Project rules and workflow

## Project stack

## Key constraints (see specs/constitution.md for full list)
---

## Folder names

The spec folder is named `specs/` — not `spec/`. The work folder is named `work/` — not `works/`. Never create or reference these folders under any other name.

---

## Spec authority

- Behavioral authority: `specs/` markdown files in this repository.
- Visual authority: `specs/ui/_tokens.md` and Figma via MCP.
- On conflict, behavioral specs win.
- Do not implement behavior that contradicts the specs without updating the specs first and confirming with the user.

---

## Spec-driven workflow

This project uses a 6-step spec-driven development workflow:

1. `/1-spec-pack` — create bug and feature specs
2. `/2-plans-and-tasks` — create implementation plans and atomic tasks
3a. `/3a-implement` — implement based on plans and tasks
3b. `/3b-test` — run and validate tests after implementation
4. `/4-spec-sync` — sync code and specs
5. `/5-deploy` — merge pack branch to main, delete the pack branch

Each step has a confirmation checkpoint. Never advance to the next step without explicit user confirmation.

Before any task involving bugs, features, or implementation, read:
- `specs/PRODUCT_CONTEXT.md`
- `specs/DECISIONS.md`
- `specs/GLOSSARY.md`

---

## Git pre-flight

Before starting any workflow step:
1. Run `git status`
2. If there are uncommitted changes, stop and report them to the user
3. Ask: "These files have uncommitted changes. Commit, stash, or abort?"
4. Only proceed after the working tree is clean

---

## Git workflow

- When starting a new pack, create a branch named `pack/YYYY-MM-DD` from main.
- Commit atomically during implementation — one commit per bug fix, one commit per feature.
- Use conventional commit prefixes: `fix:` for bugs, `feat:` for features.
- Never commit everything in a single lump commit at the end.
- Never include `.claude/worktrees/` in any commit — these are internal session artifacts.
- Do not merge to main — that is handled by `/5-deploy` with explicit user confirmation.
- After merging, delete the pack branch locally (`git branch -d pack/YYYY-MM-DD`).

---

## Step necessity evaluation

At the end of each step, before indicating the next one, evaluate whether the next step is actually necessary given the work done. Always inform the user of the recommendation and wait for explicit confirmation before proceeding — never skip automatically.

- `/1-spec-pack` → `/2-plans-and-tasks`: always required
- `/2-plans-and-tasks` → `/3a-implement`: always required
- `/3a-implement` → `/3b-test`: conditional — recommend skipping if changes are purely visual, copy, or trivial isolated logic with no business rules involved
- `/3b-test` → `/4-spec-sync`: always required if `/3b-test` was run
- `/3a-implement` → `/4-spec-sync`: conditional — recommend skipping if no deviations were recorded and all implemented behavior was already covered by existing specs
- `/4-spec-sync` → `/5-deploy`: always required

When recommending to skip a step, always explain why:
> "I recommend skipping /3b-test because [reason]. Proceed to /4-spec-sync?"

Wait for user confirmation before proceeding.

---

## Spec update rule

After any code change is confirmed working, always ask the user:

> "Should I update the specs?"

Wait for confirmation before modifying any file under `specs/`. Only update specs after the user explicitly says yes.

This applies to every session, for every code change — regardless of how small.

---

## Deviations and ambiguity

- Any deviation from spec during implementation must be documented immediately in an "Implementation Notes" block in the relevant task file. Do not accumulate deviations silently for the sync pass.
- If a spec is ambiguous or incomplete, stop and ask before assuming. Never fill gaps with assumptions that could affect behavior.

---

## Step transitions

At the end of each step, always tell the user what the next step is and what command to run.

---

## Token efficiency

**Figma MCP:** Only use Figma MCP when a task explicitly requires visual reference. Do not read Figma nodes speculatively or for confirmation — trust the specs for behavior and only use Figma when specs do not cover the visual detail needed.

**Session length:** Keep sessions focused on a single step of the workflow. If a session is becoming long, flag it to the user and suggest starting a fresh session for the next step.

**Bug fix iterations:** If a bug fix fails after 2 attempts, stop immediately. Do not attempt a third fix. Instead, summarize what was tried and what failed, and ask the user for guidance before continuing.

---

## Cost tracking

At the start of every workflow step, note the estimated session cost as COST_START.

At the end of every workflow step, before asking for confirmation, report:
- Model, input tokens, output tokens, total tokens, estimated cost for this step.

---

## CSS preservation rule

The component CSS files were manually refined and represent the visual baseline of the product.
Do not modify any existing CSS rules unless the task explicitly requires a visual change.
If a task requires touching CSS, list which files will be affected and wait for confirmation before proceeding.

---

## CSS naming convention

CSS Module class names must be semantic and descriptive of the element's role or content.
Never use generic names like `root`, `content`, `wrapper`, `children`, or `container` alone.
Always combine with context: `sidebarHeader`, `boardArea`, `itemCardBody`, `sectionList`.
Good examples: `loginScreen`, `projectSelector`, `inputField`, `submitButton`, `itemCard`, `doneToast`.
<!-- scofield:base:end -->

## Project overrides

<!-- Add project-specific rules here. This section is never touched by scofield update. -->
