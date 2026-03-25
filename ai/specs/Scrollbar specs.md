# Scrollbar Specs

## Behavior
Scrollbars are overlay-style: the track/rail is always transparent (no background color, even on container hover). The thumb appears semi-transparent on hover and becomes more opaque when hovered directly.

## Implementation
- Global scrollbar CSS variables defined in `src/ui/styles/Themes.css` and `prototyping-kit/styles/Themes.css` for both light and dark themes.
- Global `::-webkit-scrollbar` rules applied under `.theme-light` and `.theme-dark` selectors.
- ToolWindow scrollbar vars (`--tool-window-scrollbar-*`) reference the global `--scrollbar-*` vars.

## CSS Variables

| Variable | Light | Dark |
|---|---|---|
| `--scrollbar-track` | `transparent` | `transparent` |
| `--scrollbar-track-hover` | `transparent` | `transparent` |
| `--scrollbar-thumb` | `transparent` | `transparent` |
| `--scrollbar-thumb-visible` | `rgba(0, 0, 0, 0.15)` | `rgba(255, 255, 255, 0.15)` |
| `--scrollbar-thumb-hover` | `rgba(0, 0, 0, 0.3)` | `rgba(255, 255, 255, 0.3)` |

## Scrollbar Dimensions
- Width: 8px
- Height: 8px (for horizontal scrollbars)
- Thumb border-radius: 4px

## States
- **Default / at rest:** Track transparent, thumb transparent (invisible)
- **Container hovered:** Track stays transparent, thumb becomes `--scrollbar-thumb-visible` (semi-transparent)
- **Thumb hovered:** Thumb becomes `--scrollbar-thumb-hover` (more opaque)

## Critical: Do NOT use `scrollbar-width` on scrollable elements

Since Chrome 121 (January 2024), the standard `scrollbar-width` / `scrollbar-color` CSS properties completely override `::-webkit-scrollbar` pseudo-elements. If an element has `scrollbar-width: thin` (or any value other than `none`), Chrome silently ignores ALL `::-webkit-scrollbar*` rules and renders the OS-default scrollbar with a visible track.

**Rules:**
- Do NOT set `scrollbar-width: thin` on any scrollable element that should use the custom transparent scrollbar.
- `scrollbar-width: none` is safe — it hides the scrollbar entirely (used in TabBar, sidebar).
- The global `::-webkit-scrollbar` rules in Themes.css handle width (8px) and styling for all scrollable elements.
