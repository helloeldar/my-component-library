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
- `MainWindow`, `IDEWindow`, and `IDELayout` cover the main-window shell space, but still need fidelity review against [Main Window](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-143445).
- The current `MainWindow` implementation is a structural showcase composition: it uses `MainToolbar`, `StripeContainer`, `ToolWindow`, `Tab`, and placeholder content areas rather than reproducing the full Figma shell 1:1.
- There is no dedicated dialog component family in `src/ui/components/`, even though Figma includes `Dialog`, `Dialog / Header`, `Dialog / Footer`, `Dialog / Group Header`, `Help`, and example dialog screens.

## Current repo component inventory

| Component | Repo path | Likely Figma group | Implemented | Accuracy | Designer review | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Alert | `src/ui/components/alert/Alert.jsx` | Dialog | Partial | Unknown | No | Dialog-like alert component, but not a full Dialog family implementation |
| Banner | `src/ui/components/banner/Banner.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| Button | `src/ui/components/button/Button.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| Checkbox | `src/ui/components/checkbox/Checkbox.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| Combobox | `src/ui/components/combobox/Combobox.jsx` | Input | Yes | Unknown | No | Input state matrix appears in Figma metadata |
| Dropdown | `src/ui/components/dropdown/Dropdown.jsx` | Input | Yes | Unknown | No | Input state matrix appears in Figma metadata |
| Icon | `src/ui/components/icon/Icon.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| IconButton | `src/ui/components/iconbutton/IconButton.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| Input | `src/ui/components/input/Input.jsx` | Input | Yes | Unknown | No | Labelled input states appear in Figma metadata |
| Link | `src/ui/components/link/Link.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| Popup | `src/ui/components/popup/Popup.jsx` | Popup | Partial | Needs review | No | Generic popup container used by showcase examples rather than named Figma popup variants |
| PopupCell | `src/ui/components/popup/PopupCell.jsx` | Popup | Partial | Needs review | No | Supports many popup row patterns, but named Figma variants are still mostly composition-level |
| ProgressBar | `src/ui/components/progressbar/ProgressBar.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| Radio | `src/ui/components/radio/Radio.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| Toggle | `src/ui/components/toggle/Toggle.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| IDELayout | `src/ui/components/idelayout/IDELayout.jsx` | Main Window | Partial | Needs review | No | Composite app shell around the main-window idea rather than a direct Figma primitive |
| IDEWindow | `src/ui/components/idewindow/IDEWindow.jsx` | Main Window | Partial | Needs review | No | Likely shell-level composition that needs exact parity review |
| MainWindow | `src/ui/components/mainwindow/MainWindow.jsx` | Main Window | Partial | Needs fix | No | Structural composition exists, but major parts are still placeholders rather than full Figma parity |
| Tab | `src/ui/components/tabs/Tab.jsx` | Tool Window / Tabs | Yes | Unknown | No | Needs precise variant mapping |
| TabBar | `src/ui/components/tabs/TabBar.jsx` | Tool Window / Tabs | Yes | Unknown | No | Needs precise variant mapping |
| Stripe | `src/ui/components/stripe/Stripe.jsx` | Tool Window / Stripe | Yes | Unknown | No | Needs Figma mapping |
| StripeContainer | `src/ui/components/stripe/StripeContainer.jsx` | Tool Window / Stripe | Yes | Unknown | No | Needs Figma mapping |
| ToolbarDropdown | `src/ui/components/toolbardropdown/ToolbarDropdown.jsx` | Popup / Main Toolbar | Partial | Needs review | No | Generic toolbar popup/dropdown, not yet split into specific Figma variants like Branches or Settings |
| ProjectSelector | `src/ui/components/projectselector/ProjectSelector.jsx` | Popup / Projects | Yes | Needs review | No | Strong candidate match for the Projects popup |
| StatusBar | `src/ui/components/statusbar/StatusBar.jsx` | Main Window | Yes | Unknown | No | Likely part of window shell |
| StatusBarBreadcrumb | `src/ui/components/statusbar/StatusBarBreadcrumb.jsx` | Main Window | Yes | Unknown | No | Likely part of window shell |
| StatusBarProgress | `src/ui/components/statusbar/StatusBarProgress.jsx` | Main Window | Yes | Unknown | No | Likely part of window shell |
| StatusBarWidget | `src/ui/components/statusbar/StatusBarWidget.jsx` | Main Window | Yes | Unknown | No | Likely part of window shell |
| ToolWindow | `src/ui/components/toolwindow/ToolWindow.jsx` | Tool Window | Yes | Needs review | No | Direct audit target against the base Tool Window node |
| ToolWindowHeader | `src/ui/components/toolwindow/ToolWindowHeader.jsx` | Tool Window / Header | Yes | Needs review | No | First fidelity pass landed; tabs variant still needs closer parity review |
| TerminalWindow | `src/ui/components/toolwindow/TerminalWindow.jsx` | Main Window / Bottom Tool Window | Partial | Needs fix | No | Generic terminal content on top of `ToolWindow`; not yet a high-fidelity recreation of the Figma terminal area |
| ProjectWindow | `src/ui/components/toolwindow/ProjectWindow.jsx` | Tool Window | Yes | Unknown | No | Composite example |
| AIAssistantWindow | `src/ui/components/toolwindow/AIAssistantWindow.jsx` | Tool Window | Yes | Unknown | No | Composite example |
| Tree | `src/ui/components/tree/Tree.jsx` | Tool Window / Content | Yes | Unknown | No | Likely used inside tool window examples |
| TreeNode | `src/ui/components/tree/TreeNode.jsx` | Tool Window / Content | Yes | Unknown | No | Likely used inside tool window examples |
| Search | `src/ui/components/search/Search.jsx` | Popup / Search Everywhere | Partial | Needs review | No | Showcase component exists, but it is not currently exported from `src/lib/index.js` |
| SegmentedControl | `src/ui/components/segmentedcontrol/SegmentedControl.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |
| Table | `src/ui/components/table/Table.jsx` | TBD | Yes | Unknown | No | Needs Figma mapping |

## Known audit gaps to resolve next

- There is currently no dedicated `src/ui/components/dialog/` implementation in the repo.
- Many popup variants appear to exist only as showcase compositions in `src/App.js`, not as named standalone components yet.
- `MainWindow` still needs a deeper fidelity pass for toolbar chrome, editor content, project tree detail, and bottom terminal/tool-window realism.
- Named Figma popup variants still missing as dedicated repo components include:
  - [Popup / Run Anything](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6504-84734)
  - [Popup / Completion](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-85234)
  - [Popup / Documentation](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-89895)
  - [Popup / Recent Files](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-81195)
  - [Popup / Find in Files](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-93391)
  - [Popup / Show Usages](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6515-80622)
- Map the remaining controls to exact Figma component sets.
- Distinguish direct Islands primitives from composite demo components.
- Verify which repo components are public API versus showcase-only.
- Add explicit missing components once the full Figma section list is captured in smaller batches.

## Next implementation target

- `TerminalWindow`
  - Current repo component: `src/ui/components/toolwindow/TerminalWindow.jsx`
  - Closest current Figma source: the bottom terminal tool window inside [Main Window](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-143445)
- Reason for priority:
  - The task brief explicitly calls out the Terminal tool window as the user’s main interest.
  - The current implementation is functional for prototyping, but still looks like a simplified placeholder.
  - The recent `ToolWindowHeader` fidelity pass is a useful base for improving it next.

## Backlog candidate after terminal

- `Dialog` family
  - Base dialog node: [Dialog](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146272)
  - Related primitives:
    - [Dialog / Header](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146218)
    - [Dialog / Footer](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146235)
    - [Dialog / Group Header](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7072-91228)
    - [Help](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7070-146181)

## First terminal implementation batch

- Tighten `TerminalWindow` to match the bottom tool-window look more closely:
  - refine header/tab spacing on top of the improved `ToolWindowHeader`
  - replace the placeholder terminal content styling with a denser, more IDE-like terminal surface
  - add more realistic prompt/output states instead of the current minimal sample lines
  - compare the terminal area against the Main Window screenshot and reduce obvious placeholder feel
