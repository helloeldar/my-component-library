# Task: Improve ProjectWidget

## Source
- User message in chat
- Figma reference: [Popup / Projects](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6445-76525&m=dev)

## Status: In Progress

## Completed Steps
- [x] Renamed `ProjectSelector` → `ProjectWidget` across all files (component, CSS, folder, imports, exports, configs, docs, specs)

---

## Figma vs Current Implementation — Comparison

### What the Figma design shows (node 6445:76525)

The Figma node is **"Popup / Projects"** — the popup that appears when clicking the Project Widget button in the main toolbar. It is 253px wide with the following structure:

1. **Top padding** — 8px vertical space
2. **Action items** (3 rows, each with 16px icon + text):
   - `general/add` icon → "New Project..."
   - `nodes/folder` icon (labeled "toolWindows / project" / "folder") → "Open..."
   - `vcs/vcs` icon (labeled "vcs / vcs" / "branch, version control") → "Clone Repository..."
3. **Separator** with section header "Recent Projects" (Inter Semi Bold 12px, `--text-secondary`)
4. **Recent project items** (4 rows, multiline cells):
   - 20x20 gradient project icon badge (JetBrains Mono Medium 12px, white)
   - Project name (Inter Medium 13px, `--text-default`)
   - Project path hint (Inter Medium 12px, `--text-secondary`)
   - Items: commons-math, kotlin, IntelliJ IDEA, WebStorm
5. **Bottom padding** — 8px vertical space

### What the current implementation has

#### A) `PopupProjects.jsx` (the popup content)
- Has the 3 action items ✅
- Has the separator with "Recent Projects" ✅
- Has the 4 recent project items ✅
- **Issues found:**
  - "Clone Repository..." uses icon `vcs/changes` — Figma says it should be `general/vcs` (the branch icon, described as "vcs / vcs" in Figma component descriptions)
  - "Open..." has `selected` prop set to `true` by default — should not be selected
  - Recent project cells are missing `hint` (path text) — Figma shows paths like `~/ideaProject/commons-math`
  - Project icon text font-weight is 400 in CSS — Figma specifies Medium (500)

#### B) `ProjectWidget.jsx` (the button + popup container)
- Shows project icon badge + project name + chevron ✅
- Click toggles popup open/close ✅
- Click-outside dismissal ✅
- Supports custom `projects` array with multiline popup cells ✅
- Falls back to `PopupProjects` when no `projects` prop ✅
- **Issues found:**
  - When custom `projects` are provided, it renders a generic `Popup` instead of using `PopupProjects` structure (missing the 3 action items at the top: New Project, Open, Clone Repository)
  - No hover state management via CSS `:hover` — uses JS-driven `state` prop instead (acceptable but could be simplified)

#### C) `ProjectWidget.css` — typography/spacing issues
  - `.project-icon-text` font-weight is `400` — Figma specifies `500` (Medium)
  - `.project-icon-text` line-height is `1` — Figma specifies `22px` with `line-height: 0` container trick (visual centering)

---

## Improvement Plan

### 1. Fix PopupProjects icon for "Clone Repository..."
- **Current:** `vcs/changes`
- **Target:** `general/vcs` (the branch/VCS icon, matching Figma's "vcs / vcs" description)
- **File:** `src/ui/components/popup/PopupProjects.jsx`

### 2. Remove default `selected` state from "Open..."
- **Current:** `<Popup.Cell type="line" icon="nodes/folder" selected>Open...</Popup.Cell>`
- **Target:** Remove the `selected` prop
- **File:** `src/ui/components/popup/PopupProjects.jsx`

### 3. Add hint/path text to recent project cells in PopupProjects
- **Current:** Project cells only show the project name
- **Target:** Add `hint` prop with path text matching Figma:
  - commons-math → `~/ideaProject/commons-math`
  - kotlin → `~/ideaProject/kotlin`
  - IntelliJ IDEA → `~/ideaProject/intellij-idea`
  - WebStorm → `~/ideaProject/webstorm`
- **File:** `src/ui/components/popup/PopupProjects.jsx`

### 4. Fix project icon font-weight
- **Current:** `font-weight: 400` in `.project-icon-text`
- **Target:** `font-weight: 500` (Medium) to match Figma
- **Files:** `src/ui/components/projectwidget/ProjectWidget.css`, `src/ui/components/popup/PopupProjects.css`

### 5. Ensure ProjectWidget shows full popup structure when custom `projects` are passed
- **Current:** When `projects` prop is provided, only renders project list items in a generic Popup (missing action items)
- **Target:** Always show the full popup structure (New Project / Open / Clone Repository + separator + project list), regardless of whether projects are passed as props or hardcoded
- **File:** `src/ui/components/projectwidget/ProjectWidget.jsx`

### 6. Fix `vcs/branch` icon reference in MainToolbar
- **Note:** `MainToolbar.jsx` references `vcs/branch` which doesn't exist in the icon registry — the actual icon is `general/vcs`
- **File:** `src/ui/components/showcase/MainToolbar.jsx` (separate fix, discovered during audit)

---

## Files to modify
- `src/ui/components/popup/PopupProjects.jsx`
- `src/ui/components/popup/PopupProjects.css`
- `src/ui/components/projectwidget/ProjectWidget.jsx`
- `src/ui/components/projectwidget/ProjectWidget.css`
- `src/ui/components/showcase/MainToolbar.jsx` (bonus fix)
