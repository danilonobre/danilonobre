# Implement

We have approved plans and tasks. Now implement.

Before starting:
- Read /specs/PRODUCT_CONTEXT.md, /specs/constitution.md, and the relevant task file for this pack.
- Create a branch named `pack/YYYY-MM-DD` from main if it does not already exist.

Rules:
- Implement one task at a time.
- Commit after each task: `feat: [description]` or `fix: [description]`.
- Use Figma MCP for visuals only when specs do not cover the visual detail needed. Do not read Figma speculatively.
- If you deviate from spec, document it immediately in an "Implementation Notes" block in the task file.
- If a task is ambiguous, stop and ask before assuming.
- If a bug fix fails after 2 attempts, stop. Summarize what was tried and what failed, and ask the user for guidance before continuing.

$ARGUMENTS

After implementation:
- Provide a short changelog.
- Provide a verification checklist mapped to the specs.

Test recommendation:
Evaluate whether running /3b-test is worthwhile for this pack using the following criteria:

Run /3b-test if any of the following are true:
- A bug fix involved state logic, calculations, or business rules (e.g. PRs, rounds, timers, scores)
- A new feature adds an end-to-end user flow
- Modified files are used in multiple parts of the app

Skip /3b-test if all of the following are true:
- Changes are purely visual or CSS-only
- Changes are text, copy, or meta tag updates
- Changes are trivial and isolated with no logic involved

End your output with an explicit recommendation:
"I recommend running /3b-test because [reason]. Next step: /3b-test"
or
"/3b-test is not necessary because [reason]. Next step: /4-spec-sync"

Spec sync preview:
At the end of implementation, evaluate the expected complexity of /4-spec-sync and include one of the following signals:

"Spec sync for this pack will be minimal — no deviations were recorded and existing specs already covered everything. /4-spec-sync should be quick."

or

"Spec sync for this pack requires attention — [list deviations found and any canonical spec that may have been indirectly affected]."
