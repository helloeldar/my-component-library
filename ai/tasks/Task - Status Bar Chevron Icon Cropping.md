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

**Status:** Resolved ✅ (2026-03-25)

**Component:** `StatusBar` → `ChevronRight` internal component

**File:** `src/ui/components/statusbar/StatusBar.jsx`, `src/ui/components/statusbar/StatusBar.css`

**Description:**
The `.status-bar-chevron` wrapper (16×16px) clips the `general/chevronRight` icon. The icon is rendered as an `<img>` tag (CRA treats `.svg` imports as URL strings, not inline SVG), so CSS rules targeting `svg` (e.g., `fill`, `width: 7px`) have no effect.

**Root cause (suspected):**
- Icons are imported as URL strings → render as `<img>`, not `<svg>`
- `.status-bar-breadcrumbs { overflow: hidden }` clips the icon vertically when the container height is auto-sized below 16px
- `align-self: stretch` attempt didn't resolve it

**Fix applied:**
- Checked Figma design (node 544:47863) — `overflow: clip` belongs on the STATUS BAR container, not the breadcrumbs row
- Added `overflow: hidden` to `.status-bar` (outer container, 29px tall)
- Kept `overflow: hidden` on `.status-bar-breadcrumbs` for horizontal truncation of long paths
- Added `align-self: stretch` to `.status-bar-breadcrumbs` — ensures the container fills the full 29px status bar height, so `overflow: hidden` clips at 29px (not at text height ~14-16px), letting the 16px chevron icons fit without vertical clipping
- Added `overflow: hidden` + explicit `img { width: 16px; height: 16px; }` to `.status-bar-chevron`
