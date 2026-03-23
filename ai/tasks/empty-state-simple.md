# Task: Empty State Simple Component

## Status: Done

## Requirements (from user)
- Implement the "Empty State / Simple" design from Figma (node `28420:8312`)
- Follow IntelliJ UI Guidelines for empty states: https://plugins.jetbrains.com/docs/intellij/empty-state.html
- Branch: `empty-state-simple`

## Plan
1. Create `EmptyState.jsx` and `EmptyState.css` in `src/ui/components/emptystate/`
2. Reuse existing `Link` and `Icon` components
3. Export from `src/lib/index.js`, add types to `src/lib/index.d.ts`, import CSS in `src/lib/styles.js`
4. Update `componentsConfig.js` status from `coming-soon` to `ready`
5. Add showcase page and route in `App.js`
6. Create spec documentation in `ai/specs/empty-state.md`

## Progress
- [x] Created task and spec files
- [x] Component implementation
- [x] Library exports and types
- [x] Config update
- [x] Showcase page
