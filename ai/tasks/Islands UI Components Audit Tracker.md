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

## Mapping findings (2026-03-17)

- `Popup` and `PopupCell` are generic primitives. They support the popup showcase page, but the named Figma popup variants currently appear to be composed in `src/App.js` rather than implemented as standalone components.
- `Search` most closely maps to [Popup / Search Everywhere](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-81938). It has a showcase page, but it is not exported from `src/lib/index.js`.
- `ProjectSelector` most closely maps to [Popup / Projects](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6445-76525).
- `ToolbarDropdown` partially maps to main-toolbar popup patterns such as [Popup / Settings](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=19628-31907) and [Popup / Branches](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6451-81294), but it is currently a generic text dropdown rather than distinct named variants.
- `ToolWindow` maps directly to the [Tool Window](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=605-63656) group.
- `ToolWindowHeader` maps directly to [Tool Window / Header](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=605-50202), including label and tab header variants.
- A first fidelity pass has been applied to `ToolWindowHeader`: minimize now uses the Figma-aligned `general/hide` icon, border rendering is explicit instead of duplicated, and the label header now supports the adjacent dropdown chevron pattern.
- `MainWindow` cover the main-window shell space, but still need fidelity review against [Main Window](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-143445).
- The current `MainWindow` implementation is a structural showcase composition: it uses `MainToolbar`, `StripeContainer`, `ToolWindow`, `Tab`, and placeholder content areas rather than reproducing the full Figma shell 1:1.
- There is no dedicated dialog component family in `src/ui/components/`, even though Figma includes `Dialog`, `Dialog / Header`, `Dialog / Footer`, `Dialog / Group Header`, `Help`, and example dialog screens.

## Current repo component inventory

| Component | Repo path | Likely Figma group | Implemented | Accuracy | Designer review | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Alert | `src/ui/components/alert/Alert.jsx` | Dialog | Partial | Unknown | No | Dialog-like alert component, but not a full Dialog family implementation |
| Dialog | `src/ui/components/dialog/Dialog.jsx` | [Dialog](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146272) | Yes | Needs review | No | New: header (macOS buttons + title), content, footer (help + buttons) |
| DialogHeader | `src/ui/components/dialog/DialogHeader.jsx` | [Dialog / Header](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146218) | Yes | Needs review | No | New |
| DialogFooter | `src/ui/components/dialog/DialogFooter.jsx` | [Dialog / Footer](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146235) | Yes | Needs review | No | New: help icon + action buttons |
| Banner | `src/ui/components/banner/Banner.jsx` | [Banner](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6353-75026) | Yes | Unknown | No | |
| Button | `src/ui/components/button/Button.jsx` | [Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=146-52009) | Yes | Unknown | No | Includes Slim Button variant (6517:82733) |
| Checkbox | `src/ui/components/checkbox/Checkbox.jsx` | [Checkbox](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6285-70852) | Yes | Unknown | No | Part of Buttons section |
| Combobox | `src/ui/components/combobox/Combobox.jsx` | Input | Yes | Unknown | No | Input state matrix appears in Figma metadata |
| Dropdown | `src/ui/components/dropdown/Dropdown.jsx` | Input | Yes | Unknown | No | Input state matrix appears in Figma metadata |
| Icon | `src/ui/components/icon/Icon.jsx` | [Toolbar / Icon Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5701-76416) | Yes | Unknown | No | Icon rendering utility |
| IconButton | `src/ui/components/iconbutton/IconButton.jsx` | [Toolbar / Icon Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5701-76416) | Yes | Unknown | No | Default tool window variant |
| MainToolbarIconButton | `src/ui/components/iconbutton/IconButton.jsx` | Main Toolbar / Icon Button | Yes | Accurate | No | 40×40 wrapper, 30×30 bg, 6px radius |
| Input | `src/ui/components/input/Input.jsx` | Input | Yes | Unknown | No | Labelled input states appear in Figma metadata |
| Link | `src/ui/components/link/Link.jsx` | [Link](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=46-11074) | Yes | Unknown | No | Default, Dropdown, External variants |
| Popup | `src/ui/components/popup/Popup.jsx` | Popup | Partial | Needs review | No | Generic popup container used by showcase examples rather than named Figma popup variants |
| PopupCell | `src/ui/components/popup/PopupCell.jsx` | Popup | Partial | Needs review | No | Supports many popup row patterns, but named Figma variants are still mostly composition-level |
| ProgressBar | `src/ui/components/progressbar/ProgressBar.jsx` | [Progress Bar](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7059-86470) | Yes | Unknown | No | Single Line and Multiline variants |
| Radio | `src/ui/components/radio/Radio.jsx` | [Buttons section](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6285-70852) | Yes | Unknown | No | Part of Buttons section |
| Toggle | `src/ui/components/toggle/Toggle.jsx` | [Toggle](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5168-84066) | Yes | Unknown | No | On/Off states |
| ~~IDELayout~~ | ~~`src/ui/components/idelayout/IDELayout.jsx`~~ | Main Window | Removed | — | — | Consolidated into MainWindow |
| IDEWindow | `src/ui/components/idewindow/IDEWindow.jsx` | Main Window | Partial | Needs review | No | Likely shell-level composition that needs exact parity review |
| MainWindow | `src/ui/components/mainwindow/MainWindow.jsx` | Main Window | Partial | Needs fix | No | Structural composition exists, but major parts are still placeholders rather than full Figma parity |
| Tab | `src/ui/components/tabs/Tab.jsx` | [Tab](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=26471-56584) | Yes | Unknown | No | Selected/Focused/Hover/Pinned variants |
| TabBar | `src/ui/components/tabs/TabBar.jsx` | [Tab Bar](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5664-81616) | Yes | Unknown | No | |
| StripeIconButton | `src/ui/components/stripe/Stripe.jsx` | [Stripe / Icon Button](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=269-25319) | Yes | Accurate | No | 40×40 wrapper, renamed from Stripe |
| StripeContainer | `src/ui/components/stripe/StripeContainer.jsx` | [Stripes](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7059-97083) | Yes | Unknown | No | Container for stripe buttons |
| ToolbarDropdown | `src/ui/components/toolbardropdown/ToolbarDropdown.jsx` | Popup / Main Toolbar | Partial | Needs review | No | Generic toolbar popup/dropdown, not yet split into specific Figma variants like Branches or Settings |
| ProjectSelector | `src/ui/components/projectselector/ProjectSelector.jsx` | Popup / Projects | Yes | Needs review | No | Strong candidate match for the Projects popup |
| StatusBar | `src/ui/components/statusbar/StatusBar.jsx` | Main Window | Yes | Unknown | No | Likely part of window shell |
| StatusBarBreadcrumb | `src/ui/components/statusbar/StatusBarBreadcrumb.jsx` | Main Window | Yes | Unknown | No | Likely part of window shell |
| StatusBarProgress | `src/ui/components/statusbar/StatusBarProgress.jsx` | Main Window | Yes | Unknown | No | Likely part of window shell |
| StatusBarWidget | `src/ui/components/statusbar/StatusBarWidget.jsx` | Main Window | Yes | Unknown | No | Likely part of window shell |
| ToolWindow | `src/ui/components/toolwindow/ToolWindow.jsx` | Tool Window | Yes | Needs review | No | Direct audit target against the base Tool Window node |
| ToolWindowHeader | `src/ui/components/toolwindow/ToolWindowHeader.jsx` | Tool Window / Header | Yes | Needs review | No | First fidelity pass landed; tabs variant still needs closer parity review |
| TerminalWindow | `src/ui/components/toolwindow/TerminalWindow.jsx` | Main Window / Bottom Tool Window | Yes | Needs review | No | Fidelity pass landed: structured line types (prompt/command/output/cursor), terminal color tokens, dense IDE-like styling matching Figma |
| ProjectWindow | `src/ui/components/toolwindow/ProjectWindow.jsx` | Tool Window | Yes | Unknown | No | Composite example |
| AIAssistantWindow | `src/ui/components/toolwindow/AIAssistantWindow.jsx` | Tool Window | Yes | Unknown | No | Composite example |
| Tree | `src/ui/components/tree/Tree.jsx` | Tool Window / Content | Yes | Unknown | No | Likely used inside tool window examples |
| TreeNode | `src/ui/components/tree/TreeNode.jsx` | Tool Window / Content | Yes | Unknown | No | Likely used inside tool window examples |
| Search | `src/ui/components/search/Search.jsx` | Popup / Search Everywhere | Partial | Needs review | No | Showcase component exists, but it is not currently exported from `src/lib/index.js` |
| SegmentedControl | `src/ui/components/segmentedcontrol/SegmentedControl.jsx` | [Segmented Control](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7281-46902) | Yes | Unknown | No | Active, Disabled, Focused states |
| Table | `src/ui/components/table/Table.jsx` | [Table](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7278-46644) | Yes | Unknown | No | Header, Cell, Toolbar sub-components |
| Tooltip | `src/ui/components/tooltip/Tooltip.jsx` | [Tooltip / Tooltip](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=55-9038) | Yes | Needs review | No | New: placement, shortcut, delay props. Showcase page added. |
| Notification | `src/ui/components/notification/Notification.jsx` | [Notification](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=3595-83697) | Yes | Needs review | No | New: info/warning/error/success types, title, actions, timestamp. Showcase page added as "Balloon". |
| ToolbarSeparator | `src/ui/components/toolbar/ToolbarSeparator.jsx` | [Toolbar / Separator](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=5701-76320) | Yes | Needs review | No | New: vertical/horizontal orientation for toolbar dividers. |
| DialogGroupHeader | `src/ui/components/dialog/DialogGroupHeader.jsx` | [Dialog / Group Header](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7072-91228) | Yes | Needs review | No | New: section header with title + separator line. |

## Known audit gaps to resolve next

- ~~There is currently no dedicated `src/ui/components/dialog/` implementation in the repo.~~ **Resolved**: Dialog, DialogHeader, DialogFooter created.
- Many popup variants appear to exist only as showcase compositions in `src/App.js`, not as named standalone components yet.
- `MainWindow` still needs a deeper fidelity pass for toolbar chrome, editor content, project tree detail, and bottom terminal/tool-window realism.
- Named Figma popup variants still missing as dedicated repo components include:
  - [Popup / Run Anything](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6504-84734)
  - [Popup / Completion](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-85234)
  - [Popup / Documentation](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-89895)
  - [Popup / Recent Files](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-81195)
  - [Popup / Find in Files](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-93391)
  - [Popup / Show Usages](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-80622)
- ~~Map the remaining controls to exact Figma component sets.~~ **Resolved**: All repo components now mapped to Figma nodes.
- Distinguish direct Islands primitives from composite demo components.
- Verify which repo components are public API versus showcase-only.
- Add explicit missing components once the full Figma section list is captured in smaller batches.

## Figma components with no repo implementation yet

| Figma component | Node ID | Priority | Notes |
| --- | --- | --- | --- |
| ~~Tooltip / Tooltip~~ | ~~55:9038~~ | ~~Medium~~ | **Implemented** as `Tooltip` component |
| Tooltip / Got It | 56:8741 | Low | Onboarding tooltip with arrow |
| Tooltip / Help | 7191:45453 | Low | Help tooltip |
| Tooltip / Editor | 71:9760 | Low | Error/Warning/Success/Info editor tooltips |
| Tooltip / Validation | 10134:67704 | Medium | Validation error/warning tooltips |
| ~~Notification~~ | ~~3595:83697~~ | ~~Medium~~ | **Implemented** as `Notification` component |
| Notification stack | 461:98574 | Low | Stacked notifications |
| Scrollbar | 6222:73552 | Low | Horizontal/Vertical scrollbar |
| Shortcut sequence | 20050:22805 | Low | Keyboard shortcut display |
| Code Sample | 3711:79004 | Low | Inline code sample |
| Loader Animated | 5767:82632 | Medium | Spinning loader |
| Editor | 7059:95560 | Medium | Full editor component |
| Editor / Search Replace | 27268:37610 | Medium | Find/replace bar |
| Toolbar | 1146:54334 | Medium | Horizontal/Vertical toolbar |
| Toolbar / Button | 5701:76161 | Medium | Toolbar text button with states |
| Toolbar / Dropdown | 9393:66721 | Medium | Toolbar dropdown with states |
| Toolbar / Search | 9578:67119 | Medium | Toolbar inline search |
| ~~Toolbar / Separator~~ | ~~5701:76320~~ | ~~Low~~ | **Implemented** as `ToolbarSeparator` component |
| ~~Dialog / Group Header~~ | ~~7072:91228~~ | ~~Medium~~ | **Implemented** as `DialogGroupHeader` component |
| Selection | 26807:71264 | Low | Selection patterns |

## Completed implementation targets

- ~~`TerminalWindow`~~ — **Done**: fidelity pass landed with structured line types, terminal CSS tokens, context menu, search overlay.
- ~~`Dialog` family~~ — **Done**: Dialog, DialogHeader, DialogFooter, DialogGroupHeader created.
- ~~`Tooltip`~~ — **Done**: Tooltip component with placement, shortcut, and delay.
- ~~`Notification`~~ — **Done**: Notification component with types, actions, timestamps.
- ~~`ToolbarSeparator`~~ — **Done**: Generic toolbar divider (vertical/horizontal).

## Next implementation candidates

Remaining Figma components not yet implemented, in rough priority order:

1. **Tooltip / Validation** (10134:67704) — Validation error/warning tooltips near form controls
2. **Loader Animated** (5767:82632) — Spinning loader for indeterminate states
3. **Toolbar** (1146:54334) — Full horizontal/vertical toolbar container
4. **Toolbar / Button** (5701:76161) — Toolbar text button with states
5. **Toolbar / Dropdown** (9393:66721) — Toolbar dropdown with states
6. **Toolbar / Search** (9578:67119) — Toolbar inline search
7. **Editor / Search Replace** (27268:37610) — Find/replace bar
8. **Tooltip / Got It** (56:8741) — Onboarding tooltip with arrow
9. **Tooltip / Help** (7191:45453) — Help tooltip
10. **Tooltip / Editor** (71:9760) — Editor error/warning tooltips
11. **Notification stack** (461:98574) — Stacked notifications
12. **Scrollbar** (6222:73552) — Custom scrollbar component
13. **Shortcut sequence** (20050:22805) — Keyboard shortcut display
14. **Code Sample** (3711:79004) — Inline code sample
15. **Selection** (26807:71264) — Selection patterns
