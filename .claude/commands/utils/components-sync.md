# Components Sync

Sync component specs from individual Figma node URLs.

- For each component file in `specs/ui/components/` that has a `figma_url:` field:
  - Read the Figma node at that URL.
  - Update the component spec to reflect the current Figma design.
- Do not modify `_map.md` unless a component was added or removed.
- Report all changes made and stop for confirmation.

$ARGUMENTS
