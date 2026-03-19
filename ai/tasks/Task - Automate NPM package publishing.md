# Task: Automate NPM Package Publishing

## User Request

> What we need to do to keep npm package library always up to date with latest changes?

## Requirements (from user)

- The npm package `@jetbrains/int-ui-kit` should stay in sync with the latest code on `main`
- Publishing should be automatic — no manual steps after merging

## Current State

- Package is at version `0.1.0`, never published to npm yet
- Build works via `npm run build:lib` (Rollup → CJS + ESM + CSS)
- Publishing is fully manual: no CI, no versioning tool, no pre-publish checks
- No GitHub Actions workflows exist
- `.npmrc` only contains `legacy-peer-deps=true`

## Plan

### Task 1: Add `prepublishOnly` script to `package.json`
**What**: Add `"prepublishOnly": "npm run build:lib"` to scripts.
**Why**: Prevents publishing without building first. Safety net for both manual and automated flows.
**Files**: `package.json`

### Task 2: Set up semantic-release
**What**: Install `semantic-release` and its plugins, create `.releaserc.json` config.
**Why**: Automates version bumping, changelog generation, npm publishing, and GitHub releases based on commit messages.
**Files**:
- `package.json` (new devDependencies)
- `.releaserc.json` (new file)

**Config outline**:
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version}"
    }]
  ]
}
```

**Packages to install**:
- `semantic-release`
- `@semantic-release/changelog`
- `@semantic-release/git`
- `@semantic-release/github` (usually included)

### Task 3: Create GitHub Actions CI workflow
**What**: `.github/workflows/ci.yml` — runs on every PR to `main`.
**Why**: Catches build/test failures before they reach `main`.
**Steps**:
1. Checkout code
2. Setup Node.js (LTS)
3. `npm ci`
4. `npm run build:lib`
5. `npm test` (when tests are ready)

### Task 4: Create GitHub Actions Release workflow
**What**: `.github/workflows/release.yml` — runs on push to `main`.
**Why**: Triggers semantic-release, which handles version bump + npm publish + GitHub release.
**Steps**:
1. Checkout code
2. Setup Node.js (LTS)
3. `npm ci`
4. `npm run build:lib`
5. `npx semantic-release`

**Required secrets**: `NPM_TOKEN` (npm Automation token, stored in GitHub repo settings)

### Task 5: Store NPM_TOKEN in GitHub
**What**: Generate an npm access token and add it as a GitHub Actions secret.
**Why**: Required for CI to publish to npm.
**Manual step** — must be done by repo owner in:
- npmjs.com → Access Tokens → Generate (Automation type)
- GitHub → Repo Settings → Secrets and variables → Actions → New secret: `NPM_TOKEN`

### Task 6: Adopt Conventional Commits
**What**: Start using commit message convention (`fix:`, `feat:`, `chore:`, etc.).
**Why**: semantic-release reads commit messages to decide version bumps.
**Optional tooling**: `commitlint` + `husky` for enforcing the convention locally.

---

## Progress

| # | Task | Status |
|---|---|---|
| 1 | Add `prepublishOnly` script | ⬜ Not started |
| 2 | Set up semantic-release | ⬜ Not started |
| 3 | Create CI workflow (PR checks) | ⬜ Not started |
| 4 | Create Release workflow (auto-publish) | ⬜ Not started |
| 5 | Store NPM_TOKEN in GitHub | ⬜ Not started (manual) |
| 6 | Adopt Conventional Commits | ⬜ Not started |

## Notes

- Tasks 1–4 can be implemented as code changes in this repo
- Task 5 is a manual step that requires npmjs.com + GitHub access
- Task 6 is a process change; tooling enforcement is optional
- See full spec: `ai/specs/NPM Library Usage Specs.md` → "Keeping the Package Up to Date"
