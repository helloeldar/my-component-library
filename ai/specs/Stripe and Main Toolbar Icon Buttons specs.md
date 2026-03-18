Main Toolbar Icon Button and Stripe Icon Button look similar, but behave slightly different.
Stripe Icon Button has Active state, but Main Toolbar Icon Button does not.
Usually they use @20*20 version of icons. Exception - Run widget uses "stroke" version of icons with 16*16 size, icon should be centered.

User interface overview | IntelliJ Platform Plugin SDK:
Stripes
https://plugins.jetbrains.com/docs/intellij/ui-overview.html#stripes

Main toolbar
https://plugins.jetbrains.com/docs/intellij/ui-overview.html#main-toolbar

Check here as well ui-guidelines/ui_overview.md

Figma specs:
Stripe Icon Button
https://www.figma.com/design/ZHLI0v2qxZp4wdnH6Gbg7b/Component-specs?node-id=3736-260&t=CP0rkP8GSGX7trar-4

Main Toolbar Icon Button
https://www.figma.com/design/ZHLI0v2qxZp4wdnH6Gbg7b/Component-specs?node-id=3736-289&t=CP0rkP8GSGX7trar-4

No need for focus ring after click

---

## Implementation Details (from Figma Component Specs)

### Shared Dimensions
Both Stripe and Main Toolbar Icon Buttons share the same sizing:
- **Wrapper**: 40×40px
- **State background**: 30×30px (5px inset from wrapper edge)
- **Corner radius**: 6px
- **Icon size**: 20×20px (centered)

### Figma Design Tokens (Dark Theme)
| Token | Value | Description |
|---|---|---|
| `icon/icon-default-stroke` | `#CED0D6` | Default icon color |
| `toolbar/toolbar-bg-hovered` | `#ffffff17` | Hover background (9% white) |
| `toolbar/toolbar-bg-pressed` | `#ffffff29` | Pressed/inactive background (16% white) |
| `toolbar/toolbar-selected-bg-active` | `#3871E1` | Active/selected stripe background |
| `icon/icon-over-accent` | `#FFFFFF` | Icon color on accent background |

### Stripe Icon Button States
| State | Icon Color | Background |
|---|---|---|
| Default | `icon-default-stroke` | transparent |
| Hovered | `icon-default-stroke` | `toolbar-bg-hovered` |
| Inactive | `icon-default-stroke` | `toolbar-bg-pressed` |
| Active | `icon-over-accent` (white) | `toolbar-selected-bg-active` (blue) |

### Main Toolbar Icon Button States
| State | Icon Color | Background |
|---|---|---|
| Default | `icon-default-stroke` | transparent |
| Hovered | `icon-default-stroke` | `toolbar-bg-hovered` |
| Pressed | `icon-default-stroke` | `toolbar-bg-pressed` |

**Key difference**: Main Toolbar Icon Button does NOT change icon color on hover/pressed. Stripe only changes icon color in Active state (to white).

### Focus Behavior
No focus outline at all on any icon buttons. Both `:focus` and `:focus-visible` set `outline: none`.

### Component Mapping
| Figma Name | React Component | Library Export | File |
|---|---|---|---|
| Stripe / Icon Button | `StripeIconButton` | `StripeIconButton` | `src/ui/components/stripe/Stripe.jsx` |
| Main Toolbar / Icon Button | `MainToolbarIconButton` | `MainToolbarIconButton` | `src/ui/components/iconbutton/IconButton.jsx` |

### CSS Variable Mapping
| Figma Token | CSS Variable (Light) | CSS Variable (Dark) |
|---|---|---|
| `icon-default-stroke` | `--icon-default-stroke: #6C707E` | `--icon-default-stroke: #CED0D6` |
| `toolbar-bg-hovered` | `--icon-button-hover-bg: #EBECF0` / `--stripe-default-hover-bg: #EBECF0` | `--icon-button-hover-bg: #393B40` / `--stripe-default-hover-bg: #393B40` |
| `toolbar-bg-pressed` | `--icon-button-pressed-bg: #DFE1E5` / `--stripe-inactive-bg: #DFE1E5` | `--icon-button-pressed-bg: #4E5157` / `--stripe-inactive-bg: #4E5157` |
| `toolbar-selected-bg-active` | `--stripe-selected-bg: #3574F0` | `--stripe-selected-bg: #3871E1` |

---

## Separators

### Stripe Separator (horizontal, inside vertical Stripe)
- **Container**: 40×11px (full stripe width)
- **Line**: 24×1px, centered
- **Color**: `--border-secondary`
- **Component**: `StripeContainer.Separator`
- **File**: `src/ui/components/stripe/StripeContainer.jsx`

### Main Toolbar Vertical Separator (vertical, inside horizontal toolbar)
- **Container**: 11×40px (full toolbar height)
- **Line**: 1×24px, centered
- **Color**: `--border-secondary`
- **Component**: `MainToolbarVerticalSeparator`
- **File**: `src/ui/components/maintoolbar/MainToolbarVerticalSeparator.jsx`

Both separators follow the same pattern: a flex container with centered 1px line using `--border-secondary`. The vertical separator is the rotated equivalent of the stripe separator.
