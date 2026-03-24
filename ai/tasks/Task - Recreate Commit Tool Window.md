# Task: Recreate Commit Tool Window

## Source
- **Figma**: [Tool Window / Commit — node 27921:15443](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=27921-15443&t=V8DOXcjhgUO6bzb3-4)

## Spec
See [Commit Tool Window specs](../specs/Commit%20Tool%20Window%20specs.md)

## Requirements (from user)
Implement using only library components.  
Tool Window / Commit — Figma node 27921:15443.

## Understanding
Implement a VCS Commit tool window that looks like the real IntelliJ Commit panel.  
Must use only existing library components (no custom SVG icons, no new component inventions).

## Plan
1. ✅ Fetch Figma design context + screenshot for node 27921:15443
2. ✅ Identify all existing library components and icons needed
3. ✅ Create `CommitWindow.jsx` using `ToolWindow`, `Checkbox`, `Button`, `ToolbarIconButton`, `Icon`
4. ✅ Create `CommitWindow.css` with layout styles
5. ✅ Update `componentsConfig.js` — add entry key=`commit`
6. ✅ Update `App.js` — add import, `CommitWindowPage`, route `/commit`
7. ✅ Update spec + task files

## Result
- **Component:** `src/ui/components/toolwindow/CommitWindow.jsx`
- **CSS:** `src/ui/components/toolwindow/CommitWindow.css`
- **Route:** `/commit`
- **Sidebar:** App Kit → Commit

### Components used
| Library Component | Purpose |
|---|---|
| `ToolWindow` | Outer container (title, header actions) |
| `ToolbarIconButton` | All toolbar icon buttons (top + bottom) |
| `Checkbox` | Group/file row checkboxes + Amend toggle |
| `Button` | Commit (primary) and Commit and Push... (secondary) |
| `Icon` | File type icons, chevron arrows |

### Icons used
`general/refresh`, `vcs/revert`, `vcs/patch`, `aiAssistant/aiAssistantColored`, `general/show`, `general/expandAll`, `general/collapseAll`, `general/history`, `general/settings`, `fileTypes/java`, `general/chevronDown`, `general/chevronRight`

## Status
- [x] Done — 2026-03-23
