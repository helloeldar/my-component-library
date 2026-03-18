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

## Features

- Island theme only (no "default" flat theme)
- Panel toggling (left, right, bottom) via stripe buttons
- Specialized tool windows: ProjectWindow, TerminalWindow, AIAssistantWindow
- Editor area with CodeExample and line numbers