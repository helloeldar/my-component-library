# Commit Tool Window Specs

## Figma
- [Tool Window / Commit — node 27921:15443](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=27921-15443&t=V8DOXcjhgUO6bzb3-4)

---

## Overview
A VCS Commit tool window (360 × 606 px, border-radius 10 px).  
Composed of:
1. **Tool Window Header** — standard header with title + action buttons
2. **Top Toolbar** — icon buttons for VCS actions
3. **File Change Tree** — collapsible groups with checkboxes
4. **Bottom Panel** — Amend option, commit message textarea, action buttons

---

## 1. Tool Window Header
- Title: **"Commit"** — `text-ui-default-semibold` (Inter SemiBold 13 / 16 lh)
- Right action buttons: `moreVertical` (⋮), `hide` (−)
- Height: 41 px
- Bottom border: `var(--tool-window-border)`
- Uses `ToolWindow` component with `actions={['more', 'minimize']}`

---

## 2. Top Toolbar
Height: 34 px, padding: 4 px 7 px.  
Buttons left-to-right (all `ToolbarIconButton`, 26 × 26 px hit area, 16 × 16 icon):

| Order | Icon | Tooltip |
|-------|------|---------|
| 1 | `general/refresh` | Refresh |
| 2 | `vcs/revert` | Rollback |
| 3 | `vcs/patch` | Create Patch |
| 4 | `aiAssistant/aiAssistantColored` | AI Self-Review |
| 5 | `general/show` | Show |
| 6 | `general/expandAll` | Expand All |
| 7 | `general/collapseAll` | Collapse All |

---

## 3. File Change Tree
Padding: 4 px 0 (vertical). Fills remaining flex space; scrollable.

### Group Row (e.g. "Changes", "Unversioned Files")
- Padding: 2 px 12 px (horizontal), row height 24 px
- Left-to-right: **chevron** (16 × 16, `chevronDown` / `chevronRight`) → **Checkbox** → **label** (text-ui-default-semibold, `text-default`) → **count** (text-ui-default, `text-secondary`)
- Chevron toggles expand/collapse of children

### File Leaf Row
- Left padding: 30 px (indented under group)
- Left-to-right: **invisible chevron spacer** → **Checkbox** → **file icon** (e.g. `fileTypes/java`, 16 px) → **filename** (text-ui-default, `text-link` color) → **path** (text-ui-default, `text-secondary`, truncated)

### Checkbox Selection Logic

**Group checkbox behaviour:**
- **All children checked** → group checkbox `checked`
- **Some children checked** → group checkbox `indeterminate`
- **No children checked** → group checkbox unchecked
- **Click group checkbox**: if none checked → check all children; otherwise (any/all) → uncheck all children

**File checkbox behaviour:**
- Each file can be toggled independently
- Toggling a file recalculates its parent group checkbox state

### File `status` field
Each file leaf has a `status` that represents its git change type:

| Value | Meaning |
|-------|---------|
| `'modified'` | File was changed |
| `'added'` | New file, not yet committed |
| `'deleted'` | File was removed |
| `'unversioned'` | File is not tracked by git |

### Status Summary (bottom panel)
The status summary reflects **selected** (checked) files only. Hidden when nothing is selected.  
Each status segment is colored independently (see [Interaction specs](Interaction%20specs.md)):

| Status | Color | Example |
|--------|-------|---------|
| modified | `--text-link` blue | `2 modified` |
| added | `--vcs-added-text` green | `1 added` |
| deleted | `--vcs-deleted-text` red | `1 deleted` |

Segments joined with `", "` separator. Only statuses with count > 0 are shown.  
Examples: `"2 modified"` · `"1 modified, 1 added"` · `"2 modified, 1 deleted"`

### Default data
```
Changes (2 files) [expanded]
  AdapterScript.java  status=modified  ~/IdeaProjects/FastMath/src/main/java/com/example
  FunctionUtils.java  status=modified  ~/IdeaProjects/FastMath/src/main/java/com/example
Unversioned Files (1 file) [collapsed]
  NewHelper.java      status=added     ~/IdeaProjects/FastMath/src/main/java/com/example
```

---

## 4. Bottom Panel
Border-top: `var(--tool-window-border)`. Flex column, `flex-shrink: 0`.

### 4a. Amend Toolbar Row
Padding: 7 px 12 px 1 px.  
Left cluster: `Checkbox` label="Amend" → `general/history` icon button → `aiAssistant/aiAssistantColored` icon button  
Right: status summary (see § Status Summary)

**Amend checkbox behaviour:**
- **Check** → snapshot current textarea content, fill textarea with `previousCommitMessage` prop
- **Uncheck** → restore textarea to the snapshot taken before amend was activated

### 4b. Commit Message Textarea
Padding: 0 12 px.  
`<textarea>` 100 % wide, height ~120 px, resize: none.  
Border: `var(--control-border)`, border-radius: 4 px, bg: `var(--control-bg)`.  
Placeholder: "Commit message" (`text-secondary`).  
Focus ring: `var(--control-focus-border-brand)`.

### 4c. Action Row
Padding: 6 px 12 px.  
Left: `Button type="primary"` "Commit" + `Button type="secondary"` "Commit and Push..."  
Right: `general/settings` icon button (Commit Options)

---

## Component API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `"Commit"` | Window title |
| `width` | number\|string | `360` | Window width |
| `height` | number\|string | `606` | Window height |
| `files` | Array | (sample data) | Tree groups with children |
| `commitMessage` | string | `""` | Controlled textarea value |
| `previousCommitMessage` | string | (sample message) | Loaded into textarea when Amend is checked |
| `onCommit` | func | — | Called with `(message, amend, checkedIds)` |
| `onCommitAndPush` | func | — | Called with `(message, amend, checkedIds)` |
| `className` | string | `""` | Extra CSS classes |

### `files` item shape
```js
{
  id: string,
  label: string,        // group label
  count: string,        // e.g. "2 files"
  isExpanded: boolean,
  children: [
    {
      id: string,
      label: string,    // filename
      path: string,     // parent directory path
      icon: string,     // icon name e.g. "fileTypes/java"
      status: 'modified' | 'added' | 'deleted' | 'unversioned'
    }
  ]
}
```

---

## Files
- `src/ui/components/toolwindow/CommitWindow.jsx`
- `src/ui/components/toolwindow/CommitWindow.css`
- Registered: `componentsConfig.js` key `commit`, section `appkit`, category `windows`
- Route: `/commit`
