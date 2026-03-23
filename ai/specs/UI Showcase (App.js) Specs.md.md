# App (UI Showcase) Specs

## Overview

The App is a UI Showcase — a single-page application (SPA) that serves as an interactive catalog of reusable UI components and design tokens styled to look like real JetBrains IDEs. It is used by non-developers to create prototypes.

## Tooltip page (`/tooltip`)

Show Tooltips in UI showcase as it is, so user don't have to hover.

- **R-Showcase-Tooltip-01:** The **Tooltip** showcase sections that demonstrate the hover `Tooltip` component must show the **real** tooltip UI **pinned open** (same component, same positioning), so **no hover is required** to review them.
- **Cross-ref:** See **Tooltip specs.md** — “Requirements from chat”, **R-Tooltip-Showcase-01**.

## Notification page (`/notification`)

Show hover-state buttons always visible in showcase, so the user does not need to hover.

- **R-Showcase-Notification-01:** The **Notification** showcase section that demonstrates the ⋮ (More) and × (Close) hover buttons must use `forceHoverButtons` prop to pin them **always visible** — no hover required.
- The `forceHoverButtons` prop adds the `.notification--buttons-visible` CSS class, which applies the same visibility styles as the `:hover` state.

## Layout

- The app uses a two-column layout: a fixed **Sidebar** on the left and a scrollable **Main Content** area on the right.
- The sidebar is 200px wide, sticky, and occupies the full viewport height.
- The main content area fills the remaining width with 40px padding.

## Sidebar

- **Header**: Displays a logo icon (`pluginLogo.svg`) and the text "Library", linking to the Home page (`/`).
- **Theme Toggle**: A `ToolbarIconButton` in the sidebar header toggles between light and dark themes.
  - In light theme, shows the dark theme icon (`theme/darkTheme`) with tooltip "Switch to dark theme".
  - In dark theme, shows the light theme icon (`theme/lightTheme`) with tooltip "Switch to light theme".
- **Navigation Categories**:
  - **Home**: A single link to `/`.
  - **Styles**: Contains links to Typography (`/typography`) and Colors (`/colors`).
  - **Components**: Lists all components (category `components`) alphabetically, sourced from `componentsConfig.js`. Each component links to `/{key}`.
  - **Windows**: Lists all window layouts (category `windows`) alphabetically, sourced from `componentsConfig.js`. Each entry links to `/{key}`.
- **Active State**: The current page's nav item is highlighted with the `active` class.

## Routing

- Uses `react-router-dom` with `BrowserRouter`.
- All routes are defined in the `AppContent` component inside `<Routes>`.
- Unknown routes (`*`) redirect to Home (`/`).
- Available routes:
  - `/` — Home page
  - `/typography` — Typography styles page
  - `/colors` — Colors palette page
  - `/alert` — Alert component
  - `/banner` — Banner component
  - `/buttons` — Buttons component
  - `/checkbox` — Checkbox component
  - `/codeexample` — Code Example component
  - `/combobox` — Combobox component
  - `/dropdown` — Dropdown component
  - `/aiassistant` — AI Assistant tool window
  - `/idelayout` — Main Window (complete IDE window layout)
  - `/projectwindow` — Project tool window
  - `/terminal` — Terminal tool window
  - `/inputs` — Input fields component
  - `/link` — Link component
  - `/popup` — Popup component
  - `/progressbar` — Progress Bar component
  - `/projectselector` — Project Selector component
  - `/radio` — Radio Button component
  - `/search` — Search component
  - `/segmentedcontrol` — Segmented Control component
  - `/statusbar` — Status Bar component
  - `/statusbarbreadcrumb` — Status Bar Breadcrumb component
  - `/stripe` — Stripe component
  - `/table` — Table component
  - `/tabs` — Tabs component
  - `/toggle` — Toggle component
  - `/tooltip` — Tooltip component (hover tooltip; showcase pins examples open)
  - `/tooltiphelp` — Tooltip Help component
  - `/validationtooltip` — Validation Tooltip component
  - `/gotittooltip` — Got It Tooltip component
  - `/toolbar` — Toolbar component
  - `/toolbardropdown` — Toolbar Dropdown component
  - `/toolbariconbutton` — Toolbar Icon Button component
  - `/toolwindow` — Tool Window component
  - `/tree` — Tree component

## Home Page

- Displays the heading "Component Library" with an intro paragraph.
- Lists categories (Styles, Components, Windows) as card groups.
- Each card links to the corresponding page and shows the component name and description.
- Categories and component list are sourced from `componentsConfig.js`.

## Theme Switching

- Only two theme modes: **light** and **dark**. No automatic/system theme mode.
- Theme toggle button in the sidebar switches between light and dark themes.
- All components must change their appearance when the theme is switched.
- Components use CSS variables defined in `.theme-light` and `.theme-dark` classes (in `Themes.css`) to respond to theme changes.
- The `ThemeProvider` wraps the app in a `div` with `theme-light` or `theme-dark` class, which cascades CSS variables to all children.
- The `Icon` component automatically resolves `_dark` icon variants when in dark theme.
- Component CSS files must use **semantic** CSS variables (e.g., `--bg-elevated`, `--text-primary`, `--border-control`) instead of raw palette variables (e.g., `--gray-120`, `--gray-30`) or hardcoded hex colors. Raw palette variables are theme-independent and will not change with the theme.
- Component CSS must not use `.theme-dark` or `.theme-light` prefixed selectors for theming. Instead, use semantic variables that are defined differently in each theme block in `Themes.css`.
- The Island theme variant of the Main Window uses island-specific semantic variables (`--island-bg`, `--island-bg-overlay`, `--island-border`, `--island-shadow`, `--island-editor-bg`) that are defined separately for light and dark themes in `Themes.css`.
- Exceptions: Decorative brand colors (e.g., macOS traffic light buttons, project icon gradients, ProjectSelector color swatches) may use hardcoded values since they are intentionally theme-independent.

## Component Showcase Pages

Each component page follows a consistent structure:

- **Title** (`<h1>`): The component name.
- **Description** (`<p class="component-description">`): A brief explanation of the component.
- **Sections** (`<div class="component-section">`): One or more sections demonstrating variants, states, or usage examples.
  - Each section has a heading (`<h2>`) and optional section description.
  - Examples are displayed inside `component-examples`, `component-examples-vertical`, or custom demo containers.

## Components Config

- All component entries are defined in `src/componentsConfig.js` as an array of objects with `name`, `key`, `description`, and `category` fields.
- Helper functions provide sorted lists: `getSortedComponents()`, `getSortedComponentsOnly()`, `getSortedFeaturesOnly()`, `getSortedWindowsOnly()`.
- The `categoriesConfig` export combines Styles, Components, and Windows categories for the Home page.

## App Structure

- `App` — Root component, wraps everything in `ThemeProvider` and `BrowserRouter`.
- `AppContent` — Contains the sidebar and main content with `Routes`.
- `Sidebar` — Navigation component with logo, theme toggle, and nav links.
- `HomePage` — Wrapper that renders the `Home` component.
- Individual page functions (e.g., `BannerPage`, `ButtonsPage`, `CheckboxPage`, etc.) — Each renders a showcase for one component.

## Windows Category

- The **Windows** category in the sidebar groups full window-level UI pages.
- Each tool window is a **standalone reusable component** that can be used independently for prototypes or embedded inside the Main Window.
- Standalone tool window components:
  - **TerminalWindow** (`src/ui/components/toolwindow/TerminalWindow.jsx`): Terminal with configurable tabs, lines (command/output/success/prompt types), and monospace styling.
  - **ProjectWindow** (`src/ui/components/toolwindow/ProjectWindow.jsx`): Project file tree with configurable tree data, wrapping the Tree component.
  - **AIAssistantWindow** (`src/ui/components/toolwindow/AIAssistantWindow.jsx`): Chat interface with configurable messages (user/assistant roles) and empty state.
- All three components wrap the base `ToolWindow` component and are exported from the library (`src/lib/index.js`).
- Showcase pages in App.js use these standalone components to demonstrate variants:
  - **AI Assistant** (`/aiassistant`): Chat interface and empty state.
  - **Main Window** (`/idelayout`): Complete IDE window layout with default and island themes. Uses TerminalWindow, ProjectWindow, and AIAssistantWindow as embedded tool windows.
  - **Project** (`/projectwindow`): Standard and compact project tree variants.
  - **Terminal** (`/terminal`): Single and multiple session variants.
- All window pages follow the same showcase page structure as component pages.
