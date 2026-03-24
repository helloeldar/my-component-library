# NPM Package Update Process

## Problem

When we change something in the library (add a component, fix a bug, update styles), the consuming repo doesn't see the changes automatically. Currently every step is manual and error-prone:

1. Forgetting to rebuild `dist/` after code changes
2. Forgetting to add TypeScript types in `index.d.ts` for new components
3. Forgetting to export new components from `src/lib/index.js`
4. Consumer repo not reinstalling after library changes
5. No validation that exports, types, and built files are in sync

## Current Manual Process (What You Must Do Today)

### Step-by-step checklist

When you change anything in the library:

```
1. Code change (component, CSS, icon, etc.)
        ↓
2. Export from src/lib/index.js         ← if new component
        ↓
3. Add types to src/lib/index.d.ts     ← if new component
        ↓
4. Run: npm run build:lib              ← ALWAYS after any change
        ↓
5. Commit dist/ changes                ← so git-installed consumers get it
        ↓
6. In consumer repo: npm install       ← reinstall to pick up changes
```

### What each step does

| Step | What happens | If you skip it |
|------|-------------|----------------|
| Export from `index.js` | Component becomes importable | `import { X } from '@jetbrains/int-ui-kit'` fails at runtime |
| Add types to `index.d.ts` | TypeScript/IDE sees the component | IDE shows "module has no exported member 'X'" |
| `npm run build:lib` | Rollup bundles JS + CSS into `dist/` | Consumer gets stale code |
| Commit `dist/` | Git-based installs get the built files | `npm install git+...` gets old version |
| `npm install` in consumer | Consumer's `node_modules` updates | Consumer uses cached old version |

### How consumers install (determines what they need to do)

| Install method | Consumer update command |
|---|---|
| `npm install ../path/to/int-ui-kit-library` (local path) | `npm install ../path/to/int-ui-kit-library` again |
| `npm install git+https://github.com/...` (git) | `npm install git+https://github.com/...` again (or `npm update`) |
| `npm install @jetbrains/int-ui-kit` (npm registry) | `npm update @jetbrains/int-ui-kit` (after we publish) |

## Automation Plan

### Level 1: Safety nets (implement now, zero infrastructure needed)

#### 1a. `prepublishOnly` script — prevent broken publishes

Add to `package.json`:
```json
"prepublishOnly": "npm run build:lib"
```
This runs `build:lib` automatically before `npm publish`, so you can never publish stale dist files.

#### 1b. Validation script — catch missing exports/types

A script that compares `src/lib/index.js` exports with `src/lib/index.d.ts` declarations and flags mismatches.

Add to `package.json`:
```json
"validate:exports": "node scripts/validateExports.js"
```

What it checks:
- Every `export` in `index.js` has a matching declaration in `index.d.ts`
- Every component CSS is imported in the build
- `dist/` files exist and are not stale (newer than source)

#### 1c. Auto-generate `index.d.ts` from component source

Instead of manually maintaining `index.d.ts`, generate it from `index.js` exports + component prop types. This eliminates the "forgot to add types" problem entirely.

### Level 2: Git hooks (implement soon, no CI needed)

#### 2a. Pre-commit hook — auto-rebuild dist

Using [husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged):

```bash
npm install -D husky lint-staged
npx husky init
```

Hook: if any file in `src/` changed, run `npm run build:lib` and stage the `dist/` changes.

This means: every commit that touches source code automatically includes the rebuilt dist files. Consumer repos installing from git always get a working build.

#### 2b. Pre-push hook — validate exports

Before pushing, run the validation script to catch missing types or exports.

### Level 3: CI/CD (implement when ready, needs GitHub setup)

#### 3a. GitHub Actions — CI on every PR

`.github/workflows/ci.yml`:
- Install deps
- Run `npm run build:lib`
- Run `npm run validate:exports`
- Run tests (when they exist)
- Blocks merge if anything fails

#### 3b. GitHub Actions — auto-publish on merge to main

`.github/workflows/release.yml`:
- Uses [semantic-release](https://github.com/semantic-release/semantic-release)
- Reads commit messages to determine version bump:
  - `fix:` → patch (0.1.0 → 0.1.1)
  - `feat:` → minor (0.1.0 → 0.2.0)
  - `feat!:` or `BREAKING CHANGE:` → major (0.1.0 → 1.0.0)
- Automatically: bumps version, builds, publishes to npm, creates GitHub release with changelog
- Requires: `NPM_TOKEN` secret in GitHub repo settings

### Level 4: Link-based development (best DX for local development)

#### `npm link` for instant updates during development

Instead of reinstalling after every change:

```bash
# In this library repo (once):
npm link

# In consumer repo (once):
npm link @jetbrains/int-ui-kit
```

Now the consumer's `node_modules/@jetbrains/int-ui-kit` is a symlink to this repo. After running `npm run build:lib`, the consumer immediately sees changes — no reinstall needed.

Downside: `npm link` breaks on `npm install` (must re-link).

#### File watcher for auto-rebuild

Add a watch mode:
```json
"watch:lib": "rollup -c rollup.config.mjs --watch"
```

With `npm link` + `watch:lib`, every save in the library auto-rebuilds, and the consumer picks it up instantly (with hot reload).

## Recommendation

**Do now (5 minutes):**
1. Add `"prepublishOnly": "npm run build:lib"` to `package.json`
2. Run `npm run build:lib` to update dist with latest changes
3. Use `npm link` for local development with the consumer repo

**Do soon (30 minutes):**
4. Create the `validate:exports` script
5. Set up husky pre-commit hook to auto-rebuild

**Do later (when publishing to npm registry):**
6. Set up GitHub Actions CI/CD with semantic-release

## Current Known Issues

- `src/lib/index.d.ts` is missing type declarations for many components that are exported from `index.js` (Badge, Banner, Search, SegmentedControl, Alert, Table, Loader, Link, Dialog family, Tooltip family, Notification, Editor, WelcomeDialog, CommitWindow, ProblemsWindow, PopupProjects, PopupBranches, PopupFindInFiles, and more)
- `dist/` files in git are outdated compared to current source (need `npm run build:lib`)
- No `prepublishOnly` script — easy to publish broken package
