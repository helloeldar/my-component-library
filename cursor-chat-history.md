# Cursor chat — task log

## Prototype repo (int-ui-prototypes) investigation + fixes
### 2026-03-24
- **Investigated:** Prototype repo uses vendored copy of the library (`vendor/@jetbrains/int-ui-kit/`) via Vite aliases, not the npm-linked `node_modules` version.
- **Fixed (CRITICAL):** `headerExtra` → `toolbarExtra` in UX3732.jsx (2 occurrences + docs). The AI Agents button was silently dropped because the library uses `toolbarExtra`, not `headerExtra`.
- **Fixed:** `tooltip` → `title` on `StripeIconButton` (2 occurrences). Library uses native `title` attribute for tooltips on stripe buttons.
- **Fixed:** Removed unsupported `runState` prop from `IDEWindow`.
- **Fixed:** Stripped sourcemap references from vendor `index.js` and `styles.css` (no `.map` files in vendor folder → Vite warnings).
- **Fixed:** Stripped `@import url(...)` for Google Fonts from vendor `styles.css` (PostCSS complained about `@import` not being first). Fonts loaded via separate CSS.
- Dev server starts clean with no warnings.

## NPM Package Update Process spec + fix
### 2026-03-24
- **Issue:** Consumer repo couldn't see `Badge` component. Root cause: `src/lib/index.d.ts` was missing type declarations for Badge (and ~20 other recently added components). The JS exports and dist files were correct.
- **Done:** Created `ai/specs/NPM Package Update Process.md` — documents the manual update checklist (export → types → build → commit → reinstall) and a 4-level automation plan:
  - Level 1 (now): `prepublishOnly` script + export validation script
  - Level 2 (soon): husky pre-commit hook to auto-rebuild dist
  - Level 3 (later): GitHub Actions CI/CD with semantic-release
  - Level 4 (DX): `npm link` + `rollup --watch` for instant local dev
- **Fixed:** Added type declarations to `src/lib/index.d.ts` for all 25 missing components: Badge (+ BadgeNew/Beta/Free/Trial), Banner, Link, PopupProjects, PopupBranches, PopupFindInFiles, Loader, Search, SegmentedControl, Table, Alert, Dialog, DialogHeader, DialogFooter, DialogGroupHeader, WelcomeDialog, Tooltip, TooltipEditor, TooltipHelp, ValidationTooltip, GotItTooltip, Notification, Editor, ProblemsWindow, CommitWindow. Also added `invalid` prop to Checkbox/Radio types and `prefix` prop to TreeNode.
- **Fixed:** Added `prepublishOnly` script to `package.json` — auto-runs `build:lib` before any `npm publish`.
- **Done:** Rebuilt dist with `npm run build:lib` — 75 exports confirmed in dist/cjs/index.js.

## Component Editability audit and spec
### 2026-03-24
- **Done:** Audited all components against the Goal.md requirement: "every component should be easily editable without rewriting."
- Identified 12 issues across 5 severity levels. Key blockers:
  - `MainWindow` — monolithic 571-line shell with all demo data hardcoded
  - `SettingsDialog` — only `onClose` prop, entire UI fixed
  - `VCSLogWindow` — all data in module constants, no data props
  - `WelcomeDialog` — ignores its own `ideTitle` prop, hardcoded nav/labels
  - `StatusBar` — empty arrays `[]` still render defaults (can't get empty bar)
- Created spec: `ai/specs/Component Editability specs.md` — documents every issue, required prop changes, default data exports, and 4-phase implementation plan.

## ToolbarButton component created
### 2026-03-24
- **Done:** Created `ToolbarButton` component (`src/ui/components/toolbar/ToolbarButton.jsx` + `.css`).
  - Matches Figma "Toolbar / Button" (node 5701:76161). 26px height, optional icon, text, optional `showChevron`.
  - Distinct from: `ToolbarIconButton` (icon-only), `ToolbarDropdown` (label+value filter selector), `MainToolbarDropdown` (40px main toolbar).
  - State bg: `inset: 2px`, `border-radius: 3px` (same `_Toolbar / State` as other regular toolbar components).
  - Exported from `lib/index.js` and typed in `lib/index.d.ts`.
  - Added `ToolbarButtonPage` + `/toolbarbutton` route in `App.js`.
  - Added `toolbarbutton` entry to `componentsConfig.js`.
  - Added to `ToolbarDemo.jsx`: own section + included in the preview strip.

## ProjectWidget refactored to use MainToolbarDropdown
### 2026-03-24
- **Done:** `ProjectWidget` now uses `MainToolbarDropdown` for its button instead of its own duplicate hover CSS.
  - `MainToolbarDropdown.jsx`: When `icon` is a React node (not a string), it's rendered directly without a 16px wrapper — so the 20px project icon renders at correct size.
  - `ProjectWidget.jsx`: Replaced raw `<button>` + own hover CSS with `<MainToolbarDropdown icon={<ProjectIcon>} text={projectName} />`. Open-popup forced hover state via `className="main-toolbar-dropdown-hovered"`. All popup logic (click-outside, project list, PopupProjects) unchanged.
  - `ProjectWidget.css`: Stripped all hover/state/content CSS (`.project-widget`, `::before`, `.project-widget-content`, `.project-text-dropdown`, `.chevron-down`). Only kept `.project-widget-container`, `.project-widget-button { padding: 0 10px }` (Figma Project Widget variant: `px-[10px]`), `.project-icon` + color variants.

## MainToolbarDropdown hover fix
### 2026-03-24
- **Done:** Fixed hover state background on `MainToolbarDropdown` to match Figma node 29121:12416 ("Main Toolbar / Dropdown").
  - State bg: `inset: 5px` (was 2px), `border-radius: 6px` (was 3px) — matches "Main Toolbar / State" spec (5px → 30px height bg within 40px container). ProjectWidget already used this correctly.
  - Outer padding: `0 10px 0 14px` (Figma: `pl-14 pr-10`) and `gap: 6px` between icon and text group (was 4px).
  - Text+chevron gap: `2px` (Figma: `gap-2`) (was 4px).
  - Chevron color: `--icon-secondary-stroke` (was `--text-muted`).
  - Simplified JSX: removed JS-managed state tracking; using pure CSS `:hover` and `:active` via `::before` pseudo-element (same pattern as ProjectWidget).

## Toolbar showcase: Main Toolbar added to UI Showcase
### 2026-03-24
- **Done:** Split the toolbar showcase to reflect the component split:
  - Rewrote `ToolbarDemo.jsx` — now shows only regular toolbar components (ToolbarIconButton action/toggle/states, ToolbarSeparator vertical/horizontal, ToolbarDropdown text/label+text/icon/states) with realistic `.toolbar-demo-strip` previews.
  - Created `MainToolbarDemo.jsx` + `.css` — shows Main Toolbar components (full live preview via `MainToolbar`, MainToolbarIconButton action/toggle/states, MainToolbarDropdown text/icon/label+text/states, MainToolbarVerticalSeparator with group example).
  - Updated `ToolbarDropdownPage` in `App.js` — fixed description (was "main toolbar", now "tool-window toolbar"), updated background to `--tool-window-bg`.
  - Added `maintoolbar` entry to `componentsConfig.js` (in both `toolbar` section and `appkit` section), updated descriptions for existing toolbar entries.
  - Added `/maintoolbar` route to `App.js`.

## Toolbar components split: Main vs Regular
### 2026-03-24
- **Done:** Separated Main Toolbar components (40px) from regular toolbar components (26px):
  - Created `src/ui/components/maintoolbar/MainToolbarIconButton.jsx` — standalone component (was nested inside `IconButton.jsx` as a named export). Thin wrapper around `ToolbarIconButton` with `variant="mainToolbar"`.
  - Created `src/ui/components/maintoolbar/MainToolbarDropdown.jsx` + `.css` — 40px dropdown for the main toolbar, with its own CSS classes (prefix `main-toolbar-dropdown-`).
  - Cleaned `ToolbarDropdown.jsx` — removed `variant` prop and `mainToolbar` CSS variant. Now 26px-only.
  - Removed `MainToolbarIconButton` export from `IconButton.jsx`.
  - Updated `MainToolbar.jsx` and `RunWidget.jsx` to import from `maintoolbar/` directly.
  - Updated `lib/index.js` — grouped into "Toolbar Components" (regular) and "Main Toolbar Components" sections.
  - Updated `lib/index.d.ts` type declarations to match.

## Toolbar components pixel-perfect to Figma
### 2026-03-24
- **Done:** Audited toolbar components against Figma node 6285-72286 ("Toolbar" section). Applied pixel-perfect fixes:
  - **`Themes.css`**: Added `--toolbar-border` CSS variable (light: `--transparent-black-30`, dark: `--transparent-white-30` = rgba(255,255,255,0.13)) for the separator color.
  - **`ToolbarSeparator.css`**: Fixed container sizes (28px → 26px height/width), line sizes (16px → 20px), color (`--separator` → `--toolbar-border`).
  - **`IconButton.css`**: Fixed toggled state background — was using `--selection-bg-active` (blue), corrected to `--icon-button-pressed-bg` (semi-transparent). Figma `_Toolbar / State` shows toggled uses pressed background, not blue selection.
  - **`ToolbarDropdown.jsx`/`.css`**: Added `variant` prop (`default` = 26px, `mainToolbar` = 40px). Default now matches Figma 26px spec (`p-[2px]` container, 3px border-radius on state bg). Hover/pressed now use `--icon-button-hover-bg`/`--icon-button-pressed-bg` CSS vars (not hardcoded rgba). Added `label` prop for label+text style (Figma "Toolbar / Dropdown" filter pattern). Updated `MainToolbar.jsx` and `RunWidget.jsx` to pass `variant="mainToolbar"`.
  - **`VCSLogWindow.css`**: Removed now-redundant horizontal separator width override.

## Component library audit and fixes
### 2026-03-23
- **Done:** Full audit of repo for non-library component usage and missing exports. Fixed all identified issues:
  - **`lib/index.js` exports:** Added 7 missing components: `Search`, `SegmentedControl`, `Alert`, `Table`, `GotItTooltip`, `CommitWindow`, `PopupFindInFiles`
  - **`ToolWindowHeader.jsx`:** Dropdown chevron button → `ToolbarIconButton`; removed redundant `.tool-window-action-button` CSS (action buttons were already using ToolbarIconButton)
  - **`Table.jsx`:** Toolbar add/remove icon buttons → `ToolbarIconButton`; text-label fallback stays as plain button
  - **`GotItTooltip.jsx`:** Raw `<button>` → `Button type="secondary"`; raw `<a>` → `UILink`; CSS trimmed to only border-color and color overrides
  - **`PopupFindInFiles.jsx`:** Scopes bar raw buttons → `SegmentedControl`; removed duplicate scope button CSS
  - **`Notification.jsx`:** Hover ⋮/× icon buttons → `ToolbarIconButton`; removed redundant CSS (size/background/border/hover/active all handled by ToolbarIconButton), kept focus-visible override
  - **`TerminalWindow.jsx`:** Search nav/close buttons → `ToolbarIconButton`; CSS reduced to size/padding override only; removed unused `Icon` import

## VCS Log Tool Window
### 2026-03-23
- **Done:** Created `VCSLogWindow` component (`src/ui/components/toolwindow/VCSLogWindow.jsx` + `.css`) matching Figma node 25-3448 from the VCS Components file.
  - Three-panel layout: Branches sidebar (260px) | Commit log (flex-1) | Commit details (340px)
  - **Branches sidebar**: vertical toolbar (`general/chevronLeft`, `general/add`, `vcs/fetch`, `vcs/update`, `general/delete`, `general/settings`) + search bar + branch tree (HEAD, Local, Remote, Tags)
  - **Commit log**: search field with `inline/searchHistory`, `inline/matchCase`, `inline/regex` buttons + "Branch/User/Time" filter buttons + scrollable commit rows with CSS graph circles, ref badges, author, date. One row selected (highlighted with `var(--selection-bg-active)`).
  - **Commit details**: toolbar (`general/locate`, `vcs/update`, `general/show`, `general/expandAll`, `general/collapseAll`) + repo header + file tree + commit info block.
  - Commit graph uses CSS `border-radius: 50%` circles with connecting lines (not SVG icons).
  - `vcs/vcs` and `vcs/branch` icons don't exist in the library — used `vcs/changes` as substitute (same pattern as `PopupBranches.jsx`). No star icon exists — used Unicode `★` character styled in gold.
  - Registered in `componentsConfig.js` (category: `windows`), page + route in `App.js` at `/vcslog`.
- **Updated (graph refactor):** Replaced CSS div-based graph dots with inline SVG circles.
  - Regular commit: 9×9 `<circle fill>` — matches Figma node `146:5208`.
  - HEAD commit: 13×13 SVG with **three concentric circles** (outer ring r=6, middle ring r=4, inner dot r=2.5) — matches Figma node `49:28625` ("Circles in circles :)").
  - SVG ring gaps are transparent → adapt to any row background (selected/hover/default) without needing a background color override.
  - Removed incorrect logic that changed dot color to orange on row selection — dot color reflects branch color, not selection state.

## Settings Dialog
### 2026-03-23
- **Done:** Created `SettingsDialog` component from Figma node 7072:91658 ("Dialog / Settings").
  - `src/ui/components/showcase/SettingsDialog.jsx` — self-contained, interactive dialog built exclusively from existing library components.
  - `src/ui/components/showcase/SettingsDialog.css` — two-panel layout override on `.dialog-content` + layout classes.
  - **Left panel** (283px): `Search` component + `TreeNode` components with interactive expand/collapse and selection state. Tree structure mirrors Figma: Appearance and Behavior (expanded, 7 children), Keymap, Editor, Plugins, Version Control, Build/Execution, Languages, Tools.
  - **Right panel**: Breadcrumb (text + `Icon chevronRight`), then 4 sections:
    - Top controls: `Dropdown` (Theme/Zoom), `Checkbox` (Sync with OS, custom font), `Link` (external, "Get more themes"), disabled dropdowns (font/size when unchecked)
    - Accessibility (`DialogGroupHeader`): 3 `Checkbox` with hints
    - UI Options (`DialogGroupHeader`): 2-column `Checkbox` grid + `Button` "Background Image"
    - Antialiasing (`DialogGroupHeader`): 2 horizontal `Dropdown` (IDE/Editor)
  - **Footer**: Cancel/Apply(disabled)/OK buttons via `Dialog` component's `buttons` prop.
  - Registered in `componentsConfig.js` (key: `settings`, category: `windows`) + route `/settings` in `App.js`.

## MainWindow interactive wiring
### 2026-03-23
- **Done:** Wired up 4 interactive elements in the Main Window demo:
  - **"Commit" stripe button** → opens `CommitWindow` in the left panel (was showing generic empty ToolWindow). Added `focused`/`onFocus` props to `CommitWindow.jsx`.
  - **"Git" stripe button** → moved from left stripe top section to bottom stripe section. Opens `VCSLogWindow` in the bottom panel. Renamed id from `pullRequests` to `git`.
  - **"Search Everywhere" toolbar button** → opens `SearchEverywherePopup` as a centered overlay. Click outside to dismiss.
  - **"Settings" toolbar button** → opens `SettingsDialog` as a modal overlay with backdrop. Cancel/OK buttons dismiss it.
  - Added `onSearchEverywhere`/`onSettings` props to `MainToolbar.jsx`.
  - Added `onClose` prop to `SettingsDialog.jsx` (passed to Cancel and OK buttons).
  - Added overlay CSS classes to `MainWindow.css`: `.main-window-overlay`, `.main-window-overlay-modal`, `.main-window-overlay-popup`, `.main-window-overlay-dialog`. Added `position: relative` to `.main-window`.

## Commit Tool Window
### 2026-03-23
- **Done:** Created `CommitWindow` component (`src/ui/components/toolwindow/CommitWindow.jsx` + `.css`) matching Figma node 27921:15443.
  - Structure: `ToolWindow` wrapper → top toolbar → file tree → bottom panel (amend + message + buttons)
  - Toolbar uses `ToolbarIconButton` with icons: `general/refresh`, `vcs/revert`, `vcs/patch`, `toolwindows/aiAssistantToolWindow`, `general/show`, `general/expandAll`, `general/collapseAll`
  - File tree: collapsible group rows with `Checkbox` + label + count; leaf rows with `Checkbox` + java file icon + link-colored filename + path
  - Bottom panel: `Checkbox` (Amend), `general/history` icon button, AI icon button, "X modified" link text, textarea, Commit (primary) + Commit and Push... (secondary) buttons, settings icon button
  - Props: `title`, `width`, `height`, `files`, `commitMessage`, `onCommit`, `onCommitAndPush`, `className`
  - Registered in `componentsConfig.js` (key: `commit`, section: `appkit`, category: `windows`) and route `/commit` in `App.js`
  - Committed as `25c7209` on `bulat/sprint`: `feat(toolwindow): add Commit tool window with VCS file tree and amend support`
  - Additional cross-cutting changes in this commit: `TreeNode` got `prefix` prop; `Checkbox`/`Radio`/`RunWidget` switched to CSS `:focus-visible` focus rings; `Themes.css` got `--vcs-added-text`/`--vcs-deleted-text`; new `ai/specs/Interaction specs.md`

## Popup / Find in Files component
### 2026-03-23
- **Done:** Created `PopupFindInFiles` component from Figma node 6515:93391.
  - `src/ui/components/popup/PopupFindInFiles.jsx` — props: `title`, `matchSummary`, `replaceField`, `results`, `className`, `style`
  - `src/ui/components/popup/PopupFindInFiles.css` — 677px wide popup with complex header, search section, scopes bar, results list, code preview, footer
  - Uses library components: `Checkbox`, `Combobox`, `ToolbarIconButton` (filter + pin), `Button`, `Icon` for all icons
  - Search field: focused blue border (`--control-focus-border-brand`), `toolwindows/find` icon, inline toggle buttons (`inline/newLine`, `inline/matchCase`, `inline/exactWords`, `inline/regex`)
  - Scopes bar: pressed state for active scope
  - Results: left column (icon `nodes/class` + name + line), right column (code snippet), first row selection
  - Footer: absolute positioned, "Open results in new tab" checkbox, ⌘↩ shortcut, "Open in Find Window" button
  - Syntax-highlighted code preview using `--editor-bg` background
  - `replaceField` variant adds a second search field with `inline/preserveCase` toggle
  - Registered in `componentsConfig.js` (key: `popupfindinfiles`, section: appkit), route `/popupfindinfiles` in `App.js`

## Welcome Dialog component
### 2026-03-23
- **Done:** Created `WelcomeDialog` component (`src/ui/components/dialog/WelcomeDialog.jsx` + `.css`) matching Figma node 11490-43649 "Dialog / Welcome Screen".
  - Uses existing library components: `DialogHeader`, `Button`, `ToolbarIconButton`, `Icon`, `Search`.
  - Layout: 797×649px dialog with left sidebar (221px) + right content area.
  - **Sidebar:** IDE icon (Figma asset URL) + product name/version, navigation tree (Projects, Remote Development expanded with SSH + JetBrains Space, Customize, Plugins, Tutorials), settings icon button at bottom.
  - **Content:** Search field + action buttons (New Project, Open, Get From VCS) + separator, scrollable project list with colored gradient icon boxes + name/path, notifications icon button with badge at bottom-right.
  - Navigation + project selection: uncontrolled (internal state) by default, controlled when `activeNav`/`onNavChange` or `selectedProjectId`/`onProjectSelect` are provided.
  - CSS uses `::before` pseudo-elements for hover + selection backgrounds (matching Figma `inset-[0_12px]` / `inset-[0_8px]` approach).
  - Header title color overridden to `var(--text-muted)` (Figma: text/text-muted) via `.welcome-dialog .dialog-header-title`.
  - SSH and JetBrains Space icons use Figma MCP asset URLs (no equivalent in `src/icons/`).
  - Registered in `componentsConfig.js` (key: `welcomedialog`, section: container), exported from `src/lib/index.js`, page + route in `App.js` at `/welcomedialog`.

## Popup / Search Everywhere
### 2026-03-23
- **Done:** Created `SearchEverywherePopup` component (`src/ui/components/popup/SearchEverywherePopup.jsx` + `.css`) matching Figma node 6515:81938.
  - Props: `tabs`, `activeTab`, `onTabChange`, `includeNonProject`, `onIncludeNonProjectChange`, `searchValue`, `onSearchChange`, `items`, `footerText`, `className`, `style`
  - Header: 40px, uses `TabBar` with `focused={true}` (active tab renders with blue pill), `Checkbox` "Include non-project items", `ToolbarIconButton` for filter and openInToolWindow
  - Search: uses `Search` component with new `icon="toolwindows/find"` and `alwaysFocused={true}` props; full-width via CSS override
  - Results list: uses `PopupCell type="advanced"` — new type added to PopupCell supporting `module`, `moduleIcon`, `shortcut` props; selection bg inset 8px from left/right edges
  - Footer: 8px spacer + `PopupCell type="footer"` with secondary 12px text
  - Library changes: `Search.jsx` — added `icon` and `alwaysFocused` props; `PopupCell.jsx/.css` — added `type="advanced"` with advanced row layout
  - Registered in `componentsConfig.js` (key: `popupsearcheverywhere`), route `/popupsearcheverywhere` in `App.js`

## Semantic Colors showcase page
### 2026-03-23
- **Done:** Created `SemanticColors` component (`src/ui/components/showcase/SemanticColors.jsx`).
  - Shows all semantic CSS variables from `Themes.css` grouped by category: Text, Link, Background, Accent, Control, Selection, Icon, Toolbar, Feedback, Tooltip, Got It Tooltip, Input, Tab, Popup, Dialog, Tool Window, Scrollbar, Separator, Badge, Island Layout.
  - Each token shows: color swatch (live `var(--x)` — auto-switches with theme), display name, Figma token path as description, CSS variable name, and computed `rgb()` value.
  - `useResolvedColor` hook uses `getComputedStyle` + `MutationObserver` on `document.documentElement` to re-read values when theme class changes.
  - Registered in `stylesPages` and `categoriesConfig` in `componentsConfig.js` (key: `semanticcolors`).
  - Route `/semanticcolors` added to `App.js`.
  - Uses existing `Colors.css` styles (`.color-palette`, `.color-item`, `.color-swatch`, etc.).

## Figma token naming alignment (Themes.css)
### 2026-03-23
- **Done:** Renamed all CSS variables in `Themes.css` (and all usages across project) to match Figma token names from `figma-exports/Int UI Kit Islands. Semantic colors.json`.
- Renames applied project-wide with perl one-liners across all CSS/JS files:
  - `--text-primary` → `--text-default` (Figma: `text/text-default`)
  - `--text-inverse` → `--text-over-accent` (Figma: `text/text-over-accent`)
  - `--link-text` / `-hover` / `-pressed` / `-visited` → `--text-link` / `-hover` / `-pressed` / `-visited` (Figma: `text/text-link`)
  - `--border-control` → `--control-border` (Figma: `control/control-border`)
  - `--border-control-disabled` → `--control-border-disabled`
  - `--border-control-invalid` → `--control-focus-border-error`
  - `--border-raised` → `--control-border-raised`
  - `--border-focus` → `--control-focus-border-brand`
  - `--accent-primary` → `--accent-brand-bg`
  - `--accent-primary-hover` → `--accent-brand-bg-hovered`
  - `--accent-primary-active` → `--accent-brand-bg-pressed`
  - `--icon-secondary` → `--icon-secondary-stroke`
  - `--icon-stroke-muted` → `--icon-disabled`
  - `--validation-error-bg/border` → `--feedback-error-bg/border`
  - `--validation-warning-bg/border` → `--feedback-warning-bg/border`
  - `--selection-bg` → `--selection-bg-active`
  - `--warning-text` → `--text-warning`
- `--control-focus-border-error` consolidated into the Control section (removed standalone "Control invalid border" comment)
- Build passes, no broken references.

## Badge component
### 2026-03-23
- **Done:** Created `Badge` component (`src/ui/components/badge/Badge.jsx` + `.css`) matching Figma node 2413:19391.
  - Props: `text` (string), `color` ('blue-secondary'|'blue'|'green-secondary'|'green'|'purple-secondary'|'gray-secondary'|'disabled'), `disabled` (bool), `onClick` (func), `title` (string)
  - Fixed presets: `BadgeNew` (blue), `BadgeBeta` (purple-secondary), `BadgeFree` (green), `BadgeTrial` (green-secondary)
  - Dimensions: 16px height, 6px horizontal padding, 8px border-radius, 12px medium Inter font
  - Colors from Figma Islands semantic tokens (`badge/` collection), mapped to existing `--blue-*`, `--green-*`, `--purple-*`, `--gray-*` CSS variables
  - Background applied via `color-mix(in srgb, <base-color> <opacity>, transparent)` — matches Figma opacity layer approach
  - States: default (cursor default), clickable (cursor pointer, `role=button`, keyboard accessible), disabled (pointer-events none)
  - Focus ring: `:focus-visible` only — keyboard navigation only, not on click
  - Added badge CSS variables to both `theme-light` and `theme-dark` blocks in `Themes.css`
  - Registered in `componentsConfig.js`, exported from `src/lib/index.js`, page + route in `App.js` at `/badge`

## Checkbox & Radio pixel-perfect Figma alignment
### 2026-03-23
- **Done:** Audited and fixed `Checkbox` and `Radio` components against Figma node 27006:54307.
  - Added `invalid` prop to both `Checkbox.jsx` and `Radio.jsx`; class `checkbox-invalid` / `radio-invalid` applied when `invalid && !disabled`
  - Fixed checked+focused focus ring: was `box-shadow: 0 0 0 2px bg, 0 0 0 4px blue` (4px extension), corrected to `0 0 0 1px bg, 0 0 0 3px blue` (3px extension matching Figma `inset: -18.75%` on 16px = 3px)
  - Fixed unchecked+focused CSS selector: was `.checkbox-focused:not(.checkbox-disabled)` (also applied to checked), now `.checkbox-focused:not(.checkbox-disabled):not(.checkbox-checked)` to avoid conflict
  - Added invalid unchecked: `border: 2px solid var(--border-control-invalid)` (red-80 = `#C54E58`)
  - Added invalid checked/indeterminate: `box-shadow: 0 0 0 1px bg, 0 0 0 3px red` red ring
  - Added `--border-control-invalid: var(--red-80)` to both light and dark in `Themes.css`
  - Showcase pages updated with all new invalid states for visual testing

## Notification (Balloon) component
### 2026-03-23 (update)
- **Done:** Renamed "Balloon" → "Notification" in `componentsConfig.js` (key: balloon → notification) and route `/balloon` → `/notification` in `App.js`.
- **Done:** Added hover buttons (⋮ and ×) from Figma node 3830:46699 (Component-specs file).
  - Props: `onMore` and `onClose` (both optional). When either is provided, `.notification-hover-buttons` container renders with the icon buttons.
  - CSS: `opacity: 0 / pointer-events: none` by default; `opacity: 1 / pointer-events: auto` on `.notification:hover`. Absolute `right: 7px, top: 3px`. Each button is 26×26px with 5px padding — matches toolbar icon button spec.
  - Icons: `general/moreVertical` and `general/close`.
  - Added "Hover State" demo section to BalloonPage.

### 2026-03-23
- **Done:** Created `Notification` component from Figma node 3595:83697 (section 6296:70979).
  - `src/ui/components/notification/Notification.jsx` — props: `type` (info/error/warning/success), `title`, `children` (body text), `button` ({ label, onClick }), `actions` ([{ label, onClick, href }]), `timestamp`, `className`
  - `src/ui/components/notification/Notification.css` — width 360px, padding 10px 12px, border-radius 8px; reuses `var(--tooltip-bg)` / `var(--tooltip-border)` / `var(--dialog-shadow)` (same Figma tokens: feedback/feedback-bg, feedback/feedback-border, shadow/shadow-popup)
  - `notification-action-btn`: bordered button using `var(--got-it-control-border)` = feedback/feedback-control-border
  - Already exported from `src/lib/index.js`
  - `BalloonPage` in `App.js` updated: added "JDK 18 required" example with button + links, "Low memory" warning, and "Title only + actions" variant to match Figma showcase

## Icon audit
### 2026-03-23
- **Done:** Audited all JSX files for custom inline SVG icons. Replaced 6 custom SVGs with `<Icon>` component from library:
  - `Search.jsx`: `SearchIcon` → `general/search`, `CloseIcon` → `general/closeSmall`
  - `TooltipHelp.jsx`: `ExternalLinkIcon` → `ide/externalLink` (exact same path, now uses official icon)
  - `StatusBar.jsx`: `ChevronRight` → `general/chevronRight`
  - `StatusBarWidget.jsx`: placeholder stub SVG → `misc/stub`
  - `StatusBarBreadcrumb.jsx`: placeholder stub SVG → `misc/stub`
  - `PopupCell.jsx`: submenu chevron SVG → `general/chevronRight`
- **Cannot replace (justified):**
  - `Checkbox.jsx` checkmark: needs `currentColor` (white on blue); library icons have fixed gray colors
  - `TooltipEditor.jsx` arrow triangles: structural tooltip pointer shapes, not icon-library icons
  - `GotItTooltip.jsx` arrow triangles: same — tooltip pointer shapes
  - ~~`Loader.jsx`~~ → **replaced**: now uses `<Icon name="loader">` with `.loader-spinner` CSS animation class; `transform: rotate()` works on `<img>` elements

## Tooltips / UI showcase
### 2026-03-23
- **Done:** Sidebar Components list now uses section-based grouping. All tooltip pages (Tooltip, Tooltip Help, Validation Tooltip, Tooltip Editor, Got It Tooltip) appear under a collapsible "Tooltips" sub-group. Other sections (Buttons, Inputs, Feedback, etc.) also grouped. `getComponentsBySection()` added to `componentsConfig.js`; 'help' section renamed to 'Tooltips'. CSS: `.nav-sub-group`, `.nav-sub-group-title`, `.nav-item--indented`. No routes/pages changed.

### 2025-03-23
- **Done:** Tooltip showcase (`TooltipPage` in `App.js`) uses new `alwaysVisible` on `Tooltip` so demos show the real component (fixed positioning) without hover. `Tooltip.jsx`: `alwaysVisible` prop + `useLayoutEffect` for position/resize.

### 2026-03-23
- **Done:** Created `TooltipEditor` component (`src/ui/components/tooltip/TooltipEditor.jsx` + `.css`) matching Figma "Tooltip / Editor" (node 3825:8626).
  - Props: `type` (info/error/warning/success), `arrow` (up/down/left/right), `header`, `text`, `hint`, `menu`
  - Inline SVG arrow triangles with matching border color on visible edges only (flat base hidden behind content box)
  - Inline SVG status icons: Error (red circle + !), Warning (yellow triangle + !), Success (green circle + ✓)
  - CSS variables `--tooltip-editor-bg` / `--tooltip-editor-border` scoped per type
  - Added `--feedback-success-bg` / `--feedback-success-border` to `Themes.css` (light + dark)
  - Registered in `componentsConfig.js`, exported from `lib/index.js`, page + route in `App.js` at `/tooltipeditor`

## Validation Tooltip — Figma pixel-perfect alignment
### 2026-03-23
- **Done:** Verified and updated `ValidationTooltip` against Figma node 3825:8628.
  - Colors confirmed correct: error dark `#56272B`/`#80383E`, light `#FFF6F5`/`#FFC4C5`; warning dark `#44321D`/`#694820`, light `#FFF6E9`/`#F4CD9A`.
  - CSS precision: added `font-style: normal`, `letter-spacing: 0`, `flex-shrink: 0` on text/actions elements.
  - Showcase updated: "All Variants" split-view section shows dark (left, `#191A1C` bg) and light (right, white bg) side by side — mirrors Figma spec frame exactly.
  - All spacing, typography, shadow, border-radius confirmed matching Figma.

## Got It Tooltip / Figma alignment
### 2026-03-23
- **Done:** Pixel-perfect Got It Tooltip fixes vs Figma node 3825:8627.
  - `width: 288px` on left/right arrow variants (was 280px — body was 8px too narrow)
  - `position: relative` on `.got-it-corner` + `.got-it-body` so z-index actually works (border interrupted at arrow junction)
  - `isolation: isolate` on `.got-it-tooltip` (scopes stacking context)
  - Specs updated in `ai/specs/Tooltip specs.md` (full Got It section added)
  - Task updated in `ai/tasks/Tooltip Figma Alignment.md`

## Loader / Spinner component
### 2026-03-23
- **Done:** Created `Loader` spinner component from `src/icons/loader.svg`.
  - `src/ui/components/loader/Loader.jsx` — inlines SVG spokes, uses `currentColor`, renders via `color: var(--icon-secondary)`. Accepts `size` prop (default 16, also 32 / any number).
  - `src/ui/components/loader/Loader.css` — `@keyframes loader-spin` rotates the SVG 360° with `animation: 1s linear infinite`.
  - Exported from `src/lib/index.js`.
  - `componentsConfig.js`: status changed from `coming-soon` → `ready`.
  - `App.js`: added `LoaderPage` (showcases default, large, custom sizes, inline usage) + `/loader` route.

## Progress Bar — indeterminate animation
### 2026-03-23
- **Done:** Fixed indeterminate animation to match Figma node 9811:67134.
  - Track background becomes `var(--accent-primary)` when indeterminate.
  - Fill is full-width with `repeating-linear-gradient` (accent → `var(--blue-120)` at 50% → accent, 140px tiles).
  - Slides right with `background-position-x` shift of 140px, 600ms linear infinite.
  - Replaced the old `translateX` bouncing bar approach.

## Button — pixel-perfect Figma alignment
### 2026-03-23
- **Done:** Fixed `Button.css` and `Button.jsx` to match Figma nodes 146:52009 (Default) and 6517:82733 (Slim).
  - `.button-default` padding: `6px 14px` → `5px 12px` (height = 1+5+16+5+1 = 28px)
  - `.button-slim` padding: `4px 11px` → `3px 12px` (height = 1+3+16+3+1 = 24px)
  - Added `min-width: 72px` to both sizes (Figma specifies `min-w-72px`)
  - Added `.button` base class: `display: inline-flex`, `align-items/justify-content: center`, `gap: 6px`, `cursor: pointer`, `outline: none`, `white-space: nowrap`, `box-sizing: border-box`
  - `.button-slim` overrides gap to `4px` (Figma: gap between icon+text is 4px for slim, 6px for default)
  - Slim button now uses `text-ui-default` (13px) instead of `text-ui-small` (12px) — Figma specifies 13px for both sizes

## Icons showcase page
### 2026-03-24
- **Done:** Created `Icons` showcase page (`src/ui/components/showcase/Icons.jsx` + `Icons.css`) showing all ~959 icons from the library.
  - Groups icons by directory (actions, general, nodes, toolwindows, etc.) with counts per group.
  - Excludes `_dark` and `@size` variants (auto-resolved by `Icon` component).
  - Excludes `checkbox-radiobutton` internal icons.
  - Search filter with highlighted matches and result counts.
  - Sticky search bar, responsive grid layout, hover border on icon cards.
  - Each card shows the rendered `<Icon>` at 16px + monospace path name (e.g. `general/add`).
  - Registered in `stylesPages` and `categoriesConfig` in `componentsConfig.js`.
  - Route `/icons` added to `App.js`.

## Specs / AI RULES
### 2025-03-23
- **Done:** User asked to record chat messages as requirements per **AI RULES.md**. Added structured reqs to **`ai/specs/Tooltip specs.md`** (showcase + props) and **`ai/specs/UI Showcase (App.js) Specs.md.md`** (chat→spec process + `/tooltip` showcase rule). Task: **`ai/tasks/Task - Chat requirements documented in specs.md`**.

## Figma Semantic Colors full sync + Showcase separation
### 2026-03-24
- **Done:** Full sync of `src/ui/styles/Themes.css` with `figma-exports/Int UI Kit Islands. Semantic colors.json` (source of truth).
  - Python sync script (`scripts/sync-figma-tokens.py` — run via shell) reads Figma JSON, resolves alias chains (`Color palette:blue-80` → `var(--blue-80)`, `Semantic colors:layer/layer-0-bg` → `var(--layer-0-bg)`), generates `.theme-light` / `.theme-dark` blocks.
  - **260 Figma tokens** added in 20 groups (layer, core, accent, text, container, control, toolbar, feedback, selection, icon, tab, popup, got-it, inlay, scrollbar, toggle, project, editor, badge, shadow).
  - **~190 component tokens** kept, all rewritten to reference Figma semantic tokens.
  - Value mismatches fixed: `--icon-disabled`, `--dialog-bg` (now `var(--layer-1-bg)`), `--toolbar-run/stop-bg-hovered`, `--editor-bg` (was broken `var(--gray-white)`).
  - Alias chain approach: `--tooltip-bg: var(--feedback-bg)` instead of `var(--white)`.
- **Broken refs fixed across codebase:**
  - `--text-primary` → `--text-default` (PopupTreeSection.css, PopupLineWithActions.css)
  - `--selection-bg` → `--selection-bg-active` (PopupLineWithActions.css, PopupBranches.css)
  - `--control-bg-hover` → `--core-bg-transparent-hovered` (StatusBarWidget/Progress/Breadcrumb)
  - `--control-bg-pressed` → `--core-bg-transparent-pressed` (Toggle.css, Checkbox.css)
  - `--tree-hover-bg` → `--tree-node-bg-hover` (VCSLogWindow.css)
  - Editor.css: `--bg-hover`, `--text-primary`, `--link-color`, `--font-family-ui` → proper tokens
- **ShowcaseTheme.css created** (`src/ui/styles/ShowcaseTheme.css`): showcase tokens (`--showcase-bg`, `--showcase-sidebar-bg`, `--showcase-card-bg`, `--island-*`, etc.) independent from UI Kit. Imported in App.js.
  - App.css, Home.css, ToolbarDemo.css, MainToolbar.css, CodeExample.css updated to use `--showcase-*` tokens.
- **SemanticColors.jsx updated**: groups now match Figma structure exactly (Layer, Core, Accent, Text, Container, Control, Toolbar, Feedback, Selection, Icon, Tab, Popup, Got It, Scrollbar, Toggle, Badge, Shadow).
- Build passes (`Compiled successfully`), 0 undefined CSS variable references verified by automated scan.
