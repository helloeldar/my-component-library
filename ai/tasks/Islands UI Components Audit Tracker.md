# Islands UI Components Audit Tracker

## Scope

- Figma page: `https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6204-73431`
- Task brief: `ai/tasks/Task - Recreate all Islands UI components.md`
- Repo component roots:
  - `src/ui/components/`
  - `src/lib/index.js`
  - `figma-exports/`

## Status legend

- Implemented: `Yes`, `Partial`, `No`
- Accuracy: `Unknown`, `Needs review`, `Accurate`, `Needs fix`
- Designer review: `No`, `Pending`, `Yes`

## Figma groups discovered so far

- [Popup / Main Toolbar](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=8043-83916)
- [Popup / Actions](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=8043-84054)
- [Popup / Editor](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=8043-85254)
- [Popup / Navigation](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=8043-85257)
- [Popup / Problems](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=27844-18645)
- [Dialog / Examples](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=11484-23324)
- [Dialog](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146076)
- [Main Window](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-138478)
- [Tool Window](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-86382)

## Mapping findings (updated 2026-03-24, originally 2026-03-17)

- `Popup` and `PopupCell` are generic primitives. Named Figma popup variants now have dedicated components: `PopupBranches`, `PopupProjects`, `PopupFindInFiles`, `PopupRunWidget`, `PopupLineWithActions`, `PopupTreeSection`.
- `Search` (legacy) and `SearchEverywherePopup` both map to [Popup / Search Everywhere](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-81938). `SearchEverywherePopup` is the newer dedicated component; `Search` is now exported.
- `ProjectWidget` is the toolbar widget that triggers `PopupProjects`, mapping to [Popup / Projects](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6445-76525).
- `ToolbarDropdown` is the generic base used by `RunWidget` and `ProjectWidget`; `PopupBranches` now handles the Branches popup specifically.
- `ToolWindow` maps directly to the [Tool Window](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=605-63656) group.
- `ToolWindowHeader` maps directly to [Tool Window / Header](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=605-50202), including label and tab header variants.
- A first fidelity pass has been applied to `ToolWindowHeader`: minimize now uses the Figma-aligned `general/hide` icon, border rendering is explicit, and the label header supports the adjacent dropdown chevron pattern.
- `MainWindow` covers the main-window shell space but still needs fidelity review against [Main Window](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-143445).
- The current `MainWindow` implementation is a structural showcase composition using `MainToolbar`, `StripeContainer`, `ToolWindow`, `Tab`, and placeholder content areas rather than reproducing the full Figma shell 1:1.
- ~~There is no dedicated dialog component family.~~ **Resolved (2026-03-24)**: Dialog, DialogHeader, DialogFooter, DialogGroupHeader, WelcomeDialog all implemented.
- All four Tooltip sub-types are now implemented: `GotItTooltip`, `TooltipHelp`, `TooltipEditor`, `ValidationTooltip` added since last audit.
- `Loader`, `Editor`, `Badge`, `EmptyState`, `RunWidget`, `MainToolbarVerticalSeparator` all added since last audit.

## Current repo component inventory

| Component | Repo path | Likely Figma group | Implemented | Accuracy | Designer review | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Alert | `src/ui/components/alert/Alert.jsx` | Dialog / Examples | Yes | Needs review | No | OS-style alert sheet (question/error/warning icon + buttons + optional checkbox). Distinct from Dialog family. Needs matching to exact Figma node. |
| Badge | `src/ui/components/badge/Badge.jsx` | [Badge](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7191-45511) | Yes | Unknown | No | Variants: BadgeNew, BadgeBeta, BadgeFree, BadgeTrial; multiple color variants |
| Banner | `src/ui/components/banner/Banner.jsx` | [Banner](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6353-75026) | Yes | Unknown | No | |
| Button | `src/ui/components/button/Button.jsx` | [Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=146-52009) | Yes | Unknown | No | Includes Slim Button variant (6517:82733) |
| Checkbox | `src/ui/components/checkbox/Checkbox.jsx` | [Checkbox](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6285-70852) | Yes | Unknown | No | Part of Buttons section |
| Combobox | `src/ui/components/combobox/Combobox.jsx` | Input | Yes | Unknown | No | Input state matrix appears in Figma metadata |
| Dialog | `src/ui/components/dialog/Dialog.jsx` | [Dialog](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146272) | Yes | Needs review | No | Header (macOS buttons + title), content, footer (help + buttons) |
| DialogHeader | `src/ui/components/dialog/DialogHeader.jsx` | [Dialog / Header](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146218) | Yes | Needs review | No | |
| DialogFooter | `src/ui/components/dialog/DialogFooter.jsx` | [Dialog / Footer](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146235) | Yes | Needs review | No | Help icon + action buttons |
| DialogGroupHeader | `src/ui/components/dialog/DialogGroupHeader.jsx` | [Dialog / Group Header](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7072-91228) | Yes | Needs review | No | Section header with title + separator line |
| WelcomeDialog | `src/ui/components/dialog/WelcomeDialog.jsx` | Dialog / Examples | Partial | Unknown | No | Welcome screen dialog composition |
| Dropdown | `src/ui/components/dropdown/Dropdown.jsx` | Input | Yes | Unknown | No | Input state matrix appears in Figma metadata |
| Editor | `src/ui/components/editor/Editor.jsx` | [Editor](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7059-95560) | Yes | Unknown | No | Code editor with syntax highlighting; includes EditorGutter sub-component |
| EmptyState | `src/ui/components/emptystate/EmptyState.jsx` | [Empty State](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=8043-84054) | Yes | Unknown | No | Empty state with icon, title, description, and action link |
| Icon | `src/ui/components/icon/Icon.jsx` | [Toolbar / Icon Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5701-76416) | Yes | Unknown | No | Icon rendering utility |
| IconButton | `src/ui/components/iconbutton/IconButton.jsx` | [Toolbar / Icon Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5701-76416) | Yes | Unknown | No | Default tool window variant |
| MainToolbarIconButton | `src/ui/components/iconbutton/IconButton.jsx` | Main Toolbar / Icon Button | Yes | Accurate | No | 40×40 wrapper, 30×30 bg, 6px radius |
| IDEWindow | `src/ui/components/idewindow/IDEWindow.jsx` | Main Window | Partial | Needs review | No | Shell-level composition that needs exact parity review |
| Input | `src/ui/components/input/Input.jsx` | Input | Yes | Unknown | No | Labelled input states appear in Figma metadata |
| Link | `src/ui/components/link/Link.jsx` | [Link](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=46-11074) | Yes | Unknown | No | Default, Dropdown, External variants |
| Loader | `src/ui/components/loader/Loader.jsx` | [Loader](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5767-82632) | Yes | Unknown | No | Spinning animated loader for indeterminate states |
| MainToolbarVerticalSeparator | `src/ui/components/maintoolbar/MainToolbarVerticalSeparator.jsx` | Main Toolbar | Yes | Unknown | No | Vertical divider specific to main toolbar |
| MainWindow | `src/ui/components/mainwindow/MainWindow.jsx` | Main Window | Partial | Needs fix | No | Structural composition exists, but major parts are still placeholders rather than full Figma parity |
| Notification | `src/ui/components/notification/Notification.jsx` | [Notification](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=3595-83697) | Yes | Needs review | No | info/warning/error/success types, title, actions, timestamp. Showcase page as "Balloon". |
| Popup | `src/ui/components/popup/Popup.jsx` | Popup | Yes | Accurate | No | Complete generic popup container (header/content/footer areas, visible toggle) |
| PopupBranches | `src/ui/components/popup/PopupBranches.jsx` | [Popup / Branches](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6451-81294) | Partial | Needs fix | No | Branches are hardcoded static arrays; accepts no data props; actions are visual only |
| PopupCell | `src/ui/components/popup/PopupCell.jsx` | Popup | Yes | Needs review | No | 6 cell types: line, header, separator, footer, search, multiline, advanced; icons, shortcuts, mnemonics, submenu |
| PopupFindInFiles | `src/ui/components/popup/PopupFindInFiles.jsx` | [Popup / Find in Files](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-93391) | Yes | Unknown | No | Find in files search popup |
| PopupLineWithActions | `src/ui/components/popup/PopupLineWithActions.jsx` | Popup | Yes | Unknown | No | Popup row with inline action buttons |
| PopupProjects | `src/ui/components/popup/PopupProjects.jsx` | [Popup / Projects](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6445-76525) | Yes | Unknown | No | Projects picker popup |
| PopupRunWidget | `src/ui/components/popup/PopupRunWidget.jsx` | Popup / Main Toolbar | Yes | Unknown | No | Run configuration popup triggered from RunWidget |
| PopupTreeSection | `src/ui/components/popup/PopupTreeSection.jsx` | Popup | Yes | Unknown | No | Tree-style section for popup lists |
| SearchEverywherePopup | `src/ui/components/popup/SearchEverywherePopup.jsx` | [Popup / Search Everywhere](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-81938) | Yes | Unknown | No | Full Search Everywhere popup (replaces/augments legacy Search component) |
| ProgressBar | `src/ui/components/progressbar/ProgressBar.jsx` | [Progress Bar](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7059-86470) | Yes | Unknown | No | Single Line and Multiline variants |
| ProjectWidget | `src/ui/components/projectwidget/ProjectWidget.jsx` | Popup / Projects | Yes | Needs review | No | Toolbar project name widget that opens PopupProjects |
| Radio | `src/ui/components/radio/Radio.jsx` | [Buttons section](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6285-70852) | Yes | Unknown | No | Part of Buttons section; includes RadioGroup |
| RunWidget | `src/ui/components/runwidget/RunWidget.jsx` | [Main Toolbar / Run Widget](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6451-81294) | Yes | Unknown | No | Run/debug toolbar widget with dropdown |
| Search | `src/ui/components/search/Search.jsx` | Popup / Search Everywhere | Partial | Needs review | No | Legacy search component; SearchEverywherePopup is the newer dedicated component |
| SegmentedControl | `src/ui/components/segmentedcontrol/SegmentedControl.jsx` | [Segmented Control](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7281-46902) | Yes | Unknown | No | Active, Disabled, Focused states |
| StatusBar | `src/ui/components/statusbar/StatusBar.jsx` | Main Window | Yes | Unknown | No | Part of window shell |
| StatusBarBreadcrumb | `src/ui/components/statusbar/StatusBarBreadcrumb.jsx` | Main Window | Yes | Unknown | No | Part of window shell |
| StatusBarProgress | `src/ui/components/statusbar/StatusBarProgress.jsx` | Main Window | Yes | Unknown | No | Part of window shell |
| StatusBarWidget | `src/ui/components/statusbar/StatusBarWidget.jsx` | Main Window | Yes | Unknown | No | Part of window shell |
| StripeIconButton | `src/ui/components/stripe/Stripe.jsx` | [Stripe / Icon Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=269-25319) | Yes | Accurate | No | 40×40 wrapper, renamed from Stripe |
| StripeContainer | `src/ui/components/stripe/StripeContainer.jsx` | [Stripes](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7059-97083) | Yes | Unknown | No | Container for stripe buttons |
| Table | `src/ui/components/table/Table.jsx` | [Table](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7278-46644) | Yes | Unknown | No | Header, Cell, Toolbar sub-components |
| Tab | `src/ui/components/tabs/Tab.jsx` | [Tab](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=26471-56584) | Yes | Unknown | Reviewed, edited manually, don't touch | Selected/Focused/Hover/Pinned variants |
| TabBar | `src/ui/components/tabs/TabBar.jsx` | [Tab Bar](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5664-81616) | Yes | Unknown | No | |
| Toggle | `src/ui/components/toggle/Toggle.jsx` | [Toggle](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5168-84066) | Yes | Unknown | No | On/Off states |
| ToolbarDropdown | `src/ui/components/toolbardropdown/ToolbarDropdown.jsx` | [Toolbar / Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5701-76161) + [Toolbar / Dropdown](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=9393-66721) | Yes | Needs review | No | 26px tool-window toolbar button/dropdown. Covers both Figma nodes per component JSDoc. |
| MainToolbarDropdown | `src/ui/components/maintoolbar/MainToolbarDropdown.jsx` | Main Toolbar / Dropdown | Yes | Unknown | No | 40px main-toolbar variant of ToolbarDropdown. Not yet exported from `src/lib/index.js`. |
| ToolbarSeparator | `src/ui/components/toolbar/ToolbarSeparator.jsx` | [Toolbar / Separator](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5701-76320) | Yes | Needs review | No | Vertical/horizontal orientation for toolbar dividers |
| AIAssistantWindow | `src/ui/components/toolwindow/AIAssistantWindow.jsx` | Tool Window | Yes | Unknown | No | Composite example |
| CommitWindow | `src/ui/components/toolwindow/CommitWindow.jsx` | Tool Window | Yes | Unknown | No | Commit tool window with staged/unstaged file trees |
| ProjectWindow | `src/ui/components/toolwindow/ProjectWindow.jsx` | Tool Window | Yes | Unknown | No | Composite example |
| ProblemsWindow | `src/ui/components/toolwindow/ProblemsWindow.jsx` | [Popup / Problems](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=27844-18645) | Yes | Unknown | No | Problems/errors panel tool window |
| TerminalWindow | `src/ui/components/toolwindow/TerminalWindow.jsx` | Main Window / Bottom Tool Window | Yes | Needs review | No | Fidelity pass landed: structured line types, terminal color tokens, dense IDE-like styling |
| ToolWindow | `src/ui/components/toolwindow/ToolWindow.jsx` | Tool Window | Yes | Needs review | No | Direct audit target against the base Tool Window node |
| ToolWindowHeader | `src/ui/components/toolwindow/ToolWindowHeader.jsx` | Tool Window / Header | Yes | Needs review | No | First fidelity pass landed; tabs variant still needs closer parity review |
| VCSLogWindow | `src/ui/components/toolwindow/VCSLogWindow.jsx` | [VCS Log](https://www.figma.com/design/g2D8IcRkSJTt9vAmhp0Amu/VCS-Components?node-id=234-10695) | Partial | Needs review | No | WIP: 3-panel layout (branches, commit log, details), SVG graph dots, branch tree. Needs polish. |
| GotItTooltip | `src/ui/components/tooltip/GotItTooltip.jsx` | [Tooltip / Got It](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=56-8741) | Yes | Unknown | No | Onboarding tooltip with arrow |
| Tooltip | `src/ui/components/tooltip/Tooltip.jsx` | [Tooltip / Tooltip](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=55-9038) | Yes | Needs review | No | Placement, shortcut, delay props |
| TooltipEditor | `src/ui/components/tooltip/TooltipEditor.jsx` | [Tooltip / Editor](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=71-9760) | Yes | Unknown | No | Error/Warning/Success/Info editor tooltips |
| TooltipHelp | `src/ui/components/tooltip/TooltipHelp.jsx` | [Tooltip / Help](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7191-45453) | Yes | Unknown | No | Help tooltip |
| ValidationTooltip | `src/ui/components/tooltip/ValidationTooltip.jsx` | [Tooltip / Validation](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=10134-67704) | Yes | Unknown | No | Validation error/warning tooltips near form controls |
| Tree | `src/ui/components/tree/Tree.jsx` | Tool Window / Content | Yes | Unknown | No | Used inside tool window examples |
| TreeNode | `src/ui/components/tree/TreeNode.jsx` | Tool Window / Content | Yes | Unknown | No | Used inside tool window examples |
| ~~IDELayout~~ | ~~`src/ui/components/idelayout/IDELayout.jsx`~~ | Main Window | Removed | — | — | Consolidated into MainWindow |

## Known audit gaps to resolve next

- ~~There is currently no dedicated `src/ui/components/dialog/` implementation in the repo.~~ **Resolved**: Dialog, DialogHeader, DialogFooter, DialogGroupHeader created.
- ~~Many popup variants exist only as showcase compositions.~~ **Resolved**: PopupBranches, PopupProjects, PopupFindInFiles, PopupRunWidget, PopupLineWithActions, PopupTreeSection all created.
- `MainWindow` still needs a deeper fidelity pass for toolbar chrome, editor content, project tree detail, and bottom terminal/tool-window realism.
- Named Figma popup variants still missing as dedicated repo components include:
  - [Popup / Run Anything](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6504-84734)
  - [Popup / Completion](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-85234)
  - [Popup / Documentation](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-89895)
  - [Popup / Recent Files](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-81195)
  - ~~[Popup / Find in Files](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-93391)~~ **Resolved**: `PopupFindInFiles` created.
  - [Popup / Show Usages](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-80622)
- ~~Map the remaining controls to exact Figma component sets.~~ **Resolved**: All repo components now mapped to Figma nodes.
- Distinguish direct Islands primitives from composite demo components (e.g. `ProjectWindow`, `AIAssistantWindow`, `CommitWindow` are composites).
- Verify which repo components are public API (exported from `src/lib/index.js`) versus showcase-only.
- `Search` legacy component relationship to `SearchEverywherePopup` needs clarification.

## Figma components with no repo implementation yet

| Figma component           | Node ID        | Priority   | Notes                                            |
| ------------------------- | -------------- | ---------- | ------------------------------------------------ |
| ~~Tooltip / Tooltip~~     | ~~55:9038~~    | ~~Medium~~ | **Implemented** as `Tooltip`                     |
| ~~Tooltip / Got It~~      | ~~56:8741~~    | ~~Low~~    | **Implemented** as `GotItTooltip`                |
| ~~Tooltip / Help~~        | ~~7191:45453~~ | ~~Low~~    | **Implemented** as `TooltipHelp`                 |
| ~~Tooltip / Editor~~      | ~~71:9760~~    | ~~Low~~    | **Implemented** as `TooltipEditor`               |
| ~~Tooltip / Validation~~  | ~~10134:67704~~| ~~Medium~~ | **Implemented** as `ValidationTooltip`           |
| ~~Notification~~          | ~~3595:83697~~ | ~~Medium~~ | **Implemented** as `Notification`                |
| ~~Loader Animated~~       | ~~5767:82632~~ | ~~Medium~~ | **Implemented** as `Loader`                      |
| ~~Editor~~                | ~~7059:95560~~ | ~~Medium~~ | **Implemented** as `Editor`                      |
| ~~Toolbar / Separator~~   | ~~5701:76320~~ | ~~Low~~    | **Implemented** as `ToolbarSeparator`            |
| ~~Dialog / Group Header~~ | ~~7072:91228~~ | ~~Medium~~ | **Implemented** as `DialogGroupHeader`           |
| ~~Popup / Find in Files~~ | ~~6515:93391~~ | ~~Medium~~ | **Implemented** as `PopupFindInFiles`            |
| Notification stack        | 461:98574      | Low        | Stacked notifications                            |
| Scrollbar                 | 6222:73552     | Low        | Horizontal/Vertical scrollbar                    |
| Shortcut sequence         | 20050:22805    | Low        | Keyboard shortcut display                        |
| Code Sample               | 3711:79004     | Low        | Inline code sample                               |
| Editor / Search Replace   | 27268:37610    | Medium     | Find/replace bar inside editor                   |
| ~~Toolbar~~               | ~~1146:54334~~ | ~~Medium~~ | **Implemented** — covered by ToolbarDropdown + ToolbarSeparator + IconButton composition |
| ~~Toolbar / Button~~      | ~~5701:76161~~ | ~~Medium~~ | **Implemented** as `ToolbarDropdown` (per component JSDoc) |
| ~~Toolbar / Dropdown~~    | ~~9393:66721~~ | ~~Medium~~ | **Implemented** as `ToolbarDropdown` (per component JSDoc) |
| Toolbar / Search          | 9578:67119     | Medium     | Toolbar inline search                            |
| Popup / Run Anything      | 6504:84734     | Medium     | Run Anything popup                               |
| Popup / Completion        | 6515:85234     | Low        | Code completion popup                            |
| Popup / Documentation     | 6515:89895     | Low        | Documentation popup                              |
| Popup / Recent Files      | 6515-81195     | Low        | Recent files popup                               |
| Popup / Show Usages       | 6515:80622     | Low        | Show usages popup                                |
| Selection                 | 26807:71264    | Low        | Selection patterns                               |
| Badge                     | 7191:45511     | Low        | Already implemented — needs Figma accuracy check |


## Completed implementation targets

- ~~`TerminalWindow`~~ — **Done**: fidelity pass landed with structured line types, terminal CSS tokens, context menu, search overlay.
- ~~`Dialog` family~~ — **Done**: Dialog, DialogHeader, DialogFooter, DialogGroupHeader, WelcomeDialog created.
- ~~`Tooltip` family~~ — **Done**: Tooltip, GotItTooltip, TooltipHelp, TooltipEditor, ValidationTooltip all created.
- ~~`Notification`~~ — **Done**: Notification component with types, actions, timestamps.
- ~~`ToolbarSeparator`~~ — **Done**: Generic toolbar divider (vertical/horizontal).
- ~~`Loader`~~ — **Done**: Animated spinner for indeterminate states.
- ~~`Editor`~~ — **Done**: Code editor with syntax highlighting and gutter.
- ~~`Badge`~~ — **Done**: Badge with New/Beta/Free/Trial variants and color options.
- ~~`EmptyState`~~ — **Done**: Empty state with icon, title, description, action link.
- ~~`RunWidget`~~ — **Done**: Run/debug toolbar widget with dropdown.
- ~~`MainToolbarVerticalSeparator`~~ — **Done**: Vertical divider for main toolbar.
- ~~Popup variants~~ — **Done**: PopupBranches, PopupProjects, PopupFindInFiles, PopupRunWidget, PopupLineWithActions, PopupTreeSection, SearchEverywherePopup created.
- ~~Tool window composites~~ — **Done**: CommitWindow, ProblemsWindow added alongside existing ProjectWindow, AIAssistantWindow, TerminalWindow.
- ~~`Toolbar / Button` + `Toolbar / Dropdown`~~ — **Done**: Both covered by `ToolbarDropdown` (26px tool-window variant) and `MainToolbarDropdown` (40px main-toolbar variant).

## Next implementation candidates

### Needs fix / polish (existing components)
- **PopupBranches** — Make branches dynamic (accept data via props), wire up actions

### Missing components, in rough priority order
1. **Editor / Search Replace** (27268:37610) — Find/replace bar inside editor
2. **Toolbar / Search** (9578:67119) — Toolbar inline search field
3. **Popup / Run Anything** (6504:84734) — Run Anything popup (double-Shift)
4. **Popup / Recent Files** (6515:81195) — Recent files popup
5. **Popup / Show Usages** (6515:80622) — Show usages popup
6. **Notification stack** (461:98574) — Stacked notifications
7. **Scrollbar** (6222:73552) — Custom scrollbar component
8. **Shortcut sequence** (20050:22805) — Keyboard shortcut display
9. **Code Sample** (3711:79004) — Inline code sample
10. **Popup / Completion** (6515:85234) — Code completion popup
11. **Popup / Documentation** (6515:89895) — Documentation popup
12. **Selection** (26807:71264) — Selection patterns

