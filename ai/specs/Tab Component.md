# Tab Component Specs

Source: Figma node `26471:56584`, user messages.

## Dimensions
- **Wrapper**: 36px height, contains the pill with 4px padding on all sides
- **Pill (inner tab)**: 28px height (6px vertical padding + 16px line-height), min-width 40px
- **Pill border-radius**: 6px
- **Pill horizontal padding**: 8px (`--editortab/horizontalpadding`)
- **Pill vertical padding**: 6px (`--editortab/verticalpadding`)

## States
- **Selected + Focused**: `--tab/tab-selected-bg-active` bg, `--tab/tab-selected-border-active` border
- **Selected + Inactive (unfocused)**: `--tab/tab-selected-bg-inactive` bg, `--tab/tab-selected-border-inactive` border
- **Hovered (not selected)**: `--tab/tab-bg-hovered` bg
- **Default (not selected, not hovered)**: transparent, content at 67% opacity

## Content
- Gap between items: 6px
- Icon: 16px (displayed in 14px-wide container)
- Label: Inter Medium 13px/16px, max-width 256px, ellipsis overflow
- Close button: 16px icon in 12px-wide container, visible on hover or when selected
- Close icon swaps to `closeSmallHovered` (with circular bg) on hover

## Rules (from user messages)
- **Editor and tabs should use the same Tab component** — no separate editor tab styling
- **All tabs should be closable** — every tab must show a close button
- Tab close button has wrong appearance if it doesn't use `closeSmallHovered` icon on hover
- Terminal background should use `--tool-window-bg`
- Editor font should be JetBrains Mono (same as terminal)

## Structure (from Figma)
```
Wrapper (flex-col, padding: 4px)
  └── Pill / Tab (flex, gap: 6px, rounded-6px, padding: 6px 8px)
       ├── Icon (14px wide container, 16px icon)
       ├── Label (Inter Medium 13px/16px)
       ├── Modified dot (6px, optional)
       ├── Counter (optional)
       ├── Status badge (optional)
       └── Close (12px wide container, 16px icon)
```
