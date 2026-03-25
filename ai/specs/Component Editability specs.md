# Component Editability Specs

## Goal

> Every existing component should be easily editable.
> If prototype requires adding new elements, changing existing ones, or removing them, it should be possible to do so without having to rewrite the whole component.

This spec defines what "easily editable" means for every component in the library, documents the current gaps, and specifies the required changes.

---

## Principles

1. **Every hardcoded value becomes a prop default** — no behavioral regression; existing prototypes keep working unchanged.
2. **New props are always optional** — omitting a prop gives you the current behavior.
3. **Forward `className` and `style` on every component's root element.**
4. **Accept `children` where it makes semantic sense** (panel content, dialog body).
5. **Export default data as named constants** — prototypes can import and tweak them (e.g. `import { DEFAULT_COMMITS } from '@jetbrains/int-ui-kit'`).
6. **Target audience is non-developers** — prefer simple prop overrides over compound component patterns.

---

## Severity levels

- **HIGH** — blocks basic prototype editing; must edit the component source file to change the prototype.
- **MEDIUM** — makes customization harder than needed; workarounds exist but are awkward.
- **LOW** — minor inconvenience; affects edge cases only.

---

## HIGH severity issues

### 1. MainWindow — monolithic layout shell

**File:** `src/ui/components/mainwindow/MainWindow.jsx` (~571 lines)

**Current props:**
`projectName`, `projectIcon`, `projectColor`, `branchName`, `runConfig`, `runState`, `className`

**Problem:** The entire IDE layout — editor tabs, Java source code, project tree, breadcrumbs, widgets, stripe button definitions, tool window mapping, and overlay wiring — is defined inside this single component. Changing what appears in any panel requires editing this file.

**Hardcoded items:**
- `editorTabs` array (5 tabs with filenames and icons)
- `javaCode` string (Java source shown in Editor)
- `projectTreeData` (file tree structure)
- `breadcrumbs` and `widgets` for StatusBar
- Left/right/bottom stripe button lists and their icon/tooltip/id
- Fixed mapping: stripe id → specific tool window component
- Overlays: SearchEverywherePopup, SettingsDialog always wired

**Required changes — slot props with defaults:**

| New prop | Type | Default | Description |
|---|---|---|---|
| `editorTabs` | array | current 5 tabs | Editor tab definitions |
| `editorCode` | string | current Java code | Source code shown in Editor |
| `editorLanguage` | string | `"java"` | Editor syntax language |
| `projectTreeData` | array | current tree | Project tree data |
| `leftStripeItems` | array | current items | Left stripe button definitions: `[{ id, icon, tooltip }]` |
| `rightStripeItems` | array | current items | Right stripe button definitions |
| `bottomStripeItems` | array | current items | Bottom stripe button definitions |
| `leftPanelContent` | function | current mapping | `(stripeId, props) => ReactNode` — renders left panel content by stripe id |
| `rightPanelContent` | function | current mapping | `(stripeId, props) => ReactNode` — renders right panel content by stripe id |
| `bottomPanelContent` | function | current mapping | `(stripeId, props) => ReactNode` — renders bottom panel content by stripe id |
| `defaultOpenToolWindows` | string[] | `['project', 'ai', 'terminal']` | Which tool windows are open on initial render |
| `toolbar` | ReactNode | `<MainToolbar .../>` | Custom toolbar replacing the default |
| `statusBarProps` | object | current breadcrumbs/widgets | Props to spread on StatusBar |
| `overlays` | ReactNode | current overlays | Custom overlays (popups, dialogs) |

**Default data exports:**
- `DEFAULT_EDITOR_TABS`
- `DEFAULT_LEFT_STRIPE_ITEMS`, `DEFAULT_RIGHT_STRIPE_ITEMS`, `DEFAULT_BOTTOM_STRIPE_ITEMS`
- `DEFAULT_PROJECT_TREE_DATA`
- `DEFAULT_JAVA_CODE`
- `DEFAULT_OPEN_TOOL_WINDOWS`

---

### 2. SettingsDialog — closed implementation

**File:** `src/ui/components/showcase/SettingsDialog.jsx`

**Current props:** `onClose` only.

**Problem:** Entire UI (left tree navigation, right panel content, all labels, checkboxes, dropdowns, links, and footer buttons) is hardcoded. Cannot resemble "another settings page" without copying and editing the whole component.

**Required changes:**

| New prop | Type | Default | Description |
|---|---|---|---|
| `title` | string | `"Settings"` | Dialog title |
| `treeItems` | array | current tree | Left panel navigation tree items |
| `children` | ReactNode | current right panel | Right panel content |
| `buttons` | array | current Cancel/Apply/OK | Footer button definitions |
| `width` | number | `970` | Dialog width |
| `height` | number | `632` | Dialog height |
| `className` | string | — | Additional CSS classes on root |

---

### 3. VCSLogWindow — all data hardcoded

**File:** `src/ui/components/toolwindow/VCSLogWindow.jsx`

**Current props:** `width`, `height`, `focused`, `onFocus`, `onActionClick`, `className`

**Problem:** Three data arrays (`BRANCHES`, `COMMITS`, `DETAILS_FILES`) and commit detail text are module-level constants. Title "Git" and tab labels "Log"/"Console" are fixed strings. Internal `selectedCommitId` defaults to `7` with no sync props.

**Required changes:**

| New prop | Type | Default | Description |
|---|---|---|---|
| `title` | string | `"Git"` | Tool window title |
| `tabs` | array | `['Log', 'Console']` | Header tab labels |
| `branches` | array | current `BRANCHES` | Branch tree data |
| `commits` | array | current `COMMITS` | Commit log entries |
| `detailsFiles` | array | current `DETAILS_FILES` | File tree in commit details |
| `commitDetails` | object | current hardcoded text | `{ repoName, repoPath, title, hash, body, author, authorEmail, date }` |
| `selectedCommitId` | number | `7` | Initially selected commit (controlled or uncontrolled) |
| `onCommitSelect` | function | — | Called when a commit is selected |

**Default data exports:**
- `DEFAULT_BRANCHES`, `DEFAULT_COMMITS`, `DEFAULT_DETAILS_FILES`, `DEFAULT_COMMIT_DETAILS`

---

### 4. WelcomeDialog — ignores its own props, hardcoded strings

**File:** `src/ui/components/dialog/WelcomeDialog.jsx`

**Current props:** `ideTitle`, `ideIcon`, `ideVersion`, `projects`, `activeNav`, `onNavChange`, `selectedProjectId`, `onProjectSelect`, `onClose`, `className`, `style`

**Problem:**
- `DialogHeader` renders `title="Welcome to IntelliJ IDEA"` ignoring the `ideTitle` prop.
- `NAV_ITEMS` is exported but not accepted as a prop.
- Action button labels ("New Project", "Open", "Get From VCS") and search placeholder ("Search projects") are hardcoded strings.

**Required changes:**

| Fix | Description |
|---|---|
| Wire `ideTitle` to header | `DialogHeader title={`Welcome to ${ideTitle}`}` (or accept full `headerTitle` prop) |
| `navItems` prop | Accept navigation items as prop, default to current `NAV_ITEMS` |
| `actionLabels` prop | `{ newProject, open, getFromVcs }` with current strings as defaults |
| `searchPlaceholder` prop | Default `"Search projects"` |

---

### 5. StatusBar — empty arrays still render defaults

**File:** `src/ui/components/statusbar/StatusBar.jsx`

**Current logic:** `breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs`

**Problem:** Passing `breadcrumbs={[]}` still renders the default demo breadcrumbs. Impossible to get an intentionally empty status bar for a prototype.

**Required change:** Use `null`/`undefined` as the sentinel for "use defaults":

```javascript
const breadcrumbItems = breadcrumbs != null ? breadcrumbs : defaultBreadcrumbs;
const widgetItems = widgets != null ? widgets : defaultWidgets;
```

Default parameter changes from `breadcrumbs = []` to `breadcrumbs` (no default), so:
- Omit prop → renders defaults (backward compatible)
- `breadcrumbs={[]}` → intentionally empty
- `breadcrumbs={[...]}` → custom items

---

## MEDIUM severity issues

### 6. CommitWindow — hardcoded chrome labels

**File:** `src/ui/components/toolwindow/CommitWindow.jsx`

**Current props:** `title`, `width`, `height`, `files`, `commitMessage`, `onCommit`, `onCommitAndPush`, `className`

**Problem:** Toolbar button icons/tooltips, "Amend" checkbox label, textarea placeholder "Commit messages", button labels "Commit" / "Commit and Push...", and settings tooltip are all hardcoded.

**Required changes:**

| New prop | Type | Default | Description |
|---|---|---|---|
| `toolbarButtons` | array | current 7 buttons | Toolbar icon button definitions |
| `amendLabel` | string | `"Amend"` | Amend checkbox label |
| `messagePlaceholder` | string | `"Commit messages"` | Textarea placeholder |
| `commitLabel` | string | `"Commit"` | Primary button label |
| `commitAndPushLabel` | string | `"Commit and Push..."` | Secondary button label |

---

### 7. MainToolbar — fixed right-side actions, no extension slots

**File:** `src/ui/components/showcase/MainToolbar.jsx`

**Problem:** Right-side buttons (AI Assistant, Code With Me, Search Everywhere, Settings) are hardcoded. No way to add or remove toolbar actions from outside.

**Required changes:**

| New prop | Type | Default | Description |
|---|---|---|---|
| `leftExtra` | ReactNode | — | Content inserted after the Run widget area |
| `rightActions` | array or ReactNode | current 4 buttons | Right-side action buttons; use current as default |
| `showWindowControls` | boolean | `true` | Show/hide macOS window controls |

---

### 8. Editor — hardcoded ReaderMode strings

**File:** `src/ui/components/editor/Editor.jsx`

**Problem:** `ReaderModeBadge` embeds English strings: "Reader Mode", tooltip title/body, "Configure...".

**Required changes:**

| New prop | Type | Default | Description |
|---|---|---|---|
| `readerModeLabel` | string | `"Reader Mode"` | Badge text |
| `readerModeTooltip` | object | current strings | `{ title, body, linkText }` |
| `showReaderMode` | boolean | `true` | Show/hide the reader mode badge |

---

### 9. ToolWindow — missing rest spread

**File:** `src/ui/components/toolwindow/ToolWindow.jsx`

**Problem:** Root `div` only applies `className` and `style` from `width`/`height`; no `...rest` spread, so custom HTML attributes or merged inline styles are not forwarded.

**Required change:** Spread `...rest` on the root `div`:

```jsx
function ToolWindow({ title, width, height, className, ...rest }) {
    return (
        <div className={...} style={{ width, height }} {...rest}>
```

---

### 10. DialogHeader — no children or style

**File:** `src/ui/components/dialog/DialogHeader.jsx`

**Problem:** Title is a single string prop. No `children` for custom title content (e.g. icon + title). No `style` prop.

**Required changes:**
- Accept `children` — when provided, renders children instead of default title text
- Accept `style` — forwarded to root element

---

## LOW severity issues

### 11. TreeNode — no className/style

**File:** `src/ui/components/tree/TreeNode.jsx`

**Required change:** Forward `className` and `style` on the outer `.tree-node-container` div.

### 12. TerminalWindow — large file with some inline data

**File:** `src/ui/components/toolwindow/TerminalWindow.jsx` (~659 lines)

Already accepts many props (`tabs`, `input`, `history`, etc.). Some demo data (welcome message, suggestions) may be inline. Lower priority since the component is already fairly configurable.

---

## Implementation order

1. **Phase 1 — Quick wins** (no restructuring): StatusBar, WelcomeDialog, CommitWindow, ToolWindow, DialogHeader, TreeNode, Editor
2. **Phase 2 — Data-driven screens**: VCSLogWindow, SettingsDialog, MainToolbar
3. **Phase 3 — MainWindow slots**: Add slot props with defaults for all regions
4. **Phase 4 — Types and docs**: Update `index.d.ts`, update spec files, add showcase examples

---

## Testing strategy

For each change:
1. Verify the showcase page renders identically (no visual regression)
2. Verify the MainWindow page still works end-to-end
3. Verify that passing custom values to new props works correctly
4. Build the library (`npm run build:lib`) — no errors
