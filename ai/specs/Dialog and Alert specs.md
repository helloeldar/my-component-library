# Dialog and Alert Specs

Figma source: [Dialog](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146272), [Alert](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=3342-83343)
Component specs: [Alert specs](https://www.figma.com/design/ZHLI0v2qxZp4wdnH6Gbg7b/Component-specs?node-id=959-9381)

## Alert

Alert is a **Dialog-family component** in Figma. It shares the same container styling as Dialog (bg, border, shadow) but has a simpler structure — no macOS title bar header.

### Structure (from Figma node 3342:83343)

```
Alert (420px wide, rounded 8px)
├── Icon (28×28, positioned top-left at 19px/19px)
├── Content area (left-padded 60px for icon)
│   ├── Title (text-ui-h2: 16px / 600 / 20px)
│   ├── Body (text-ui-paragraph: 13px / 500 / 18px)
│   └── Checkbox (optional, "Don't ask again")
└── Footer (absolute, bottom 13px, left/right 19px, height 40px)
    ├── Help icon (24×24, left-aligned) — optional
    └── Buttons (right-aligned, gap 12px)
```

### Container tokens (confirmed from Figma)

| Token | Figma variable | Light value | Dark value |
|---|---|---|---|
| `--dialog-bg` | `container/popup-bg` | `var(--white)` | `var(--gray-30)` (#26282C) |
| `--dialog-border` | `container/dialog-border` | `var(--gray-130)` | `var(--gray-50)` |
| `--dialog-shadow` | `shadow/shadow-popup` | `0 8px 32px rgba(0,0,0,0.15)` | `0 8px 32px rgba(0,0,0,0.4)` |
| border-radius | — | 8px | 8px |

Shadow details from Figma: y-offset = `shadow/shadow-popup-y` (8px), blur = `shadow/shadow-popup-blur` (32px), color = `shadow/shadow-popup`.

### Typography (confirmed from Figma)

| Element | Figma style | Size | Weight | Line height |
|---|---|---|---|---|
| Title | UI/H2 | 16px | 600 (Semi Bold) | 20px |
| Body | UI/Paragraph | 13px | 500 (Medium) | 18px |
| Checkbox label | UI/Default | 13px | 500 (Medium) | 16px |
| Button text | UI/Default | 13px | 500 (Medium) | 16px |

### Theme colors (confirmed from Component-specs)

**Light theme:**
| Element | Token | Value |
|---|---|---|
| Alert bg | Gray 13 | `#F7F8FA` |
| Alert border | Gray 10 | `#D3D5DB` |
| Button border | Gray 9 | `#C9CCD6` |
| Button bg (secondary) | White | `#FFFFFF` |
| Text color | Gray 1 (Primary) | `#000000` |

**Dark theme:**
| Element | Token | Value |
|---|---|---|
| Alert bg | Gray 2 | `#2B2D30` |
| Alert border | Gray 4 | `#43454A` |
| Button border | Gray 5 | `#4E5157` |
| Checkbox border | Grey 6 | `#5A5D63` |
| Text color | Gray 12 | `#DFE1E5` |

**Shared:**
| Element | Token | Value |
|---|---|---|
| Primary button bg | Blue 6 (Primary) | `#3574F0` |
| Primary button text | White | `#FFFFFF` |

### Alert types

| Type | Icon |
|---|---|
| question (default) | `general/questionDialog` — blue circle with `?` |
| error | `general/errorDialog` — red circle with `!` |
| warning | `general/warningDialog` — yellow triangle with `!` |

### Spacing corrections (from Component-specs, node 959:9381)

Annotations on the spec page compare an IDE screenshot ("Incorrect") with the kit component ("Correct") and note the following fixes:

| Spacing | Old value | New (correct) value | Delta |
|---|---|---|---|
| Gap between icon and text block | 20px | 12px | -8px |
| Bottom inset (under buttons) | 12px | 14px | +2px |

Current kit code shows `bottom: 13px` for the footer — this should be checked against the spec (annotation says 14px).

### Button focus ring (default/focused button)

The dark-theme variant (node 2145:4735) shows a focus ring on the primary (OK) button:
- 2px solid border, color `#3574F0` (Blue 6 / Primary)
- 3px offset from button edge (gap between button and ring)
- 7px border-radius on the ring
- Up to 4 button slots: 2 generic + Cancel + Primary (blue)

### Shadow discrepancy

- Kit (Int-UI-Kit) file: blur = **32px** (`shadow/shadow-popup-blur`)
- Component-specs file: shadow shown as `0 8px 40px rgba(0,0,0,0.3)`

Blur 32px is from the design-system variables; 40px appears in the component-specs Figma. Need to confirm which is correct.

### Open questions (from Component-specs, DO LATER)

1. **Title text size** — 14 → 16? Or the reverse, update in kit to 14? Currently spec says 16px.
2. **Button styling** — check in build after buttons are done (Olya).
3. **Mac messages** — internal action: test mac messages.

### Known gaps (current implementation vs Figma)

1. **Help icon in footer** — Figma shows a `(?)` help icon bottom-left. Not yet implemented.
2. **Footer separator** — Figma Dialog has a separator line above the footer. Alert in Figma does NOT have a separator (buttons are part of the same card).

## Dialog

### Structure (from Figma node 7070:146272)

```
Dialog (variable width, rounded 8px)
├── Header (macOS traffic light buttons + title)
├── Header border (1px separator)
├── Content area (scrollable)
├── Footer border (1px separator)
└── Footer
    ├── Help icon (24×24, left-aligned)
    └── Buttons (right-aligned, gap 12px)
```

### Container tokens

Same as Alert — uses `--dialog-*` CSS variables. See table above.
