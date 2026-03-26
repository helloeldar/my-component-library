# Prototyping specs

## What a good prototype should have
- Link to the task / problem description
- User scenarios
- Design specs: used components, states shown

It should use the Prototype wrapper (see `ai/specs/Prototype Wrapper specs.md`).

`/prototyping-kit` — UI that supports prototyping (wrapper, controls, etc.)

---

## Prototyper onboarding resources

The following files at the repo root help prototypers get started:

| File | Purpose |
|---|---|
| `README.md` | Entry point — what the library is, quick start, links to all guides |
| `Component Customization Guide.md` | Main reference — how to customize every component |
| `ICONS.md` | Icon category reference — common icon names by category |
| `CHANGELOG.md` | What changed in each version |
| `templates/ide-basic.jsx` | Starter: single IDE window |
| `templates/welcome-to-ide.jsx` | Starter: Welcome screen → IDE two-screen flow |
| `templates/settings-flow.jsx` | Starter: IDE with Settings dialog trigger |

## Live showcase
Deployed to Vercel — browse all components, icons, and color tokens without installing anything.

## Installation
```bash
npm install @jetbrains/int-ui-kit
# or from git:
npm install git+https://github.com/helloeldar/my-component-library.git
```
