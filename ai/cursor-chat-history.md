# Cursor Chat History

## Component Editability Implementation

### 2026-03-24
Implemented all 4 phases from `ai/specs/Component Editability specs.md`:

**Phase 1 — Quick wins (7 components):**
- StatusBar: Fixed sentinel from `length > 0` to `!= null` so `breadcrumbs={[]}` gives empty bar. Exported `DEFAULT_BREADCRUMBS`, `DEFAULT_WIDGETS`.
- WelcomeDialog: Wired `ideTitle` to header (`Welcome to ${ideTitle}`), added `navItems`, `actionLabels`, `searchPlaceholder` props.
- CommitWindow: Added `toolbarButtons`, `amendLabel`, `messagePlaceholder`, `commitLabel`, `commitAndPushLabel` props. Exported `DEFAULT_COMMIT_TOOLBAR_BUTTONS`.
- ToolWindow: Added `...rest` spread + `style` prop on root div.
- DialogHeader: Added `children` and `style` props.
- TreeNode: Forwarded `className` and `style` on outer container.
- Editor: Added `readerModeLabel`, `readerModeTooltip`, `showReaderMode` props to control ReaderModeBadge.

**Phase 2 — Data-driven screens (3 components):**
- VCSLogWindow: Renamed constants to `DEFAULT_BRANCHES`, `DEFAULT_COMMITS`, `DEFAULT_DETAILS_FILES`. Added `DEFAULT_COMMIT_DETAILS`. Added props: `title`, `tabs`, `branches`, `commits`, `detailsFiles`, `commitDetails`, `selectedCommitId`, `onCommitSelect`. All internal sub-components accept props.
- SettingsDialog: Added `title`, `width`, `height`, `buttons`, `children`, `className` props.
- MainToolbar: Added `leftExtra`, `rightActions`, `showWindowControls` props. Exported `DEFAULT_RIGHT_ACTIONS`.

**Phase 3 — MainWindow slots:**
- Extracted all hardcoded data as module-level constants: `DEFAULT_EDITOR_TABS`, `DEFAULT_JAVA_CODE`, `DEFAULT_PROJECT_TREE_DATA`, `DEFAULT_LEFT_STRIPE_ITEMS`, `DEFAULT_RIGHT_STRIPE_ITEMS`, `DEFAULT_BOTTOM_STRIPE_ITEMS`.
- Added slot props: `editorTabs`, `editorCode`, `editorLanguage`, `projectTreeData`, `leftStripeItems`, `rightStripeItems`, `bottomStripeItems`, `leftPanelContent`, `rightPanelContent`, `bottomPanelContent`, `toolbar`, `statusBarProps`, `overlays`.
- Stripe rendering is now data-driven from the items arrays.
- Panel content rendering uses function props `(stripeId, context) => ReactNode` with default implementations.

**Phase 4 — Types and docs:**
- Updated `src/lib/index.js` to re-export all default data constants.
- Added VCSLogWindow export (was missing from library).
- Updated `src/lib/index.d.ts` with full TypeScript interfaces for all modified components.

**Verification:**
- `npm run build:lib` — passes
- `npx react-scripts build` — passes

Committed to branch `feat/component-editability` (286ef2b).

### 2026-03-24 (continued)
Created `ai/specs/Component Customization Guide.md` — practical guide for npm consumers showing how to edit every component area with code examples. Covers the "import defaults, tweak, pass back" pattern and lists all exported default data constants.
