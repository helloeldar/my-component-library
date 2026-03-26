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
