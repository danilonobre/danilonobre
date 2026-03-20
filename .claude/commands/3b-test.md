# Test & Validate

We have a completed implementation. Now validate it against the acceptance criteria.

Before starting, read:
- /specs/PRODUCT_CONTEXT.md
- /specs/constitution.md
- The relevant task file for this pack

## Process

Step 1: Run the build
- `npm run build` — must pass with zero errors and zero TypeScript errors.
- Report any build failures immediately.

Step 2: Walk every task's acceptance criteria
- For each task in the pack task file, list every AC item.
- For each AC item, determine: PASS | FAIL | MANUAL (requires live browser testing).
- PASS: verified by reading the code — the behavior is clearly implemented.
- FAIL: the code does not implement the AC, or there is a bug.
- MANUAL: cannot be verified statically (DB behavior, network calls, UI interactions).

Step 3: Report
- Produce a table: Task | AC | Status | Notes
- Group FAILs at the top.
- List all MANUAL items with what to check in the browser.
- If any FAILs exist: fix them (one commit per fix, `fix:` prefix), then re-report.

Step 4: Verdict
- If zero FAILs: declare "Ready for /4-spec-sync". Next step: /4-spec-sync.
- If FAILs remain after 2 fix attempts: stop and ask the user.

Rules:
- Do not mark an AC as PASS just because the code exists — verify the logic is correct.
- Do not implement new features during this step.
- Do not modify specs during this step.

$ARGUMENTS
