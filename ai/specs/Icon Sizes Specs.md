# Icon Sizes

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
