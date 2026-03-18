Task - Align color tokens with Figma colors

## Requirements (from user)

Current project generated colors on it's own.
But we have our color system in Figma design system.
Use it when possible.

Figma json files are here: /figma-exports
It contains Palette, Sematic Colors, and some component specific colors.
If you already use component tokens - continue, just replace values with tokens from our design system.

## Status: DONE

## What was done

### Problem discovered
The codebase had its own color system that diverged from the Figma design system in two key ways:
1. **Inverted naming convention**: Old CSS used 10=lightest→140=darkest (14 levels). Figma uses 10=darkest→160=lightest (16 levels per color).
2. **Different hex values**: Even at equivalent brightness levels, the hex values differed between the old CSS palette and Figma's palette.
3. **Different base color names**: Old CSS used `--gray-white`/`--gray-black`, Figma uses `--white`/`--black`.

### Changes made

1. **src/tokens/*.json** — Copied latest Figma exports from `/figma-exports` (only metadata `key` fields differed).

2. **src/ui/styles/Themes.css** — Complete rewrite:
   - `:root` palette replaced with Figma's 10–160 naming convention and hex values (8 color scales × 16 levels + white, black, transparent variants)
   - `.theme-light` semantic variables remapped to Figma palette references (layer-0=gray-150, layer-1=gray-160, layer-2=white)
   - `.theme-dark` semantic variables remapped to Figma palette references (layer-0=gray-10, layer-1=gray-30, layer-2=gray-40)
   - Toolbar hover/pressed states now use Figma's transparent tokens (`--transparent-black-20`, `--transparent-white-20`)
   - Editor syntax colors preserved (already matched Figma)

3. **src/ui/components/banner/Banner.css** — Updated direct palette references to use Figma feedback tokens.

4. **src/App.js** — Changed `var(--gray-white)` to `var(--white)`.

5. **src/ui/components/showcase/Colors.jsx** — Rewrote all color scale data to match Figma palette (16 levels, correct hex values, correct naming).

### Files verified (no changes needed)
- `src/ui/components/iconbutton/IconButton.css` — Uses only semantic variables
- `src/ui/components/showcase/MainToolbar.css` — Uses `--blue-70`/`--purple-70` which are valid in new palette

### Key Figma → CSS semantic mapping
- `layer/layer-0-bg` → `--bg-primary` (light: gray-150, dark: gray-10)
- `layer/layer-1-bg` → `--bg-secondary` (light: gray-160, dark: gray-30)
- `layer/layer-2-bg` → `--bg-tertiary` (light: gray-140, dark: gray-40)
- `container/popup-bg` → `--bg-elevated` (light: white, dark: gray-30)
- `text/text-default` → `--text-primary` (light: black, dark: gray-130)
- `selection/selection-bg-active` → `--selection-bg` (light: blue-140, dark: blue-50)
- `toolbar/toolbar-bg-hovered` → `--icon-button-hover-bg` (light: transparent-black-20, dark: transparent-white-20)