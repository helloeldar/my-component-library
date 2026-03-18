# Tab Component Specs


Figma specs:

Tab component:
https://www.figma.com/design/ZHLI0v2qxZp4wdnH6Gbg7b/Component-specs?node-id=3741-60778&t=CP0rkP8GSGX7trar-4

Tab Bar:
https://www.figma.com/design/ZHLI0v2qxZp4wdnH6Gbg7b/Component-specs?node-id=3741-60938&t=CP0rkP8GSGX7trar-4

---


## Dimensions
- **Wrapper**: 36px height, contains the pill with 4px padding on all sides
- **Pill (inner tab)**: 28px height (6px vertical padding + 16px line-height), min-width 40px
- **Pill border-radius**: 6px
- **Pill horizontal padding**: 8px (`--editortab/horizontalpadding`)
- **Pill vertical padding**: 6px (`--editortab/verticalpadding`)

## States
- **Selected + Focused**: `.tab-selected-active` — `--tab/tab-selected-bg-active` bg, `--tab/tab-selected-border-active` border
- **Selected + Inactive (unfocused)**: `.tab-selected` — `--tab/tab-selected-bg-inactive` bg, `--tab/tab-selected-border-inactive` border
- **Hovered (default tab)**: `.tab-default:hover` — `--tab/tab-bg-hovered` bg
- **Default (not selected, not hovered)**: `.tab-default` — transparent, content at 67% opacity

## Content
- Gap between items: 6px
- Icon: 16px (displayed in 14px-wide container)
- Label: Inter Medium 13px/16px, max-width 256px, ellipsis overflow
- Close button: 16px icon in 12px-wide container, visible on hover or when selected
- Close icon swaps to `closeSmallHovered` (with circular bg) on hover
- Hover state (background change) applies only to default (unselected) tabs; selected tabs have no hover state

## Rules (from user messages)
- **Editor and tabs should use the same Tab component** — no separate editor tab styling
- **All tabs should be closable** — every tab must show a close button
- Tab close button has wrong appearance if it doesn't use `closeSmallHovered` icon on hover
- Terminal background should use `--tool-window-bg`
- Editor font should be JetBrains Mono (same as terminal)

## Tab Bar
- **Height**: 36px (same as single tab wrapper height)
- Horizontal row of Tab components
- No gap between tab wrappers (each has its own 4px padding)
- Supports optional trailing action buttons (add, dropdown)
- Both editor and tool window tab bars use the same TabBar component

## Structure (from Figma)
```
TabBar (flex, horizontal)
  ├── Tab Wrapper (flex-col, padding: 4px) — 36px height
  │     └── Pill / Tab (flex, gap: 6px, rounded-6px, padding: 6px 8px) — 28px height
  │          ├── Icon (14px wide container, 16px icon)
  │          ├── Label (Inter Medium 13px/16px)
  │          ├── Modified dot (6px, optional)
  │          ├── Counter (optional)
  │          ├── Status badge (optional)
  │          └── Close (12px wide container, 16px icon)
  ├── Tab Wrapper ... (more tabs)
  └── Actions (optional: add button, dropdown button)
```

## Figma Token Mapping (Dark Theme)
| Figma Token | CSS Variable | Value |
|---|---|---|
| tab/tab-bg-hovered | --tool-window-tab-bg-hover | #ffffff17 |
| tab/tab-selected-bg-active | --tool-window-tab-selected-bg-active | #233558 (blue-40) |
| tab/tab-selected-border-active | --tool-window-tab-selected-border-active | #2e4d89 (blue-60) |
| tab/tab-selected-bg-inactive | --tool-window-tab-selected-bg | #26282c (gray-30) |
| tab/tab-selected-border-inactive | --tool-window-tab-selected-border | #40434a (gray-50) |
| EditorTab/horizontalPadding | (hardcoded) | 8px |
| EditorTab/verticalPadding | (hardcoded) | 6px |
