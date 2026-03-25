# Task - MainWindow Default Open Tool Windows

## Goal
Allow consumers to configure which tool windows are open when MainWindow first renders, without editing the component source.

## Requirements
- Add a prop to control which tool windows appear open by default
- E.g. AI Assistant should be hideable by simply not including it in the list
- Follow Component Editability specs: new prop is optional, omitting it gives current behavior
- Export a constant with the default set so consumers can filter/extend it

## Plan
1. Add `defaultOpenToolWindows` prop — array of stripe item IDs that should be open on mount
2. Derive initial `showLeftPanel` / `showRightPanel` / `showBottomPanel` state from this prop
3. Derive initial stripe selection for each panel from the first matching ID in the array
4. Export `DEFAULT_OPEN_TOOL_WINDOWS = ['project', 'ai', 'terminal']`
5. Update `index.d.ts` with the new prop and export
6. Update Component Editability specs — mark this sub-issue as addressed

## Progress
- 2026-03-25: Task created, implementation started
- 2026-03-25: Implemented `defaultOpenToolWindows` prop, updated types + exports + specs

## Results
- Added `defaultOpenToolWindows` prop to `MainWindow` (default: `['project', 'ai', 'terminal']`)
- Component derives initial panel visibility from the array — if a panel's stripe ID is in the array, that panel starts open
- Exported `DEFAULT_OPEN_TOOL_WINDOWS` constant from library
- Updated `index.d.ts`, `index.js`, and Component Editability specs

### Files changed
- `src/ui/components/mainwindow/MainWindow.jsx` — new prop + init logic
- `src/lib/index.js` — export the new constant
- `src/lib/index.d.ts` — type for new prop + constant
- `ai/specs/Component Editability specs.md` — documented the new prop
