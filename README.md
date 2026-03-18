# JetBrains Int UI Kit. Web Version

## Overview

A **React** component library for building prototypes that look like real JetBrains IDEs. Built with Create React App (development/showcase) and Rollup (library build). Components are plain `.jsx` files with co-located `.css` — no TypeScript, no CSS-in-JS, no CSS modules.

### Tech stack

- **React 18/19** (JSX, functional components)
- **Plain CSS** with CSS custom properties (variables) for theming
- **Create React App** (`react-scripts`) — dev server and showcase build
- **Rollup** — library build (`dist/` with CJS + ESM + CSS)
- **SVG icons** — sourced from JetBrains IntelliJ Icons, auto-registered via `scripts/generateIconRegistry.js`

## Project Structure

```
src/
├── App.js                       # Showcase app entry (routing)
├── Home.jsx                     # Showcase home page
├── componentsConfig.js          # Component registry and categorization
├── ThemeContext.jsx              # Theme provider (light/dark/auto)
├── ui/
│   ├── components/              # All component implementations
│   │   ├── alert/               # Alert, Banner, Button, Checkbox,
│   │   ├── banner/              # Combobox, Dialog, Dropdown, Icon,
│   │   ├── button/              # IconButton, Input, Link, Popup,
│   │   ├── checkbox/            # ProgressBar, ProjectSelector, Radio,
│   │   ├── combobox/            # Search, SegmentedControl, StatusBar,
│   │   ├── dialog/              # Stripe, Table, Tabs, Toggle, ToolWindow,
│   │   ├── dropdown/            # ToolbarDropdown, Tree
│   │   ├── icon/                #
│   │   ├── iconbutton/          # Composite windows:
│   │   ├── idewindow/           #   IDEWindow, MainWindow,
│   │   ├── input/               #   AIAssistantWindow, ProjectWindow,
│   │   ├── link/                #   TerminalWindow
│   │   ├── mainwindow/          #
│   │   ├── popup/               # Showcase pages:
│   │   ├── progressbar/         #   CodeExample, Colors, Typography,
│   │   ├── projectselector/     #   MainToolbar, ToolbarDemo
│   │   ├── radio/               #
│   │   ├── search/              #
│   │   ├── segmentedcontrol/    #
│   │   ├── showcase/            #
│   │   ├── statusbar/           #
│   │   ├── stripe/              #
│   │   ├── table/               #
│   │   ├── tabs/                #
│   │   ├── toggle/              #
│   │   ├── toolbardropdown/     #
│   │   ├── toolwindow/          #
│   │   └── tree/                #
│   └── styles/
│       ├── Themes.css           # Light/dark theme tokens + semantic colors
│       ├── Colors.css           # Base color scales (gray, blue, green, etc.)
│       └── Typography.css       # Inter (UI) + JetBrains Mono (editor)
└── icons/                       # SVG icon assets (actions/, nodes/, etc.)
```

### Component pattern

Each component folder typically contains:
- **Component.jsx** — React functional component
- **Component.css** — Co-located styles using CSS custom properties

## CSS / Styling Approach

**Plain CSS with CSS custom properties.** No preprocessors, no CSS-in-JS, no CSS modules.

- **Global design tokens** live in `src/ui/styles/`:
  - `Themes.css` — semantic color tokens that switch between light/dark (e.g. `--bg-primary`, `--text-primary`, `--accent-primary`)
  - `Colors.css` — base color scales (gray 10–140, blue 10–140, green, red, yellow, orange, purple, teal)
  - `Typography.css` — font definitions for Inter (UI) and JetBrains Mono (editor)
- **Component styles** are co-located `.css` files that reference the global tokens
- **Theming** works via a `.theme-light` / `.theme-dark` class on a root element, which remaps semantic variables
- **Auto theme** detects system preference via `prefers-color-scheme` media query

## Components

### UI Components (27)

Alert, Banner, Button, Checkbox, Combobox, Dialog, Dropdown, Icon, IconButton, Input, Link, Popup, ProgressBar, ProjectSelector, Radio, Search, SegmentedControl, StatusBar, StatusBarBreadcrumb, Stripe, Table, Tabs, Toggle, ToolbarDropdown, ToolWindow, Tree, CodeExample

### Window Layouts (4)

AI Assistant, Main Window, Project Window, Terminal — complete IDE window compositions built from the components above.

## Getting Started

```bash
npm install   # install dependencies
npm start     # dev server at http://localhost:3000 (showcase app)
npm run build:lib   # library build → dist/ (CJS + ESM + CSS)
npm run build       # showcase production build → build/
npm test            # test runner (watch mode)
```

## Using as an npm Dependency

```bash
npm install @jetbrains/int-ui-kit
```

```jsx
import '@jetbrains/int-ui-kit/styles.css';
import { ThemeProvider, Button, Input } from '@jetbrains/int-ui-kit';

function App() {
  return (
    <ThemeProvider>
      <Button type="primary">Click me</Button>
      <Input label="Name" placeholder="Enter name..." />
    </ThemeProvider>
  );
}
```

## Links

- [IntelliJ Platform UI Guidelines](https://plugins.jetbrains.com/docs/intellij/user-interface-components.html)
- [JetBrains IntelliJ Icons](https://github.com/JetBrains/IntelliJIcons)