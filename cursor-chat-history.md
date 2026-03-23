# Cursor chat — task log

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

## Specs / AI RULES
### 2025-03-23
- **Done:** User asked to record chat messages as requirements per **AI RULES.md**. Added structured reqs to **`ai/specs/Tooltip specs.md`** (showcase + props) and **`ai/specs/UI Showcase (App.js) Specs.md.md`** (chat→spec process + `/tooltip` showcase rule). Task: **`ai/tasks/Task - Chat requirements documented in specs.md`**.
