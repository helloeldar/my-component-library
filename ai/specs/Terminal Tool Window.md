# Terminal Tool Window — Design Specs for Prototyping

## Overview

The IntelliJ Terminal is a **bottom-anchored Tool Window** (ID: `"Terminal"`) that hosts one or more terminal sessions as tabs. It supports two engines — **Classic** (JediTerm-based) and **Reworked** (editor-based, new UI only). The reworked terminal renders all output inside standard IntelliJ `EditorEx` components, enabling syntax highlighting, hyperlinks, inline completion, and search reuse.

---

## Component Hierarchy (Visual Stack)

```
ToolWindow ("Terminal", anchor=bottom)
 └─ ContentManager (manages tabs)
     └─ Content (one per tab)
         └─ TerminalToolWindowPanel  [SimpleToolWindowPanel, vertical=false]
             ├─ Toolbar (left/top — action groups)
             └─ TerminalPanel  [BorderLayoutPanel]
                 ├─ Top: optional notification/promotion banners
                 └─ Center: TerminalLayeredPane  [JBLayeredPane]
                     ├─ Layer 0: EditorEx component (output or alternate buffer)
                     └─ Layer 1: Search bar overlay (when active)
```

---

## Key UI Components

### Tool Window Shell

| Element | Description |
|---|---|
| **Tab bar** | Standard `ContentManager` tabs; each tab = one terminal session. Supports rename, close, drag-and-drop, split. |
| **"+" button** | `Terminal.NewTab` action — opens a new shell session. |
| **Dropdown arrow** | `TerminalNewPredefinedSession` — opens predefined sessions (e.g., WSL, Docker). |
| **Gear menu** | `Terminal.ToolWindowActions` group: Engine switcher (Reworked / Classic / New), Settings link, Feedback. |

### Terminal Content Area (`TerminalPanel`)

| Element | Description |
|---|---|
| **Output Editor** | `EditorEx` — renders scrollback + current prompt output. Monospace font, terminal colors. Supports text selection, hyperlinks, inline completion ghost text. |
| **Alternate Buffer Editor** | Second `EditorEx` — shown when apps like `vim`, `less`, `top` activate alternate screen buffer. Swapped in/out of the layered pane. |
| **Search Overlay** | Floating search bar (top-right of layered pane). Triggered by `Cmd/Ctrl+F`. Find next/previous navigation. |
| **Top Banner Area** | Optional — used for migration prompts, agent workbench promotions. Stacks vertically above the editor. |

### Cursor & Input

| Element | Description |
|---|---|
| **Cursor** | Painted by `EditorEx` caret system. Block/underline/bar styles per terminal settings. |
| **Type-ahead** | Predicted keystrokes rendered immediately before shell echo arrives (latency reduction). |
| **Inline Completion** | AI-powered ghost text suggestions (when enabled). Accepted with `→` key. |

---

## Toolbar Actions & Context Menus

### Tab Bar Actions (`TerminalToolwindowActionGroup`)
- **New Tab** (`Ctrl+Shift+T` / `Cmd+T`)
- **New Predefined Session** (dropdown with expand icon)

### Gear/Settings Actions (`Terminal.ToolWindowActions`)
- **Engine Switcher** (popup: Reworked / Classic / New)
- **Settings** (gear icon → opens Terminal preferences)
- **Feedback**

### Right-Click Context Menu (`Terminal.ReworkedTerminalContextMenu`)
- Find | New Tab | Close Tab
- Copy | Paste | Select All
- Clear Buffer
- Page Up / Page Down
- Line Up / Line Down
- Hyperlink actions (if hovering a link)

### Output Context Menu (`Terminal.OutputContextMenu`)
- Copy Block | Copy Selected Text | Paste

### Prompt Context Menu (`Terminal.PromptContextMenu`)
- Cut | Copy Selected Text | Paste | Prompt Style

---

## Data Flow & Session Lifecycle

```
TerminalToolWindowTabsManager
  ├─ createTabBuilder() → TerminalToolWindowTabBuilder
  │    └─ builds TerminalToolWindowTab { view: TerminalView, content: Content }
  ├─ closeTab(tab)
  └─ detachTab(tab) → returns TerminalView (can move to editor)

TerminalView (interface)
  ├─ component: JComponent          ← the TerminalPanel
  ├─ outputModels: TerminalOutputModelsSet
  │    ├─ main: TerminalOutputModel  (scrollback + prompt)
  │    └─ alternateBuffer: TerminalOutputModel
  ├─ sessionState: StateFlow<NotStarted | Connected | Terminated>
  ├─ shellIntegrationDeferred       ← shell integration (prompt detection, CWD, etc.)
  ├─ title: TerminalTitle           ← shown in tab
  ├─ textSelectionModel
  ├─ keyEventsFlow
  └─ sendText(text) / createSendTextBuilder()
```

---

## States

| State | Visual |
|---|---|
| **Not Started** | Empty panel, waiting for shell process |
| **Connected** | Active editor with cursor, accepting input |
| **Alternate Buffer** | Editor swapped to alternate buffer (full-screen apps) |
| **Search Active** | Search overlay visible on top of editor |
| **Terminated** | Session ended; output preserved but input disabled |

---

## Layout Dimensions (defaults)

- **Tool Window position:** Bottom
- **Tab height:** Standard IDE content tab height (~28px)
- **Editor font:** Monospace, configurable via `TerminalFontSettingsService`
- **Grid size:** Character grid calculated from editor component size (`calculateTerminalSize()`)
- **Search bar:** Floating overlay, top-right corner of the layered pane

---

## Key Settings (affecting UI)

| Setting | Effect |
|---|---|
| `terminalEngine` | Switches between Classic / Reworked / New rendering |
| `shellIntegration` | Enables prompt detection, command blocks, CWD tracking |
| `terminal.new.ui.autocompletion` | Enables tab-completion popup |
| `terminal.type.ahead` | Enables predictive typing display |
| `terminal.ai.inline.completion.enabled` | Shows AI ghost text suggestions |
| `terminal.generic.hyperlinks` | Highlights file paths as clickable links |
| `new.terminal.output.capacity.kb` | Max scrollback buffer size (default 1024 KB) |

---

## Extension Points (for customization)

- `allowedActionsProvider` — register custom actions available in terminal
- `escapeHandler` — custom Escape key behavior (cancel selection, close search, close popup)
- `shellSupport` — per-shell behavior (zsh, bash, PowerShell)
- `commandSpecsProvider` — command completion specs
- `toolWindowInitializer` — custom initialization on tool window creation
- `commandBlockHighlighterProvider` — custom syntax highlighting for command output blocks

---

## Prototype Checklist

For a basic design prototype, implement these visual elements:
1. ✅ Bottom tool window with tab bar (tab name, close button, "+" button)
2. ✅ Monospace editor area with colored text output
3. ✅ Blinking cursor at prompt line
4. ✅ Right-click context menu
5. ✅ Floating search bar (Cmd+F)
6. ✅ Gear menu with engine/settings options
7. ✅ Alternate buffer swap (e.g., simulating `vim` mode)
8. ✅ Inline completion ghost text (optional, for AI feature demo)

---

## Key Source Files

| File | Role |
|---|---|
| `community/plugins/terminal/src/.../TerminalToolWindowFactory.java` | Registers the tool window, sets up tabs |
| `community/plugins/terminal/src/.../TerminalToolWindowPanel.kt` | Main panel (SimpleToolWindowPanel) |
| `community/plugins/terminal/frontend/.../TerminalToolWindowTab.kt` | Tab interface |
| `community/plugins/terminal/frontend/.../TerminalToolWindowTabImpl.kt` | Tab implementation with view + content |
| `community/plugins/terminal/frontend/.../TerminalToolWindowTabsManagerImpl.kt` | Manages tab lifecycle |
| `community/plugins/terminal/frontend/.../TerminalView.kt` | View interface (component, models, state) |
| `community/plugins/terminal/frontend/.../TerminalViewImpl.kt` | View implementation with editors + panels |
| `community/plugins/terminal/resources/META-INF/terminal.xml` | Plugin descriptor, action registrations |
