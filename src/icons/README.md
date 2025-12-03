# Icons Directory Structure

This directory contains all SVG icons organized by theme and category.

## Directory Structure

```
src/icons/
├── light/          # Light theme variant icons
├── dark/           # Dark theme variant icons
├── components/     # Component-specific icons (theme-agnostic)
├── common/         # Icons that don't need theme variants
├── index.js        # Main export file for all icons
└── README.md       # This file
```

## Naming Convention

### Theme-aware icons
- Light theme: `light/icon-name.svg`
- Dark theme: `dark/icon-name.svg`

### Common icons (theme-agnostic)
- `common/icon-name.svg`

### Component-specific icons
- `components/component-name/icon-name.svg`

## Usage

Icons are exported from the main index.js file and can be used with the Icon component:

```jsx
import { Icon } from './icons';

<Icon name="icon-name" />
```

The Icon component automatically selects the appropriate theme variant based on the current theme context.
