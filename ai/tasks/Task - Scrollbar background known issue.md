# Task - Make Scrollbars Fully Transparent (No Background)

## Goal
Remove all background colors from scrollbars in the UI Kit so the track area is always transparent — both at rest and on hover.

## Requirements
- Scrollbar track must always be transparent (no color, no bg) — even when the container is hovered.
- Scrollbar thumb still appears on hover (semi-transparent), but the track/rail stays invisible.
- Apply to both `src/ui/styles/Themes.css` and `prototyping-kit/styles/Themes.css`.

## Plan
1. Change `--scrollbar-track-hover` from `var(--gray-10)` / `var(--gray-130)` → `transparent` in both light and dark themes.
2. Apply same change to the prototyping-kit Themes.css.
3. Fix Editor scrollbar: remove `scrollbar-width: thin` which was overriding all `::-webkit-scrollbar` rules.
4. Update Scrollbar specs.md to reflect new behavior.

## Progress
- 2026-03-25: Task created, implementation in progress.
- 2026-03-25: Changed `--scrollbar-track-hover` to `transparent` in both Themes.css files. Added `::-webkit-scrollbar-corner` rules.
- 2026-03-25: Found real root cause — `scrollbar-width: thin` on `.prism-code-editor` in Editor.css was causing Chrome 121+ to completely ignore all `::-webkit-scrollbar` pseudo-element rules, rendering OS-default scrollbar instead. Removed it. Cleaned up unnecessary Editor-specific overrides and reverted `--pce-bg` back to `transparent`.

## Root Cause (Final)
Since Chrome 121 (Jan 2024), the standard CSS `scrollbar-width` / `scrollbar-color` properties **completely override** `::-webkit-scrollbar` pseudo-elements. When `scrollbar-width: thin` was set on `.prism-code-editor`, Chrome silently ignored ALL the custom `::-webkit-scrollbar-track { background: transparent }` rules and rendered the default OS scrollbar with a visible gray/white track.

## Results
- Removed `scrollbar-width: thin` from `.editor-code .prism-code-editor` in Editor.css.
- Changed `--scrollbar-track-hover` to `transparent` in light + dark themes in both Themes.css files.
- Added `::-webkit-scrollbar-corner { background: transparent }` globally.
- Reverted `--pce-bg` back to `transparent` (the `.editor` parent provides the background).
- Updated Scrollbar specs.
