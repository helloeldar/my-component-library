How it looks
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-143445&t=V8DOXcjhgUO6bzb3-4

Only Island theme is supported (no "default" flat theme). See Themes specs.md.

Toolwindows should be resizable.

Only one tool window might have focused stripe icon at the time. The one that have focus should have Active state.

## Tool Window Focus Behavior

When a tool window receives focus (clicked):

- Its **tab** becomes **Active** (blue background/border from `--tool-window-tab-selected-bg-active` /
  `--tool-window-tab-selected-border-active`)
- Its **stripe button** becomes **Selected** (filled background with white icon)
- All other open tool windows become **Inactive**:
    - Their tabs use the default gray selected style (`--tool-window-tab-selected-bg` /
      `--tool-window-tab-selected-border`)
    - Their stripe buttons use the **Inactive** state (gray filled background, normal icon color)
- Closed tool windows' stripe buttons remain in **Default** state

When the editor receives focus (clicked):

- Opened **Editor tab** become **Active** (blue background/border from active tokens)
- All open tool windows become **Inactive**

### Implementation

- `ToolWindow` accepts `focused` and `onFocus` props
- `focused` is passed through ToolWindow → ToolWindowHeader → Tab component
- The shared `Tab` component handles active/focused styling via its `focused` prop (`tab-selected-active` class)
- Layout components (MainWindow, IDEWindow) track `focusedPanel` state (`'left'` | `'right'` | `'bottom'` | `'editor'` |
  `null`)
- Clicking a tool window or its stripe sets `focusedPanel`; clicking the editor area sets it to `'editor'`
- Stripe `state` is computed: `'selected'` (focused), `'inactive'` (open but unfocused), `'default'` (closed)
- Editor tabs receive `focused` prop based on `focusedPanel === 'editor'` to apply active styling

## Component location

- `src/ui/components/mainwindow/MainWindow.jsx` (formerly IDELayout.jsx — consolidated from duplicate MainWindow +
  IDELayout)
- CSS: `src/ui/components/mainwindow/MainWindow.css` (CSS classes use `main-window-*` prefix)
- Route: `/mainwindow`

## Tab Component Reuse

Both editor tabs (via `TabBar`) and tool window header tabs (via `ToolWindowHeader`) use the **same shared `Tab` component** (`src/ui/components/tabs/Tab.jsx`). This ensures consistent height, gap, and styling across the entire IDE layout.

- `ToolWindowHeader` renders `Tab` components inside `.tw-tab-bar-tabs` container
- `TabBar` renders `Tab` components inside `.tab-bar` container
- Both pass `focused` prop to `Tab` for active state styling

## Stripe Token Overrides (Island Theme)

The island theme stripes sit on a dark background, so they use transparent white overlays instead of the default theme tokens:

| State | Token | Value |
|---|---|---|
| Hovered | `toolbar/toolbar-bg-hovered` | `#FFFFFF17` (FFF 9%) |
| Pressed (:active) | `toolbar/toolbar-bg-pressed` | `#FFFFFF29` (FFF 16%) |
| Inactive (unfocused) | `toolbar/toolbar-bg-pressed` | `#FFFFFF29` (FFF 16%) |

These are set as CSS variable overrides on `.main-window-island .main-window-stripe` in `MainWindow.css`.

## Height Prop

MainWindow accepts a `height` prop (default `800`) to control its rendered height.

- Default `800` (px) ensures a predictable, fixed size when dropped into a prototype page — prevents it from filling the entire viewport.
- Pass `height="100%"` when embedding in a full-screen container.
- Pass any number (pixels) or string (CSS value) to override.
- CSS no longer sets `height: 100%`; only `min-height: 600px` is enforced via CSS.

## Features

- Island theme only (no "default" flat theme)
- Panel toggling (left, right, bottom) via stripe buttons
- Specialized tool windows: ProjectWindow, TerminalWindow, AIAssistantWindow
- Editor area with CodeExample and line numbers

## Split Left Tool Window

The left stripe's top section supports a separator that splits the left panel into two independent vertical sub-panels.

- Items **before** the separator open in the **top sub-panel**
- Items **after** the separator open in the **split (bottom) sub-panel**
- Both sub-panels are independently open/closeable; each minimize button closes only its own sub-panel
- If no separator exists in the top group → single left panel, identical to previous behavior (backward compatible)

### State

Two independent state pairs replace the previous single `leftStripeSelection` / `showLeftPanel`:

```js
const [leftTopSelection, setLeftTopSelection]       // active item in top sub-panel
const [showLeftTopPanel, setShowLeftTopPanel]        // top sub-panel visibility
const [leftSplitSelection, setLeftSplitSelection]   // active item in split sub-panel
const [showLeftSplitPanel, setShowLeftSplitPanel]   // split sub-panel visibility
```

`showLeftPanel` is derived: `showLeftTopPanel || showLeftSplitPanel`.

### Layout

```
Left stripe:       Left panel column:
 [Project]    -->  +------------------+
 [Commit]          |  Project         |  ← top sub-panel (flex: 1)
  --------         +------------------+  ← gap: 4px
 [Bookmarks] -->   |  Bookmarks       |  ← split sub-panel (flex: 1)
── bottom ──       +------------------+
 [Terminal]  -->   Bottom panel
```

CSS class `.main-window-left-panel-column` is a flex column; each child gets `flex: 1 / min-height: 0`.

### Stripe item setup example

```jsx
leftStripeItems={[
  { id: 'project',   icon: 'toolwindows/project@20x20',   tooltip: 'Project',   section: 'top' },
  { id: '_sep',      separator: true,                                             section: 'top' },
  { id: 'bookmarks', icon: 'toolwindows/bookmarks@20x20', tooltip: 'Bookmarks', section: 'top' },
  { id: 'terminal',  icon: 'toolwindows/terminal@20x20',  tooltip: 'Terminal',  panel: 'bottom', section: 'bottom' },
]}
defaultOpenToolWindows={['project', 'bookmarks', 'terminal']}
```

## Custom Panel Content & Default Renderers

`leftPanelContent`, `rightPanelContent`, `bottomPanelContent` are optional render functions. If omitted, the built-in defaults are used.

### Problem with full replacement

Passing `leftPanelContent` replaces the entire built-in renderer — impossible to add a custom tool window while keeping built-in ones (Project, Commit).

### Solution: exported default renderers

```jsx
import { MainWindow, defaultLeftPanelContent } from '@jetbrains/int-ui-kit'

<MainWindow
  leftStripeItems={[
    ...DEFAULT_LEFT_STRIPE_ITEMS,
    { id: 'agent-tasks', icon: <img src={claudeSvg} />, tooltip: 'Agent Tasks', section: 'top' },
  ]}
  leftPanelContent={(id, ctx) => {
    if (id === 'agent-tasks') return <AgentTasksPanel />
    return defaultLeftPanelContent(id, ctx)  // delegate to built-in
  }}
/>
```

Exported: `defaultLeftPanelContent`, `defaultRightPanelContent`, `defaultBottomPanelContent`.

## PanelContext Type

The `ctx` argument passed to panel content functions is now typed as `PanelContext`:

```ts
export interface PanelContext {
  projectName: string;
  projectTreeData: any[];
  focusedPanel: string;
  setFocusedPanel: (panel: string) => void;
  setShowLeftPanel: (show: boolean) => void;
  setShowRightPanel: (show: boolean) => void;
  setShowBottomPanel: (show: boolean) => void;
  terminalTabs: any[];
  activeTerminalTab: number;
  setActiveTerminalTab: (index: number) => void;
  handleTerminalTabClose: (index: number) => void;
  handleTerminalTabAdd: () => void;
}
```

Note: when a split sub-panel calls `setShowLeftPanel(false)`, it closes only its own sub-panel (the context is scoped per-render).

## StripeItemDef.icon accepts ReactNode

`StripeItemDef.icon` accepts `string | ReactNode`. Pass a React element for custom icons (e.g. a Claude `<img>` tag). The runtime `StripeIconButton` already renders both.

```jsx
{ id: 'claude', icon: <img src={claudeSvg} width={20} height={20} />, tooltip: 'Claude', section: 'top' }
```