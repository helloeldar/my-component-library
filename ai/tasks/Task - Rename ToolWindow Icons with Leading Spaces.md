# Task - Rename ToolWindow Icons with Leading Spaces

## Original Message
"there is a problem with filenames in src/icons/toolwindows/ dbms@20x20.svg files have space in the beginning. Can you rename them using Intellij smart features, that will also update all usages?"

## Interpretation
Many icon files in `src/icons/toolwindows/` have a leading space in their filenames (e.g., `" dbms@20x20.svg"`). This leads to inconsistent naming and potential issues with imports/usages. Some renames might have already been done manually (using `mv`), but not all usages in the code were updated, and the git index is in a messy state. The goal is to:
1. Identify all files with leading spaces (using `files_with_spaces.txt` as a reference).
2. Use "Intellij smart features" (i.e., `rename_element` tool) to rename them correctly and update all usages.
3. Fix any broken usages in the codebase (e.g., in `src/ui/components/toolwindow/TerminalWindow.jsx`).
4. Ensure the git index correctly reflects these renames.

## Requirements
- Rename files in `src/icons/toolwindows/` to remove leading spaces.
- Update all imports in `src/lib/iconRegistry.js`.
- Update all usages in components (e.g., `TerminalWindow.jsx`, `MainWindow.jsx`).
- Ensure no files with leading spaces remain in `src/icons/toolwindows/`.
- Ensure all renames are properly tracked in git.

## Progress
- [x] Research files and usages ✓
- [x] Rename files and update usages ✓
- [x] Verify fix ✓
