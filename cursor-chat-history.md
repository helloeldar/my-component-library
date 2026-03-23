# Cursor chat — task log

## Tooltips / UI showcase
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
