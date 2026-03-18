# Task: Align Tab/TabBar with Figma Specs

## Status: DONE

## User Request
> Check new specs, and makes sure that all toolwindows and editor uses Tab Bar
>
> New Figma specs:
> - Tab component: https://www.figma.com/design/ZHLI0v2qxZp4wdnH6Gbg7b/Component-specs?node-id=3741-60778
> - Tab Bar: https://www.figma.com/design/ZHLI0v2qxZp4wdnH6Gbg7b/Component-specs?node-id=3741-60938

## Requirements
1. Align Tab component with new Figma specs (dimensions, states, tokens)
2. Ensure ALL toolwindows and editor areas use the TabBar component
3. No separate "small" editor tab styling — same Tab for everything

## Changes Made

### Tab.css
- Added 67% opacity for unselected tabs (default state per Figma)
- Changed icon container from 16px → 14px wide (Figma: -2px left padding)
- Changed close icon container from 16px → 12px wide (Figma: -2px padding left/right)
- Removed "small" size variant entirely

### Tab.jsx
- Removed `size` prop (no more small variant)

### TabBar.jsx
- Added controlled mode: accepts `activeTab` prop for external state management
- Added `onTabChange`, `onTabClose`, `focused` props
- Added `actions` prop for rendering trailing action buttons (add, dropdown)
- Added `onActionClick` callback for action buttons
- Removed `size` prop

### TabBar.css
- Removed `.tab-bar-small` styles
- Added `.tab-bar-actions` container for trailing action buttons

### ToolWindowHeader.jsx + .css
- Replaced direct `<Tab>` rendering with `<TabBar>` component (controlled mode)
- TabBar receives `actions={['add', 'dropdown']}` for the add/dropdown buttons
- Removed `.tw-tab-bar`, `.tw-tab-bar-tabs`, `.tw-tab-bar-icons` CSS rules

### MainWindow.jsx + .css
- Removed `size="small"` from editor TabBar
- Changed editor tabs container height from 40px → 36px

### IDEWindow.jsx + .css
- Removed `size="small"` from editor TabBar
- Added `focused={focusedPanel === 'editor'}` to editor TabBar
- Fixed focus model: editor area click now sets `focusedPanel('editor')` instead of `null`
- Changed editor tabs container height from 40px → 36px

### App.js
- Replaced "Small Tabs" showcase section with "Wrapping Tabs"

### index.d.ts
- Updated Tab and TabBar type definitions with new props

## Verification
- All tab usages now go through TabBar component
- Editor tabs and tool window tabs share the same size and styling
- ToolWindowHeader tabs mode uses TabBar with controlled mode
- Unselected tabs show 67% opacity per Figma default state
