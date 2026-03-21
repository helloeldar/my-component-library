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

## ToolWindowHeader

### Header Bottom Separator

The header has an optional bottom separator — a 1px line using `--tool-window-border` color.

- Controlled by `showSeparator` prop (default: `false`)
- **Terminal** — has separator (`showSeparator={true}`)
- **Project** — no separator (default)
- **AI Assistant** — no separator (default)
