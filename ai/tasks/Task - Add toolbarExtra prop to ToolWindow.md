# Task: Add toolbarExtra prop to ToolWindow

## Requirements (from user)

Make any toolbar in ToolWindow a changeable place — ability to add anything there, as well as edit.
The library is used as a dependency, so the API must support injecting custom toolbar content from the consumer side.

## Approach

Added a `toolbarExtra` prop (ReactNode) to `ToolWindowHeader` and `ToolWindow`. It renders between the title/tabs area and the standard action buttons. Fully backward-compatible.

## Plan

1. Add `toolbarExtra` prop to `ToolWindowHeader.jsx` — render it before `{renderActions()}` in both `label` and `tabs` layout modes
2. Add `toolbarExtra` prop to `ToolWindow.jsx` — forward it to `ToolWindowHeader`
3. Update TypeScript declarations in `src/lib/index.d.ts` — add `toolbarExtra?: ReactNode` to all 5 tool window components
4. Specialized windows (TerminalWindow, ProjectWindow, AIAssistantWindow) need no changes — they already use `{...props}` spread
5. Rebuild npm package

## Files changed

- `src/ui/components/toolwindow/ToolWindowHeader.jsx` — new prop + render
- `src/ui/components/toolwindow/ToolWindow.jsx` — new prop + forward
- `src/lib/index.d.ts` — updated type signatures
- `dist/` — rebuilt

## Status

- [x] Implementation complete
- [x] npm package rebuilt
- [x] Spec updated (Tool Window specs.md)
