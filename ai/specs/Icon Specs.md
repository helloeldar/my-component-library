# Icons Specs

## RULE: Never Create Custom Icons
- **NEVER** write custom inline SVG icons or create new `.svg` files.
- **Always** search `src/icons/` first (use Glob `src/icons/**/*.svg` or search by keyword).
- If a needed icon does not exist in the project, **STOP and ask the user** what to do. Do not invent a substitute.
- Use the `Icon` component (`src/ui/components/icon/Icon.jsx`) to render all icons. It handles dark/light theme automatically.

## How to Use Icons
```jsx
import Icon from '../icon/Icon';

// Renders status/error.svg (light) or status/error_dark.svg (dark) automatically
<Icon name="status/error" size={16} />
```

## Available Status Icons
Located in `src/icons/status/`:
| Name | Light file | Dark file | Description |
|---|---|---|---|
| `status/error` | `error.svg` | `error_dark.svg` | Red circle with ! |
| `status/warning` | `warning.svg` | `warning_dark.svg` | Yellow triangle with ! |
| `status/success` | `success.svg` | `success_dark.svg` | Green circle with ✓ |
| `status/info` | `info.svg` | `info_dark.svg` | Blue circle with i |
| `status/errorOutline` | `errorOutline.svg` | `errorOutline_dark.svg` | Outlined error |
| `status/infoOutline` | `infoOutline.svg` | `infoOutline_dark.svg` | Outlined info |
| `status/warningOutline` | `warningOutline.svg` | `warningOutline_dark.svg` | Outlined warning |

## Icon Naming Conventions
- Filenames must not have leading or trailing spaces.
- Filenames should follow the standard naming: `iconName.svg` or `iconName@20x20.svg`.
- Dark variants should use the `_dark.svg` suffix, e.g., `iconName_dark.svg` or `iconName@20x20_dark.svg`.

## Stripe Icons
- Stripes always use **20×20** icons. Use the `@20x20` suffix in icon paths, e.g. `toolwindows/project@20x20`.
- This is the standard size for all tool window stripe buttons in JetBrains IDEs.

## Main Toolbar Icons
- Main toolbar icon buttons must use the **`variant="mainToolbar"`** prop on `ToolbarIconButton`.
- This variant renders a **30×30** button container with **20×20** icons (vs the default 26×26 / 16×16).
- Use the `@20x20` icon suffix when available, e.g. `general/search@20x20`.
- If a 20×20 variant does not exist for a given icon, the default (16×16) SVG is scaled to 20px by the component.

## Default Toolbar Icons
- Regular toolbars (tool windows, dialogs, etc.) use the default `ToolbarIconButton` with **16×16** icons inside a **26×26** button.

## Adding Missing Icons from JetBrains Source
When an icon doesn't exist in `src/icons/`, source it from the official JetBrains repository before asking the user to create custom SVGs.

**Official source:** `https://github.com/JetBrains/intellij-community`

**Process:**
1. Browse via GitHub API: `https://api.github.com/repos/JetBrains/intellij-community/contents/<path>`
2. For file type icons: check `platform/icons/src/fileTypes/` or plugin-specific paths (e.g. `plugins/markdown/core/resources/icons/expui/`)
3. Download both `iconName.svg` and `iconName_dark.svg` to the appropriate `src/icons/` subfolder
4. Add import lines to `src/lib/iconRegistry.js` (maintain alphabetical order)
5. Add registry map entries in the same file
6. Run `npm run build:lib` to rebuild

**Example — markdown icon sourcing (2026-03-26):**
- Found at: `plugins/markdown/core/resources/icons/expui/markdown.svg`
- Not in the root `fileTypes/` folder — was in the plugin's `expui/` subdirectory
- Placed in: `src/icons/fileTypes/markdown.svg` + `markdown_dark.svg`

## Animated Loader Component
The `Loader` component exists and is exported from the library:
- File: `src/ui/components/loader/Loader.jsx`
- Uses `Icon name="loader"` with CSS spin animation
- Props: `size` (16 | 32 | 'small' | 'large', default 16), `className`
- Usage: `import { Loader } from '@jetbrains/int-ui-kit'; <Loader size={16} />`
