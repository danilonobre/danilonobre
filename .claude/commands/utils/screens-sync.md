# Screens Sync

Sync screen specs from individual Figma node URLs.

- For each screen file in `specs/ui/screens/` that has a `figma_url:` field:
  - Read the Figma node at that URL.
  - Update the screen spec to reflect the current Figma design.
- Do not modify `_map.md` unless a screen was added or removed.
- Report all changes made and stop for confirmation.

$ARGUMENTS
