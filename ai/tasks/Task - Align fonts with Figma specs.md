# Task: Align Fonts with Figma Specs

## Requirements (from user)
- Align fonts based on specs in `ai/specs/Fonts specs.md`
- Check Main Windows Figma files for usage references

## Figma Reference
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7989-86302

## Key Insight
Figma note: "Due to rendering inconsistencies between Figma and IntelliJ IDEs, all fonts with Medium weight actually have Regular weight in implementation."

This means: Figma Medium (500) → CSS Regular (400)

## Changes Made

### 1. Typography.css — Core text style classes
- Fixed `font-weight: 500` → `400` for all "regular/default" text classes
- Added missing classes:
  - `.text-ui-h1` — Inter Semibold 20/24
  - `.text-ui-default-semibold` — Inter Semibold 13/16
  - `.text-ui-small-semibold` — Inter Semibold 12/16
  - `.text-editor-default-bold` — JetBrains Mono Bold 13/22
  - `.text-editor-small-bold` — JetBrains Mono Bold 12/22
- Removed `letter-spacing: 0` from H2 and Paragraph (not in Figma specs)
- Added comment explaining the Medium → Regular weight mapping

### 2. Component CSS files — font-weight 500 → 400
Updated all component CSS files to use `font-weight: 400` instead of `500`:
- Banner.css
- Tab.css
- Input.css
- Link.css
- Table.css
- TreeNode.css
- Checkbox.css
- Radio.css
- Toggle.css
- Dropdown.css
- Combobox.css
- Search.css
- ToolbarDropdown.css
- StatusBarBreadcrumb.css
- StatusBarProgress.css
- StatusBarWidget.css
- ProgressBar.css
- SegmentedControl.css
- TerminalWindow.css
- ProjectSelector.css
- CodeExample.css

### 3. MainWindow.css — Editor line-height fix
- Changed `.main-window-editor-content` line-height from `18px` → `22px` (matches Figma editor default 13/22)

### 4. Showcase/Demo CSS
- App.css (nav-item, component-group h3)
- MainToolbar.css (project-name, branch-name)
- ToolbarDemo.css (toolbar-action-label)
- Colors.css (color-value, color-variable)
- Typography.css showcase classes (spec-item, typography-class)

### 5. Font specs documentation
- Updated `ai/specs/Fonts specs.md` with full Figma type system tables

## Status: DONE
