# Tooltip Specs

Figma source: Component-specs → Tooltip / Tooltip (node 3825:8630)

## Tooltip / Tooltip (Action tooltip)

Shows action name with optional keyboard shortcut on hover.

### Structure
- Container (flex row, gap 8px)
  - Text label (flex: 1 0 0)
  - Shortcut text (optional, flex-shrink: 0, nowrap)

### Sizing & Spacing
- Padding: **8px** all sides
- Gap: **8px** between text and shortcut
- Border-radius: **4px**
- Border: **1px solid**

### Typography
- Font: Inter Medium 13/16 (`text-ui-default`)
- Text color: `--tooltip-text` (inherits from theme)
- Shortcut color: `--tooltip-shortcut` = `--text-muted`

### Colors

#### Light theme
| Token | Variable | Value |
|-------|----------|-------|
| Background | `--tooltip-bg` | `--white` (#FFFFFF) |
| Text | `--tooltip-text` | `--black` (#000000) |
| Border | `--tooltip-border` | `--gray-130` (#D1D3D9) |
| Shortcut | `--tooltip-shortcut` | `--text-muted` / `--gray-70` (#5F6269) |

#### Dark theme
| Token | Variable | Value |
|-------|----------|-------|
| Background | `--tooltip-bg` | `--gray-40` (#33353B) |
| Text | `--tooltip-text` | `--gray-130` (#D1D3D9) |
| Border | `--tooltip-border` | `--gray-40` (#33353B) |
| Shortcut | `--tooltip-shortcut` | `--text-muted` / `--gray-100` (#9FA2A8) |

### Shadow
- `0px 3px 12px rgba(27, 31, 38, 0.18)` — Figma: shadow-editor-tooltip

### Layout
- `display: flex`
- `align-items: flex-start`
- Fixed position, z-index 10000, pointer-events none

### Behavior
- Appears on hover after 500ms delay
- Placement: top, bottom, left, right (default: bottom)
- 4px gap from trigger element

### UI showcase

Show Tooltips in UI showcase as it is, so userdon't have to hover.

- **R-Tooltip-Showcase-01:** On the UI Showcase **Tooltip** page, examples that use the real `Tooltip` component must be visible **without** hovering, so reviewers see the same rendered popup (tokens, layout, fixed positioning next to the trigger) as in real use—not only non-interactive static markup.
- **Implementation note:** Satisfied with an optional prop **`alwaysVisible`** on `Tooltip` (showcase-only; default remains hover behavior elsewhere).

### Props — Tooltip / Tooltip (component API)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | — | Label text |
| `shortcut` | string | — | Optional shortcut shown next to label |
| `placement` | `'top'` \| `'bottom'` \| `'left'` \| `'right'` | `'bottom'` | Side of trigger |
| `delay` | number | `500` | Hover delay before show (ms) |
| `alwaysVisible` | boolean | `false` | When `true`, tooltip stays open (e.g. UI Showcase); ignores hover hide |
| `className` | string | `''` | Extra CSS classes |

---

## Tooltip / Help (Help tooltip)

Figma source: Component-specs → Tooltip / Help (node 3825:7758)

Rich tooltip with header, description, shortcut, and external link.
Used to show help text for settings and actions. Shown on hovering the question mark icon.

### Structure
- Container (flex column, gap 6px)
  - Header (optional, semibold)
  - Body text (required, medium, muted)
  - Shortcut (optional, medium, muted)
  - Link (optional, medium, link color + externalLink icon)

### Sizing & Spacing
- Width: **251px**
- Padding: **12px 16px** (vertical horizontal)
- Gap: **6px** between items
- Border-radius: **8px**
- Border: **1px solid**

### Typography
- Header: Inter Semibold 13/16 (`text-ui-default-semibold`), color `--tooltip-text`
- Body: Inter Medium 13/16 (`text-ui-default`), color `--text-muted`
- Shortcut: Inter Medium 13/16 (`text-ui-default`), color `--text-muted`
- Link: Inter Medium 13/16 (`text-ui-default`), color `--link-text`

### Colors
Uses same tooltip tokens as Tooltip / Tooltip:

#### Light theme
| Token | Variable | Value |
|-------|----------|-------|
| Background | `--tooltip-bg` | `--white` (#FFFFFF) |
| Text (header) | `--tooltip-text` | `--black` (#000000) |
| Text (body/shortcut) | `--text-muted` | `--gray-70` (#5F6269) |
| Border | `--tooltip-border` | `--gray-130` (#D1D3D9) |
| Link | `--link-text` | `--blue-70` (#2F5EB9) |

#### Dark theme
| Token | Variable | Value |
|-------|----------|-------|
| Background | `--tooltip-bg` | `--gray-40` (#33353B) |
| Text (header) | `--tooltip-text` | `--gray-130` (#D1D3D9) |
| Text (body/shortcut) | `--text-muted` | `--gray-100` (#9FA2A8) |
| Border | `--tooltip-border` | `--gray-40` (#33353B) |
| Link | `--link-text` | `--blue-100` (#71A1FE) |

### Shadow
- `0px 3px 12px rgba(27, 31, 38, 0.18)` — Figma: shadow-editor-tooltip

### Link
- External link: text + 16x16 `general/externalLink` icon
- Icon uses `currentColor` to match link text color
- No padding, no underline

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | string | — | Optional header text (semibold) |
| `body` | string | — | Description text (required) |
| `shortcut` | string | — | Optional keyboard shortcut |
| `link` | `{ text, href, external }` | — | Optional link with text, URL, and external flag |
| `className` | string | `''` | Additional CSS classes |

---

## Tooltip / Validation

Figma source: Component-specs → Tooltip / Validation (node 3825:7736)
Documentation: https://jetbrains.design/intellij/principles/validation_errors/

Inline validation feedback tooltip that appears near input fields to show error or warning messages.
Can include optional action links.

### Structure
- Container (flex column, gap 6px)
  - Text label
  - Actions row (optional, flex row, gap 16px)
    - Action link(s)

### Sizing & Spacing
- **Without actions:** padding **8px** all sides
- **With actions:** padding **10px 12px 12px 12px** (top right bottom left)
- Gap: **6px** between text and actions row
- Gap: **16px** between action links
- Border-radius: **4px**
- Border: **1px solid**

### Typography
- Font: Inter Medium 13/16 (`text-ui-default`)
- Text color: `--text-primary` (inherits from theme)
- Action links: `--link-text`

### Colors

#### Light theme
| Token | Variable | Value |
|-------|----------|-------|
| Error background | `--validation-error-bg` | `--red-160` (#FFF6F5) |
| Error border | `--validation-error-border` | `--red-130` (#FFC4C5) |
| Warning background | `--validation-warning-bg` | `--yellow-160` (#FFF6E9) |
| Warning border | `--validation-warning-border` | `--yellow-130` (#F4CD9A) |
| Text | `--text-primary` | `--black` (#000000) |
| Action links | `--link-text` | `--blue-70` (#2F5EB9) |

#### Dark theme
| Token | Variable | Value |
|-------|----------|-------|
| Error background | `--validation-error-bg` | `--red-40` (#56272B) |
| Error border | `--validation-error-border` | `--red-60` (#80383E) |
| Warning background | `--validation-warning-bg` | `--yellow-40` (#44321D) |
| Warning border | `--validation-warning-border` | `--yellow-60` (#694820) |
| Text | `--text-primary` | `--gray-130` (#D1D3D9) |
| Action links | `--link-text` | `--blue-100` (#71A1FE) |

### Shadow
- `0px 3px 12px rgba(27, 31, 38, 0.18)` — Figma: shadow-editor-tooltip (same as other tooltips)

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | — | Validation message text |
| `type` | `'error'` \| `'warning'` | `'error'` | Validation type |
| `actions` | `Array<{ label, onClick }>` | `[]` | Optional action links |
| `className` | string | `''` | Additional CSS classes |

---

## Tooltip / Got It

Figma source: Component-specs → Tooltip / Got It (node 3825:8627)
Documentation: https://jetbrains.design/intellij/controls/got_it_tooltip/

Informs users about a new or changed feature. Shown once per user; dismissed via "Got It" or skipped entirely.

### Structure
- Root (flex, direction depends on arrow position; `isolation: isolate`)
  - Corner/Arrow (`position: relative`, z-index 2, `flex-shrink: 0`)
  - Body (`position: relative`, z-index 1, `flex: 1 0 0`, border-radius 8px, overflow clip)
    - Content row (flex row, gap 6px)
      - Step counter (optional, JetBrains Mono Medium 13/16, width 16px)
      - Text & Button column (flex col, gap 6px)
        - Text content (flex col, gap 4px): Header → Body → Link
        - Actions row (flex, gap 16px, items-center): Got It button + Skip All link

Arrow position determines flex direction of root:
- `top` / `bottom` → `flex-direction: column` — arrow before/after body
- `left` / `right` → `flex-direction: row` — arrow before/after body

### Sizing & Spacing
- Width: **280px** (top/bottom arrows) | **288px** (left/right arrows — 8px for side arrow)
- Body padding: **12px 16px** (vertical horizontal)
- Border-radius: **8px**
- Border: **1px solid**
- Content gap (step ↔ text column): **6px**
- Text content gap (header/body/link): **4px**
- Text & Button column gap (content ↔ actions): **6px**
- Actions gap (button ↔ Skip All): **16px**

### Arrow (Corner)
- Size: 16×8px for top/bottom arrows; 8×16px for left/right arrows
- Inset: 16px from the nearest body edge (padding on the corner container)
- Overlap: corner margin −1px into the body, covered by z-index 2 → body border interrupted at arrow base
- Arrow fill: `--got-it-bg` (matches body background)
- Arrow stroke: `--got-it-border` (matches body border)

### Typography
- Step counter: JetBrains Mono Medium 13/16, color `--got-it-text-step`
- Header: Inter Semibold 13/16 (`text-ui-default-semibold`), color `--text-primary`
- Body: Inter Medium 13/18 (`text-ui-paragraph`), color `--text-primary`
- Link / Skip All: Inter Medium 13/16, color `--got-it-text-link`
- Got It button: Inter Medium 13/16, color `--text-primary`

### Got It Button
- Border: 1px solid `--got-it-control-border`
- Border-radius: **4px**
- Padding: **6px 12px**
- Min-width: **72px**
- Background: transparent

### Shadow
- `0px 4px 12px rgba(0, 0, 0, 0.16)` — Figma: `shadow-notification`

### Colors

#### Light theme
| Token | Variable | Value |
|-------|----------|-------|
| Background | `--got-it-bg` | `--white` (#FFFFFF) |
| Border | `--got-it-border` | `--gray-130` (#D1D3D9) |
| Step text | `--got-it-text-step` | `--gray-90` (#8B8E94) |
| Link / Skip All | `--got-it-text-link` | `--blue-70` (#2F5EB9) |
| Button border | `--got-it-control-border` | `--gray-130` (#D1D3D9) |
| Header / Body | `--text-primary` | `--black` (#000000) |

#### Dark theme
| Token | Variable | Value |
|-------|----------|-------|
| Background | `--got-it-bg` | `--blue-60` (#2E4D89) |
| Border | `--got-it-border` | `--blue-60` (#2E4D89, same as bg — borderless) |
| Step text | `--got-it-text-step` | `--gray-90` (#8B8E94) |
| Link / Skip All | `--got-it-text-link` | `--blue-110` (#92B7FF) |
| Button border | `--got-it-control-border` | rgba(255,255,255,0.23) |
| Header / Body | `--text-primary` | `--gray-130` (#D1D3D9) |

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | string | — | Optional header (semibold) |
| `children` | ReactNode | — | Body text content |
| `step` | string | — | Optional step counter, e.g. `"01"` |
| `link` | string | — | Optional link text |
| `linkHref` | string | `'#'` | Optional link URL |
| `buttonText` | string | `'Got It'` | Got It button label |
| `skipText` | string | — | Optional skip link text, e.g. `"Skip All"` |
| `arrowPosition` | `'top'` \| `'bottom'` \| `'left'` \| `'right'` | `'top'` | Arrow side |
| `onGotIt` | function | — | Got It click callback |
| `onSkip` | function | — | Skip click callback |
| `className` | string | `''` | Extra CSS classes |
