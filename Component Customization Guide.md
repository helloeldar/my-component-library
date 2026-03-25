# Component Customization Guide

How to use and customize `@jetbrains/int-ui-kit` components to build realistic JetBrains IDE prototypes.

---

## Prototype mindset

A prototype with this library is a React component (or a single file) that:

1. **Imports** components from `@jetbrains/int-ui-kit`
2. **Passes data props** to customize what's displayed (text, tabs, files, commits, etc.)
3. **Wires interactions** via callbacks (`onClick`, `onCommit`, `onNavChange`, etc.) if the prototype needs to be clickable

You rarely need to build anything from scratch — the library ships complete IDE screens (`MainWindow`, `SettingsDialog`, `VCSLogWindow`, etc.) with realistic defaults. Your job is to override only the parts that matter for your scenario.

**Three levels of customization, from simplest to most powerful:**

| Level | Technique | When to use |
|---|---|---|
| **1. Props** | Pass data props directly to the component | Change labels, tabs, files, commits, tree items |
| **2. Tweak defaults** | Import `DEFAULT_*`, spread, override one field, pass back | Adjust the built-in demo data without replacing it all |
| **3. Children / slot props** | Pass JSX as `children` or slot props (`leftPanelContent`, `toolbar`, `overlays`) | Replace entire sections with custom UI |

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
import { SettingsDialog, DEFAULT_SETTINGS_TREE_ITEMS } from '@jetbrains/int-ui-kit';

// Default settings UI — full Appearance and Behavior page
<SettingsDialog onClose={() => {}} />

// Custom title and size
<SettingsDialog title="Preferences" width={800} height={500} onClose={() => {}} />

// Custom left navigation tree
<SettingsDialog
    treeItems={[
        {
            id: 'appearance',
            label: 'Appearance',
            expanded: true,
            children: [
                { id: 'themes', label: 'Themes' },
                { id: 'fonts', label: 'Fonts' },
            ],
        },
        { id: 'network', label: 'Network' },
        { id: 'advanced', label: 'Advanced', hasChildren: true },
    ]}
    onClose={handleClose}
/>

// Add one extra item to the default tree
<SettingsDialog
    treeItems={[
        ...DEFAULT_SETTINGS_TREE_ITEMS,
        { id: 'my-plugin', label: 'My Plugin Settings' },
    ]}
    onClose={handleClose}
/>

// Custom footer buttons
<SettingsDialog
    buttons={[
        { children: 'Discard', onClick: handleClose },
        { children: 'Save', onClick: handleSave },
    ]}
    onClose={handleClose}
/>

// Custom right-panel content (keep default tree, replace the form)
<SettingsDialog title="Connection Settings" onClose={handleClose}>
    <div style={{ padding: 20 }}>
        <p>Server: localhost:8080</p>
    </div>
</SettingsDialog>
```

### MainToolbar

```jsx
import { MainToolbar } from '@jetbrains/int-ui-kit';

// Default toolbar — shows project name, run widget, AI/settings/search icons
<MainToolbar projectName="MyApp" branchName="main" />

// Remove macOS window controls
<MainToolbar projectName="MyApp" showWindowControls={false} />

// Add extra content between run widget and right actions
<MainToolbar
    projectName="MyApp"
    leftExtra={<span style={{ color: 'var(--text-muted)', fontSize: 12 }}>● Connected</span>}
/>

// Replace right-side action buttons entirely
<MainToolbar
    projectName="MyApp"
    rightActions={[
        { icon: 'general/settings', tooltip: 'Settings', onClick: handleSettings },
    ]}
/>
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
| `DEFAULT_SETTINGS_TREE_ITEMS` | SettingsDialog | Left navigation tree items |
| `DEFAULT_COMMIT_TOOLBAR_BUTTONS` | CommitWindow | Commit toolbar icon buttons |
| `DEFAULT_BRANCHES` | VCSLogWindow | Branch tree data |
| `DEFAULT_COMMITS` | VCSLogWindow | Commit log entries |
| `DEFAULT_DETAILS_FILES` | VCSLogWindow | Commit details file tree |
| `DEFAULT_COMMIT_DETAILS` | VCSLogWindow | Commit metadata (author, hash, etc.) |

---

## Complete prototype example

A realistic prototype file showing a "login screen + workspace" flow. Everything in one file.

```jsx
import '@jetbrains/int-ui-kit/styles.css';
import { useState } from 'react';
import {
    ThemeProvider,
    MainWindow,
    WelcomeDialog,
    SettingsDialog,
    DEFAULT_EDITOR_TABS,
    DEFAULT_LEFT_STRIPE_ITEMS,
} from '@jetbrains/int-ui-kit';

// --- 1. Your custom data ---

const MY_PROJECTS = [
    { id: '1', name: 'payment-service', path: '~/projects/payment-service', initials: 'PS', gradient: ['#3b82f6', '#1d4ed8'] },
    { id: '2', name: 'auth-module', path: '~/projects/auth-module', initials: 'AM', gradient: ['#8b5cf6', '#6d28d9'] },
];

const MY_EDITOR_TABS = [
    { id: '1', label: 'PaymentController.java', icon: 'fileTypes/java', closable: true },
    { id: '2', label: 'application.yml', icon: 'fileTypes/yaml', closable: true },
];

const MY_PROJECT_TREE = [
    {
        id: 'root',
        label: 'payment-service',
        icon: 'nodes/folder',
        isExpanded: true,
        children: [
            { id: 'src', label: 'src/main/java', icon: 'nodes/folder', isExpanded: true, children: [
                { id: 'ctrl', label: 'PaymentController.java', icon: 'fileTypes/java' },
                { id: 'svc', label: 'PaymentService.java', icon: 'fileTypes/java' },
            ]},
            { id: 'cfg', label: 'application.yml', icon: 'fileTypes/yaml' },
        ],
    },
];

// Only keep Project and Terminal in the left stripe
const MY_LEFT_STRIPE = DEFAULT_LEFT_STRIPE_ITEMS.filter(i =>
    ['project', 'terminal'].includes(i.id)
);

// --- 2. Prototype component ---

export default function PaymentServicePrototype() {
    const [screen, setScreen] = useState('welcome'); // 'welcome' | 'ide' | 'settings'

    if (screen === 'welcome') {
        return (
            <ThemeProvider>
                <WelcomeDialog
                    ideTitle="IntelliJ IDEA"
                    ideVersion="2025.2"
                    projects={MY_PROJECTS}
                    onNewProject={() => setScreen('ide')}
                    onProjectSelect={() => setScreen('ide')}
                />
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider>
            <MainWindow
                projectName="payment-service"
                projectColor="blue"
                branchName="feature/stripe-integration"
                runConfig="PaymentApplication"
                editorTabs={MY_EDITOR_TABS}
                editorCode={`@RestController\npublic class PaymentController {\n\n    @PostMapping("/charge")\n    public ResponseEntity<String> charge(@RequestBody ChargeRequest req) {\n        // TODO: integrate Stripe\n        return ResponseEntity.ok("charged");\n    }\n}`}
                editorLanguage="java"
                projectTreeData={MY_PROJECT_TREE}
                leftStripeItems={MY_LEFT_STRIPE}
                overlays={
                    screen === 'settings'
                        ? <SettingsDialog onClose={() => setScreen('ide')} />
                        : null
                }
            />
        </ThemeProvider>
    );
}
```

Key things to notice in this example:
- **Start at welcome screen**, navigate to IDE on project open — realistic two-screen flow.
- **Custom data for only the parts that matter** — editor tabs, tree, stripe. Everything else (status bar, right stripe, toolbar) uses defaults.
- **Settings overlay** driven by state, shown as a modal over the IDE.
- **No custom components created** — everything is from the library.

---

## Tips

1. **Start from defaults** — render `<MainWindow />` with no props first, then add props one by one until it matches your scenario.
2. **Use the "tweak" pattern** — import `DEFAULT_*`, spread it, override one field. This is always easier than rebuilding the whole data structure from scratch.
3. **`className` and `style` work everywhere** — every component forwards them to its root element.
4. **Empty arrays mean "intentionally empty"** — for StatusBar, pass `breadcrumbs={[]}` for an empty bar. Omitting the prop gives you the default demo content.
5. **`children` replaces default content** — for SettingsDialog and ToolWindow, passing `children` replaces the built-in content while keeping the chrome (title bar, footer, etc.).
6. **Overlays live inside MainWindow** — pass dialogs and popups as `overlays={<MyDialog />}` so they render on top of the IDE layout correctly.
7. **Only change what your scenario cares about** — if your prototype is about the Commit workflow, customize `CommitWindow` fully but leave the editor and project tree as defaults.
8. **Use the `treeItems` pattern for navigation trees** — both SettingsDialog and the left panel of WelcomeDialog accept custom tree data, so you can build any settings or navigation structure without writing custom components.
9. **Icons come from the library** — use `icon: 'fileTypes/kotlin'`, `'nodes/folder'`, etc. Browse all available icons at `/icons` in the showcase app. Never create custom SVG icons.
