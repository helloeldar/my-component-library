# Editor Component Specs

## Overview

The Editor component provides a code editing area with syntax highlighting, line numbers, breakpoints, and inline gutter actions. It is used in the MainWindow's editor area and can also be used standalone.

Built on top of `prism-react-editor` — a lightweight (~5KB) code editor that uses Prism for tokenization.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | `''` | Initial code to display |
| `language` | `string` | `'javascript'` | Prism language identifier |
| `showLineNumbers` | `boolean` | `true` | Show the gutter with line numbers |
| `readOnly` | `boolean` | `false` | Disable editing |
| `breakpoints` | `number[]` | `[]` | Line numbers with active breakpoints |
| `onBreakpointToggle` | `(line: number) => void` | — | Callback when a line's breakpoint is toggled |
| `onExitReaderMode` | `() => void` | — | Callback when Reader Mode badge is dismissed |
| `gutterActions` | `GutterAction[]` | `[]` | Inline action icons per line |
| `className` | `string` | `''` | Additional CSS class |

### GutterAction

```
{
  line: number,        // 1-based line number
  icon: string,        // Icon name (from iconRegistry)
  onClick: () => void,
  tooltip?: string
}
```

---

## Gutter Design

Each gutter row contains (left to right):

1. **Line number / Breakpoint area** — Shows the line number by default. When a breakpoint is set, a red circle dot replaces the number. Clicking toggles the breakpoint.
2. **Inline action area** — Slot for small action icons (run, warning, fold, etc.). Rendered from the `gutterActions` prop.

The active line's gutter row gets a highlighted background, and the line number text becomes brighter.

---

## Syntax Highlighting

Prism token classes are mapped to the project's existing `--editor-*` CSS variables defined in `Themes.css`:

| Prism Token | CSS Variable |
|-------------|-------------|
| `keyword` | `--editor-keyword` |
| `string` | `--editor-string` |
| `comment` | `--editor-comment` |
| `number` | `--editor-number` |
| `function`, `method` | `--editor-method` |
| `constant`, `boolean` | `--editor-constant` |
| `annotation`, `decorator` | `--editor-metadata-text` |
| `doc-comment`, `prolog` | `--editor-doc-comment` |
| `builtin` | `--editor-type-parameter` |
| `class-name` | `--editor-default-text` (inherits) |
| `tag` | `--editor-html-tag` |
| `property` | `--editor-implicit-param` |
| `url` | `--editor-link` |

The user can provide additional color schemes per language by extending the token-to-variable mapping in `Editor.css`.

---

## Registered Languages

Prism grammars are imported for: **Java**, **JavaScript**, **TypeScript**, **Python**, **Kotlin**.

Additional languages can be added by importing `prism-react-editor/prism/languages/<lang>`.

---

## Reader Mode

When `readOnly` is `true`, a floating **Reader Mode** badge appears pinned to the top-right corner of the editor code area. On hover it shows a descriptive tooltip explaining what Reader Mode provides. Clicking the X or the badge dismisses it and fires `onExitReaderMode`.

---

## Scroll Sync

The custom gutter scrolls in sync with the editor's code area. The editor container's `scroll` event updates the gutter's `scrollTop` to match.

---

## File Structure

```
src/ui/components/editor/
  Editor.jsx        — Main component (wraps prism-react-editor + EditorGutter)
  EditorGutter.jsx  — Custom gutter with line numbers, breakpoints, actions
  Editor.css        — Styles + Prism token mapping to IntelliJ CSS variables
```

---

## Integration

- **MainWindow**: The editor area uses `<Editor language="java" />` in place of the old `CodeExample`.
- **Library export**: Exported as `Editor` from `src/lib/index.js`.
- **CodeExample**: Kept for backward compatibility in the showcase/demo app.

---

## Font & Sizing

- Font: `JetBrains Mono`, monospace
- Font size: 13px
- Line height: 22px
- Gutter min-width: 56px
