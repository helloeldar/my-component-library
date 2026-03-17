# Islands UI Components Audit Specs

## Overview

This task covers recreating the Islands UI Kit components used by this repo as accurately as possible, so the library can support high-quality JetBrains IDE prototypes.

## Source of Truth

- Figma page: `https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6204-73431`
- Repo task brief: `ai/tasks/Task - Recreate all Islands UI components.md`
- Exported tokens: `figma-exports/`
- Design references: `ui-guidelines/`

## Requirements

- Audit what already exists in the repo.
- Identify what is missing.
- Check whether the existing implementations are visually accurate.
- Build a list of Islands UI components and link them to their Figma component sets.
- Track component status with at least:
  - implemented or not
  - accuracy or fidelity status
  - designer review status

## Constraints

- Reuse existing components whenever possible.
- Keep consistency with the existing design system.
- Do not invent new components unless explicitly requested.
- Reuse existing icons only.
- Use the same component names as in the Figma UI Kit where practical.

## Initial audit scope discovered

- Popups
- Dialogs
- Main window
- Tool windows
- Inputs
- Existing library controls and layout primitives already present in `src/ui/components/`

## Working approach

1. Capture the Figma page structure and identify major component groups.
2. Inventory the current repo components and exported public API.
3. Map repo components to Figma groups and component sets.
4. Mark gaps and fidelity issues.
5. Implement or refine components in small batches.
