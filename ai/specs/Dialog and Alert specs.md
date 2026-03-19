# Dialog and Alert Specs

Figma source: [Dialog](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146272), [Alert](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=3342-83343)

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

### Alert types

| Type | Icon |
|---|---|
| question (default) | `general/questionDialog` — blue circle with `?` |
| error | `general/errorDialog` — red circle with `!` |
| warning | `general/warningDialog` — yellow triangle with `!` |

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
