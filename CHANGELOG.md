# Changelog

All notable changes to `@jetbrains/int-ui-kit` are documented here.

---

## [0.2.0] — Current

### Added
- **MainWindow: `height` prop** — default `800px` prevents the window from filling the entire page when used in prototypes. Pass `height="100%"` for full-screen embed. ([docs](./Component%20Customization%20Guide.md))
- **MainWindow: `defaultOpenToolWindows` prop** — control which tool window panels are open on initial render.
- **MainWindow: `onEditorCodeChange` prop** — callback fired when editor content changes.
- **Popup: `PositionedPopup` and `positionPopup`** — exported from the library for use in custom prototypes.
- **MainToolbar: Vertical separator** — `MainToolbarVerticalSeparator` component added.
- **Terminal: Tab close and minimize behaviors** — closing the last tab minimizes the terminal panel instead of erroring.
- **AI Assistant icon** — `aiAssistant/toolWindowChat@20x20` now used correctly in the right stripe.
- **Favicon** — showcase app now uses the IntelliJ Platform logo as favicon.

### Changed
- **MainWindow: Left stripe defaults** — removed Run and Debug buttons from the default left stripe (they live in the main toolbar).
- **MainWindow: Default open panels** — `ai` panel no longer open by default.
- **Scrollbar** — all scrollbar tracks are now fully transparent; thumb appears on container hover.
- **Terminal** — cursor blinks only when the terminal panel is focused.

### Fixed
- **Status bar** — chevron icon no longer clips; center content stretches correctly.
- **Popup cells** — no more I-beam cursor or text selection on hover.
- **Terminal** — pressed state on icon buttons while popup is open now works correctly.
- **Tab close button** — clipping and hover stroke fixed.

---

## [0.1.0] — Initial release

### Added
- **Full library build** with Rollup (CJS + ESM + CSS), replacing Webpack-only setup.
- **Core UI components** — Alert, Badge, Banner, Button, Checkbox, Combobox, Dialog, Dropdown, EmptyState, Icon, IconButton, Input, Link, Loader, Notification, Popup, ProgressBar, Radio, Search, SegmentedControl, Table, Toggle.
- **Tooltip variants** — Tooltip, TooltipEditor, TooltipHelp, ValidationTooltip, GotItTooltip.
- **Layout components** — MainWindow, IDEWindow, MainToolbar, StatusBar, StripeIconButton, TabBar, ToolbarButton.
- **Tool windows** — ToolWindow, TerminalWindow, ProjectWindow, CommitWindow, VCSLogWindow, AIAssistantWindow, ProblemsWindow.
- **Dialogs** — WelcomeDialog, SettingsDialog.
- **Popups** — PopupProjects, PopupBranches, PopupRunWidget, PopupFindInFiles, SearchEverywherePopup.
- **Tree** — Tree and TreeNode components.
- **Editor** — code editor with syntax highlighting, line numbers, breakpoints, and reader mode.
- **RunWidget** — run/debug/stop widget for the main toolbar.
- **Icons** — 1,884 SVG icons from IntelliJ Platform, auto-registered and available via `Icon`, `getIcon`, and `iconNames`.
- **Light / dark themes** — via `ThemeProvider` and CSS custom properties.
- **TypeScript declarations** for all exported components.
- **Showcase app** — local demo app at `npm start` with component browser, icon browser, and color token viewer.
- **Showcase / library separation** — clean boundary between the npm bundle and the local dev app.
