# Task: Problems Tool Window

## Requirements (from user)

Implement the Problems tool window matching the Figma design (Int UI Kit — Islands, node 29096:16573).
Should include an empty state variant.

## Approach

Created a `ProblemsWindow` component that wraps `ToolWindow` with `headerType="tabs"`, a left sidebar toolbar with icon buttons, and a tree view for problems. Also extended `Tab` (count badge) and `TreeNode` (secondary text) to support the design.

## Plan

1. Add `count` prop to Tab — numeric badge after the label in muted color
2. Pass `tab.count` through TabBar to Tab
3. Add `secondaryText` prop to TreeNode — text rendered after the label
4. Pass `node.secondaryText` through Tree to TreeNode
5. Create `ProblemsWindow.jsx` — wraps ToolWindow with tabs, left toolbar, tree content, and empty state
6. Create `ProblemsWindow.css` — layout for sidebar toolbar and tree area
7. Export from `src/lib/index.js`
8. Add showcase page and route in `App.js`
9. Add entry in `componentsConfig.js`

## Files changed

- `src/ui/components/tabs/Tab.jsx` — added `count` prop
- `src/ui/components/tabs/Tab.css` — `.tab-count` style
- `src/ui/components/tabs/TabBar.jsx` — pass `tab.count` to Tab
- `src/ui/components/tree/TreeNode.jsx` — added `secondaryText` prop
- `src/ui/components/tree/TreeNode.css` — `.tree-node-secondary` style
- `src/ui/components/tree/Tree.jsx` — pass `node.secondaryText` to TreeNode
- `src/ui/components/toolwindow/ProblemsWindow.jsx` — new component
- `src/ui/components/toolwindow/ProblemsWindow.css` — new styles
- `src/lib/index.js` — export ProblemsWindow
- `src/componentsConfig.js` — added Problems entry
- `src/App.js` — ProblemsWindowPage + route

## Status

- [x] Tab count prop
- [x] TreeNode secondaryText prop
- [x] ProblemsWindow component
- [x] Library export
- [x] Showcase page
- [x] Documentation
