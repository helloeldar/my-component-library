# Component Customization Guide

How to use and customize `@jetbrains/int-ui-kit` components in a consumer project.

---

## Quick start

```jsx
import '@jetbrains/int-ui-kit/styles.css';
import { ThemeProvider, MainWindow } from '@jetbrains/int-ui-kit';

function App() {
    return (
        <ThemeProvider>
            <MainWindow />
        </ThemeProvider>
    );
}
```

This gives you a fully working IDE layout with all defaults — editor, tool windows, stripes, toolbar, status bar.

---

## Core idea

Every component has **optional props with defaults**. If you omit a prop, you get the built-in demo value. If you pass a prop, your value wins.

```jsx
// Default behavior — shows "IntelliJ IDEA" title, Java code, 5 editor tabs...
<MainWindow />

// Custom — your project name, your code
<MainWindow
    projectName="MyApp"
    editorCode="console.log('hello')"
    editorLanguage="javascript"
/>
```

---

## How to edit each area

### 1. Change the project identity

```jsx
<MainWindow
    projectName="my-project"
    projectIcon="MP"
    projectColor="purple"
    branchName="feature/login"
    runConfig="Development Server"
/>
```

### 2. Change what's in the editor

```jsx
<MainWindow
    editorTabs={[
        { id: '1', label: 'App.tsx', icon: 'fileTypes/typescript', closable: true },
        { id: '2', label: 'styles.css', icon: 'fileTypes/css', closable: true },
    ]}
    editorCode={`function App() {\n  return <div>Hello</div>;\n}`}
    editorLanguage="typescript"
/>
```

### 3. Change the project tree

```jsx
<MainWindow
    projectTreeData={[
        {
            id: 'root',
            label: 'my-project',
            icon: 'nodes/folder',
            isExpanded: true,
            children: [
                { id: 'src', label: 'src', icon: 'nodes/folder', isExpanded: true, children: [
                    { id: 'app', label: 'App.tsx', icon: 'fileTypes/typescript' },
                ]},
                { id: 'pkg', label: 'package.json', icon: 'fileTypes/json' },
            ]
        }
    ]}
/>
```

### 4. Change which stripe buttons appear

```jsx
import { DEFAULT_LEFT_STRIPE_ITEMS } from '@jetbrains/int-ui-kit';

// Remove the "Structure" button, keep everything else
const myLeftStripe = DEFAULT_LEFT_STRIPE_ITEMS.filter(item => item.id !== 'structure');

<MainWindow leftStripeItems={myLeftStripe} />
```

### 5. Change which right stripe buttons appear

```jsx
<MainWindow
    rightStripeItems={[
        { id: 'ai', icon: 'toolwindows/aiAssistantToolWindow@20x20', tooltip: 'AI Assistant' },
        // removed Notifications and Database
    ]}
/>
```

### 6. Change what a tool window panel renders

By default, clicking "Project" in the stripe shows `<ProjectWindow>`, clicking "Commit" shows `<CommitWindow>`, etc. You can replace any panel:

```jsx
import { ToolWindow } from '@jetbrains/int-ui-kit';

function myLeftPanel(stripeId, context) {
    if (stripeId === 'project') {
        return (
            <ToolWindow title="My Files" width={280} height="auto"
                focused={context.focusedPanel === 'left'}
                onFocus={() => context.setFocusedPanel('left')}
                onActionClick={(a) => { if (a === 'minimize') context.setShowLeftPanel(false); }}
                className="main-window-tool-window main-window-tool-window-left"
            >
                <div style={{ padding: 12 }}>Custom file browser here</div>
            </ToolWindow>
        );
    }
    // Fall back to null for other stripe IDs (they won't render)
    return null;
}

<MainWindow leftPanelContent={myLeftPanel} />
```

### 7. Replace the toolbar entirely

```jsx
<MainWindow
    toolbar={<div className="my-custom-toolbar">My toolbar</div>}
/>
```

### 8. Change the status bar

```jsx
<MainWindow
    statusBarProps={{
        breadcrumbs: [
            { label: 'my-project', module: true },
            { label: 'src' },
            { label: 'App.tsx', icon: true, iconName: 'fileTypes/typescript' },
        ],
        widgets: [
            { type: 'text', text: '12:1' },
            { type: 'text', text: 'UTF-8' },
        ],
    }}
/>
```

### 9. Change or remove overlays

By default, MainWindow includes SearchEverywhere and Settings overlays. Replace them:

```jsx
<MainWindow overlays={<>{/* your custom overlays, or nothing */}</>} />
```

---

## Editing standalone components

You don't have to use `MainWindow`. Every component works independently.

### StatusBar

```jsx
import { StatusBar } from '@jetbrains/int-ui-kit';

// Default demo breadcrumbs
<StatusBar />

// Custom breadcrumbs
<StatusBar
    breadcrumbs={[
        { label: 'MyProject', module: true },
        { label: 'main.py', icon: true, iconName: 'fileTypes/python' },
    ]}
    widgets={[{ type: 'text', text: 'Line 42' }]}
/>

// Intentionally empty status bar
<StatusBar breadcrumbs={[]} widgets={[]} />
```

### WelcomeDialog

```jsx
import { WelcomeDialog, DEFAULT_PROJECTS } from '@jetbrains/int-ui-kit';

// Change the IDE name
<WelcomeDialog ideTitle="WebStorm" ideVersion="2025.2" />

// Custom projects list
<WelcomeDialog
    projects={[
        { id: 'app', name: 'My App', path: '~/projects/app', initials: 'MA', gradient: ['#e74c3c', '#c0392b'] },
    ]}
/>

// Custom navigation items
<WelcomeDialog
    navItems={[
        { id: 'projects', label: 'Projects', level: 1, chevron: 'none' },
        { id: 'plugins', label: 'Plugins', level: 1, chevron: 'down' },
    ]}
/>

// Change button labels
<WelcomeDialog
    actionLabels={{ newProject: 'Create New', open: 'Open Existing', getFromVcs: 'Clone' }}
    searchPlaceholder="Find project..."
/>
```

### CommitWindow

```jsx
import { CommitWindow } from '@jetbrains/int-ui-kit';

// Change labels
<CommitWindow
    title="Changes"
    commitLabel="Save"
    commitAndPushLabel="Save and Sync..."
    amendLabel="Include previous"
    messagePlaceholder="Describe your changes..."
/>

// Custom files
<CommitWindow
    files={[
        {
            id: 'staged',
            label: 'Staged',
            count: '1 file',
            isExpanded: true,
            children: [
                { id: 'f1', label: 'README.md', path: '~/project', icon: 'fileTypes/text', status: 'modified' },
            ],
        },
    ]}
/>
```

### VCSLogWindow

```jsx
import { VCSLogWindow, DEFAULT_COMMITS } from '@jetbrains/int-ui-kit';

// Change title and tabs
<VCSLogWindow title="Version Control" />

// Custom commits
<VCSLogWindow
    commits={[
        { id: 1, dotColor: 'blue', isHead: true, message: 'Initial commit', author: 'You', date: 'Today' },
        { id: 2, dotColor: 'blue', message: 'Add login page', author: 'You', date: 'Yesterday' },
    ]}
    commitDetails={{
        repoName: 'my-app',
        repoPath: '~/projects/my-app',
        fileCount: 2,
        title: 'Initial commit',
        hash: 'abc123',
        author: 'You',
        authorEmail: 'you@example.com',
        date: 'Today',
    }}
/>

// Use defaults but change selected commit
<VCSLogWindow selectedCommitId={3} />
```

### SettingsDialog

```jsx
import { SettingsDialog } from '@jetbrains/int-ui-kit';

// Default settings UI
<SettingsDialog onClose={() => {}} />

// Custom title and size
<SettingsDialog title="Preferences" width={800} height={500} onClose={() => {}} />

// Custom footer buttons
<SettingsDialog
    buttons={[
        { children: 'Discard', onClick: handleClose },
        { children: 'Save', onClick: handleSave },
    ]}
    onClose={handleClose}
/>

// Completely custom content
<SettingsDialog title="Connection Settings" onClose={handleClose}>
    <div style={{ padding: 20 }}>
        Your custom settings form here
    </div>
</SettingsDialog>
```

### DialogHeader

```jsx
import { DialogHeader } from '@jetbrains/int-ui-kit';

// Simple title
<DialogHeader title="My Dialog" />

// Custom content (icon + title)
<DialogHeader>
    <Icon name="general/settings" size={16} />
    <span className="dialog-header-title text-ui-default-semibold">Advanced Settings</span>
</DialogHeader>

// Without macOS buttons
<DialogHeader title="Popup Title" showMacOSButtons={false} />
```

### Editor

```jsx
import { Editor } from '@jetbrains/int-ui-kit';

// Reader mode with custom label
<Editor
    code="const x = 1;"
    language="javascript"
    readOnly={true}
    readerModeLabel="View Only"
    readerModeTooltip={{
        title: 'Exit View Mode',
        body: 'This file is in view-only mode.',
        linkText: 'Settings...',
    }}
/>

// Disable reader mode badge entirely
<Editor code="..." language="java" readOnly={true} showReaderMode={false} />
```

### ToolWindow

```jsx
import { ToolWindow } from '@jetbrains/int-ui-kit';

// Accepts ...rest props, so you can add data attributes, aria labels, etc.
<ToolWindow
    title="Custom Panel"
    width={300}
    height={400}
    style={{ border: '1px solid red' }}
    data-testid="my-panel"
>
    <p>Any content here</p>
</ToolWindow>
```

### TreeNode

```jsx
import { TreeNode } from '@jetbrains/int-ui-kit';

// Now accepts className and style
<TreeNode
    label="Important File"
    icon="fileTypes/java"
    className="highlighted-node"
    style={{ backgroundColor: 'rgba(255,0,0,0.1)' }}
/>
```

---

## "Import defaults, tweak, pass back" pattern

The most powerful editing pattern: import the default data, modify what you need, pass it back.

```jsx
import {
    MainWindow,
    DEFAULT_EDITOR_TABS,
    DEFAULT_LEFT_STRIPE_ITEMS,
    DEFAULT_PROJECT_TREE_DATA,
} from '@jetbrains/int-ui-kit';

// Add a tab to the defaults
const myTabs = [
    ...DEFAULT_EDITOR_TABS,
    { id: '6', label: 'NewFile.kt', icon: 'fileTypes/kotlin', closable: true },
];

// Remove a stripe button
const myStripe = DEFAULT_LEFT_STRIPE_ITEMS.filter(i => i.id !== 'debug');

<MainWindow
    editorTabs={myTabs}
    leftStripeItems={myStripe}
/>
```

This approach is useful because:
- You don't have to recreate the entire data structure
- You only change what you need
- If the library updates its defaults, you automatically get the changes for the parts you didn't override

---

## Available default data exports

| Export | Component | What it contains |
|---|---|---|
| `DEFAULT_EDITOR_TABS` | MainWindow | 5 editor tab definitions |
| `DEFAULT_JAVA_CODE` | MainWindow | Java source code string |
| `DEFAULT_PROJECT_TREE_DATA` | MainWindow | Project file tree |
| `DEFAULT_LEFT_STRIPE_ITEMS` | MainWindow | Left stripe button definitions |
| `DEFAULT_RIGHT_STRIPE_ITEMS` | MainWindow | Right stripe button definitions |
| `DEFAULT_BOTTOM_STRIPE_ITEMS` | MainWindow | Bottom stripe items (empty) |
| `DEFAULT_BREADCRUMBS` | StatusBar | Breadcrumb navigation items |
| `DEFAULT_WIDGETS` | StatusBar | Status bar widget items |
| `DEFAULT_PROJECTS` | WelcomeDialog | Recent projects list |
| `NAV_ITEMS` | WelcomeDialog | Sidebar navigation items |
| `DEFAULT_COMMIT_TOOLBAR_BUTTONS` | CommitWindow | Commit toolbar icon buttons |
| `DEFAULT_BRANCHES` | VCSLogWindow | Branch tree data |
| `DEFAULT_COMMITS` | VCSLogWindow | Commit log entries |
| `DEFAULT_DETAILS_FILES` | VCSLogWindow | Commit details file tree |
| `DEFAULT_COMMIT_DETAILS` | VCSLogWindow | Commit metadata (author, hash, etc.) |

---

## Tips

1. **Start from defaults** — render the component with no props first, then add props one by one.
2. **Use the "tweak" pattern** — import `DEFAULT_*`, spread it, override one field.
3. **`className` and `style` work everywhere** — every component forwards them to its root element.
4. **Empty arrays mean "intentionally empty"** — for StatusBar, pass `breadcrumbs={[]}` for an empty bar. Omitting the prop gives you defaults.
5. **`children` replaces default content** — for SettingsDialog, DialogHeader, and ToolWindow, passing `children` replaces the built-in content.
