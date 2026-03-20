# Deploy

Specs are synced. Ready to merge to main.

Step 1: Pre-flight checks
- Confirm /4-spec-sync has been completed for this pack.
- Run `npm run build` one final time — must pass with zero errors.
- Check for uncommitted changes. If any exist, stop and list them to the user before proceeding. Do not merge with a dirty working tree.
- Ensure `.claude/worktrees/` is not staged or tracked — remove from git if needed.
- Show a summary of what will be merged: branch name, number of commits, and the list of commits with their messages.
- Stop and ask for explicit user confirmation before proceeding.

Step 2: Merge to main
- Switch to main.
- Pull latest main to ensure it is up to date.
- Merge the pack branch into main using --no-ff to preserve the branch history.
- Push main to origin.

Step 3: Cleanup
- Delete the local pack branch.
- Confirm the final state of main matches what was merged.
- Confirm there are no uncommitted changes or untracked artifacts remaining.

Step 4: Release summary
- List every bug fixed and every feature shipped in this pack, in plain language.
- Map each item to its spec file for traceability.
- Confirm deploy is complete.

$ARGUMENTS
