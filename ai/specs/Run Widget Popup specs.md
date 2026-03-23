# Run Widget Popup (Collapsed)

Figma: Popup / Run Widget / Collapsed
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6451-85667

## Component

**React:** `PopupRunWidget` (`src/ui/components/popup/PopupRunWidget.jsx`)
**CSS:** `src/ui/components/popup/PopupRunWidget.css`

## Behavior

- Opens when clicking the ToolbarDropdown inside RunWidget
- Closes on click outside (same pattern as PopupBranches)
- Positioned below the RunWidget dropdown, aligned right

## Dimensions

- **Width:** 292px
- **Border radius:** 8px
- **Border:** 0.5px `--popup-border`
- **Background:** `--popup-bg`
- **Shadow:** `0px 8px 32px rgba(0,0,0,0.4)` (dark theme)

## Structure

| Section | Type | Details |
|---|---|---|
| Top spacer | Space | 8px |
| Section header | Header | "Recent Configurations" — `Inter Semi Bold 12px`, `--text-secondary` |
| Config rows | Line with Actions | 24px rows with icon + text + inline action buttons |
| Separator | Separator | 1px `--popup-border` |
| All Configurations | Line | chevron-right icon + "All Configurations" + count in secondary color |
| Current File | Line | 16px icon gap (no icon) + "Current File" |
| Separator | Separator | 1px `--popup-border` |
| Edit Configurations... | Line | 16px icon gap + "Edit Configurations..." + shortcut "⌃⌥E" |
| Bottom spacer | Space | 8px |

## Line with Actions (Popup / Line with Actions)

A row type specific to this popup. Shows inline action buttons on the right side.

### Dimensions
- **Height:** 24px
- **Left padding:** 8px (container) + 6px (icon offset)
- **Icon:** 16×16 at left=6px from row edge
- **Text:** at left=28px from row edge (6 + 16 + 6 gap)

### Selection
- **Background:** `--selection-bg` (`#2a4371` dark), rounded 4px
- **Inset:** 0px left/right from `popup-options` padding edge (i.e. `inset: 0 8px` from popup edge)

### Right Side Actions
- Separated from text by a 1px vertical border (`--toolbar-border` / `rgba(255,255,255,0.13)`)
- Border height: 18px, centered vertically
- Each action button: 16×16 icon with 8px horizontal padding
- Actions visible when row is selected or hovered; hidden otherwise

### Action Icons (filled variants, not stroke)
- `run/run` — green play
- `run/debug` — green bug
- `general/moreVertical` — three dots

## Icons Used

| Context | Icon | Registry Key |
|---|---|---|
| App config | Application icon | `runConfigurations/application` |
| Test config | JUnit icon | `runConfigurations/junit` |
| Run action | Play (filled) | `run/run` |
| Debug action | Bug (filled) | `run/debug` |
| More action | Vertical dots | `general/moreVertical` |
| All Configs | Chevron right | `general/chevronRight` |

## Design Tokens

| Token | CSS Variable | Dark Value |
|---|---|---|
| container/popup-bg | `--popup-bg` | `#26282c` |
| container/popup-border | `--popup-border` | `#33353b` |
| selection/selection-bg-active | `--selection-bg` | `#2a4371` |
| text/text-default | `--text-primary` | `#d1d3d9` |
| text/text-secondary | `--text-secondary` | `#73767c` |
| toolbar/toolbar-border | `--toolbar-border` | `rgba(255,255,255,0.13)` |

## Typography

| Element | Style |
|---|---|
| Section header | Inter Semi Bold 12px / 16px line-height |
| Config text | Inter Medium 13px / 16px line-height |
| Count text | Inter Medium 13px / 16px, `--text-secondary` |
| Shortcut text | Inter Medium 13px / 16px, `--text-secondary` |
