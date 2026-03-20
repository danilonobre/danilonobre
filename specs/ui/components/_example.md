<!-- mentor:file
Template for individual component spec files. Copy this file and rename it to [component-name].md when adding a new component. Each component file is the contract between design and implementation — it defines what the component does, how it looks in each state, and what tokens it uses. The AI reads these files during implementation to generate correct component code.
priority: medium
-->

# [ComponentName]

**figma_url:**

## Responsibility

<!-- mentor
What does this component do? What problem does it solve in the UI? Why does it exist as a separate component rather than being inline? This section should be 2-4 sentences that make the component's purpose unambiguous.

quality signals:
- The responsibility is specific enough to exclude related but distinct components
- The "why a component" question is answered — there is a clear reason for reuse
- The scope is bounded — a component that "does everything" is not well-specified
-->

## Variants

<!-- mentor
Every distinct visual variant of this component. Variants are different intended appearances (primary/secondary, large/small, filled/outlined). Each variant should have a name and a description of how it differs visually and when it should be used.

quality signals:
- All variants used across screens are listed
- Each variant name matches the prop name used in the implementation
- Usage guidance is provided (not just appearance)
-->

## States

<!-- mentor
Every visual state the component can be in: default, hover, focus, active, disabled, loading, error. Each state should describe what changes visually — not just that the state exists, but what the user sees. States are where most implementation bugs hide.

quality signals:
- Default state is always listed first
- Every interactive state has a visual description
- Disabled state behavior is explicit (not clickable? grayed out? cursor change?)
- Loading state is described if applicable
- Error state is described if the component can fail
-->

## Tokens used

<!-- mentor
Which design tokens from _tokens.md this component uses. This section ensures the component stays within the token system and makes future theme changes predictable. List tokens by category.

quality signals:
- Every color in the component maps to a token
- Every spacing value maps to a token
- Every typography property maps to a token
- No hardcoded values (no #ffffff, no 16px, no 1.5 that don't have a token)
-->

## Composition rules

<!-- mentor
Can this component contain other components? What are the rules? What can be nested inside it? What cannot? Composition rules prevent layout bugs that only appear when components are combined.

quality signals:
- Explicitly states whether the component is a container or a leaf
- If it's a container, describes what it accepts (slots, children, specific components only)
- Maximum nesting depth is noted if relevant
-->

## Notes

<!-- mentor
Any implementation notes, edge cases, or known limitations that don't fit in the other sections.

quality signals:
- This section is only present if there is something worth noting
- Notes are specific enough to act on, not general reminders
-->
