This is page with all the components from Islands UI Kit, that we currently use.
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6204-73431


Goal of this repo is to copy all of them as close as possible, so we can do high quality prototypes.
Check what's already exists, what's not. Audit existing ones, if they look properly.
Create a list with all the components, and links to their component sets.
Track status of each component - is it implemented? Is it accurate? Is it reviewd by designer?

In figma-exports folder you can find exported tokens from out library

Once list is gathered - start implementig gaps one-by-one, and update tracker after each step

I'm especially interested in Terminal tool Window, so please help me to recreate it, and recreate all required components for it.
Extracted into separate task: ai/tasks/Task - Reacreate Terminal tool window.md


---

## Structured execution (2026-03-17)

### Start

- Captured this task into `ai/specs/Islands UI Components Audit Specs.md`.
- Pulled the top-level Figma metadata for page `6204:73431` to seed the audit.
- Inventoried the current repo component surface in `src/ui/components/` and the exported API in `src/lib/index.js`.
- Started a dedicated audit tracker in `ai/tasks/Islands UI Components Audit Tracker.md`.

### Initial findings

- The repo already contains a solid base set of Islands-style controls and layout primitives.
- The Figma page covers a larger surface than the current public component inventory, especially across popup variants, dialog parts, tool window variants, and detailed input states.
- The next pass should focus on mapping every repo component to a concrete Figma component set and then marking missing or inaccurate areas.

### Current plan

1. Complete the first-pass mapping from repo components to Figma component groups.
2. Mark which components are implemented, partially implemented, or missing.
3. Prioritize the first batch of components that need implementation or fidelity fixes.

### Progress update

- Mapped the four popup sections into exact named Figma variants:
  - Main Toolbar
  - Actions
  - Editor
  - Navigation
- Confirmed that many popup variants are currently represented only as showcase compositions in `src/App.js`, not as standalone library components.
- Confirmed that `ToolWindow`, `ToolWindowHeader`, and `MainWindow` have direct Figma counterparts and should be audited next for visual fidelity.
- Confirmed that there is still no dedicated Dialog component family in `src/ui/components/`.
- Landed a first fidelity pass on `src/ui/components/toolwindow/ToolWindowHeader.*` to better match the Figma header primitives.
- Confirmed that the current `MainWindow` is still a showcase-style structural composition and not yet a 1:1 implementation of the Figma shell.
- After re-checking the brief, reprioritized the next implementation target to `TerminalWindow`, since that is the user’s explicitly stated area of interest.
- Defined the first terminal batch around tighter header/tab spacing, denser terminal styling, and more realistic prompt/output states.
