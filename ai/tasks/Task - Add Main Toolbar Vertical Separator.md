# Task: Add Main Toolbar Vertical Separator

## User Request
> In Main toolbar use similar separator to stripe-separator, just vertical. Call it Main Toolbar Vertical Separator

## Understanding
Create a vertical separator component for the Main Toolbar, mirroring the existing horizontal Stripe Separator. The Stripe Separator is 40×11px container with a 24×1px line; the vertical version should be 11×40px container with a 1×24px line.

## Changes Made
1. **Created `MainToolbarVerticalSeparator` component**
   - `src/ui/components/maintoolbar/MainToolbarVerticalSeparator.jsx`
   - `src/ui/components/maintoolbar/MainToolbarVerticalSeparator.css`
   - Mirrors stripe separator pattern: flex container with centered 1px line
   - Uses `--border-secondary` token (same as stripe separator)

2. **Updated `MainToolbar`** to use the new separator between RunWidget and toolbar actions
   - Removed `border-left`, `padding-left`, `margin-left` hack from `.toolbar-actions`
   - Added `<MainToolbarVerticalSeparator />` as a proper component

3. **Exported from library** (`index.js`, `index.d.ts`)

4. **Updated specs** in `ai/specs/Stripe and Main Toolbar Icon Buttons specs.md`

## Status: Complete
