# Button Specs

## Figma
- [Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=146-52009)
- [Button / Slim](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6517-82733)

## IntelliJ UI Guidelines
- https://plugins.jetbrains.com/docs/intellij/button.html

---

## Component Props

| Prop | Values | Description |
|---|---|---|
| `type` | `'primary'` \| `'secondary'` \| _(none)_ | Visual style. **Must always be set explicitly.** |
| `size` | `'default'` \| `'slim'` | Height variant. Default = 28px, Slim = 24px. |
| `disabled` | boolean | Disabled state |
| `focused` | boolean | Focused ring (keyboard) |

---

## Types

### Primary
- Background: `var(--button-primary-bg)` (blue)
- Text: `var(--button-primary-text)` (white)
- Use for the main/default action in a dialog or form

### Secondary (Default action button)
- Background: `var(--button-secondary-bg)` (transparent)
- Text: `var(--text-default)`
- Border: `1px solid var(--button-secondary-border)` = `--control-border`
- Use for non-primary actions: "Cancel", "Open in Find Window", "Close", etc.

### Guardrail: unspecified `type` defaults to `'secondary'`
`type` defaults to `'secondary'` in `Button.jsx`. This prevents the browser's native button appearance (white/gray background) from ever showing. Still, always set `type` explicitly for clarity.

---

## Sizes

| Size | Height | Padding | Font | Gap |
|---|---|---|---|---|
| Default (no `size` prop) | 28px | `5px 12px` | `text-ui-default` (13px medium) | 6px |
| Slim (`size="slim"`) | 24px | `3px 12px` | `text-ui-default` (13px medium) | 4px |
| `min-width` | 72px | both sizes |

---

## Usage Context

| Context | Type to use |
|---|---|
| Dialog primary action ("OK", "Apply") | `primary` |
| Dialog secondary action ("Cancel") | `secondary` |
| Popup footer action ("Open in Find Window") | `secondary` |
| Inline actions in tool windows | `secondary` |

---

## Disabled State
Both types share the same disabled appearance:
- Background: `transparent`
- Text: `var(--text-disabled)`
- Border: `1px solid var(--control-border-disabled)`
- Cursor: `not-allowed`

---

## Focus Ring
Applied via `::after` pseudo-element when `:focus-visible` or `.button-focused`:
- `inset: -4px` from button edge
- `border: 2px solid var(--control-focus-border-brand)`
- `border-radius: 7px` (button radius 4px + 3px gap)
