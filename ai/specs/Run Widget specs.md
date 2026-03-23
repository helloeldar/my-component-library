# Run Widget

Figma: Main Toolbar / Run Widget
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6702-85839

## Component

**React:** `RunWidget` (`src/ui/components/runwidget/RunWidget.jsx`)
**CSS:** `src/ui/components/runwidget/RunWidget.css`

## States

| State | Buttons (left to right) | Accent buttons |
|---|---|---|
| default | Dropdown, Run, Debug, More(⋮) | none |
| running | Dropdown(+badge), Rerun, Debug, Stop, More(⋮) | Rerun=green, Stop=red |
| debugging | Dropdown(+badge), Run, RestartDebug, Stop, More(⋮) | RestartDebug=green, Stop=red |

## Dimensions

### Action buttons (RunWidgetButton)
- **Wrapper**: 34×40px
- **State background**: 30×30px centered (2px left/right inset, 5px top/bottom inset)
- **Corner radius**: 6px
- **Icon size**: 16×16px (stroke variants)

Different from MainToolbarIconButton which is 40×40px with 20×20px icons.

### Dropdown
Uses existing ToolbarDropdown component with `runConfigurations/application` icon.
Clicking the dropdown opens the **Run Widget Popup** — see [Run Widget Popup specs](Run%20Widget%20Popup%20specs.md).

### Status Badge (Running/Debugging only)
- 6px green dot on dropdown icon's top-right corner
- 1px border matching toolbar background color

## Design Tokens

| Token | CSS Variable | Value (both themes) |
|---|---|---|
| toolbar/toolbar-run-bg | `--toolbar-run-bg` | `var(--green-80)` (#338555) |
| toolbar/toolbar-run-bg-hovered | `--toolbar-run-bg-hovered` | `var(--green-70)` (#2A6E47) |
| toolbar/toolbar-stop-bg | `--toolbar-stop-bg` | `var(--red-80)` (#C54E58) |
| toolbar/toolbar-stop-bg-hovered | `--toolbar-stop-bg-hovered` | `var(--red-70)` (#A4414A) |
| toolbar/toolbar-icon-over-accent | `--toolbar-icon-over-accent` | `var(--white)` (#FFFFFF) |

## Icons Used (all 16×16 stroke variants)

| Button | Icon | File |
|---|---|---|
| Run | `run/run_stroke` | `src/icons/run/run_stroke.svg` |
| Debug | `run/debug_stroke` | `src/icons/run/debug_stroke.svg` |
| Stop | `run/stop_stroke` | `src/icons/run/stop_stroke.svg` |
| Rerun | `run/rerun_stroke` | `src/icons/run/rerun_stroke.svg` |
| RestartDebug | `run/restartDebug_stroke` | `src/icons/run/restartDebug_stroke.svg` |
| More | `general/moreVertical_stroke` | `src/icons/general/moreVertical_stroke.svg` |

Note: Stroke SVGs have hardcoded white fill/stroke. They are designed for dark or accent-colored backgrounds.

## Button States

### Non-accent buttons (Run, Debug, More)
| State | Background |
|---|---|
| Default | transparent |
| Hovered | `--icon-button-hover-bg` |
| Pressed | `--icon-button-pressed-bg` |

### Accent run buttons (Rerun, RestartDebug)
| State | Background |
|---|---|
| Default | `--toolbar-run-bg` (green) |
| Hovered | `--toolbar-run-bg-hovered` (darker green) |

### Accent stop button
| State | Background |
|---|---|
| Default | `--toolbar-stop-bg` (red) |
| Hovered | `--toolbar-stop-bg-hovered` (darker red) |
