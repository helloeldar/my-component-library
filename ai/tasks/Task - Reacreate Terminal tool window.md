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

---

## Popup Menus (2026-03-22)

### Requirements (from chat)

> "Add these popup menus to Terminal Tool window"
> Figma reference: https://www.figma.com/design/KF78r6MRvrfBIl9PDICZTQ/New-IJ-Terminal?node-id=3936-146049

Three popup menus from the real IntelliJ Terminal:
1. Chevron dropdown (▾) — shell selector: bash, zsh, New SSH Session..., Settings
2. Three dots menu (⋮) — tool window management: Terminal Engine, Settings, Close All, Show Toolbar ✓, Group Tabs, View Mode, Move to, Resize, Remove from Sidebar
3. Header right-click context menu — Rename Session, Move to Editor, + all items from more menu, + Hide ⇧⎋

### What was done

1. **Menu data arrays** — defined `chevronMenuItems`, `moreMenuItems`, `headerContextMenuItems` as static arrays at module level, matching the Figma reference screenshots
2. **Popup state** — added `chevronMenu`, `moreMenu`, `headerContextMenu` state variables; only one popup open at a time
3. **Action triggers** — `handleActionClick` now handles `dropdown` → toggle chevron menu, `more` → toggle more menu
4. **Header right-click** — wrapper div detects right-click on `.tool-window-header` and opens context menu at cursor position
5. **Rendering** — reusable `renderMenuItems()` helper renders any menu array with Popup + PopupCell, supporting icons, submenu arrows, shortcuts, selected state, and icon gap alignment
6. **Click-outside** — single `useEffect` closes all popups on document click

### Files changed

- `src/ui/components/toolwindow/TerminalWindow.jsx` — menu data, state, rendering, action handling
- `src/ui/components/toolwindow/TerminalWindow.css` — positioning for chevron, more, and header context menus
- `ai/specs/Terminal specs.md` — documented popup menus section

---

## Popup Positioning & Active State (2026-03-22)

### Requirements (from chat)

> "Popups should be above all layers."
> "They should know that there is no space on the right, so they should render on the left direction. Same for the bottom."
> "Logic: default — bottom right. No space on right — to the left. No space on the bottom — to the top."
> "Clicked component should keep clicked state while popup is opened."
> "Popup on left or right side should be aligned with clicked component."
> "Popup should have 4 px gap between clicked component."

### What was done

1. **Fixed positioning** — Changed all popup menus from `position: absolute` to `position: fixed` with `z-index: 10000`, guaranteeing they render above all layers. Click-outside overlay uses `z-index: 9999`.

2. **Smart positioning with flip logic** — Added `positionPopup()` utility function:
   - Default: popup below trigger, left-aligned with trigger's left edge
   - If popup would overflow viewport right edge → flip left (popup's right edge aligns with trigger's right edge)
   - If popup would overflow viewport bottom edge → flip up (popup above trigger)
   - 4px gap between trigger and popup (0px for right-click context menus)

3. **Trigger button rect capture** — When `handleActionClick` receives 'dropdown' or 'more', it finds the trigger button via DOM query and stores its `getBoundingClientRect()` in state. For header right-click, cursor coordinates (`clientX`, `clientY`) are stored.

4. **useLayoutEffect positioning** — Each popup has a dedicated `useLayoutEffect` that runs when it opens. It measures the popup element, calls `positionPopup()` to calculate final position with flip logic, and applies it before browser paint (no flash). Initially rendered with `opacity: 0`, then set to `1` after positioning.

5. **Trigger button active state** — When a popup is open, the wrapper div gets `terminal-dropdown-active` or `terminal-more-active` CSS class. CSS selectors target the specific trigger buttons (`.tab-bar-actions .tool-window-action-button:last-child` for dropdown, `.tool-window-header-actions .tool-window-action-button:first-child` for more) and apply active background/icon color.

### Files changed

- `src/ui/components/toolwindow/TerminalWindow.jsx` — positionPopup utility, popup refs, useLayoutEffect positioning, active state classes, fixed positioning
- `src/ui/components/toolwindow/TerminalWindow.css` — unified `.terminal-popup-menu` class with position: fixed, overlay z-index, trigger active state CSS
- `ai/specs/Terminal specs.md` — documented popup positioning rules and trigger active state