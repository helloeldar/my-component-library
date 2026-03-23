# Problems Window Specs

## ProblemsWindow Component

Tool window for displaying file-level problems (errors, warnings) with a tabbed header, left sidebar toolbar, and tree-based content.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| title | string | "Problems" | Window title in the header |
| width | number\|string | 874 | Window width |
| height | number\|string | 227 | Window height |
| tabs | array | File, Project Errors, … | Tab definitions; each can include `count` |
| activeTab | number | 0 | Active tab index |
| onTabChange | function | — | Tab change callback |
| treeData | array | sample data | Tree nodes (file + error children) |
| empty | boolean | false | Show empty state instead of tree |
| emptyText | string | "No problems found" | Empty state explanation text |
| actions | array | ['more', 'minimize'] | Header action buttons |
| focused | boolean | true | Whether the window appears focused |

### Default Tabs

1. **File** (count badge showing number of problems)
2. **Project Errors**
3. **Vulnerable Dependencies**
4. **Qodana**
5. **AI Self-Review**

### Layout

- Header: `ToolWindow` with `headerType="tabs"` and `showSeparator={true}`
- Content is a flex row:
  - **Left sidebar toolbar** (35px wide, border-right): 3 icon buttons stacked vertically
    - `general/show` — Preview
    - `codeInsight/intentionBulb` — Show Quick-Fixes
    - `general/settings` — Settings
  - **Tree area** fills remaining space with vertical padding

### Tree Data Format

Each node supports `secondaryText` for paths, line numbers, and problem counts.

```jsx
[
    {
        id: 'file-1',
        label: 'adapter_script.java',
        icon: 'nodes/abstractException',
        secondaryText: '~/path   4 problems',
        isExpanded: true,
        children: [
            {
                id: 'error-1',
                label: 'Identified expected',
                icon: 'status/error',
                secondaryText: ':17',
            },
        ],
    },
]
```

### Empty State

When `empty={true}`, the tree area shows an `EmptyState` component with the `emptyText` prop as explanation (e.g. "No problems in crowdin.yml").

## Extended Components

### Tab — `count` prop

Renders a numeric badge after the label in muted (`--text-secondary`) color. Passed through `TabBar` via `tab.count`.

### TreeNode — `secondaryText` prop

Renders secondary text after the label in `--text-secondary` color. Used for file paths, line numbers, and problem counts. Passed through `Tree` via `node.secondaryText`.
