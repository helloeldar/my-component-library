# Task: Fix Tab Close Button Clipping and Hover Stroke
## Status: ✓
## User Request
> close button is clipped during hover, and there shouldn't be a blue stroke during a hover. Fix it 

> hover should be only for default tab. No hover any other state

## Requirements
1. Fix clipping of the close button on hover in Tab component.
2. Remove the blue stroke from the Tab component during hover.
3. Restrict hover effects (background change, etc.) to default (unselected) tabs only.

## Investigation
- Check `src/ui/components/tabs/Tab.css` for `.tab-close` styles and hover states.
- Check `src/ui/components/tabs/Tab.jsx` for how the close button is rendered and which icon is used.
- Check why the blue stroke appears on hover.

## Progress
- [x] Investigate `Tab.css` and `Tab.jsx` ✓
- [x] Reproduce the issue (if possible via code analysis or a test) ✓
- [x] Fix the clipping issue ✓
- [x] Fix the hover stroke issue (by restricting hover to unselected tabs) ✓
- [x] Restrict hover state to default tabs only (using `.tab-default`) ✓
- [x] Verify the fixes ✓

## Results
- Added `overflow: visible` to the `.tab` component to allow the close button's hover circle to be displayed without clipping.
- Restricted the hover background change and close button appearance to default (unselected) tabs only using the new `.tab-default` class.
- By using `.tab-default` and restricting hover to it, we simplified the CSS logic and avoided the "blue stroke" issue where the selected tab's border looked out of place against the hover background.
- Updated the Tab component specifications to reflect these refined hover rules.
