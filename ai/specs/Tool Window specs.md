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

## ToolWindowHeader

### Header Bottom Separator

The header has an optional bottom separator — a 1px line using `--tool-window-border` color.

- Controlled by `showSeparator` prop (default: `false`)
- **Terminal** — has separator (`showSeparator={true}`)
- **Project** — no separator (default)
- **AI Assistant** — no separator (default)
