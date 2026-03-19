# Task: Recreate Popup Windows (Projects + Branches)

## Source
- **Popup / Projects**: [Figma](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6445-76525&t=V8DOXcjhgUO6bzb3-4)
- **Popup / Branches**: [Figma](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6451-81294&t=V8DOXcjhgUO6bzb3-4)

## Spec
See [Popup Windows specs](../specs/Popup%20Windows%20specs.md)

## Requirements (from user)
Recreate the Projects and Branches popup complex windows from Figma.

## Status
- [x] Popup / Projects — implemented
- [x] Popup / Branches — implemented
- [x] Registered in App.js, componentsConfig.js, lib/index.js
- [x] Build passes

## Implementation Details

### Files Created
- `src/ui/components/popup/PopupProjects.jsx` + `PopupProjects.css`
- `src/ui/components/popup/PopupBranches.jsx` + `PopupBranches.css`

### Popup / Projects
- Composes existing Popup + PopupCell components
- Custom `ProjectIcon` component renders 20x20 gradient rounded squares with monogram text (JetBrains Mono)
- 3 action items: New Project, Open (selected), Clone Repository
- Separator with "Recent Projects" header
- 4 recent project items with colored icons (commons-math, kotlin, IntelliJ IDEA, WebStorm)

### Popup / Branches
- Built on `.popup` base CSS class with custom search bar and tree sections
- Search bar with search icon, placeholder text, and 2 action buttons (fetch, settings)
- 3 VCS actions with keyboard shortcuts (Update ⌘T, Commit ⌘K, Push ⌘⇧K)
- New Branch + Checkout Tag actions
- Tree sections for Local (3 branches) and Remote (4 branches) with chevron headers
- Branch items with icons and submenu indicators

### Missing Icons
- `vcs/vcs` — Branch icon (used in Figma for Clone Repository and branch items). Using `vcs/changes` as substitute. Does not exist in current icon registry.

### Routes
- `/popupprojects` — Popup / Projects page
- `/popupbranches` — Popup / Branches page
