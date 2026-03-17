Here are specs gathered from ultimate monorepo:
ai/specs/Terminal Tool Window.md
ai/specs/Terminal Tool Window — How It Works (Developer Scenarios).md

Use it to create realistic Terminal prototype.
But no need to recreate all the features, it just should look and behave like Terminal, very basic one. It should be enough to do some design prototypes with it.

---

## Progress (2026-03-17)

### Done

1. **Visual fidelity pass** — Structured line types (prompt with path + git branch, command, output, cursor), terminal-specific CSS tokens for light/dark themes, dense IDE-like styling (12px JetBrains Mono, 20px line-height, 4px 8px padding), dark terminal background.
2. **Context menu** — Right-click shows popup with Copy, Paste, Select All, Find, Clear Buffer (with keyboard shortcuts). Closes on outside click or Escape.
3. **Search overlay** — Cmd/Ctrl+F opens floating search bar (top-right) with input, match count, prev/next navigation, close button. Escape closes. Also accessible from context menu "Find...".
4. **AI ghost text** — Cursor line type supports `ghost` prop for inline completion preview (dimmed text after cursor).
5. **Colored output** — Error (red), success (green), link (clickable) line types added.
6. **Tab management** — Header supports add/close/more/minimize actions, multiple closable tabs.
7. **Showcase** — 4 examples: default session, multi-tab with errors, AI inline completion, search overlay visible.

### Prototype Checklist (from specs)

- [x] Bottom tool window with tab bar (tab name, close button, "+" button)
- [x] Monospace editor area with colored text output
- [x] Blinking cursor at prompt line
- [x] Right-click context menu
- [x] Floating search bar (Cmd+F)
- [ ] Gear menu with engine/settings options (low priority for prototype)
- [ ] Alternate buffer swap (vim mode) (low priority for prototype)
- [x] Inline completion ghost text

### Remaining (low priority)

- Gear menu popup with engine switcher / settings link
- Alternate buffer swap simulation (e.g., vim mode)
- Actual text selection + copy behavior
- Actual search highlighting of matches