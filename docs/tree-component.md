# Tree Component Spec

## Key Insight: Tree is Not Just for File Hierarchies

`Tree` is the standard interactive list component for all tool window content in IntelliJ-style IDEs.
In the real IDE it is reused for: Project files, Bookmarks, Run configurations, AI chat sessions, Agent Tasks, and more.

**When a tool window needs a list of clickable items — use `Tree`.**
It handles sizing (24px rows), hover, selection, and tokens automatically.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TreeNodeData[]` | `[]` | List of tree node objects |
| `defaultSelectedId` | `string` | — | ID of the node selected on first render |
| `flat` | `boolean` | `false` | Flat mode — hides chevrons and indentation |
| `onNodeSelect` | `function` | — | Called with `(nodeId, isSelected)` |
| `onNodeToggle` | `function` | — | Called with `(nodeId, isExpanded)` |

### `TreeNodeData` shape

```ts
interface TreeNodeData {
  id?: string;              // omit to auto-generate (positional: "1-0", "2-1", …)
  label: string;
  icon?: string | ReactNode; // e.g. 'nodes/folder', 'fileTypes/markdown'
  secondaryText?: string;   // right-aligned muted text (path, timestamp, etc.)
  isExpanded?: boolean;     // starts expanded — default false
  children?: TreeNodeData[];
}
```

**`id` is optional.** When omitted, Tree auto-generates a positional ID (`"${level}-${index}"`).
Provide an explicit `id` only on nodes you need to reference via `defaultSelectedId`, `onNodeSelect`, or `onNodeToggle`.

## Flat Mode

For non-hierarchical lists (tasks, sessions, bookmarks, results), use `flat`:

```jsx
<Tree
  flat
  data={items}
  onNodeSelect={(id) => setSelected(id)}
/>
```

**What `flat` does:**
- Removes the chevron/spacer column (the 16px slot before the icon)
- Removes indentation (`paddingLeft` becomes 0)
- Preserves all hover, selection, sizing, and color tokens exactly

**What `flat` does NOT do:**
- Does not disable children — nested items still render if present (though this is unusual)

## Hierarchical Mode (default)

```jsx
<Tree
  data={[
    {
      id: 'src',
      label: 'src',
      icon: 'nodes/folder',
      children: [
        { id: 'index', label: 'index.js', icon: 'fileTypes/javaScript' },
      ],
    },
  ]}
  onNodeSelect={(id) => console.log('selected', id)}
/>
```

## Real IDE Usage Examples

| Content | Component used | flat? |
|---|---|---|
| Project file tree | Tree | No |
| Bookmarks | Tree | Yes |
| Run configurations | Tree | Yes |
| AI chat sessions | Tree | Yes |
| Agent task list | Tree | Yes |
| Problems list | Tree | Yes (with `secondaryText` for file/line) |

## TreeNode (direct use)

`TreeNode` can be used standalone for custom layouts. Pass `flat` to skip chevron/spacer.

```jsx
<TreeNode
  label="task-001.md"
  icon="fileTypes/markdown"
  secondaryText="2m ago"
  isSelected={selected === 'task-001'}
  onSelect={() => setSelected('task-001')}
  flat
/>
```

## MainWindow integration

`MainWindow` accepts `projectTreeData` and `defaultSelectedNodeId` props which flow through to the built-in `ProjectWindow → Tree`:

```jsx
<MainWindow
  defaultSelectedNodeId="task-1"
  projectTreeData={[
    {
      label: 'my-project',
      icon: 'nodes/folder',
      isExpanded: true,
      children: [
        {
          label: 'src',
          icon: 'nodes/folder',
          children: [
            { id: 'task-1', label: 'Task 1.md', icon: 'fileTypes/markdown' },
          ],
        },
      ],
    },
  ]}
/>
```

- `id` is only needed on nodes you want to select by `defaultSelectedNodeId`
- All other nodes can omit `id` — auto-generated IDs are used internally
- Selection state lives inside `Tree` — no external state needed for simple prototypes

---

## Tokens Used

| Token | Used for |
|---|---|
| `--tree-node-text` | Default text color |
| `--tree-node-text-selected` | Text color when selected |
| `--tree-node-bg-hover` | Hover background |
| `--tree-node-bg-selected` | Selected background |
| `--tree-node-toggle` | Chevron icon color |
| `--tree-node-toggle-hover` | Chevron hover color |
| `--text-secondary` | Secondary text color |
