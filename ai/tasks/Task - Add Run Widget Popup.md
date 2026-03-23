# Task: Add Run Widget Popup

## Status: Complete

## Requirements

When clicking the ToolbarDropdown inside the RunWidget, a popup should open showing:
- Recent run configurations with inline action buttons (Run, Debug, More)
- "All Configurations" expandable row with count
- "Current File" option
- "Edit Configurations..." with keyboard shortcut

Figma reference: Popup / Run Widget / Collapsed
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6451-85667

## Plan

1. Create specs documentation
2. Create PopupLineWithActions — reusable row with inline action buttons
3. Create PopupRunWidget — the full popup with hardcoded demo data
4. Wire popup into MainToolbar with toggle + click-outside
5. Register CSS in styles.js
6. Export from library index

## Results

### Files Created
- `ai/specs/Run Widget Popup specs.md` — Full specs with Figma reference
- `src/ui/components/popup/PopupLineWithActions.jsx` — Reusable row component
- `src/ui/components/popup/PopupLineWithActions.css` — Row styles
- `src/ui/components/popup/PopupRunWidget.jsx` — Popup component
- `src/ui/components/popup/PopupRunWidget.css` — Popup styles

### Files Modified
- `ai/specs/Run Widget specs.md` — Added popup reference
- `src/ui/components/showcase/MainToolbar.jsx` — Wired popup open/close
- `src/ui/components/showcase/MainToolbar.css` — Added run-widget-container positioning
- `src/lib/styles.js` — Registered new CSS
- `src/lib/index.js` — Exported new components
- `src/lib/index.d.ts` — Added TypeScript declarations

### Build
- Compiles with zero warnings/errors
