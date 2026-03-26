# Planned: Icon Fetcher Script

## Goal
Make adding missing IntelliJ icons a one-liner instead of manual GitHub API navigation.

## Background
IntelliJ IDE icons (fileTypes, toolwindows, etc.) live in `JetBrains/intellij-community` on GitHub.
They are NOT in the `@jetbrains/icons` npm package (that's for Ring UI web icons — different set).

When adding the `fileTypes/markdown` icon, we had to manually browse the GitHub API across several directories before finding it at `plugins/markdown/core/resources/icons/expui/`.

## What to Build
A script `scripts/fetch-icon.js` that accepts an icon path and does all the work automatically.

### Usage
```bash
node scripts/fetch-icon.js fileTypes/markdown
```

### What it should do
1. Given an icon name like `fileTypes/markdown`, try a list of known candidate paths in `intellij-community`:
   - `platform/icons/src/fileTypes/markdown.svg`
   - `platform/icons/src/expui/fileTypes/markdown.svg`
   - Scan plugin directories for `expui/` subfolders containing the icon
2. Download both `markdown.svg` and `markdown_dark.svg`
3. Place them in the correct `src/icons/<category>/` subfolder
4. Print a ready-to-paste snippet for adding the imports to `iconRegistry.js`

### Nice to have
- Dry-run mode (`--dry-run`) to preview what would be downloaded
- Auto-insert into `iconRegistry.js` (maintaining alphabetical order)
- Cache known icon locations to avoid repeated API calls
