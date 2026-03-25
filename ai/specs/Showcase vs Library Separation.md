# Spec: UI Showcase vs UI Library Separation

## Goal
The repo has two distinct outputs:

| Output | Entry point | Purpose |
|--------|------------|---------|
| **UI Showcase** (`npm start`) | `src/index.js` → `App.js` | Local demo app, dev/design tool |
| **UI Library** (`npm run build:lib`) | `src/lib/index.js` | npm package for external consumers |

These must stay cleanly separated. Nothing from the showcase should leak into the library bundle.

---

## Boundary Rules

### Library (`src/lib/`)
- **Entry:** `src/lib/index.js`
- **Styles:** `src/lib/styles.js` (imports only library CSS)
- **Must include:** all reusable IDE components and their CSS
- **Must NOT include:** showcase demo components, showcase CSS tokens, page layouts

### Showcase (`src/App.js`, `src/ui/components/showcase/`)
- **Uses** the library components directly (not via npm)
- **Adds** showcase-only pages, demo wrappers, color showcases, typography page, icon browser
- **Showcase CSS tokens** live in `src/ui/styles/ShowcaseTheme.css` (never imported by lib/styles.js)

---

## CSS Token Separation

### Library tokens → `src/ui/styles/Themes.css`
All design system tokens used by library components:
- Palette (`--blue-*`, `--gray-*`, etc.)
- Semantic Figma tokens (260+ tokens: layer, core, accent, text, control, toolbar, etc.)
- Component-specific tokens (control, dialog, tooltip, badge, editor, etc.)
- `--island-*` tokens (used by `MainWindow.css`)
- Legacy aliases (`--bg-secondary`, `--bg-tertiary`, `--bg-elevated`, `--border-primary`) — used by library components, kept for compatibility

### Showcase tokens → `src/ui/styles/ShowcaseTheme.css`
Tokens that control the showcase app appearance only:
- `--showcase-bg`, `--showcase-sidebar-bg`, `--showcase-sidebar-border`
- `--showcase-card-bg`, `--showcase-card-hover-*`, `--showcase-section-*`
- `--showcase-nav-active-bg`, `--showcase-nav-hover-bg`
- `--showcase-examples-bg`, `--showcase-examples-border`
- `--showcase-preview-bg`, `--showcase-badge-*`

> ⚠️ `ShowcaseTheme.css` must NOT duplicate tokens already defined in `Themes.css`.

---

## Component Separation

### Library components (exported from `src/lib/index.js`)
All components in `src/ui/components/` that are NOT in the `showcase/` subfolder:
- badge, banner, button, checkbox, combobox, dialog, dropdown, editor, emptystate
- iconbutton, input, link, loader, mainwindow, maintoolbar, notification
- popup (including SearchEverywherePopup), progressbar, projectwidget, radio
- runwidget, search, segmentedcontrol, statusbar, stripe, table, tabs
- toolbar, toolbardropdown, toggle, tooltip, toolwindow, tree

### Showcase-only components (NOT exported from lib)
Located in `src/ui/components/showcase/`:
- `Colors.jsx` — color palette browser
- `SemanticColors.jsx` — semantic token browser
- `Icons.jsx` — icon browser
- `Typography.jsx` — typography showcase
- `ToolbarDemo.jsx` + `MainToolbarDemo.jsx` — toolbar demo wrappers
- `MainToolbar.jsx` + `MainToolbar.css` — full main toolbar assembled demo
- ~~`SettingsDialog.jsx`~~ — moved to `dialog/` and exported as library component ✅
- `CodeExample.jsx` — code snippet display helper

---

## Known Gaps (as of 2026-03-25)

| Component | Issue | Priority |
|-----------|-------|----------|
| `SearchEverywherePopup` | In `popup/` folder (library) but missing from lib/index.js | Fixed ✅ |
| `SettingsDialog` | Was in `showcase/` — moved to `dialog/` and exported | Fixed ✅ |
| `MainToolbar` (composite) | Was in `showcase/` with showcase CSS tokens — moved to `maintoolbar/` and exported | Fixed ✅ |

---

## What Gets Into the npm Bundle

Rollup reads `src/lib/index.js` → follows imports → bundles only:
- All listed component exports
- CSS from `src/lib/styles.js` (Themes.css + Typography.css + component CSS files)

Rollup does NOT bundle:
- `ShowcaseTheme.css`
- `Colors.css`
- `App.css`, `Home.css`, `index.css`
- Showcase-folder components

---

## Audit Checklist

Run before any release:
1. `src/lib/styles.js` does NOT import showcase CSS (`ShowcaseTheme.css`, `Colors.css`, `App.css`)
2. `src/lib/index.js` does NOT export components from `showcase/` subfolder
3. `ShowcaseTheme.css` does NOT redefine tokens that are already in `Themes.css`
4. No hardcoded colors (`#xxx`, `rgb()`) in showcase CSS — use tokens
5. Showcase CSS files use `--showcase-*` tokens for structural colors, not low-level palette tokens
