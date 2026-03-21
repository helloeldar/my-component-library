Here are specs gathered from ultimate monorepo:
ai/specs/Terminal Tool Window.md
ai/specs/Terminal Tool Window — How It Works (Developer Scenarios).md

Use it to create realistic Terminal prototype.
But no need to recreate all the features, it just should look and behave like Terminal, very basic one. It should be enough to do some design prototypes with it.

Important visual parts should be done:

Tab component
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6353-72297&t=V8DOXcjhgUO6bzb3-4

Overall what terminal looks like
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-137935&t=V8DOXcjhgUO6bzb3-4

Font: JetBrains Mono
Size: 13.0
Line height: 1.2
Main weight: Regular
Bold weight: Bold

Stripe icons: src/icons/toolwindows/terminal@20x20.svg

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
~~- [x] Floating search bar (Cmd+F) - no need~~
- [ ] Gear menu with engine/settings options (low priority for prototype)
- [ ] ~~Alternate buffer swap (vim mode) (low priority for prototype)~~ - no need
- [x] ~~Inline completion ghost text~~  - no need

---

## Tab Add/Close + Minimize (2026-03-22)

### Requirements (from chat)

> "Terminal tool window: When I close Tab — should actually close. When I press add — it should add new tab with name Local (n)"
> "This also should work when I have only Terminal tool window. Tab should have Active state when focus inside of the tab. And I should able to create and delete new tabs"
> "Also fix that in Main window Minimize button doesn't work"

### What was done

1. **TerminalWindow — controlled/uncontrolled tab management**
   - When no `onTabChange` is provided (standalone / showcase page), TerminalWindow manages its own tab state: `internalTabs`, `internalActiveTab`, `tabCounter` ref
   - `handleTabClose(index)` — removes tab, adjusts active index, prevents closing last tab
   - `handleTabAdd()` — appends `Local (n)` with incrementing counter, activates new tab
   - `handleTabChange(index)` — switches active tab internally
   - When `onTabChange`/`onTabClose`/`onTabAdd` are provided (MainWindow), delegates to parent

2. **TerminalWindow — focus tracking**
   - When `focused` prop is omitted (standalone), tracks `onFocus`/`onBlur` on content wrapper
   - Passes `focused` state to ToolWindow → ToolWindowHeader → TabBar → Tab for active/focused styling

3. **TerminalWindow — action forwarding**
   - Added `onActionClick` as named prop (renamed internally to `onActionClickProp`)
   - `handleActionClick` handles `tabClose`/`add` internally, forwards ALL actions to parent's `onActionClick`
   - Fixes minimize and any custom action delegation

4. **MainWindow — stateful terminal tabs**
   - `terminalTabs` is now `useState` (starts with single "Local" tab)
   - `activeTerminalTab` is index-based (number) instead of string-based
   - `handleTerminalTabClose` / `handleTerminalTabAdd` manage state
   - `onActionClick` handler on TerminalWindow calls `setShowBottomPanel(false)` for minimize

### Files changed

- `src/ui/components/toolwindow/TerminalWindow.jsx` — core tab/focus/action logic
- `src/ui/components/mainwindow/MainWindow.jsx` — stateful tabs + minimize handler
- `ai/specs/Terminal specs.md` — documented tab management section
- `ai/specs/Tool Window specs.md` — documented action callbacks + minimize behavior