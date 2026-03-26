# Task - Terminal Popup Menus Update

## Goal
Update the three Terminal popup menus (toolbar right-click, 3-dots, chevron) to match the finalized menu structures provided by the user. Update specs and implement changes in TerminalWindow.

## Requirements

### Toolbar context menu (right-click on empty space in header):
```
Rename Session
Move to Editor
Terminal Engine →
⚙ Settings
─────────────────────────
Close All
✓ Show Toolbar
Group Tabs
View Mode →
Move to →
Resize →
─────────────────────────
Remove from Sidebar
─────────────────────────
Hide
```

### 3 dots menu structure:
```
Terminal Engine →
⚙ Settings
─────────────────────────
Close All
✓ Show Toolbar
View Mode →
Move to →
Resize →
─────────────────────────
Remove from Sidebar
```

### Chevron popup near Plus button:
```
bash
zsh
New SSH Session...
──────────────────
⚙ Settings
```

## Changes vs Current Implementation

1. **3 dots menu**: Remove "Group Tabs" item
2. **Header right-click menu**: Add a separator between "Remove from Sidebar" and "Hide"
3. **Chevron menu**: No changes needed (already matches)

## Plan

1. Update `ai/specs/Terminal specs.md` — Popup Menus section
2. Update `moreMenuItems` in `TerminalWindow.jsx` (remove Group Tabs)
3. Update `headerContextMenuItems` in `TerminalWindow.jsx` (add separator before Hide)

## Progress

### 2026-03-26
- Task created
- Compared current implementation with new requirements
- Identified 2 changes: remove Group Tabs from more menu, add separator before Hide in header context menu

## Additional Requirement (2026-03-26)

Closing the last tab should minimize the terminal, not block the close action.

### Change
- In `handleTabClose`: when `tabs.length <= 1`, fire `onActionClickProp('minimize')` instead of blocking.
- Works in both controlled and uncontrolled modes — the minimize action propagates to the parent (e.g. MainWindow hides the panel).

## Results

- Specs updated in `ai/specs/Terminal specs.md`
- Implementation updated in `src/ui/components/toolwindow/TerminalWindow.jsx`
