# Task - Toolbar button pressed state while popup is open

## Goal
Toolbar buttons that trigger a popup should remain visually in the "pressed" state for as long as their popup is open, matching the IntelliJ Platform behaviour documented in the Popup specs.

## Requirements
- When a toolbar button (icon button or dropdown button) opens a popup, it must stay in the pressed/active visual state until the popup closes.
- Applies to:
  - VCS/Branch dropdown in MainToolbar (opens PopupBranches)
  - Run config dropdown in RunWidget (opens PopupRunWidget)
  - MainToolbar icon buttons: Search Everywhere (opens SearchEverywherePopup overlay), Settings (opens SettingsDialog overlay)

## Plan
1. Add `pressed` prop to `MainToolbarDropdown` → apply `.main-toolbar-dropdown-pressed` CSS class.
2. Pass `pressed={branchesOpen}` to the VCS `MainToolbarDropdown` in `MainToolbar.jsx`.
3. Add `dropdownPressed` prop to `RunWidget` → forward to inner `MainToolbarDropdown`.
4. Pass `dropdownPressed={runPopupOpen}` to `RunWidget` in `MainToolbar.jsx`.
5. Add `popupOpen` prop to `ToolbarIconButton` (IconButton.jsx) → apply `.toolbar-icon-button-popup-open` CSS class (same visual as pressed).
6. Add `.toolbar-icon-button-popup-open` CSS rule to `IconButton.css`.
7. Accept `searchEverywhereOpen` / `settingsOpen` props in `MainToolbar.jsx` and pass them to the respective icon buttons.
8. Pass `searchEverywhereOpen={showSearchEverywhere}` and `settingsOpen={showSettings}` from `MainWindow.jsx` to `MainToolbar`.

## Progress
- 2026-03-26: Task created.
- 2026-03-26: Discovered the scope is specifically the chevron (shell selector) and "more" icon buttons in TerminalWindow.
- 2026-03-26: Found bug — CSS already had the concept but used wrong class name `.tool-window-action-button` (doesn't exist) instead of `.toolbar-icon-button`, and set `background` directly on the button instead of the `::before` state layer. Fixed in `TerminalWindow.css`.

## Results
- Fixed CSS selector: `.tool-window-action-button` → `.toolbar-icon-button`
- Fixed property: `background` on button element → `background` on `::before` pseudo-element using `var(--icon-button-pressed-bg)`
- Added `color: var(--text-default)` rule on button itself to match hover color
- File changed: `src/ui/components/toolwindow/TerminalWindow.css`
