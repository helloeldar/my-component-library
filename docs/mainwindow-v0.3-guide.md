# MainWindow — v0.3.0 Consumer Guide

New in v0.3.0: four flexibility improvements to `MainWindow` that were missing when trying to build realistic IDE prototypes.

---

## 1. Export default panel renderers

**Problem before:** `leftPanelContent` completely replaced the built-in renderer. To add a custom tool window alongside the built-in Project or Commit windows, you had to re-implement those yourself.

**Now:** Import `defaultLeftPanelContent` (and `defaultRightPanelContent`, `defaultBottomPanelContent`) and delegate for IDs you don't override.

```jsx
import {
  MainWindow,
  defaultLeftPanelContent,
  DEFAULT_LEFT_STRIPE_ITEMS,
} from '@jetbrains/int-ui-kit'

<MainWindow
  leftStripeItems={[
    ...DEFAULT_LEFT_STRIPE_ITEMS,
    { id: 'agent-tasks', icon: claudeIcon, tooltip: 'Agent Tasks', section: 'top' },
  ]}
  leftPanelContent={(id, ctx) => {
    if (id === 'agent-tasks') return <AgentTasksPanel ctx={ctx} />
    return defaultLeftPanelContent(id, ctx) // Project, Commit, Structure — all built-in
  }}
/>
```

The same pattern works for `defaultRightPanelContent` and `defaultBottomPanelContent`.

---

## 2. Custom ReactNode icons in the stripe

**Problem before:** `StripeItemDef.icon` only accepted a string (icon name from the registry). Custom images or elements couldn't be used.

**Now:** Pass any React element as `icon`. The runtime in `StripeIconButton` already rendered both — this was a type-only fix.

```jsx
const claudeStripeIcon = (
  <img src={claudeIconUrl} width={20} height={20} alt="Claude" style={{ display: 'block' }} />
)

const leftStripeItems = [
  { id: 'project',     icon: 'toolwindows/project@20x20', tooltip: 'Project',     section: 'top' },
  { id: 'agent-tasks', icon: claudeStripeIcon,             tooltip: 'Agent Tasks', section: 'top' },
]
```

The Claude icon will get the standard stripe hover/active states (including the blue pill when selected).

### Recommendation: use monochrome icons

Built-in icons from the registry use `currentColor` — they automatically match the stripe's color scheme (grey in default/inactive, white when selected). **Custom colored icons don't do this** and will show their original colors regardless of state, which looks inconsistent.

**Add `monochrome: true`** on any `StripeItemDef` with a colored custom icon:

```jsx
const leftStripeItems = [
  { id: 'project',     icon: 'toolwindows/project@20x20', tooltip: 'Project',     section: 'top' },
  { id: 'agent-tasks', icon: claudeStripeIcon,             tooltip: 'Agent Tasks', section: 'top',
    monochrome: true }, // ← strips color; makes it greyscale in default/inactive, white when selected
]
```

What `monochrome` does per state:

| State | Effect |
|---|---|
| `default` / `inactive` | `filter: grayscale(1)` — strips color, matches other icons visually |
| `selected` | `filter: brightness(0) invert(1)` — pure white, same as built-in icons |

`monochrome` has no effect on string-based icons (they already use `currentColor`).

You can also use it directly on `StripeIconButton`:

```jsx
import { StripeIconButton } from '@jetbrains/int-ui-kit'

<StripeIconButton icon={claudeStripeIcon} monochrome state="selected" />
```

---

## 3. Split left tool window

**Problem before:** All items in the left stripe's top section opened in the same single left panel. There was no way to have two independent tool windows stacked in the left column (like real IntelliJ: Project on top, Bookmarks on the bottom).

**Now:** Add a `separator` item inside the `section: 'top'` group. Items before it open in the **top sub-panel**; items after it open in the **split (bottom) sub-panel**. Both sub-panels are independently open/closeable.

```jsx
const leftStripeItems = [
  // Before separator → top sub-panel
  { id: 'project', icon: 'toolwindows/project@20x20', tooltip: 'Project', section: 'top' },
  { id: 'commit',  icon: 'toolwindows/commit@20x20',  tooltip: 'Commit',  section: 'top' },

  // Separator — this is the split point
  { id: '_sep', separator: true, section: 'top' },

  // After separator → split (bottom) sub-panel
  { id: 'agent-tasks', icon: claudeStripeIcon, tooltip: 'Agent Tasks', section: 'top' },

  // Section 'bottom' items → bottom bar (Terminal, Git) — unchanged
  { id: 'terminal', icon: 'toolwindows/terminal@20x20', tooltip: 'Terminal', panel: 'bottom', section: 'bottom' },
]
```

```jsx
<MainWindow
  leftStripeItems={leftStripeItems}
  // Open all three on startup: project (top), agent-tasks (split), terminal (bottom bar)
  defaultOpenToolWindows={['project', 'agent-tasks', 'terminal']}
/>
```

**Behavior:**
- Click Project → opens top sub-panel. Click again → closes it. Agent Tasks stays open and expands to fill.
- Click Agent Tasks → opens split sub-panel. Click again → closes it. Project stays open and expands to fill.
- Both sub-panels share the same fixed left column width (280px by default).
- No separator in the top group → single left panel, exactly as before. Fully backward compatible.

---

## 4. PanelContext type

**Problem before:** The `ctx` argument in `leftPanelContent(id, ctx)` was typed as `any`. Consumers had to guess what was available.

**Now:** `PanelContext` is exported and the panel content signatures use it.

```ts
import type { PanelContext } from '@jetbrains/int-ui-kit'

function leftPanelContent(id: string, ctx: PanelContext) {
  // ctx is fully typed:
  // ctx.projectTreeData, ctx.focusedPanel, ctx.setFocusedPanel
  // ctx.setShowLeftPanel(false)  ← closes the sub-panel that rendered this content
  // ctx.setShowRightPanel, ctx.setShowBottomPanel
  // ctx.terminalTabs, ctx.activeTerminalTab, ctx.setActiveTerminalTab
  // ctx.handleTerminalTabClose, ctx.handleTerminalTabAdd
}
```

**Important:** When using the split left panel, `ctx.setShowLeftPanel(false)` in the panel content closes only **that sub-panel** (top or split), not both. The minimize button in the tool window header should call `ctx.setShowLeftPanel(false)`.

---

## Full example — split left panel with custom Agent Tasks

See [`templates/ide-with-custom-panels.jsx`](../templates/ide-with-custom-panels.jsx) for the complete working template.

Minimal version:

```jsx
import {
  MainWindow,
  defaultLeftPanelContent,
  ToolWindow,
  Icon,
} from '@jetbrains/int-ui-kit'
import claudeIconUrl from './assets/claude.svg'

const claudeStripeIcon = <img src={claudeIconUrl} width={20} height={20} />

const LEFT_STRIPE = [
  { id: 'project',     icon: 'toolwindows/project@20x20', tooltip: 'Project',     section: 'top' },
  { id: '_sep',        separator: true,                                             section: 'top' },
  { id: 'agent-tasks', icon: claudeStripeIcon,             tooltip: 'Agent Tasks', section: 'top', monochrome: true },
  { id: 'terminal',    icon: 'toolwindows/terminal@20x20', tooltip: 'Terminal',    panel: 'bottom', section: 'bottom' },
]

function AgentTasksPanel({ ctx }) {
  return (
    <ToolWindow
      title="Agent Tasks"
      width="100%" height="auto" actions={['minimize']}
      focused={ctx.focusedPanel === 'left'}
      onFocus={() => ctx.setFocusedPanel('left')}
      onActionClick={(a) => { if (a === 'minimize') ctx.setShowLeftPanel(false) }}
      className="main-window-tool-window main-window-tool-window-left"
    >
      {/* your custom content */}
    </ToolWindow>
  )
}

export default function App() {
  return (
    <MainWindow
      height={720}
      leftStripeItems={LEFT_STRIPE}
      defaultOpenToolWindows={['project', 'agent-tasks', 'terminal']}
      leftPanelContent={(id, ctx) => {
        if (id === 'agent-tasks') return <AgentTasksPanel ctx={ctx} />
        return defaultLeftPanelContent(id, ctx)
      }}
    />
  )
}
```

---

## What's still built-in (unchanged)

| ID you put in `leftStripeItems` | What `defaultLeftPanelContent` renders |
|---|---|
| `project` | `ProjectWindow` with the project file tree |
| `commit` | `CommitWindow` with staged files + commit message |
| anything else | Generic `ToolWindow` placeholder |

| ID you put in `rightStripeItems` | What `defaultRightPanelContent` renders |
|---|---|
| `ai` | `AIAssistantWindow` |
| anything else | Generic `ToolWindow` placeholder |

| ID you put in `leftStripeItems` with `panel: 'bottom'` | What `defaultBottomPanelContent` renders |
|---|---|
| `terminal` | `TerminalWindow` with tab management |
| `git` | `VCSLogWindow` |
| `problems` | `ProblemsWindow` |
| anything else | Generic `ToolWindow` placeholder |
