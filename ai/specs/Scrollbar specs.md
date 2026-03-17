# Scrollbar Specs

## Requirement
All visible scrollbars must have an opaque background (non-overlay, solid track and thumb).

## Implementation
- Global scrollbar CSS variables defined in `Themes.css` for both light and dark themes.
- Global `::-webkit-scrollbar` rules applied under `.theme-light` and `.theme-dark` selectors.
- ToolWindow scrollbar vars (`--tool-window-scrollbar-*`) reference the global `--scrollbar-*` vars.

## CSS Variables

| Variable | Light | Dark |
|---|---|---|
| `--scrollbar-track` | `var(--gray-10)` | `var(--gray-130)` |
| `--scrollbar-thumb` | `var(--gray-50)` | `var(--gray-90)` |
| `--scrollbar-thumb-hover` | `var(--gray-60)` | `var(--gray-80)` |

## Scrollbar Dimensions
- Width: 8px
- Height: 8px (for horizontal scrollbars)
- Thumb border-radius: 4px
