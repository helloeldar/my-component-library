# Icons Reference

This library includes **1,884 icons** from the IntelliJ Platform icon set.

Browse all icons visually at the **[live showcase →](https://int-ui-kit.vercel.app/icons)**

---

## How to use icons

Icons are referenced by path string — the folder path plus file name, without `.svg` and without `_dark` suffix. The library automatically picks the right variant for the active theme.

```jsx
import { Icon } from '@jetbrains/int-ui-kit';

<Icon name="fileTypes/java" size={16} />
<Icon name="nodes/folder" size={16} />
<Icon name="toolwindows/terminal@20x20" size={20} />
```

You can also use icon names in component props that accept them:

```jsx
// Editor tab icon
{ id: '1', label: 'App.tsx', icon: 'fileTypes/typescript', closable: true }

// Project tree node icon
{ id: 'src', label: 'src', icon: 'nodes/folder' }

// Stripe button icon
{ id: 'terminal', icon: 'toolwindows/terminal@20x20', tooltip: 'Terminal' }
```

---

## Icon categories

### `fileTypes/` — File type icons

Used in editor tabs and file trees. Most commonly used in prototypes.

| Name | Use for |
|---|---|
| `fileTypes/java` | Java files |
| `fileTypes/javaScript` | JavaScript files |
| `fileTypes/typeScript` | TypeScript files |
| `fileTypes/kotlin` | Kotlin files |
| `fileTypes/python` | Python files |
| `fileTypes/css` | CSS files |
| `fileTypes/html` | HTML files |
| `fileTypes/json` | JSON files |
| `fileTypes/jsonSchema` | JSON Schema files |
| `fileTypes/xml` | XML files |
| `fileTypes/yaml` | YAML files |
| `fileTypes/text` | Plain text files |
| `fileTypes/properties` | Properties files |
| `fileTypes/config` | Config files |
| `fileTypes/svg` | SVG files |
| `fileTypes/image` | Image files |
| `fileTypes/archive` | Archive/zip files |
| `fileTypes/csv` | CSV files |
| `fileTypes/manifest` | Manifest files |
| `fileTypes/regexp` | RegExp files |
| `fileTypes/http` | HTTP request files |
| `fileTypes/gitignore` | .gitignore |
| `fileTypes/editorConfig` | .editorconfig |
| `fileTypes/modified` | Modified file indicator |
| `fileTypes/changedFile` | Changed file |
| `fileTypes/ignored` | Ignored file |

---

### `nodes/` — Tree / project structure icons

Used in project trees, file browsers, and navigation.

| Name | Use for |
|---|---|
| `nodes/folder` | Regular folder |
| `nodes/sourceRoot` | Source root folder |
| `nodes/testRoot` | Test root folder |
| `nodes/resourcesRoot` | Resources root |
| `nodes/package` | Package |
| `nodes/class` | Class |
| `nodes/classAbstract` | Abstract class |
| `nodes/interface` | Interface |
| `nodes/enum` | Enum |
| `nodes/record` | Record |
| `nodes/method` | Method |
| `nodes/methodAbstract` | Abstract method |
| `nodes/field` | Field |
| `nodes/variable` | Variable |
| `nodes/function` | Function |
| `nodes/lambda` | Lambda |
| `nodes/parameter` | Parameter |
| `nodes/constant` | Constant |
| `nodes/property` | Property |
| `nodes/constructor` | Constructor |
| `nodes/annotation` | Annotation |
| `nodes/module` | Module |
| `nodes/moduleJava` | Java module |
| `nodes/library` | Library |
| `nodes/libraryFolder` | Library folder |
| `nodes/jdk` | JDK |
| `nodes/plugin` | Plugin |
| `nodes/ppLibFolder` | External libraries folder |
| `nodes/homeFolder` | Home folder |
| `nodes/star` | Starred |
| `nodes/shared` | Shared |
| `nodes/symlink` | Symlink |
| `nodes/unknown` | Unknown file |

---

### `toolwindows/` — Tool window stripe icons

Used for stripe buttons. The `@20x20` variants are for the main left/right stripes (use these in `leftStripeItems` / `rightStripeItems`).

| Name (20x20) | Tool window |
|---|---|
| `toolwindows/project@20x20` | Project |
| `toolwindows/commit@20x20` | Commit |
| `toolwindows/terminal@20x20` | Terminal |
| `toolwindows/problems@20x20` | Problems |
| `toolwindows/vcs@20x20` | Git / VCS |
| `toolwindows/structure@20x20` | Structure |
| `toolwindows/find@20x20` | Find |
| `toolwindows/run@20x20` | Run |
| `toolwindows/debug@20x20` | Debug |
| `toolwindows/build@20x20` | Build |
| `toolwindows/notifications@20x20` | Notifications |
| `toolwindows/hierarchy@20x20` | Hierarchy |
| `toolwindows/messages@20x20` | Messages |
| `toolwindows/coverage@20x20` | Coverage |
| `toolwindows/profiler@20x20` | Profiler |
| `toolwindows/dependencies@20x20` | Dependencies |
| `toolwindows/bookmarks@20x20` | Bookmarks |
| `toolwindows/documentation@20x20` | Documentation |
| `toolwindows/services@20x20` | Services |
| `toolwindows/endpoints@20x20` | Endpoints |
| `toolwindows/changes@20x20` | Changes |
| `toolwindows/dbms@20x20` | Database |
| `toolwindows/maven@20x20` | Maven |
| `toolwindows/gradle@20x20` | Gradle |
| `toolwindows/npm@20x20` | npm |
| `toolwindows/todo@20x20` | TODO |
| `toolwindows/learn@20x20` | Learn |
| `toolwindows/pullRequests@20x20` | Pull Requests |
| `toolwindows/settingSync@20x20` | Settings Sync |

**AI tools:**

| Name | Use for |
|---|---|
| `aiAssistant/toolWindowChat@20x20` | AI Assistant chat |

---

### `general/` — General UI icons

Used in toolbars, buttons, and action lists.

| Name | Use for |
|---|---|
| `general/settings` | Settings gear |
| `general/search` | Search |
| `general/filter` | Filter |
| `general/add` | Add / plus |
| `general/remove` | Remove / minus |
| `general/close` | Close / X |
| `general/collapseAll` | Collapse all |
| `general/expandAll` | Expand all |
| `general/more` | More options (⋯) |
| `general/inline/close` | Inline close button |
| `general/inline/search` | Inline search |
| `general/locked` | Locked |
| `general/unlocked` | Unlocked |
| `general/help` | Help / ? |
| `general/warning` | Warning |
| `general/error` | Error |
| `general/information` | Info |
| `general/copy` | Copy |
| `general/paste` | Paste |
| `general/refresh` | Refresh |
| `general/print` | Print |
| `general/externalToolsSmall` | External tools |
| `general/gear` | Gear / options |
| `general/hideToolWindow` | Hide tool window |

---

### `actions/` — Action icons

Used in context menus, toolbars, and popups.

| Name | Use for |
|---|---|
| `actions/addFile` | Add file |
| `actions/addDirectory` | Add directory |
| `actions/newFolder` | New folder |
| `actions/install` | Install |
| `actions/preview` | Preview |
| `actions/deploy` | Deploy |
| `actions/lightning` | Run / lightning bolt |
| `actions/highlighting` | Highlighting |
| `actions/refresh` | Refresh |
| `actions/forceRefresh` | Force refresh |
| `actions/groupByModule` | Group by module |
| `actions/groupByPackage` | Group by package |
| `actions/groupByFile` | Group by file |
| `actions/minimap` | Minimap |
| `actions/inSelection` | In selection |
| `actions/findForward` | Find forward |
| `actions/findBackward` | Find backward |
| `actions/learn` | Learn |

---

### `run/` — Run configuration icons

| Name | Use for |
|---|---|
| `run/run` | Run |
| `run/debug` | Debug |
| `run/stop` | Stop |
| `run/restart` | Restart |
| `run/rerun` | Rerun |

---

### `vcs/` — Version control icons

| Name | Use for |
|---|---|
| `vcs/push` | Push |
| `vcs/pull` | Pull |
| `vcs/fetch` | Fetch |
| `vcs/branch` | Branch |
| `vcs/merge` | Merge |
| `vcs/rollback` | Rollback |
| `vcs/changelist` | Changelist |
| `vcs/shelve` | Shelve |

---

### `status/` — Status indicators

| Name | Use for |
|---|---|
| `status/success` | Success |
| `status/warning` | Warning |
| `status/error` | Error |
| `status/info` | Info |
| `status/failed` | Failed |

---

### `debugger/` — Debugger icons

| Name | Use for |
|---|---|
| `debugger/db_set_breakpoint` | Set breakpoint |
| `debugger/db_invalid_breakpoint` | Invalid breakpoint |
| `debugger/threadRunning` | Thread running |
| `debugger/threadSuspended` | Thread suspended |
| `debugger/stackFrame` | Stack frame |
| `debugger/watch` | Watch |
| `debugger/evaluate` | Evaluate |
| `debugger/stepOver` | Step over |
| `debugger/stepInto` | Step into |
| `debugger/stepOut` | Step out |

---

## Tips

- **No `_dark` suffix** — the library picks it automatically based on theme.
- **`@20x20` variants** are for stripes (they're the right size and have proper padding).
- **Browse all 1,884 icons** at the live showcase `/icons` page — search, preview, and copy names.
- **Icons that don't exist** will render nothing (no error). Check the showcase if an icon seems missing.
