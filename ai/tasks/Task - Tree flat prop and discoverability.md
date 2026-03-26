# Task: Tree flat prop and discoverability

## Goal
Tree is used in the real IDE for both hierarchical and flat lists (tasks, sessions, bookmarks, results, run configs), but AI and new developers don't know this because the name implies hierarchy. The fix is two things: a JSDoc comment + a `flat` prop.

## Requirements
- Add JSDoc to `Tree.jsx` explaining it works for flat lists too
- Add `flat` boolean prop to `Tree` that passes down to `TreeNode`
- In `TreeNode`, when `flat=true`:
  - Remove the chevron/spacer column entirely (the 16px + 4px margin slot)
  - Remove indentation (no extra paddingLeft)
  - Keep all hover, selection, sizing, tokens exactly as-is
- Update TypeScript types in `index.d.ts`
- Create `ai/specs/Tree Component.md` documenting the flat list pattern

## Plan
1. Update `Tree.jsx` — add JSDoc + pass `flat` to TreeNode
2. Update `TreeNode.jsx` — add `flat` prop, skip chevron/spacer/indent when true
3. Update `index.d.ts` — add `flat?: boolean` to Tree and TreeNodeProps types
4. Create `ai/specs/Tree Component.md`

## Progress
- 2026-03-26: Researched existing Tree component. API: `data`, `onNodeSelect`, `onNodeToggle`.
  TreeNode renders chevron toggle or spacer div + indent via inline paddingLeft.
- 2026-03-26: Implemented `flat` prop — hides chevron/spacer column and indentation.
  Updated types. Created Tree Component spec.

## Results
- `<Tree flat data={items} />` renders a clean flat list with no chevrons or indent
- JSDoc on Tree explains the flat list use case
- Spec documents the pattern for AI and developers
