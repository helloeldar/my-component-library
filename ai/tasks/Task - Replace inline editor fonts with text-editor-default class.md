# Task: Replace Inline Editor Fonts with text-editor-default Typography Class

## Status: Complete

## Requirements (from user)
Replace inline JetBrains Mono 400 13px/22px font declarations with the shared `.text-editor-default` typography class in:

1. **MainWindow** (`.main-window-editor-content`) - JetBrains Mono 13px/22px
2. **CodeExample** (`.line-numbers`, `.line-number`, `.syntax-highlight-overlay`, `.code-input`) - JetBrains Mono 400 13px/22px
3. **TerminalWindow** - Only EXACT matches (JetBrains Mono 400 13px/22px); do NOT change custom selectors like terminal-search-input (12px Inter) or terminal-prompt-path (18px line-height)

## Changes Made

### MainWindow
- **MainWindow.jsx**: Added `text-editor-default` class to `.main-window-editor-content` div
- **MainWindow.css**: Removed `font-family`, `font-size`, `line-height` from `.main-window-editor-content` selector

### CodeExample
- **CodeExample.jsx**: Added `text-editor-default` class to `.line-numbers` container, `.line-number` elements, and `.code-input` textarea
- **CodeExample.css**: Removed `font-family`, `font-size`, `font-weight`, `line-height` from:
  - `.line-numbers, .line-number` combined selector
  - `.syntax-highlight-overlay` selector
  - `.code-input` selector
  - Kept `font-style: normal` in all three (not part of typography class)

### TerminalWindow
- **TerminalWindow.jsx**: Added `text-editor-default` class to both `.terminal-path-and-command` divs (renderCommandBlock and renderInputBlock)
- **TerminalWindow.css**: Removed `font-family`, `font-weight`, `font-size` from `.terminal-path-and-command`; removed `font-family`, `font-size`, `line-height` from `.terminal-typed-text` (inherits from parent)
- **NOT changed**: `.terminal-search-input` (12px Inter), `.terminal-prompt-path` (18px line-height), `.terminal-input-branch` (18px line-height), `.terminal-command`/`.terminal-output`/`.terminal-error`/`.terminal-success`/`.terminal-link` (only set color + line-height, inherit font from parent)

## Typography Class Reference
```css
/* From Typography.css */
.text-editor-default {
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
}
```
