# Task: Recreate Settings Dialog

## Source
- **Dialog / Settings**: [Figma node 7072:91658](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7072-91658&t=V8DOXcjhgUO6bzb3-4)

## Spec
See [Settings Dialog specs](../specs/Settings%20Dialog%20specs.md)

---

## Requirements (from user)

> Implement using library components only  
> *(2026-03-23, message 1)*

> it's still squizzed. Remove bg wrapper, as it's a dialog.  
> Keep real size from figma  
> Write specs as i asked in AI RULES.md  
> *(2026-03-23, message 2)*

### Interpretation
1. Implement the Figma "Dialog / Settings" screen using only existing library components — no new components, no custom SVG.
2. Show it without a `component-examples` background wrapper. The dialog itself is the visual — no need for an extra grey box around it.
3. Use the real Figma dimensions: **891 × 653 px**.
4. Write specs into `ai/specs/Settings Dialog specs.md` in structured format.

---

## Plan

- [x] Create `src/ui/components/showcase/SettingsDialog.jsx` — interactive dialog using Dialog, Search, TreeNode, Checkbox, Dropdown, Link, Button, DialogGroupHeader, Icon
- [x] Create `src/ui/components/showcase/SettingsDialog.css` — two-panel flex layout, breadcrumb nowrap
- [x] Register in `componentsConfig.js` (key: `settings`, category: `windows`)
- [x] Add route `/settings` + `SettingsPage` in `App.js`
- [x] Remove `component-examples` bg wrapper — dialog renders directly
- [x] Set dialog dimensions to 891 × 653 px (real Figma size)
- [x] Write full specs to `ai/specs/Settings Dialog specs.md`

---

## Results

- File: `src/ui/components/showcase/SettingsDialog.jsx`
- File: `src/ui/components/showcase/SettingsDialog.css`
- Route: `/settings`
- Sidebar: Windows → Settings
- Fully interactive: tree node selection, checkboxes, dropdowns, font enable/disable toggle
