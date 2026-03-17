# How Terminal Works — UI Behavior Logic

How Terminal looks in Figma:
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-137935&t=V8DOXcjhgUO6bzb3-4

## Core Mental Model

A terminal is essentially a **text input/output loop**:

1. Display a **prompt** → user types a **command** → press Enter → display **output** → repeat

The key insight: it's a **single scrollable text buffer**. Everything — prompt, input, output, errors — is just text appended to the same stream. The input prompt is **not** a separate fixed panel — it's simply the last entry in the scrollable buffer.

---

## Input Behavior

**The input line is always at the bottom of the scrollable buffer**
- The cursor lives at the end of the current input
- Previous output is immutable — you can only edit the current line
- The input is **part of the same scroll container** as the output — NOT a fixed/docked element

**Editing the current line**
- `←` `→` move cursor within the line (not across previous output)
- `Backspace` deletes left of cursor
- `Home` / `End` jump to start/end of the line
- The input area has no line breaks — it wraps visually but is one logical line

**Submission**
- `Enter` sends the command, clears the input, appends it to the buffer as regular text, then starts output

---

## Output Behavior

**Append-only scroll**
- Output is always appended below the last line
- The view auto-scrolls to bottom when new output arrives
- User can scroll up freely; new output snaps back to bottom

**Output types**
- `stdout` — regular output (white/default)
- `stderr` — errors (often red)
- Both go into the same buffer visually

**Long-running commands**
- Output can stream in line-by-line while command is running
- Input is blocked until the command finishes (or user interrupts with `Ctrl+C`)

---

## History

- `↑` / `↓` cycles through previously entered commands
- History replaces the current input line content
- It's a simple array with an index pointer

---

## State Machine (simplified)

```
IDLE (prompt shown, input active)
  → user presses Enter
RUNNING (no input, streaming output)
  → command finishes
IDLE (new prompt appended)

RUNNING
  → user presses Ctrl+C
IDLE (interrupted, new prompt)
```

---

## Visual Structure

The entire content (output blocks + input prompt) is in **one scrollable area**. There is no visual separator (border) between output and input — the input is simply the last block in the flow.

```
┌─────────────────────────────┐
│ [single scrollable buffer]  │
│                             │
│ ~/IdeaProjects              │ ← path (previous block)
│ cd intellij-community       │ ← command
│ ─────────────────────────── │ ← block separator (gradient line)
│ ~/IdeaProjects/intellij     │ ← path (next block)
│ npm run build               │ ← command
│ Building project...         │ ← output
│ ─────────────────────────── │ ← block separator
│ ~/IdeaProjects/intellij     │ ← path (input prompt block)
│ git:(main)                  │ ← branch info
│ █                           │ ← cursor (current input line)
└─────────────────────────────┘
```

**Key:** The input block looks like any other command block but with a cursor and optional ghost text. When the user scrolls up, they scroll away from the input too — it's not pinned.

---

## Key UI Rules for a Prototype

| Rule | Why |
|---|---|
| Input is part of the scrollable buffer, not fixed | Real terminals have one unified scroll area |
| Input is always last in the buffer | Mimics the append-only nature of shell |
| No border between output and input | They are in the same flow — separated only by a block separator like other blocks |
| Clicking anywhere doesn't move cursor to that spot | There's only one input field |
| Auto-scroll to bottom on new output | So user sees the latest result |
| Preserve scroll position when user scrolls up | Don't yank them back while they're reading |
| Monospace font | Character alignment matters (tables, ASCII art) |
| Distinguish prompt / input / output visually | Clarity of what's user-typed vs system output |
| Block input during "running" state | Reflects real terminal behavior |

---

## Minimal Data Model

```js
{
  buffer: [
    { type: 'prompt', text: '$ ' },
    { type: 'input',  text: 'ls -la' },
    { type: 'output', text: 'file1.txt\nfile2.txt' },
    { type: 'error',  text: 'command not found' },
  ],
  currentInput: '',
  history: ['ls -la', 'cd ..', 'echo hello'],
  historyIndex: -1,
  isRunning: false
}
```

---

## Implementation Notes (TerminalWindow Component)

- The `blocks` prop and `input` prop both render inside the **same scrollable container** (`terminal-output-area`)
- The input block uses the same `terminal-command-block` styling as output blocks
- A block separator appears between the last output block and the input block (same as between output blocks)
- The scrollable area auto-scrolls to bottom on mount so the input prompt is visible
- The input area should **never** have `border-top`, `flex-shrink: 0`, or any fixed/sticky positioning

### Typing & Interaction

- A **hidden `<input>`** element inside the input block captures all keystrokes
- Typed text is rendered as a `<span>` before the blinking cursor (not inside the hidden input visually)
- Clicking anywhere in the terminal output area focuses the hidden input
- **Enter** submits the current input: appends it as a new command block in the buffer, clears the input, and resets history index
- **Arrow Up / Arrow Down** cycles through command history (most recent first)
- Ghost text (AI completion) is hidden when the user starts typing and reappears when input is empty
- `onCommand` callback prop is fired when a command is submitted
- `blocks` prop seeds the initial buffer; internally the component manages its own block state so new commands appear immediately

---

**The hardest part to prototype realistically** is the streaming output + scroll behavior — specifically the "auto-scroll unless user has scrolled up" pattern. Worth solving early.