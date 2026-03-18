# Task: Align Run Widget with Figma Specs

## Original Request
> Align Run Widget with Specs
> https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6702-85839

## Requirements
1. Create a dedicated RunWidget component matching Figma "Main Toolbar / Run Widget"
2. Support 3 states: Default, Running, Debugging
3. Action buttons use 34×40px sizing with 16×16 stroke icons (not 40×40 MainToolbarIconButton)
4. Green accent background for Run/Rerun/RestartDebug active buttons
5. Red accent background for Stop button
6. Status badge (green dot) on dropdown icon in Running/Debugging states
7. More (⋮) button present in all states
8. Add toolbar-run/stop design tokens to Themes.css

## Changes Made

### New Files
- `src/ui/components/runwidget/RunWidget.jsx` — RunWidget component with RunWidgetButton (internal)
- `src/ui/components/runwidget/RunWidget.css` — All styles
- `ai/specs/Run Widget specs.md` — Figma spec documentation

### Modified Files
- `src/ui/styles/Themes.css` — Added `--toolbar-run-bg`, `--toolbar-run-bg-hovered`, `--toolbar-stop-bg`, `--toolbar-stop-bg-hovered`, `--toolbar-icon-over-accent` to both light and dark themes
- `src/ui/components/showcase/MainToolbar.jsx` — Replaced inline run-widget with `<RunWidget />`, added `runState` prop
- `src/ui/components/showcase/MainToolbar.css` — Removed `.run-widget` rule (now in RunWidget.css)
- `src/lib/index.js` — Added RunWidget export
- `src/lib/index.d.ts` — Added RunWidgetProps interface and export

## Status: In Progress
