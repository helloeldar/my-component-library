# Task — MainWindow Flexibility Improvements

## Goal

Make `MainWindow` flexible enough for realistic IDE prototypes (like Nikita's experiment) without requiring custom CSS workarounds or re-implementing built-in tool window logic from scratch.

## Requirements

Discovered during the Nikita experiment — an attempt to recreate a JetBrains IDE main window using only int-ui-kit components. Four gaps were identified:

1. **Export default panel renderers** — `leftPanelContent` replaces the entire built-in renderer, making it impossible to add a custom tool window (e.g. Agent Tasks) alongside built-in ones (Project, Commit) without re-implementing them. Need to export the default renderers so consumers can delegate for non-custom IDs.

2. **ReactNode stripe icons** — Custom icons (e.g. Claude SVG via `<img>`) can't be used in stripe items because `StripeItemDef.icon` is typed as `string` only. Runtime already supports ReactNode; only a type fix was needed.

3. **Panel context types** — The `ctx` argument in `leftPanelContent(id, ctx)` is typed as `any`. Consumers have to guess the shape.

4. **Split left tool window** — The left stripe's top section should be splittable at a separator: items before open in the top sub-panel, items after open in a bottom sub-panel. Both sub-panels are independently open/closeable. This matches real IntelliJ behavior.

## Plan

1. Export `defaultLeftPanelContent`, `defaultRightPanelContent`, `defaultBottomPanelContent` from `MainWindow.jsx`, `index.js`, `index.d.ts`
2. Update `StripeItemDef.icon` type to `string | ReactNode` in `index.d.ts`
3. Define and export `PanelContext` interface; update panel content function signatures
4. Implement split left tool window in `MainWindow.jsx` + `MainWindow.css`
5. Create task and spec files

## Progress

### 2026-03-26
- Task created, all gaps identified from Nikita experiment analysis
- All 4 library changes implemented on branch `mainwindow-flexibility-improvements`
- Library rebuilt and bumped to v0.3.0
- Consumer (`int-ui-prototypes`) vendor folder updated with the new build
- Nikita prototype rewritten to use all new features
- Consumer guide and template created

## Results

### Library changes (v0.2.0 → v0.3.0, branch `mainwindow-flexibility-improvements`)

| File | Change |
|---|---|
| `src/ui/components/mainwindow/MainWindow.jsx` | Split left panel logic; exported `defaultLeftPanelContent`, `defaultRightPanelContent`, `defaultBottomPanelContent` |
| `src/ui/components/mainwindow/MainWindow.css` | Added `.main-window-left-panel-column` flex column layout |
| `src/lib/index.js` | Re-export of three default panel renderers |
| `src/lib/index.d.ts` | `PanelContext` interface; `StripeItemDef.icon: string | ReactNode`; typed panel content props; default renderer function declarations; corrected `StripeIconButton` prop types |
| `dist/esm/index.js`, `dist/esm/styles.css` | Rebuilt outputs |

### Consumer updates

| File | Change |
|---|---|
| `int-ui-prototypes/vendor/@jetbrains/int-ui-kit/index.js` | Copied from rebuilt `dist/esm/` |
| `int-ui-prototypes/vendor/@jetbrains/int-ui-kit/styles.css` | Copied from rebuilt `dist/esm/` |
| `int-ui-prototypes/src/tasks/NikitaExperiment/index.jsx` | Rewritten to use all 3 new features |

### Docs and templates

| File | Description |
|---|---|
| `docs/mainwindow-v0.3-guide.md` | Consumer guide — all 4 features with code examples |
| `templates/ide-with-custom-panels.jsx` | Copy-paste ready template for split panel + custom tool window |
| `ai/specs/Main Window specs.md` | Updated with split panel, PanelContext, and ReactNode icon docs |

---

## Audit Round 2 — 2026-03-26

### Goal
Address API opaqueness identified after consumer use of the library:
1. Add per-tab editor content (`editorTabContents`)
2. Tighten types (`runState`, `PanelContext.focusedPanel`, `PanelContext.terminalTabs`)
3. Add comprehensive JSDoc to all components and prop definitions

### Changes

| File | Change |
|---|---|
| `src/ui/components/mainwindow/MainWindow.jsx` | Added `editorTabContents` prop, internal active-tab state tracking, per-tab content resolution, `DEFAULT_EDITOR_TAB_CONTENTS` constant, JSDoc on all exported functions |
| `src/lib/index.js` | Re-exported `DEFAULT_EDITOR_TAB_CONTENTS` |
| `src/lib/index.d.ts` | Added `EditorTabContent` interface; added `editorTabContents?: Record<string, EditorTabContent>` to `MainWindowProps`; narrowed `runState` to a union; added `TerminalTabDef` interface; narrowed `PanelContext.terminalTabs` to `TerminalTabDef[]`; narrowed `focusedPanel`/`setFocusedPanel` to a union; added JSDoc to all `MainWindowProps` fields; added JSDoc to `EditorTabDef` fields |
| `src/ui/components/editor/Editor.jsx` | Added full JSDoc block to `Editor` function |
| `src/ui/components/toolwindow/ToolWindow.jsx` | Added full JSDoc block to `ToolWindow` function |
| `src/ui/components/toolwindow/ProjectWindow.jsx` | Updated JSDoc to include `defaultSelectedId` and `...props` |
| `dist/esm/index.js`, `dist/esm/styles.css` | Rebuilt |

### Per-tab editor content — how it works

```jsx
<MainWindow
  editorTabs={[
    { id: 'readme', label: 'README.md', icon: 'fileTypes/markdown', closable: true },
    { id: 'main',   label: 'Main.java',  icon: 'fileTypes/java',     closable: true },
  ]}
  editorTabContents={{
    readme: { language: 'markdown', code: '# Hello World' },
    main:   { language: 'java',     code: 'public class Main {}' },
  }}
/>
```

- Active tab's id is looked up in `editorTabContents`
- Falls back to `editorCode`/`editorLanguage`/`editorTopBar` if no entry for that tab
- `topBar` can also be per-tab: `editorTabContents.myTab.topBar = <MyInputBar />`
- Use `DEFAULT_EDITOR_TAB_CONTENTS` with `DEFAULT_EDITOR_TABS` for distinct content per default tab

---

### Change 1 — Export default panel renderers

`defaultLeftPanelContent`, `defaultRightPanelContent`, `defaultBottomPanelContent` are now importable. Consumers can extend instead of replace:

```jsx
import { MainWindow, defaultLeftPanelContent } from '@jetbrains/int-ui-kit'

leftPanelContent={(id, ctx) => {
  if (id === 'agent-tasks') return <AgentTasksPanel ctx={ctx} />
  return defaultLeftPanelContent(id, ctx)  // handles Project, Commit, etc.
}}
```

### Change 2 — ReactNode stripe icons

`StripeItemDef.icon` now typed as `string | ReactNode`. Pass any React element:

```jsx
const claudeStripeIcon = <img src={claudeIconUrl} width={20} height={20} />

{ id: 'agent-tasks', icon: claudeStripeIcon, tooltip: 'Agent Tasks', section: 'top' }
```

Gets standard stripe hover/active states (including blue active background).

### Change 3 — PanelContext type

`PanelContext` exported from `index.d.ts`. Panel content signatures updated from `context: any` to `context: PanelContext`. Includes `setShowLeftPanel`, `setFocusedPanel`, `projectTreeData`, terminal tab handlers, etc.

Note: in split mode, `ctx.setShowLeftPanel(false)` closes only the sub-panel that rendered the content — not both.

### Change 4 — Split left tool window

Add a `separator` in the `section: 'top'` group of `leftStripeItems`. Items before it open in the top sub-panel; items after it open in the split (bottom) sub-panel. Independently toggleable.

```jsx
leftStripeItems={[
  { id: 'project',     icon: 'toolwindows/project@20x20', tooltip: 'Project',     section: 'top' },
  { id: 'commit',      icon: 'toolwindows/commit@20x20',  tooltip: 'Commit',      section: 'top' },
  { id: '_sep',        separator: true,                                             section: 'top' },
  { id: 'agent-tasks', icon: claudeStripeIcon,             tooltip: 'Agent Tasks', section: 'top' },
  { id: 'terminal',    icon: 'toolwindows/terminal@20x20', tooltip: 'Terminal',    panel: 'bottom', section: 'bottom' },
]}
defaultOpenToolWindows={['project', 'agent-tasks', 'terminal']}
```

Result: Project opens top-left, Agent Tasks opens bottom-left (split), Terminal in the bottom bar.  
No separator → single left panel, backward compatible.
