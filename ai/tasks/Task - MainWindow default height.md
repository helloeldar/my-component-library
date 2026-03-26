# Task - MainWindow default height

## Goal
Make MainWindow have a sensible default height so it doesn't expand to fill the entire page when dropped into a prototype.

## Requirements
- MainWindow currently uses `height: 100%` in CSS, which causes it to fill its parent container
- When pasted into a prototype, the parent is often the full page → huge height
- Add a `height` prop with a default value (800px) so the component has a predictable fixed size
- Allow overriding with `height="100%"` for full-container use cases

## Plan
- Add `height` prop (default `800`) to MainWindow.jsx
- Apply it as inline style on the root div
- Remove `height: 100%` from `.main-window` CSS (keep `min-height: 600px`)

## Progress
- 2026-03-26: Task created, fix applied

## Results
- Added `height = 800` prop with inline style application
- CSS `height: 100%` removed; `min-height: 600px` retained
- Prototypes now get a predictable 800px height by default
- Full-screen usage: pass `height="100%"` or `style={{ height: '100%' }}`
