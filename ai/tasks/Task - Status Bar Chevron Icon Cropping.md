# Task - Status Bar Chevron Icon Cropping

## Goal
Fix the `general/chevronRight` icon visibility and correct rendering in the StatusBar breadcrumb separators.

## Requirements
- Use `general/chevronRight` icon from Int UI Kit in `.status-bar-chevron`
- Icon should be fully visible (not cropped) between breadcrumb items

## Progress

### 2026-03-25
- Changed `forceTheme="light"` → `forceTheme="dark"` in `StatusBar.jsx` `ChevronRight` component — the light version was invisible on the dark status bar background.
- Added `align-self: stretch` to `.status-bar-breadcrumbs` in `StatusBar.css` — attempted to fix the `overflow: hidden` clipping the 16px icon when the container height was smaller.
- **Still not fixed** — icon remains cropped after both changes.

## Known Issue ⚠️

**Status:** Open — not resolved

**Component:** `StatusBar` → `ChevronRight` internal component

**File:** `src/ui/components/statusbar/StatusBar.jsx`, `src/ui/components/statusbar/StatusBar.css`

**Description:**
The `.status-bar-chevron` wrapper (16×16px) clips the `general/chevronRight` icon. The icon is rendered as an `<img>` tag (CRA treats `.svg` imports as URL strings, not inline SVG), so CSS rules targeting `svg` (e.g., `fill`, `width: 7px`) have no effect.

**Root cause (suspected):**
- Icons are imported as URL strings → render as `<img>`, not `<svg>`
- `.status-bar-breadcrumbs { overflow: hidden }` clips the icon vertically when the container height is auto-sized below 16px
- `align-self: stretch` attempt didn't resolve it

**Possible fixes to investigate:**
1. Import SVG as React component using `?react` suffix or SVGR config — allows inline SVG and CSS `fill`/`width` control
2. Use CSS to constrain `img` size inside the wrapper: `.status-bar-chevron img { width: 7px; height: 7px; }`
3. Remove `overflow: hidden` from `.status-bar-breadcrumbs` and handle text truncation differently (e.g., on `.status-bar-breadcrumb-label` only)
