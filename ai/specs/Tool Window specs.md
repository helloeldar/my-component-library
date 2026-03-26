# Tool Window Specs

## ToolWindow Component

Generic container for tool windows (Project, Terminal, AI Assistant, etc.).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| title | string | "Tool Window" | Window title displayed in header |
| icon | string | — | Icon name for the header title |
| width | number\|string | 300 | Window width |
| height | number\|string | 400 | Window height |
| headerType | string | "label" | Header type: `"label"` (title only) or `"tabs"` (title + tab bar) |
| tabs | array | [] | Tab definitions for `headerType="tabs"` |
| activeTab | number | 0 | Active tab index |
| showSeparator | boolean | false | Show 1px bottom separator line under the header |
| actions | array | ['more', 'minimize'] | Header action buttons |
| focused | boolean | false | Whether the window is focused |
| toolbarExtra | ReactNode | — | Arbitrary React content rendered between title/tabs and action buttons. Use this to inject custom toolbar items (dropdowns, buttons, text, etc.) into any ToolWindow. |

### toolbarExtra

Allows consumers to inject arbitrary React content into the header toolbar area, between the title/tabs section and the action buttons.

- Passed through the full chain: `ToolWindow` → `ToolWindowHeader` (renders it directly)
- Specialized windows (`TerminalWindow`, `ProjectWindow`, `AIAssistantWindow`) forward it automatically via `{...props}` spread — no explicit handling needed in those components
- When not provided, rendering is identical to before (fully backward-compatible)
- Consumers can combine with `actions={[]}` to fully replace the default action buttons

```jsx
<TerminalWindow
  toolbarExtra={<><MyDropdown /><MyButton /></>}
  actions={['minimize']}
/>
```

### Action Callbacks

ToolWindow passes `onActionClick` to ToolWindowHeader, which dispatches it from:
- **Header action buttons** (more, minimize, close) → `onActionClick('minimize')`, `onActionClick('more')`, etc.
- **TabBar close button** → `onActionClick('tabClose', index)`
- **TabBar "+" button** → `onActionClick('add')`

Specialized windows like TerminalWindow intercept tab-related actions (`tabClose`, `add`) and handle them internally, then forward all actions to a parent-provided `onActionClick` prop. This allows the parent (e.g. MainWindow) to handle actions like `minimize` without needing to know about tab internals.

### Minimize behavior

The minimize action hides the tool window panel. In MainWindow, clicking minimize on the bottom Terminal sets `showBottomPanel` to `false`. The panel can be re-opened by clicking the corresponding stripe button.

## ToolWindowHeader

### Header Bottom Separator

The header has an optional bottom separator — a 1px line using `--tool-window-border` color.

- Controlled by `showSeparator` prop (default: `false`)
- **Terminal** — has separator (`showSeparator={true}`)
- **Project** — no separator (default)
- **AI Assistant** — no separator (default)

---

## IDE Tool Window Patterns

Conventions for building tool windows in int-ui-kit prototypes. Follow these to produce IDE-native results without custom CSS.

### Add / New actions belong in the header

**Pattern:** "Create new" actions (New Task, New Chat, New Tab, +) go in the **ToolWindow header**, not at the bottom of the content area.

**Real IDE examples:**
- Terminal — `+` button in the tab bar header opens a new terminal tab
- AI Assistant — "New Chat" button in the header toolbar
- Run — `+` in the header creates a new run configuration

**Why:** The header toolbar is the standard IDE location for tool window actions. A button at the bottom of the panel is a web/mobile pattern — it doesn't feel native.

#### How to implement

**Option 1 — built-in `add` action** (preferred for a plain `+` icon):
```jsx
<ToolWindow
  title="Agent Tasks"
  actions={['add', 'more', 'minimize']}
  onActionClick={(action) => {
    if (action === 'add') handleNewTask()
    if (action === 'minimize') ctx.setShowLeftPanel(false)
  }}
>
  {/* content */}
</ToolWindow>
```
Renders a standard `+` icon button in the header — identical to Terminal.

**Option 2 — `toolbarExtra`** (for custom buttons, text labels, or multiple actions):
```jsx
<ToolWindow
  title="Agent Tasks"
  actions={['minimize']}
  toolbarExtra={
    <IconButton icon="general/add" title="New Task" onClick={handleNewTask} />
  }
>
  {/* content */}
</ToolWindow>
```
`toolbarExtra` renders between the title and the standard action buttons.

#### What NOT to do
```jsx
// ❌ Button at the bottom of content — web pattern, not IDE-native
<ToolWindow title="Agent Tasks">
  <div>{/* task list */}</div>
  <div style={{ borderTop: '...' }}>
    <Button style={{ width: '100%' }}>+ New Task</Button>
  </div>
</ToolWindow>
```

### Sidebar toolbar inside tool window content

Horizontal tool windows (bottom panel — Terminal, Problems) often carry a **vertical** sidebar toolbar. Vertical tool windows (left/right panel — Project, Commit) carry a **horizontal** toolbar row.

#### Why the naive approach breaks

`ToolWindow`'s `.tool-window-content` defaults to `flex-direction: column`. If you drop a toolbar `<div>` straight into the content, it stacks vertically on top of the content instead of sitting beside it.

The fix: wrap content + toolbar in a **flex-row** intermediate element (`.xxx-body`), then put the toolbar as a sibling.

#### Pattern — horizontal tool window with vertical sidebar toolbar

```
.tool-window-content  (flex-column — do not change)
  └── .xxx-body       (flex-row   — your wrapper)
        ├── .xxx-content-wrapper  (flex: 1 — main content)
        └── .xxx-sidebar-toolbar  (35px wide column, border-left)
```

```css
/* Matches the existing pattern in ProblemsWindow and TerminalWindow */
.xxx-body {
    display: flex;
    flex-direction: row;  /* ← the key change */
    flex: 1;
    min-height: 0;
}
.xxx-sidebar-toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35px;
    flex-shrink: 0;
    padding: 7px 5px 7px 4px;
    border-left: 1px solid var(--tool-window-border);  /* or border-right for left-side */
    box-sizing: border-box;
}
```

#### Real examples in the library

| Component | Toolbar position | CSS class | Border side |
|---|---|---|---|
| `ProblemsWindow` | Left | `.problems-toolbar` | `border-right` |
| `TerminalWindow` | Right | `.terminal-sidebar-toolbar` | `border-left` |

#### Using `toolbarButtons` prop

Both `TerminalWindow` and `ProblemsWindow` accept a `toolbarButtons` prop:

```jsx
<TerminalWindow
  toolbarButtons={[
    { icon: 'general/add', tooltip: 'New Terminal' },
    { icon: 'actions/suspend', tooltip: 'Stop' },
    { icon: 'general/settings', tooltip: 'Settings' },
  ]}
/>
```

`SidebarToolbarButton` shape: `{ icon: string; tooltip: string; onClick?: () => void }`.

#### Pattern — vertical tool window with horizontal toolbar row

Vertical tool windows (left/right panel) have horizontal toolbars — a row of icon buttons inside the content area, above the list. This is a simpler layout since the natural `flex-column` already stacks the toolbar on top:

```jsx
<ToolWindow title="My Panel" className="my-window">
  <div className="my-toolbar">
    <IconButton icon="general/add" title="Add" />
    <IconButton icon="general/refresh" title="Refresh" />
  </div>
  <div className="my-content">{/* list, tree, etc. */}</div>
</ToolWindow>
```

```css
.my-window .tool-window-content { padding: 0; }
.my-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    padding: 0 4px;
    border-bottom: 1px solid var(--tool-window-border);
}
```

### Buttons inside toolbars and custom bars must use Toolbar components

**Rule:** Any bar that lives inside an IDE window — whether it's the header toolbar, a `toolbarExtra` slot, or a custom `topBar` inside an `Editor` — is a **toolbar**. Every button inside it must use a toolbar component, never a raw `<button>`, bare `<Icon>`, or hand-crafted `<span>` wrapper.

| Situation | Correct component | Wrong |
|---|---|---|
| Icon-only action | `<IconButton icon="..." />` | `<button><Icon name="..." /></button>` |
| Text + optional icon | `<ToolbarButton text="..." icon="..." />` | `<button className="custom">Send</button>` |
| Separator between groups | `<ToolbarSeparator />` | `<div style={{ borderLeft: '1px solid ...' }} />` |

**Why:** Toolbar components carry the correct sizing (26px height), hover/pressed/disabled states, and spacing tokens that make a bar look native. Hand-crafted buttons will have subtly wrong padding, missing pressed states, and inconsistent colors.

```jsx
// ✅ Correct — toolbar-native feel
<ToolWindow title="Agent Tasks" toolbarExtra={
  <>
    <IconButton icon="general/add" title="New Task" onClick={onNew} />
    <ToolbarSeparator />
    <ToolbarButton text="Send" icon="actions/execute" onClick={onSend} />
  </>
} />

// ❌ Wrong — raw elements break the IDE aesthetic
<ToolWindow title="Agent Tasks" toolbarExtra={
  <div style={{ display: 'flex', gap: 4 }}>
    <button onClick={onNew}>+ New</button>
    <span style={{ borderLeft: '1px solid #fff' }} />
    <button onClick={onSend}>Send</button>
  </div>
} />
```

#### Shortcut display on ToolbarButton — known gap

A native IDE button like `[ Send ↵ ]` shows the keyboard shortcut inline next to the label in muted styling.

**Current state:**
- `IconButton` has `shortcut?: string` — but it only appears in the `title` tooltip, not rendered visually on the button.
- `ToolbarButton` has **no `shortcut` prop** at all.

**Workaround** (prototype only): pass the key label as `text`:
```jsx
<ToolbarButton text="Send  Enter" onClick={onSend} />
```

**Library gap to resolve:** Add `shortcut?: string` to `ToolbarButton` that renders the key next to the label in muted styling — `[ Send  ↵ ]`.

### ToolWindow actions reference

| Action string | Icon | Use for |
|---|---|---|
| `'add'` | `+` | Create new item (tab, task, chat…) |
| `'more'` | `⋮` | Overflow menu |
| `'minimize'` | `—` | Hide / collapse the panel |
| `'close'` | `✕` | Close (floating windows) |

Pass as `actions={['add', 'more', 'minimize']}`. Handle all in a single `onActionClick(action)` callback.

### Standard header layout

```
[ Title ] [ toolbarExtra? ] [ ...actions ]
```

- Title — left-aligned, bold
- toolbarExtra — optional custom content, placed before action buttons
- Actions — right-aligned icon buttons (add, more, minimize, close)

### Tabs in the header

Use `headerType="tabs"` + `tabs={[...]}` when the tool window has multiple views (e.g., Terminal with multiple sessions, Run with multiple configs). The `+` action in tab mode adds a new tab.

```jsx
<ToolWindow
  headerType="tabs"
  tabs={[{ label: 'bash' }, { label: 'zsh' }]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  actions={['add', 'dropdown', 'minimize']}
  onActionClick={(action) => {
    if (action === 'add') openNewTab()
  }}
/>
```
