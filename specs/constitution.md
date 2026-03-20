<!-- mentor:file
The non-negotiables. Rules that cannot be violated under any circumstance during development, regardless of what a feature spec says. The Mentor treats this file as the final override — if a proposed feature or implementation contradicts the constitution, it must be flagged before proceeding. A constitution with no rules is not a constitution; a constitution with vague rules is worse than none.
priority: critical
-->

# Constitution

## Authority Hierarchy

<!-- mentor
Establishes which source of truth wins in case of conflict. This hierarchy must be explicit because the AI will encounter contradictions between Figma, specs, and code — and must know how to resolve them without asking.

quality signals:
- Behavioral authority is clearly assigned (specs win over Figma, not the other way around)
- Visual authority is clearly assigned
- Conflict resolution is stated as a rule, not a suggestion
-->

- Behavioral authority: spec files in this repository.
- Visual authority: `specs/ui/_tokens.md` and Figma (when available).
- On conflict, behavioral specs win.

---

## Non-Negotiables

<!-- mentor
Rules that can never be broken. These are the load-bearing constraints of the product — violating them would fundamentally break the product's promise, security model, or user experience. Each rule should be specific enough to apply to a concrete implementation decision.

quality signals:
- Each rule is stated as an imperative, not a guideline ("Never expose API keys" not "API keys should not be exposed")
- Rules are organized by category (Data, UI, Security, etc.)
- Rules are specific enough that an AI could evaluate whether a given piece of code violates them
- There are at least rules for: data handling, UI constraints, and security

extensions:
- docguard: Enforces non-negotiable rules during code review with automated scoring and pre-commit hooks
-->

---

## Definition of Done

<!-- mentor
A task or feature is complete only when these conditions are met. This section prevents partial implementations from being declared done. The AI uses this checklist at the end of every implementation step.

quality signals:
- Conditions are verifiable, not subjective
- Spec conformance is a condition
- Edge case handling is a condition
- Design token usage is a condition
- There are no conditions that require human judgment to evaluate (those belong in 3b-test)
-->

A feature is complete only if:
- Behavior matches specs.
- Edge cases are handled as specified.
- No regressions against the non-negotiables above.
- UI uses correct design tokens from `specs/ui/_tokens.md`.
