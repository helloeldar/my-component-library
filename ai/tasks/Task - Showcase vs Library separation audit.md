# Task: Showcase vs Library Separation Audit

## User Requirements (original message)
> Make sure, that we split UI Showcase colors, and components with UI library colors and components.
> UI Showcase should stay here only.
> UI library should be fully available as npm package for external usage.
> Yesterday I found that some main window colors are located inside App.css file. This shouldn't happen. Audit repo.

## My Understanding
The repo serves two purposes:
1. **UI Showcase** — a React app (`src/App.js`) for demoing components locally
2. **UI Library** — the npm package built by Rollup from `src/lib/index.js`

The goal is to ensure a clean boundary:
- Showcase-only CSS tokens, components, and colors must NOT leak into the library bundle
- Library components/CSS must be fully available for external npm consumers

## Audit Findings (2026-03-25)

### 🔴 CRITICAL

#### 1. `--island-*` tokens duplicated between library and showcase CSS
- **Location:** `src/ui/styles/Themes.css` lines 283–287, 795–799 AND `src/ui/styles/ShowcaseTheme.css`
- **Issue:** `--island-bg`, `--island-bg-overlay`, `--island-border`, `--island-shadow`, `--island-editor-bg` are defined in BOTH files
- **Root cause:** When ShowcaseTheme.css was created, island tokens were copied there, but they also stayed in Themes.css (used by MainWindow.css)
- **Fix:** Remove island tokens from `ShowcaseTheme.css` — they belong to `Themes.css` (library) since `MainWindow.css` uses them

#### 2. `SearchEverywherePopup` missing from npm package
- **Location:** `src/ui/components/popup/SearchEverywherePopup.jsx` + `.css`
- **Issue:** Component is in the library `popup/` folder but NOT exported from `src/lib/index.js` and its CSS is NOT in `src/lib/styles.js`
- **Fix:** Add export to lib/index.js + add CSS import to lib/styles.js

### 🟡 MODERATE

#### 3. Legacy alias tokens in Themes.css used by showcase CSS
- **Location:** `src/ui/styles/Themes.css` lines 522–525, 1034–1037
- **Tokens:** `--bg-secondary`, `--bg-tertiary`, `--bg-elevated`, `--border-primary`
- **Status:** These ARE also used by real library components (IDEWindow.css, StatusBar.css, etc.) so they must stay in Themes.css. Not a problem.

#### 4. `SettingsDialog` lives in showcase folder
- **Location:** `src/ui/components/showcase/SettingsDialog.jsx`
- **Issue:** It's a full-featured IDE component that prototypers need. Currently showcase-only.
- **Decision needed:** Should it be moved to `components/dialog/` and exported? Or is it intentionally a showcase demo?
- **Status:** Deferred — needs user decision (it was intentionally built as a demo)

### 🟢 MINOR

#### 5. `App.css` hardcoded color
- **Line 221:** `.component-group h3 { color: #666; }` — should use `var(--text-secondary)`

#### 6. `App.css` uses low-level palette token directly
- **Lines 123, 156:** `background: var(--transparent-white-10)` — should use `var(--showcase-nav-hover-bg)` (defined in ShowcaseTheme.css)

#### 7. `Home.css` uses `--border-primary`
- **Line 163:** `border-color: var(--border-primary)` — showcase file using a library alias token. Low risk since the alias is defined in Themes.css. Could use a showcase token instead, but not blocking.

### ✅ Already Correct
- `ShowcaseTheme.css` exists and separates showcase layout tokens from library tokens
- `src/lib/styles.js` does NOT import `ShowcaseTheme.css`, `App.css`, `Colors.css`, or `Home.css`
- `src/lib/index.js` does NOT export any showcase-only components (`SemanticColors`, `Icons`, `Typography`, `Colors`, `ToolbarDemo`, `MainToolbarDemo`)
- Rollup only bundles from `src/lib/index.js` entry — showcase app CSS never enters the npm dist

## Plan

### Phase 1: Fix Critical Issues
- [x] Remove duplicate `--island-*` tokens from `ShowcaseTheme.css`
- [x] Export `SearchEverywherePopup` from lib/index.js + add CSS to lib/styles.js
- [x] Fix `App.css` hardcoded `#666` → `var(--text-secondary)`
- [x] Fix `App.css` `--transparent-white-10` → `var(--showcase-nav-hover-bg)`

### Phase 2: Document
- [x] Create spec `ai/specs/Showcase vs Library Separation.md`
- [x] Update `cursor-chat-history.md`

### Phase 3: Component promotions (done)
- [x] `SettingsDialog` — moved from `showcase/` to `components/dialog/`, exported from lib
- [x] `MainToolbar` composite — moved from `showcase/` to `components/maintoolbar/`, exported from lib

## Progress

### 2026-03-25 — Audit complete, fixes applied
- Audit done. Found 2 critical issues, 2 minor issues.
- Fixed: duplicate `--island-*` tokens removed from ShowcaseTheme.css
- Fixed: `SearchEverywherePopup` exported from lib (index.js + styles.js)
- Fixed: App.css `#666` → `var(--text-secondary)`
- Fixed: App.css `--transparent-white-10` → `var(--showcase-nav-hover-bg)`

### 2026-03-25 — Component promotions
- Moved `SettingsDialog` from `showcase/` → `dialog/`; updated 3 import sites (App.js, MainWindow.jsx internal, lib/index.js); added export `SettingsDialog` + `DEFAULT_SETTINGS_TREE_ITEMS`
- Moved `MainToolbar` from `showcase/` → `maintoolbar/`; updated 4 import sites (MainWindow.jsx, IDEWindow.jsx, MainToolbarDemo.jsx, lib/index.js); fixed CSS tokens `--showcase-examples-bg` → `--main-window-bg`, `--showcase-bg` → `--main-window-border`; added `DEFAULT_RIGHT_ACTIONS` to export
- Build passes clean (0 errors)
