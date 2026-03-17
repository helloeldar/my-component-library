# Home Page Specs

## Section Layout

The home page displays components grouped into themed sections instead of a flat alphabetical list.

Sections are rendered in the following order:

1. **Styles** — Typography, Colors
2. **Buttons** — Buttons, Toolbar Icon Button, Link
3. **Inputs** — Inputs, Checkbox, Radio Button, Search, Combobox, Toggle, Dropdown
4. **Feedback** — Banner, Alert, Balloon*
5. **Help** — Tooltip*, Help Text*, Empty State*
6. **Container** — Dialog, Popup, Tool Window
7. **Content filtering** — Tabs, Segmented Control
8. **Information** — Tree, Table
9. **Progress** — Progress Bar, Loader*
10. **App Kit** — Stripe, Code Example, Main Window, AI Assistant, Project, Terminal, Status Bar, Status Bar Breadcrumb, Toolbar, Toolbar Dropdown, Project Selector

Items marked with * are not yet developed.

## Component Status System

Each component entry in `componentsConfig` has a `status` field:

- `ready` — Component page exists. Card is clickable and links to the page.
- `coming-soon` — Component page does not exist yet. Card is visible but not clickable. Displays "Will be available soon" badge.
- `obsolete` — Component page exists but is deprecated. Card is clickable with an "Obsolete" badge.

## Image Previews

Each component entry has a `preview` field (string path or `null`).

- When `preview` is set (e.g., `"/previews/buttons.png"`), the image is shown at the top of the card.
- When `preview` is `null`, a placeholder background is shown.
- Preview area is horizontal (landscape), fixed height (160px), identical across all cards.
- Images use `object-fit: cover` to fill the space and crop when necessary.
- Preview assets are stored in `public/previews/`.

## Data Model

In `src/componentsConfig.js`, each entry has:

- `name` — Display name
- `key` — Route key (e.g., `buttons` → `/buttons`)
- `description` — Short description shown on the card
- `category` — Used by sidebar: `components` or `windows`
- `section` — Used by home page: `buttons`, `inputs`, `feedback`, `help`, `container`, `navigation`, `information`, `progress`, `appkit`
- `status` — `ready`, `coming-soon`, or `obsolete`
- `preview` — Path to preview image or `null`

## Sidebar

The sidebar is **not affected** by these changes. It continues to use the `category` field with its own flat alphabetical grouping (Styles, Components, Windows).
