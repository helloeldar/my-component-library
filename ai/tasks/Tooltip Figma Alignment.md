# Tooltip Figma Alignment

## Requirements (from user)
Update Tooltips to match Figma UI Kit pixel perfect.
Figma source: Component-specs → node 3825:8630

## Changes Made

### 1. Themes.css — Tooltip variables updated
**Light theme** — tooltip is now white bg (was dark #26282C):
- `--tooltip-bg`: `var(--gray-30)` → `var(--white)`
- `--tooltip-text`: `var(--white)` → `var(--black)`
- `--tooltip-border`: NEW — `var(--gray-130)`
- `--tooltip-shortcut`: NEW — `var(--text-muted)`
- `--tooltip-shadow`: NEW — `0px 3px 12px rgba(27, 31, 38, 0.18)`

**Dark theme** — tooltip is now dark gray (was light #D1D3D9):
- `--tooltip-bg`: `var(--gray-130)` → `var(--gray-40)`
- `--tooltip-text`: `var(--black)` → `var(--gray-130)`
- `--tooltip-border`: NEW — `var(--gray-40)`
- `--tooltip-shortcut`: NEW — `var(--text-muted)`
- `--tooltip-shadow`: NEW — `0px 3px 12px rgba(27, 31, 38, 0.18)`

### 2. Tooltip.css — Styles updated to match Figma
- Padding: `4px 8px` → `8px`
- Display: `inline-flex` → `flex`
- Align-items: `center` → `flex-start`
- Added `border: 1px solid var(--tooltip-border)`
- Shadow: `0 2px 8px rgba(0,0,0,0.15)` → `var(--tooltip-shadow)`
- Removed `white-space: nowrap` from container
- Shortcut: `opacity: 0.7` → explicit `color: var(--tooltip-shortcut)`
- Added `flex: 1 0 0` to text, `flex-shrink: 0` to shortcut

### 3. Tooltip.jsx — Typography class updated
- Changed from `text-ui-small` (12px) to `text-ui-default` (13px)
- Moved typography class to tooltip container (inherits to children)
- Removed redundant class from individual spans

### 4. Got It Tooltip — pixel-perfect alignment (2026-03-23)
Figma source: Component-specs → Tooltip / Got It (node 3825:8627)

**Bugs fixed in `GotItTooltip.css`:**

- **Width for left/right arrows**: Added `width: 288px` to `.got-it-arrow-left` and `.got-it-arrow-right`. The body should always be 280px wide; with a side arrow (8px) the total component is 288px. Previously the whole component was fixed at 280px, making the body 272px (8px too narrow).

- **z-index not working**: Added `position: relative` to `.got-it-corner` and `.got-it-body`. Without `position`, `z-index` is ignored by browsers, so the corner (z-2) was not actually sitting on top of the body (z-1) border. This caused the body border to not be visually interrupted at the arrow junction for top and left arrow positions.

- **Stacking context**: Added `isolation: isolate` to `.got-it-tooltip` to scope the z-index values of corner and body to their tooltip container, matching the Figma `isolate` class.

**Already correct (no changes needed):**
- All color tokens: `--got-it-bg`, `--got-it-border`, `--got-it-text-step`, `--got-it-text-link`, `--got-it-control-border`
- Shadow: `0px 4px 12px rgba(0,0,0,0.16)` (shadow-notification)
- Body padding: 12px 16px
- Border-radius: 8px
- Font sizes and weights
- Gap values (6px, 4px, 16px)
- Arrow SVG shapes and positioning

## Status: Complete
