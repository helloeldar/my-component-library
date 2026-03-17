# How the Terminal Works — Developer Scenarios

A designer-friendly walkthrough of the IntelliJ Terminal, explained through real developer workflows.

---

## What the Terminal Is

The Terminal is a panel at the bottom of the IDE that gives developers a command-line interface without leaving their editor. Think of it as a built-in version of macOS Terminal or Windows Command Prompt, but living inside the IDE and aware of the project context.

It opens already pointed at the project folder, so developers don't need to navigate there manually.

---

## Scenario 1: Running a Project

**What the developer does:** Opens Terminal (`⌥F12`), types `npm start`, presses Enter.

**What happens in the UI:**
1. The bottom tool window slides up, showing a single tab labeled with the shell name (e.g., "zsh" or "bash")
2. A **prompt line** appears — something like `~/my-project $` with a blinking cursor
3. The developer types `npm start` — each character appears immediately at the cursor (type-ahead ensures zero perceived lag)
4. After pressing Enter, the **output area** fills with scrolling text — build logs, server URLs, status messages
5. Colored text appears: green for success, red for errors, blue for links — the terminal respects ANSI color codes
6. If the output mentions `http://localhost:3000`, it becomes a **clickable hyperlink** — the developer can Cmd+click to open it in a browser

**Key UI elements active:** Prompt line → typed input → scrolling output → colored text → hyperlinks

---

## Scenario 2: Working with Multiple Tasks in Tabs

**What the developer does:** Needs a server running in one tab and wants to run tests in another.

**What happens in the UI:**
1. Tab 1 is already running `npm start` (output is streaming)
2. Developer clicks the **"+" button** in the tab bar → a new tab appears (Tab 2)
3. Tab 2 gets its own fresh prompt, independent from Tab 1
4. Developer types `npm test` in Tab 2 — test results appear here while the server keeps running in Tab 1
5. Tab names show in the tab bar. Developer can **right-click a tab → Rename** to label them "Server" and "Tests"
6. Switching between tabs is instant — each tab preserves its full scrollback history

**Key UI elements active:** Tab bar with multiple tabs → "+" button → tab context menu (rename, close) → independent sessions

---

## Scenario 3: Searching Through Output

**What the developer does:** A long build log scrolled past and they need to find a specific error.

**What happens in the UI:**
1. Developer presses `⌘F` — a **search bar** floats in from the top-right corner of the terminal area
2. They type "error" — matching text gets highlighted in the output with yellow markers
3. **Up/Down arrows** in the search bar navigate between matches
4. The terminal scrolls to each match automatically
5. Pressing `Escape` closes the search bar and returns focus to the prompt

**Key UI elements active:** Floating search overlay → highlighted matches → match navigation arrows → match count indicator

---

## Scenario 4: Using a Full-Screen App (vim, less, top)

**What the developer does:** Types `vim config.yml` to quickly edit a config file.

**What happens in the UI:**
1. The normal terminal output **disappears** — replaced by vim's full-screen interface (this is the "alternate buffer" swap)
2. The entire terminal area becomes vim's editor — with line numbers, status bar, colored syntax
3. The terminal cursor changes behavior — it's now controlled by vim, not the shell
4. When the developer saves and quits (`:wq`), the alternate buffer **swaps back** to the normal terminal view
5. The previous output and prompt reappear exactly as they were before

**Key UI elements active:** Alternate buffer (full-screen takeover) → buffer swap animation → return to normal view

---

## Scenario 5: Copy-Pasting Code and Commands

**What the developer does:** Copies a multi-line command from documentation and pastes it.

**What happens in the UI:**
1. Developer selects text in the terminal output by **click-and-drag** — selected text highlights in the standard selection color
2. `⌘C` copies the selection
3. To paste, developer clicks at the prompt and presses `⌘V` — the pasted text appears at the cursor
4. **Right-click** anywhere in the terminal shows a context menu with Copy, Paste, Select All, Clear Buffer

**Key UI elements active:** Text selection highlighting → context menu → paste at cursor

---

## Scenario 6: AI Inline Completion (when enabled)

**What the developer does:** Starts typing a command they've used before.

**What happens in the UI:**
1. Developer types `git ch` at the prompt
2. **Ghost text** appears after the cursor in a dimmed/gray color: `eckout main` — suggesting the full command `git checkout main`
3. Pressing `→` (right arrow) accepts the suggestion — the ghost text becomes real input
4. Pressing any other key ignores the suggestion and continues normal typing
5. The suggestion disappears as soon as the developer types something different

**Key UI elements active:** Ghost text (dimmed, inline) → accept with arrow key → dismiss by typing

---

## Scenario 7: Clicking on File Paths in Output

**What the developer does:** Runs a linter that outputs file paths with errors.

**What happens in the UI:**
1. The linter outputs something like: `src/components/Button.tsx:42:5 - error TS2345: ...`
2. The file path `src/components/Button.tsx:42:5` appears as a **clickable hyperlink** (underlined on hover)
3. `⌘+Click` on the path opens that file in the editor, jumping directly to line 42, column 5
4. The terminal stays open — the file opens in the editor area above

**Key UI elements active:** Hyperlinked file paths → hover underline → Cmd+click → editor navigation

---

## Scenario 8: Opening a Predefined Session (Docker, WSL, SSH)

**What the developer does:** Needs to open a terminal inside a Docker container.

**What happens in the UI:**
1. Developer clicks the **dropdown arrow** next to the "+" button in the tab bar
2. A popup menu appears listing available session types: Local, WSL (Ubuntu), Docker containers, SSH hosts
3. Selecting "Docker: my-app-container" opens a new tab connected to that container's shell
4. The tab title shows the container name
5. Commands now execute inside the container, not on the local machine

**Key UI elements active:** Dropdown menu next to "+" → predefined session list → new tab with remote context → distinct tab title

---

## Scenario 9: Session Ends or Disconnects

**What the developer does:** The shell process crashes or the developer types `exit`.

**What happens in the UI:**
1. The terminal output stays visible — all previous scrollback is preserved
2. The cursor disappears or becomes inactive
3. The prompt no longer accepts input — typing has no effect
4. The tab may show a visual indicator that the session has ended (e.g., dimmed title or status icon)
5. Developer can scroll through the old output to review what happened
6. Clicking "+" or pressing the shortcut starts a fresh session in a new tab

**Key UI elements active:** Preserved output (read-only) → inactive cursor → session-ended indicator → option to start new tab

---

## Scenario 10: Adjusting Terminal Settings

**What the developer does:** Wants to change the font size or switch terminal engine.

**What happens in the UI:**
1. Developer clicks the **gear icon** in the terminal toolbar
2. A menu appears with options: Engine (Reworked / Classic), Settings, Feedback
3. Selecting "Settings" opens the IDE Preferences panel filtered to Terminal settings
4. Here they can change: shell path, font family/size, cursor style (block/underline/bar), scrollback buffer size, tab behavior
5. Changes apply immediately to new sessions (some apply to existing ones too)

**Key UI elements active:** Gear menu → engine switcher → settings link → preferences panel

---

## Visual States Summary

| State | What the user sees |
|---|---|
| **Empty / Not started** | Blank panel, waiting for shell to initialize |
| **Active prompt** | Prompt line with blinking cursor, ready for input |
| **Command running** | Output streaming, cursor may be hidden or at end of output |
| **Alternate buffer** | Full-screen app (vim, top) takes over the entire terminal area |
| **Search active** | Floating search bar overlays the top-right corner |
| **Session ended** | Output preserved but grayed out / read-only, no active cursor |

---

## Interaction Patterns Summary

| Action | Trigger | Result |
|---|---|---|
| Open terminal | `⌥F12` or click Terminal in bottom bar | Tool window appears with active prompt |
| New tab | Click "+" or `⌘T` | Fresh session in new tab |
| Switch tabs | Click tab | Instant switch, each tab independent |
| Search | `⌘F` | Floating search bar appears |
| Copy | Select text + `⌘C` | Text copied to clipboard |
| Paste | `⌘V` at prompt | Text inserted at cursor |
| Open file from output | `⌘+Click` on file path | File opens in editor at that line |
| Accept AI suggestion | `→` arrow key | Ghost text becomes real input |
| Close tab | Click ✕ on tab or `⌘W` | Tab closes, session terminates |
| Clear output | Right-click → Clear Buffer | Scrollback cleared, prompt remains |
