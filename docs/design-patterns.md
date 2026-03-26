# Design Patterns

IDE-native patterns for building realistic JetBrains IDE prototypes with `@jetbrains/int-ui-kit`.

These patterns describe **how real IntelliJ IDEs work** — follow them to get native-feeling results without custom CSS or workarounds.

---

## 1. Header Actions Pattern

**Actions and "create new" buttons belong in the tool window header, not at the bottom of the content area.**

Real IDE examples:
- Terminal — `+` button in the tab bar header opens a new terminal tab
- AI Assistant — "New Chat" in the header toolbar
- Run — `+` in the header creates a new run configuration

### ✅ Correct — action in the header

```jsx
<ToolWindow
  title="Agent Tasks"
  actions={['add', 'more', 'minimize']}
  onActionClick={(action) => {
    if (action === 'add') handleNewTask()
    if (action === 'minimize') ctx.setShowLeftPanel(false)
  }}
>
  {/* task list */}
</ToolWindow>
```

### ❌ Wrong — button at the bottom

```jsx
// Web/mobile pattern — doesn't feel IDE-native
<ToolWindow title="Agent Tasks">
  <div>{/* task list */}</div>
  <div style={{ borderTop: '1px solid #ccc' }}>
    <Button style={{ width: '100%' }}>+ New Task</Button>
  </div>
</ToolWindow>
```

### Header layout

```
[ Title ] [ toolbarExtra? ] [ ...actions ]
```

- **Title** — left-aligned, bold
- **toolbarExtra** — optional custom content placed before action buttons
- **Actions** — right-aligned icon buttons

### Standard action strings

| Action | Icon | Use for |
|---|---|---|
| `'add'` | `+` | Create new item (tab, task, chat…) |
| `'more'` | `⋯` | Overflow menu |
| `'minimize'` | `—` | Hide / collapse the panel |
| `'close'` | `✕` | Close (floating windows) |

---

## 2. onActionClick Callback Pattern

All tool window actions are dispatched through a single `onActionClick(action, ...args)` callback with string identifiers. Handle all actions in one place.

```jsx
<ToolWindow
  title="My Panel"
  actions={['add', 'more', 'minimize']}
  onActionClick={(action, ...args) => {
    if (action === 'add')      handleAdd()
    if (action === 'more')     handleMore()
    if (action === 'minimize') ctx.setShowLeftPanel(false)
    if (action === 'tabClose') handleTabClose(args[0]) // args[0] = tab index
  }}
/>
```

### Action sources

| Source | Dispatches |
|---|---|
| Header action buttons | `onActionClick('minimize')`, `onActionClick('more')`, etc. |
| Tab bar close button | `onActionClick('tabClose', tabIndex)` |
| Tab bar `+` button | `onActionClick('add')` |

### Bubbling to parent

Specialized windows like `TerminalWindow` handle tab-related actions internally, then forward all actions to the parent `onActionClick`. This means `MainWindow` can handle `'minimize'` without knowing about terminal tab internals.

---

## 3. toolbarExtra Pattern

Use `toolbarExtra` to inject custom buttons, dropdowns, or any React content into the header toolbar between the title and the standard action buttons.

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

Prefer `toolbarExtra` when you need:
- Custom labeled buttons (not just a plain `+`)
- Multiple custom buttons
- Dropdowns or other interactive elements in the toolbar

Use the built-in `'add'` action string when you just need a standard `+` icon button.

---

## 4. Custom Panel (leftPanelContent) Pattern

Replace built-in tool window content by passing a render function to `leftPanelContent`, `rightPanelContent`, or `bottomPanelContent`. Fall back to the default renderer for IDs you don't override.

```jsx
import {
  MainWindow,
  defaultLeftPanelContent,
  DEFAULT_LEFT_STRIPE_ITEMS,
  ToolWindow,
} from '@jetbrains/int-ui-kit'

const leftStripeItems = [
  ...DEFAULT_LEFT_STRIPE_ITEMS,
  { id: 'agent-tasks', icon: myIcon, tooltip: 'Agent Tasks', section: 'top' },
]

<MainWindow
  leftStripeItems={leftStripeItems}
  leftPanelContent={(id, ctx) => {
    if (id === 'agent-tasks') return <AgentTasksPanel ctx={ctx} />
    return defaultLeftPanelContent(id, ctx)  // Project, Commit, etc.
  }}
/>
```

### Custom panel component template

```jsx
function AgentTasksPanel({ ctx }) {
  return (
    <ToolWindow
      title="Agent Tasks"
      width="100%"
      height="auto"
      actions={['add', 'minimize']}
      focused={ctx.focusedPanel === 'left'}
      onFocus={() => ctx.setFocusedPanel('left')}
      onActionClick={(action) => {
        if (action === 'add')      handleNewTask()
        if (action === 'minimize') ctx.setShowLeftPanel(false)
      }}
      className="main-window-tool-window main-window-tool-window-left"
    >
      {/* your content here */}
    </ToolWindow>
  )
}
```

### Built-in panel IDs

| ID in stripeItems | defaultLeftPanelContent renders |
|---|---|
| `project` | `ProjectWindow` with project file tree |
| `commit` | `CommitWindow` with staged files + commit message |
| anything else | Generic `ToolWindow` placeholder |

| ID in rightStripeItems | defaultRightPanelContent renders |
|---|---|
| `ai` | `AIAssistantWindow` |

| ID with `panel: 'bottom'` | defaultBottomPanelContent renders |
|---|---|
| `terminal` | `TerminalWindow` with tab management |
| `git` | `VCSLogWindow` |
| `problems` | `ProblemsWindow` |

---

## 5. Split Left Panel Pattern

Add a `separator` item inside the `section: 'top'` stripe group to split the left column into two independent sub-panels — like the real IntelliJ (Project on top, a custom tool window on the bottom).

```jsx
const leftStripeItems = [
  // Before separator → top sub-panel
  { id: 'project', icon: 'toolwindows/project@20x20', tooltip: 'Project', section: 'top' },

  // Separator = split point
  { id: '_sep', separator: true, section: 'top' },

  // After separator → split (bottom) sub-panel
  { id: 'agent-tasks', icon: myIcon, tooltip: 'Agent Tasks', section: 'top' },

  // Bottom bar items (unchanged)
  { id: 'terminal', icon: 'toolwindows/terminal@20x20', tooltip: 'Terminal', panel: 'bottom', section: 'bottom' },
]

<MainWindow
  leftStripeItems={leftStripeItems}
  defaultOpenToolWindows={['project', 'agent-tasks', 'terminal']}
/>
```

**Behavior:**
- Clicking Project opens/closes the top sub-panel independently from Agent Tasks
- Both sub-panels share the same column width (280px by default)
- No separator → single left panel, exactly as before (backward compatible)

### ctx.setShowLeftPanel in split mode

When a split panel is active, `ctx.setShowLeftPanel(false)` inside a panel's content closes **only that sub-panel** — not both. Wire it to the panel's minimize action.

---

## 6. Overlays Pattern

Dialogs, popups, and modals should render **inside `MainWindow`** via the `overlays` prop, not alongside it. This ensures they layer correctly over the IDE chrome.

```jsx
const [showSettings, setShowSettings] = useState(false)

<MainWindow
  overlays={
    showSettings
      ? <SettingsDialog onClose={() => setShowSettings(false)} />
      : null
  }
/>
```

Use `overlays` for:
- `SettingsDialog`
- `Dialog` / `Alert`
- Any custom modal that should appear over the IDE

---

## 7. Defaults + Override Pattern

Import the default data, change only what you need, and pass it back. This is the most common and maintainable approach.

```jsx
import {
  DEFAULT_LEFT_STRIPE_ITEMS,
  DEFAULT_EDITOR_TABS,
  DEFAULT_PROJECT_TREE_DATA,
} from '@jetbrains/int-ui-kit'

// Add a custom stripe button
const myStripe = [
  ...DEFAULT_LEFT_STRIPE_ITEMS,
  { id: 'agent-tasks', icon: myIcon, tooltip: 'Agent Tasks', section: 'top' },
]

// Add a tab without replacing all defaults
const myTabs = [
  ...DEFAULT_EDITOR_TABS,
  { id: 'new', label: 'NewFile.kt', icon: 'fileTypes/kotlin', closable: true },
]

// Remove one item
const stripeWithoutStructure = DEFAULT_LEFT_STRIPE_ITEMS.filter(i => i.id !== 'structure')
```

Why this pattern works:
- You only change what your prototype scenario cares about
- The rest stays realistic (real file names, realistic commits, etc.)
- If the library updates its defaults, you automatically get the improvements for unchanged parts

### Available default exports

| Export | Contains |
|---|---|
| `DEFAULT_LEFT_STRIPE_ITEMS` | Left stripe button definitions |
| `DEFAULT_RIGHT_STRIPE_ITEMS` | Right stripe button definitions |
| `DEFAULT_EDITOR_TABS` | 5 editor tab definitions |
| `DEFAULT_JAVA_CODE` | Java source code string |
| `DEFAULT_PROJECT_TREE_DATA` | Project file tree |
| `DEFAULT_BREADCRUMBS` | Status bar breadcrumbs |
| `DEFAULT_WIDGETS` | Status bar widgets |
| `DEFAULT_PROJECTS` | WelcomeDialog recent projects |
| `DEFAULT_SETTINGS_TREE_ITEMS` | SettingsDialog navigation tree |
| `DEFAULT_COMMITS` | VCSLogWindow commit entries |
| `DEFAULT_COMMIT_DETAILS` | VCSLogWindow commit metadata |
| `defaultLeftPanelContent` | Default left panel renderer function |
| `defaultRightPanelContent` | Default right panel renderer function |
| `defaultBottomPanelContent` | Default bottom panel renderer function |

---

## 8. Custom Stripe Icon Pattern

Pass any React element as `icon` in stripe items — useful for custom product icons or images.

```jsx
const myIcon = (
  <img src={myIconUrl} width={20} height={20} alt="My Tool" style={{ display: 'block' }} />
)

const leftStripeItems = [
  { id: 'project',  icon: 'toolwindows/project@20x20', tooltip: 'Project', section: 'top' },
  { id: 'my-tool', icon: myIcon, tooltip: 'My Tool', section: 'top', monochrome: true },
]
```

Add `monochrome: true` for colored custom icons — it makes them grayscale in default state and white when selected, matching the look of built-in icons.

| State | Effect of `monochrome: true` |
|---|---|
| default / inactive | `filter: grayscale(1)` — strips color |
| selected | `filter: brightness(0) invert(1)` — pure white |

---

## 9. Interactive List Rows Inside a Tool Window

When a tool window shows a list of clickable items (tasks, files, sessions, results), use the **`Tree` component** — it handles sizing, hover, and selection automatically.

`Tree` is not just for file hierarchies. In the real IDE it is reused for any interactive list: Run configurations, Bookmarks, AI chat sessions, Agent Tasks, etc.

For flat (non-nested) lists, pass `flat` to hide chevrons and indentation:

```jsx
<Tree
  flat
  data={items}
  onNodeSelect={(id) => setSelected(id)}
/>
```

Where `items` follow the node shape:

```js
{
  id: 'task-001',
  label: 'Fix login bug',
  icon: 'fileTypes/markdown',       // icon name or React element
  secondaryText: '2m ago',          // trailing text
}
```

### Sizing (when building custom rows without Tree)

```
height: 24px
padding: 0 8px        ← horizontal padding on the row itself
gap: 6px              ← between icon and label
```

Note: `.tool-window-content` has `padding: 0 8px` already. Do NOT add extra horizontal padding on the wrapper — it doubles the indent.

### Hover and selection (custom rows)

Use CSS classes, not inline styles, so `:hover` works natively:

```css
.my-list-row {
  height: 24px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  cursor: pointer;
}
.my-list-row:hover    { background: var(--selection-bg-hovered); }
.my-list-row.selected { background: var(--selection-bg-active); }
```

### What NOT to do

```jsx
// ❌ Custom padding, no hover, inline background — doesn't feel native
<div style={{ padding: '3px 4px', background: selected ? '#2E436E' : 'transparent' }}>
```

### Icon names for common list content

- File/document items → `fileTypes/text`, `fileTypes/markdown`, `fileTypes/java`, etc.
- Status: running → `<Loader size={16} />` (animated component — import from library, NOT `<Icon name="loader">`)
- Status: waiting → `<Icon name="status/warning" size={16} />`
- Status: done → `<Icon name="status/success" size={16} />`
- Timestamps → `font-size: 11px; color: var(--text-muted)` — see pattern 10 below

---

## 10. Font Usage in Tool Windows

**Default font is Inter (sans-serif) — inherited from `body`.** Do not set `font-family` explicitly on normal text inside tool windows.

**Use JetBrains Mono only for content that is code or directly code-related:**
- Code snippets, file paths, command output
- Line/column numbers, cursor positions (`5:2`)
- Encoding labels (`UTF-8`, `LF`) in the status bar
- Terminal output
- Durations in a technical context (`2m`, `3h`) — judgment call; prefer Inter if unsure

**Do NOT use JetBrains Mono for:**
- Task names, labels, descriptions
- Tool window titles or section headers
- Any prose or human-readable text
- Timestamps in non-code contexts (e.g. "2 hours ago" in a chat list)

```jsx
// ✅ Correct
<span style={{ fontSize: 11, color: 'var(--text-muted)' }}>2m</span>

// ❌ Wrong — mono font on a plain timestamp label
<span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>2m</span>
```
