# NPM Library Usage Specs

## Overview

This repo can be used as an **npm dependency** so that consumers can import JetBrains Int UI components into their own React projects to build IDE-like prototypes.

## How the Library Build Works

- **Entry point**: `src/lib/index.js` — re-exports all public components.
- **Styles entry**: `src/lib/styles.js` — imports all component CSS files (used by Rollup to produce a single `styles.css`).
- **Type declarations**: `src/lib/index.d.ts` — TypeScript typings for all exported components.
- **Bundler**: Rollup (`rollup.config.mjs`) produces:
  - `dist/cjs/index.js` — CommonJS bundle
  - `dist/esm/index.js` — ES Module bundle
  - `dist/esm/styles.css` (and `dist/cjs/styles.css`) — extracted CSS with all component styles and design tokens.
- **Build command**: `npm run build:lib`

## package.json Key Fields

| Field | Value | Purpose |
|---|---|---|
| `name` | `@jetbrains/int-ui-kit` | Scoped package name |
| `main` | `dist/cjs/index.js` | CommonJS entry (Node/Webpack) |
| `module` | `dist/esm/index.js` | ES Module entry (modern bundlers) |
| `types` | `src/lib/index.d.ts` | TypeScript declarations |
| `files` | `["dist", "src/lib/index.d.ts"]` | What gets published to npm |
| `exports` | See package.json | Node.js conditional exports |
| `peerDependencies` | `react` ^18 or ^19, `react-dom` ^18 or ^19 | Consumer must provide React |
| `sideEffects` | `["*.css"]` | Enables tree-shaking; CSS is side-effectful |

## How to Install in a Consumer Project

### Option A: Install from npm (after publishing)

```bash
npm install @jetbrains/int-ui-kit
```

### Option B: Install from local path (for development)

```bash
npm install ../path/to/int-ui-kit-library
```

### Option C: Install from Git repo

```bash
npm install git+https://github.com/user/int-ui-kit-library.git
```

> **Important**: For Options B and C, run `npm run build:lib` in this repo first so that the `dist/` folder exists.

## How to Use in Consumer Code

### 1. Import the stylesheet (once, at app root)

```jsx
// In your App.js or index.js
import '@jetbrains/int-ui-kit/styles.css';
```

### 2. Import and use components

```jsx
import { ThemeProvider, Button, Input, Tree, ToolWindow } from '@jetbrains/int-ui-kit';

function App() {
  return (
    <ThemeProvider>
      <Button type="primary">Click me</Button>
      <Input label="Name" placeholder="Enter name..." />
    </ThemeProvider>
  );
}
```

### 3. Use theme context

```jsx
import { useTheme } from '@jetbrains/int-ui-kit';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current: {theme}</button>;
}
```

### 4. Use icons

```jsx
import { Icon, getIcon, iconNames } from '@jetbrains/int-ui-kit';

// Use the Icon component
<Icon name="settings" size={16} />

// Or get available icon names
console.log(iconNames);
```

## Adding New Components to the Library

When a new component is created in the repo:

1. **Export it** from `src/lib/index.js`
2. **Import its CSS** in `src/lib/styles.js`
3. **Add TypeScript types** in `src/lib/index.d.ts`
4. **Rebuild** with `npm run build:lib`

## Publishing to npm

```bash
# Build the library
npm run build:lib

# Publish (requires npm login and org access)
npm publish --access public
```

---

## Keeping the Package Up to Date

### Problem

Currently, publishing is fully manual. Every time we change components, fix bugs, or add features, someone must remember to build, bump the version, and publish. This is error-prone — it's easy to forget a step or publish a broken build.

### Goal

Every merge to `main` that changes library code should automatically result in a new npm package version being published, with no manual steps required.

### Required Infrastructure

#### 1. Pre-publish Safety Script

A `prepublishOnly` script in `package.json` that runs build + tests before any publish, preventing broken packages from reaching npm.

```json
"prepublishOnly": "npm run build:lib"
```

#### 2. Automated Versioning

Use **semantic-release** to automatically determine the next version number based on commit message conventions:
- `fix:` commits → patch bump (0.1.0 → 0.1.1)
- `feat:` commits → minor bump (0.1.0 → 0.2.0)
- `BREAKING CHANGE:` → major bump (0.1.0 → 1.0.0)

This removes the need for manual `npm version` calls and generates changelogs automatically.

**Required config**: `.releaserc.json` at repo root.

#### 3. GitHub Actions CI/CD

Two workflows:

**a) CI — on every PR:**
- Install dependencies
- Run `npm run build:lib`
- Run `npm test` (when tests exist)
- Prevents broken code from merging

**b) Release — on push to `main`:**
- Install dependencies
- Build the library
- Run semantic-release (handles version bump + npm publish + GitHub release + changelog)

**Required files**: `.github/workflows/ci.yml`, `.github/workflows/release.yml`

#### 4. NPM Token as GitHub Secret

- Generate an npm access token (Automation type) from npmjs.com
- Store it as `NPM_TOKEN` in the GitHub repo's Settings → Secrets → Actions

#### 5. Commit Message Convention

Adopt [Conventional Commits](https://www.conventionalcommits.org/) so semantic-release can determine version bumps:
- `fix: correct button hover color` → patch
- `feat: add Dropdown component` → minor
- `feat!: redesign ThemeProvider API` → major
- `chore: update devDependencies` → no release

### What This Changes for Contributors

| Before | After |
|---|---|
| Manual `npm version` + `npm publish` | Automatic on merge to `main` |
| Easy to forget building before publish | `prepublishOnly` prevents it |
| No changelog | Auto-generated from commits |
| No CI checks on PRs | Build + test gate on every PR |
| Version in `package.json` updated by hand | Managed by semantic-release |

---

## Important Notes

- The `"private": true` flag was removed from `package.json` to allow npm publishing.
- React and ReactDOM are **peer dependencies** — they are NOT bundled into the library output. The consumer project must have React installed.
- The `dist/` folder is gitignored by default. Consumers installing from Git must build locally, or CI should build before publishing.
- All CSS is extracted into a single file — consumers import it once and get all component styles plus theming tokens.
