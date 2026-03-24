# Task - Add Tooltip Help Component

## Requirements (from user)
Update Tooltip Help to match Figma UI Kit pixel perfect.
Figma source: Component-specs → Tooltip / Help (node 3825:8629 / 3825:7758)

## Plan
1. Create TooltipHelp component (JSX + CSS) matching Figma pixel-perfect
2. Add to componentsConfig and lib/index.js exports
3. Add showcase page with all variants (full, body-only, header, shortcut, link)
4. Update specs and task documentation

## Changes Made

### 1. Created `src/ui/components/tooltip/TooltipHelp.jsx`
- New component with props: header, body, shortcut, link
- Reuses existing typography classes (text-ui-default, text-ui-default-semibold)
- Reuses existing theme tokens (--tooltip-bg, --tooltip-border, --tooltip-shadow, --text-muted, --link-text)
- Inline ExternalLinkIcon SVG with currentColor fill (matches JetBrains icon path from src/icons/ide/externalLink.svg)

### 2. Created `src/ui/components/tooltip/TooltipHelp.css`
- Width: 251px, padding: 12px 16px, gap: 6px, border-radius: 8px
- Flex column layout, all semantic tokens from Themes.css
- Link styling: no padding, no underline, color inherits --link-text

### 3. Updated `src/componentsConfig.js`
- Added entry: `{ name: 'Tooltip Help', key: 'tooltiphelp', ... }`

### 4. Updated `src/lib/index.js`
- Added: `export { default as TooltipHelp } from '../ui/components/tooltip/TooltipHelp'`

### 5. Updated `src/App.js`
- Added import for TooltipHelp
- Added TooltipHelpPage function with showcase variants
- Added route `/tooltiphelp`

### 6. Updated `ai/specs/Tooltip specs.md`
- Added complete Tooltip / Help specification section

## Status: Complete
