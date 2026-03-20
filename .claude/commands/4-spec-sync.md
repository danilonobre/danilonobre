# Spec Sync

Implementation is complete. Now sync specs to reflect what was actually built.

Before starting, read the plan file and task file for this pack.

---

## If this pack contains features

For each implemented feature, read the corresponding `work/changes/YYYY-MM-DD_feature_[name].md` and process the **Spec artifacts** list:

For each artifact marked CREATE:
- Create the file with content that accurately reflects what was built.
- Use existing spec files in the same category as reference for structure and tone.

For each artifact marked UPDATE:
- Open the file and apply the necessary updates to reflect what was built.
- Do not rewrite sections unrelated to this feature.

For each artifact marked FLAG:
- Do not edit the file. Present the insight to the user and wait for explicit confirmation before adding anything.

If no Spec artifacts were listed and no deviations were recorded:
- Declare "No spec artifacts to sync for this feature." and skip to cleanup.

---

## If this pack contains bugs

For each implemented bugfix, read the corresponding `work/changes/YYYY-MM-DD_bug_[name].md` and process the **Spec corrections** list:

For each correction listed:
- Open the file and apply the correction so the spec accurately describes the current correct behavior.
- Do not rewrite sections unrelated to this bugfix.

If no Spec corrections were listed:
- Declare "No spec corrections needed for this bugfix." and skip to cleanup.

---

## For all packs

After processing artifacts and corrections, verify:
- `specs/DECISIONS.md` — add entries for any non-obvious decisions made during implementation that are not already covered by the feature/bug pack.
- `specs/GLOSSARY.md` — add any new terms introduced during implementation.

---

## Cleanup

Delete the following files for this pack:
- `work/plans/YYYY-MM-DD_[pack-name].md`
- `work/tasks/YYYY-MM-DD_[pack-name].md`

Keep `work/changes/` — this is the permanent record.

---

$ARGUMENTS

After syncing, list all changes made to specs and files deleted, and stop for confirmation.

Next step: /5-deploy
