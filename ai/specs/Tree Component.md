# Tree Component Spec

## Key Insight: Tree is Not Just for File Hierarchies

`Tree` is the standard interactive list component for all tool window content in IntelliJ-style IDEs.
In the real IDE it is reused for: Project files, Bookmarks, Run configurations, AI chat sessions, Agent Tasks, and more.

**When a tool window needs a list of clickable items — use `Tree`.**
It handles sizing (24px rows), hover, selection, and tokens automatically.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `array` | `[]` | List of tree node objects |
| `flat` | `boolean` | `false` | Flat mode — hides chevrons and indentation |
| `onNodeSelect` | `function` | — | Called with `(nodeId, isSelected)` |
| `onNodeToggle` | `function` | — | Called with `(nodeId, isExpanded)` |

### Node object shape
```js
{
  id: 'unique-id',       // required for stable selection
  label: 'Item label',
  icon: 'fileTypes/markdown',   // icon name string or React element
  secondaryText: 'path/info',   // trailing secondary text
  children: [],         // nested nodes — omit for flat lists
  isExpanded: false,
}
```

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
