# Task — Add Validation Tooltip Component

## Requirements (from user)
Update Tooltip / Validation to match Figma UI Kit pixel perfect.
Figma source: Component-specs → Tooltip / Validation (node 3825:8628)

## Understanding
The Tooltip / Validation component is an inline validation feedback tooltip that appears near input
fields to display error or warning messages. It supports two types (error, warning) and an optional
actions row with clickable links.

Figma shows 8 variants:
- Error (dark/light) × without/with actions
- Warning (dark/light) × without/with actions

## Plan
1. Add validation tooltip theme tokens to Themes.css (light + dark)
2. Create ValidationTooltip.css with pixel-perfect styles
3. Create ValidationTooltip.jsx component
4. Export from lib/index.js
5. Add showcase page in App.js
6. Register in componentsConfig.js
7. Update Tooltip specs.md with Validation section

## Changes Made

### 1. Themes.css — Validation tooltip tokens added
**Light theme:**
- `--validation-error-bg`: `var(--red-160)` (#FFF6F5)
- `--validation-error-border`: `var(--red-130)` (#FFC4C5)
- `--validation-warning-bg`: `var(--yellow-160)` (#FFF6E9)
- `--validation-warning-border`: `var(--yellow-130)` (#F4CD9A)

**Dark theme:**
- `--validation-error-bg`: `var(--red-40)` (#56272B)
- `--validation-error-border`: `var(--red-60)` (#80383E)
- `--validation-warning-bg`: `var(--yellow-40)` (#44321D)
- `--validation-warning-border`: `var(--yellow-60)` (#694820)

### 2. ValidationTooltip.css — New file
- Flex column layout, gap 6px
- Without actions: padding 8px
- With actions: padding 10px 12px 12px 12px
- Font: Inter Medium 13/16
- Border: 1px solid, border-radius 4px
- Shadow: var(--tooltip-shadow)
- Action links: --link-text color, 16px gap

### 3. ValidationTooltip.jsx — New component
- Props: text, type ('error'|'warning'), actions (array of {label, onClick}), className
- Error/warning CSS classes for theming
- Conditional has-actions class for padding variant

### 4. lib/index.js — Export added
### 5. App.js — Showcase page + route + import
### 6. componentsConfig.js — Registered in "help" section
### 7. Tooltip specs.md — Validation section added

## Status: Complete
