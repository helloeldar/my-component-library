# Task: Add fileTypes/markdown icon and document Loader component

## Goal
Consumer prototype requested two things missing from the library:
1. A `fileTypes/markdown` icon (so they can stop using the fallback `fileTypes/text`)
2. An animated loader component

## Requirements
- Add `fileTypes/markdown` and `fileTypes/markdown_dark` icons to the icon set
- Source icons from official JetBrains repository (no custom SVGs)
- Document that `Loader` animated component already exists and is exported

## Plan
1. Source markdown SVGs from JetBrains/intellij-community GitHub repo
2. Add imports to `iconRegistry.js`
3. Rebuild the library
4. Document findings

## Progress
- 2026-03-26: Found markdown icons at `plugins/markdown/core/resources/icons/expui/` in JetBrains/intellij-community
- 2026-03-26: Downloaded `markdown.svg` and `markdown_dark.svg` to `src/icons/fileTypes/`
- 2026-03-26: Added imports and registry entries to `iconRegistry.js` (alphabetical between manifest and microsoftWindows)
- 2026-03-26: Rebuilt library — both `dist/cjs` and `dist/esm` updated successfully (1886 SVG icons total)

## Results
- `fileTypes/markdown` icon is now available in the library
- Consumer prototype can switch from `fileTypes/text` to `fileTypes/markdown`
- `Loader` component already exists at `src/ui/components/loader/Loader.jsx`, is exported, and is animated with CSS spin
  - Usage: `<Loader size={16} />` or `<Loader size={32} />`
  - Props: `size` (16 | 32 | 'small' | 'large'), `className`
