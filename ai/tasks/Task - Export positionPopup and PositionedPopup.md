# Task: Export positionPopup and PositionedPopup from the Library

## Goal
Make the internal `positionPopup` utility and a new `PositionedPopup` wrapper component available to library consumers, so they can position their own popups without reinventing the flip logic.

## Requirements

### positionPopup utility
- Extract the existing private `positionPopup` function from `TerminalWindow.jsx` into a shared utility at `src/ui/utils/positionPopup.js`
- Export it from `src/lib/index.js` as a named export
- Update `TerminalWindow.jsx` to import from the shared utility

### PositionedPopup component
- A React wrapper that calls `positionPopup(ref, triggerRect)` via `useLayoutEffect` on mount/update
- Accepts `triggerRect` (DOMRect or plain `{top, bottom, left, right}`) and `onDismiss` callback
- Renders a fixed transparent overlay for click-outside dismissal
- The popup wrapper starts at `opacity: 0` (set by positionPopup to `1` once positioned — prevents flash)
- Export from `src/lib/index.js`

## Plan
1. Create `src/ui/utils/positionPopup.js`
2. Update `TerminalWindow.jsx` to import from shared util
3. Create `src/ui/components/popup/PositionedPopup.jsx`
4. Export both from `src/lib/index.js`
5. Add TypeScript types to `src/lib/index.d.ts`
6. Build to verify

## Progress
- [2026-03-26] Started

## Results
- Created `src/ui/utils/positionPopup.js`
- Updated `TerminalWindow.jsx` to import from shared util
- Created `src/ui/components/popup/PositionedPopup.jsx`
- Exported `positionPopup` and `PositionedPopup` from `src/lib/index.js`
- Added TypeScript types in `src/lib/index.d.ts`
- Build passes
