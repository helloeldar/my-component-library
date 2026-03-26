# JetBrains Int UI Kit. Web Version

A React component library for building realistic **JetBrains IDE prototypes** — complete IDE window layouts, tool windows, dialogs, and 1,800+ icons out of the box.

**[Live Demo →](https://int-ui-kit.vercel.app)**

---

## What's inside

- **Full IDE layouts** — `MainWindow`, `WelcomeDialog`, `SettingsDialog` with realistic defaults
- **Tool windows** — `TerminalWindow`, `ProjectWindow`, `CommitWindow`, `VCSLogWindow`, `AIAssistantWindow`
- **UI components** — Button, Input, Dropdown, Checkbox, Toggle, Tooltip, Popup, Table, Tree, and more
- **1,884 icons** from IntelliJ Platform icon set (`fileTypes/`, `nodes/`, `toolwindows/`, `actions/`, ...)
- **Light & dark themes** out of the box
- **TypeScript types** for all components

---

## Quick start

**1. Install**

```bash
npm install @jetbrains/int-ui-kit
```

**2. Import styles (once, at app root)**

```jsx
import '@jetbrains/int-ui-kit/styles.css';
```

**3. Use**

```jsx
import { ThemeProvider, MainWindow } from '@jetbrains/int-ui-kit';

function App() {
  return (
    <ThemeProvider>
      <MainWindow />
    </ThemeProvider>
  );
}
```

That's it — you get a fully working IDE layout with editor, tool windows, toolbar, and status bar.

---

## Prototype in 5 minutes

```jsx
import '@jetbrains/int-ui-kit/styles.css';
import { ThemeProvider, MainWindow } from '@jetbrains/int-ui-kit';

export default function MyPrototype() {
  return (
    <ThemeProvider>
      <MainWindow
        projectName="payment-service"
        projectColor="cobalt"
        branchName="feature/stripe-integration"
        editorTabs={[
          { id: '1', label: 'PaymentController.java', icon: 'fileTypes/java', closable: true },
          { id: '2', label: 'application.yml', icon: 'fileTypes/yaml', closable: true },
        ]}
        editorCode={`@RestController\npublic class PaymentController {\n\n    @PostMapping("/charge")\n    public ResponseEntity<String> charge() {\n        return ResponseEntity.ok("ok");\n    }\n}`}
        editorLanguage="java"
      />
    </ThemeProvider>
  );
}
```

---

## Documentation

| Guide | What it covers |
|---|---|
| **[Customization Guide](./docs/customization-guide.md)** | How to customize every component with props, defaults, and slot patterns. The main reference for prototypers. |
| **[Design Patterns](./docs/design-patterns.md)** | IDE-native patterns — actions, panels, overlays, and more. |
| **[Icons Reference](./docs/icons.md)** | Available icon categories and common icon names — use with `icon="fileTypes/java"` etc. |
| **[MainWindow v0.3 Guide](./docs/mainwindow-v0.3-guide.md)** | Custom panels, split left panel, custom stripe icons, PanelContext. |
| **[Changelog](./CHANGELOG.md)** | What changed in each version |

---

## Installation options

**From npm (published package):**

```bash
npm install @jetbrains/int-ui-kit
```

**From Git (latest, unpublished changes):**

```bash
npm install git+https://github.com/helloeldar/my-component-library.git
```

**From local path (for development):**

```bash
# First, build the library inside this repo:
npm run build:lib

# Then, in your prototype project:
npm install ../int-ui-kit-library
```

---

## Prototype starter templates

Copy any of these to get started immediately:

| Template | Description |
|---|---|
| [templates/ide-basic.jsx](./templates/ide-basic.jsx) | Simple IDE window — editor + project tree + terminal |
| [templates/welcome-to-ide.jsx](./templates/welcome-to-ide.jsx) | Welcome screen → open project → IDE (two-screen flow) |
| [templates/settings-flow.jsx](./templates/settings-flow.jsx) | IDE with a Settings dialog trigger |

---

## Available components

### Full IDE screens
`MainWindow` · `WelcomeDialog` · `SettingsDialog`

### Tool windows
`TerminalWindow` · `ProjectWindow` · `CommitWindow` · `VCSLogWindow` · `AIAssistantWindow` · `ToolWindow`

### Main toolbar
`MainToolbar` · `MainToolbarIconButton` · `MainToolbarDropdown` · `ProjectWidget` · `RunWidget`

### Popups & dialogs
`Popup` · `PopupCell` · `PositionedPopup` · `PopupBranches` · `PopupProjects` · `PopupRunWidget` · `PopupFindInFiles` · `SearchEverywherePopup` · `Dialog` · `Alert`

### Tooltips
`Tooltip` · `TooltipEditor` · `TooltipHelp` · `ValidationTooltip` · `GotItTooltip`

### Form controls
`Button` · `Checkbox` · `Combobox` · `Dropdown` · `Input` · `Radio` · `RadioGroup` · `Search` · `SegmentedControl` · `Toggle`

### Display
`Badge` · `Banner` · `EmptyState` · `Icon` · `IconButton` · `Loader` · `Notification` · `ProgressBar` · `Table` · `Tree` · `TreeNode`

### Navigation
`Tab` · `TabBar` · `StatusBar` · `StripeIconButton` · `ToolbarButton`

### Layout
`Editor` · `Link`

---

## Theming

```jsx
import { ThemeProvider, useTheme } from '@jetbrains/int-ui-kit';

// Toggle light/dark
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Theme: {theme}</button>;
}

// Force a specific theme
<ThemeProvider defaultTheme="dark">...</ThemeProvider>
```

---

## Dev setup (contributing)

```bash
npm install          # install dependencies
npm start            # showcase app at http://localhost:3000
npm run build:lib    # library build → dist/ (CJS + ESM + CSS)
npm run build        # showcase production build → build/
```

---

## Links

- [IntelliJ Platform UI Guidelines](https://plugins.jetbrains.com/docs/intellij/user-interface-components.html)
- [JetBrains IntelliJ Icons](https://github.com/JetBrains/IntelliJIcons)
