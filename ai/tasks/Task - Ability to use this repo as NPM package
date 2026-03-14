We need ability to give this UI Kit to other people, so they can create prototypes based on that.
But, they should not be able to change it, only use.
Also, when generating code, their AI should be able to read UI Guidelines, and generate design with it in context. 

---

## Status

### ✅ Requirement 1: Use as npm package
**Done.** Library builds via `npm run build:lib`, produces CJS + ESM bundles + CSS, installable as `@jetbrains/int-ui-kit`. 40 exports, 1903 icons, verified.

### ⚠️ Requirement 2: Read-only — consumers should not be able to change it, only use
**Partially addressed.** The `files` field in `package.json` limits what's published to npm (`dist/` and `src/lib/index.d.ts` only) — consumers don't get source code. However:
- No LICENSE file that explicitly restricts modification.
- If distributed via Git, consumers get the full source.

**TODO:**
- Add a restrictive license (e.g., proprietary EULA or "no derivatives" Creative Commons).

### ❌ Requirement 3: AI should be able to read UI Guidelines when generating code
**Not addressed.** The `ui-guidelines/` folder exists in the repo but is not included in the `files` field of `package.json`, so consumers installing via npm won't get it.

**TODO:**
- Include `ui-guidelines/` in the npm package `files` array, or create a condensed AI-friendly guidelines file.
- Consider bundling a `CLAUDE.md` / `.cursorrules` or similar file so AI coding assistants automatically pick up the guidelines.