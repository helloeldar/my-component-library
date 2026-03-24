# Settings Dialog Specs

## Figma
- [Dialog / Settings — node 7072:91658](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7072-91658&t=V8DOXcjhgUO6bzb3-4)

---

## Overview
A full-screen Settings dialog modelled after the IntelliJ IDEA Settings window.  
Implemented from **library components only** — no custom drawing, no new primitives.

---

## Dimensions (from Figma)
| Property | Value |
|---|---|
| Width | 891 px |
| Height | 653 px |
| Border radius | 8 px (inherited from Dialog component) |

---

## Layout
Two-panel horizontal split inside `Dialog`:

| Panel | Width | Overflow |
|---|---|---|
| Left — Navigation Tree | 283 px (fixed) | vertical scroll |
| Right — Content | flex 1 | vertical scroll |

A 1 px separator line (`--dialog-border` color) divides the panels.

---

## Left Panel — Navigation Tree

### Search Field
- Full-width `Search` component (no placeholder text visible in Figma)
- Padding: 6 px top/bottom, 12 px left/right inside the panel

### Tree Nodes
Uses `TreeNode` component directly (not `Tree`).

**Level 1 nodes** — `pl-16px`, chevron toggle if has children  
**Level 2 nodes** — `pl-32px`, no chevron (leaf) or collapsed chevron

Default expanded structure:
```
▼ Appearance and Behavior
    Appearance          ← selected by default
    Menus and Toolbar
  ▶ System Settings
    File Colors
  ▶ Scopes
    Notifications
    Path Variables
▶ Keymap
▶ Editor
  Plugins
▶ Version Control
▶ Build, Execution, Deployment
▶ Languages and Frameworks
▶ Tools
```

---

## Right Panel — Content

### Breadcrumb
- Row of semibold text spans (`text-ui-default-semibold`) separated by `general/chevronRight` icons (16 px)
- `white-space: nowrap` on each span — never wraps to second line
- Default: **Appearance and Behavior › Appearance › Editor Tabs**

### Section: Top Controls (no group header)
Three rows of controls:

**Row 1 — Theme**
- `Dropdown` (horizontal layout, label "Theme", width 195 px): options Dark / Light / Darcula / High Contrast  
- `Checkbox` label "Sync with OS"  
- `Link` type="external" label "Get more themes"

**Row 2 — Zoom**
- `Dropdown` (horizontal layout, label "Zoom", width 230 px, hint "Change with ⌥⌃= or ⌥⌃-. Set to 100% with ⌥⌃0"): 75% / 90% / 100% / 125% / 150%

**Row 3 — Custom Font**
- `Checkbox` label "Use custom font:" — controls disabled state of following dropdowns
- `Dropdown` (vertical, width 178 px, disabled when unchecked): Inter / JetBrains Mono / System Font
- `Dropdown` (horizontal, label "Size", width 110 px, disabled when unchecked): 11–16

### Section: Accessibility
`DialogGroupHeader` title="Accessibility"  
Indented 20 px:
- `Checkbox` label "Support screen readers" hint="⌘⇥ and ⇧⌘⇥ will navigate UI controls in dialogs and will not be available for switching editor tabs or other IDE actions"
- `Checkbox` label "Use contrast scrollbars"
- `Checkbox` label "Adjust colors for red-green vision deficiency" hint="Requires restart. For protanopia and deuteranopia."

### Section: UI Options
`DialogGroupHeader` title="UI Options"  
Two columns, 60 px gap:

**Left column** (indented 20 px):
- `Checkbox` "Show tree indent guides"
- `Checkbox` "Use smaller indents in trees"
- `Checkbox` "Enable mnemonics in menu" — **checked** by default
- `Checkbox` "Enable mnemonics in controls"

**Right column** (no indent):
- `Checkbox` "Smooth scrolling" — **checked** by default
- `Checkbox` "Drag-and-drop with Alt pressed only" — **checked** by default
- `Checkbox` "Always show full path in window header"
- `Checkbox` "Display icons in menu items" — **checked** by default

Below columns, indented 20 px:
- `Button` type="secondary" label "Background Image"

### Section: Antialiasing
`DialogGroupHeader` title="Antialiasing"  
Indented 20 px, two inline horizontal dropdowns:
- `Dropdown` (horizontal, label "IDE", width 230 px): Subpixel / Greyscale / No antialiasing
- `Dropdown` (horizontal, label "Editor", width 213 px): Subpixel / Greyscale / No antialiasing

---

## Footer
Provided by the `Dialog` component `buttons` prop:
| Button | Type | Default State |
|---|---|---|
| Cancel | secondary | enabled |
| Apply | secondary | **disabled** |
| OK | primary | enabled |

Help icon (?) shown in footer left — inherited from `Dialog` `showHelp` prop.

---

## Display in Showcase (App.js)
- Page route: `/settings`
- Rendered **without** a `component-examples` background wrapper — dialog shown directly in `component-section`.
- Dialog must always render at its real Figma dimensions (891 × 653 px).
- No grey container box around the dialog.
