# Empty State

## Overview
Empty states fill container components (tool windows, lists, trees, tables) when they have no content. They inform users why the area is empty and provide actions to populate it.

## Guidelines
Source: https://plugins.jetbrains.com/docs/intellij/empty-state.html

### Content Structure
1. **Explanation** (required) -- reason why the container is empty. Default pattern: "No [entity] added."
2. **Action link** (optional) -- 1-2 actions max, with optional keyboard shortcut. Makes it easier to understand what to start with.
3. **Help link** (optional) -- link to help topic with question mark icon prefix. Used in tool windows and master-detail layouts.

### Writing Rules
- Use sentence capitalization
- Separate sentences with periods, but no period after action links
- Use ellipsis at the end of action link if it opens a dialog/popup requiring input
- Avoid words like "press" or "click" -- they are obvious from how the link works
- Avoid "add new" -- just use "add" because all that is added is new in the context of an empty area
- Use non-breaking spaces between action names and shortcuts, and for articles/prepositions

### Visual Specs (from Figma)
- Font: Inter 500, 13px/16px (`text-ui-default`)
- Explanation color: `var(--text-secondary)`
- Shortcut color: `var(--text-secondary)`
- Link color: `var(--link-text)` (via Link component)
- Vertical gap between explanation and action: 4px
- Gap between action link and shortcut: 6px
- Gap between help icon and help link: 7px
- Help section top padding: 20px
- Horizontal padding: 48px minimum
- Content is centered both horizontally and vertically within the container

## Component API
```jsx
<EmptyState
  explanation="No datasources added."
  actionText="Add data source..."
  actionShortcut="⌘N"
  onAction={() => {}}
  helpText="Defining a database"
  helpHref="https://..."
  className=""
/>
```

## Variants
- **Simple** -- the base variant implemented here (Figma node `28420:8312`)
