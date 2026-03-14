# Task: Update "Islands UI" Theme Colors

Previous theme was "New UI". Update colors to match "Islands UI".
Source of truth: `src/tokens/` (exported from Figma).

---

## Problem Summary

The color palette in `src/ui/styles/Themes.css` uses hex values from the old "New UI" theme. The Figma "Islands UI" tokens (exported to `src/tokens/`) have updated hex values that differ. Additionally:

1. **Numbering is inverted**: Figma uses descending (160=lightest, 10=darkest), code uses ascending (10=lightest, 140=darkest)
2. **Figma has 16 shade levels** per color family (10–160), code only has 14 (10–140) — need to add levels 150, 160
3. **Semantic variable references** (`.theme-dark`, `.theme-light`) must be updated because palette positions shift
4. **New semantic tokens** exist in Figma that are missing from code

---

## Step 1: Update Color Palette in `:root`

**File:** `src/ui/styles/Themes.css`, `:root` block

Update all hex values using positional mapping. Add 2 new levels (150, 160) per family.

### Mapping Rule

| Code Variable | ← Figma Source | Direction |
|--------------|----------------|-----------|
| `--{color}-10` | `{color}-160` | lightest |
| `--{color}-20` | `{color}-150` | |
| `--{color}-30` | `{color}-140` | |
| `--{color}-40` | `{color}-130` | |
| `--{color}-50` | `{color}-120` | |
| `--{color}-60` | `{color}-110` | |
| `--{color}-70` | `{color}-100` | |
| `--{color}-80` | `{color}-90`  | |
| `--{color}-90` | `{color}-80`  | |
| `--{color}-100`| `{color}-70`  | |
| `--{color}-110`| `{color}-60`  | |
| `--{color}-120`| `{color}-50`  | |
| `--{color}-130`| `{color}-40`  | |
| `--{color}-140`| `{color}-30`  | |
| `--{color}-150`| `{color}-20`  | **NEW** |
| `--{color}-160`| `{color}-10`  | **NEW** |

### Gray

| Code Var | Old Hex | ← Figma | New Hex | Changed? |
|----------|---------|---------|---------|----------|
| `--gray-white` | `#FFFFFF` | white | `#FFFFFF` | — |
| `--gray-10` | `#F7F6F8` | gray-160 | `#F7F8F9` | yes |
| `--gray-20` | `#EBEBED` | gray-150 | `#E9EAEE` | yes |
| `--gray-30` | `#E1E1E4` | gray-140 | `#DDDFE4` | yes |
| `--gray-40` | `#CFD0D4` | gray-130 | `#D1D3D9` | yes |
| `--gray-50` | `#B6B8BD` | gray-120 | `#C3C5CB` | yes |
| `--gray-60` | `#9C9FA6` | gray-110 | `#B5B7BD` | yes |
| `--gray-70` | `#81858D` | gray-100 | `#9FA2A8` | yes |
| `--gray-80` | `#6F737C` | gray-90  | `#8B8E94` | yes |
| `--gray-90` | `#5B5F68` | gray-80  | `#73767C` | yes |
| `--gray-100`| `#4C5158` | gray-70  | `#5F6269` | yes |
| `--gray-110`| `#3B3D42` | gray-60  | `#4C4F56` | yes |
| `--gray-120`| `#313337` | gray-50  | `#40434A` | yes |
| `--gray-130`| `#252629` | gray-40  | `#33353B` | yes |
| `--gray-140`| `#191A1C` | gray-30  | `#26282C` | yes |
| `--gray-150`| **(NEW)** | gray-20  | `#212326` | new |
| `--gray-160`| **(NEW)** | gray-10  | `#191A1C` | new |
| `--gray-black`| `#000000`| black   | `#000000` | — |

### Blue

| Code Var | Old Hex | ← Figma | New Hex |
|----------|---------|---------|---------|
| `--blue-10` | `#F5F6FE` | blue-160 | `#F7F8FF` |
| `--blue-20` | `#E5EBFC` | blue-150 | `#E3EBFE` |
| `--blue-30` | `#D5E0FA` | blue-140 | `#D0DFFE` |
| `--blue-40` | `#BDD0F8` | blue-130 | `#BDD3FF` |
| `--blue-50` | `#9AB9F5` | blue-120 | `#A7C5FF` |
| `--blue-60` | `#739EF2` | blue-110 | `#92B7FF` |
| `--blue-70` | `#4981F1` | blue-100 | `#71A1FE` |
| `--blue-80` | `#2D6CE9` | blue-90  | `#538AF9` |
| `--blue-90` | `#2E5BB5` | blue-80  | `#3871E1` |
| `--blue-100`| `#2C4E91` | blue-70  | `#2F5EB9` |
| `--blue-110`| `#263C69` | blue-60  | `#2E4D89` |
| `--blue-120`| `#213254` | blue-50  | `#2A4371` |
| `--blue-130`| `#1A263C` | blue-40  | `#233558` |
| `--blue-140`| `#131A28` | blue-30  | `#1B283F` |
| `--blue-150`| **(NEW)** | blue-20  | `#182337` |
| `--blue-160`| **(NEW)** | blue-10  | `#131A28` |

### Green

| Code Var | Old Hex | ← Figma | New Hex |
|----------|---------|---------|---------|
| `--green-10` | `#F3F8F1` | green-160 | `#F5FAF3` |
| `--green-20` | `#E2EFE3` | green-150 | `#E2EFE2` |
| `--green-30` | `#D1E6D4` | green-140 | `#CDE5D1` |
| `--green-40` | `#B8D8BE` | green-130 | `#BBDBC2` |
| `--green-50` | `#92C49F` | green-120 | `#A3CFAE` |
| `--green-60` | `#69AD7F` | green-110 | `#8EC39D` |
| `--green-70` | `#38965F` | green-100 | `#6DB083` |
| `--green-80` | `#25824F` | green-90  | `#4E9D6C` |
| `--green-90` | `#2A6B44` | green-80  | `#338555` |
| `--green-100`| `#29593B` | green-70  | `#2A6E47` |
| `--green-110`| `#24432E` | green-60  | `#29583C` |
| `--green-120`| `#203828` | green-50  | `#274B34` |
| `--green-130`| `#19291E` | green-40  | `#203B2A` |
| `--green-140`| `#121D15` | green-30  | `#192C20` |
| `--green-150`| **(NEW)** | green-20  | `#16261C` |
| `--green-160`| **(NEW)** | green-10  | `#111C15` |

### Red

| Code Var | Old Hex | ← Figma | New Hex |
|----------|---------|---------|---------|
| `--red-10` | `#FFF3F3` | red-160 | `#FFF6F5` |
| `--red-20` | `#FFE5E5` | red-150 | `#FFE5E5` |
| `--red-30` | `#FFD7D7` | red-140 | `#FFD6D6` |
| `--red-40` | `#FFC1C2` | red-130 | `#FFC4C5` |
| `--red-50` | `#FD9EA2` | red-120 | `#FFB0B2` |
| `--red-60` | `#F17B82` | red-110 | `#FF9B9F` |
| `--red-70` | `#E05663` | red-100 | `#F57E84` |
| `--red-80` | `#D03B4E` | red-90  | `#E4656E` |
| `--red-90` | `#A93542` | red-80  | `#C54E58` |
| `--red-100`| `#8B313A` | red-70  | `#A4414A` |
| `--red-110`| `#67292E` | red-60  | `#80383E` |
| `--red-120`| `#542427` | red-50  | `#6D3136` |
| `--red-130`| `#3D1C1D` | red-40  | `#56272B` |
| `--red-140`| `#2A1314` | red-30  | `#3F1E21` |
| `--red-150`| **(NEW)** | red-20  | `#371B1C` |
| `--red-160`| **(NEW)** | red-10  | `#291416` |

### Yellow

| Code Var | Old Hex | ← Figma | New Hex |
|----------|---------|---------|---------|
| `--yellow-10` | `#FFF6ED` | yellow-160 | `#FFF6E9` |
| `--yellow-20` | `#FAE9D7` | yellow-150 | `#FDE7C9` |
| `--yellow-30` | `#F4DDC2` | yellow-140 | `#FADBB3` |
| `--yellow-40` | `#EBCBA4` | yellow-130 | `#F4CD9A` |
| `--yellow-50` | `#DCB179` | yellow-120 | `#ECBC7B` |
| `--yellow-60` | `#CA954D` | yellow-110 | `#E4AD5F` |
| `--yellow-70` | `#B5781F` | yellow-100 | `#D59637` |
| `--yellow-80` | `#9D681A` | yellow-90  | `#C28013` |
| `--yellow-90` | `#7F571E` | yellow-80  | `#A56906` |
| `--yellow-100`| `#6A4A1E` | yellow-70  | `#875817` |
| `--yellow-110`| `#4F391B` | yellow-60  | `#694820` |
| `--yellow-120`| `#413018` | yellow-50  | `#583E21` |
| `--yellow-130`| `#302414` | yellow-40  | `#44321D` |
| `--yellow-140`| `#21180E` | yellow-30  | `#322517` |
| `--yellow-150`| **(NEW)** | yellow-20  | `#2C2115` |
| `--yellow-160`| **(NEW)** | yellow-10  | `#201810` |

### Orange

| Code Var | Old Hex | ← Figma | New Hex |
|----------|---------|---------|---------|
| `--orange-10` | `#FFF4EE` | orange-160 | `#FFF6F3` |
| `--orange-20` | `#FFE7DB` | orange-150 | `#FFE6DD` |
| `--orange-30` | `#FFD8C5` | orange-140 | `#FED6CA` |
| `--orange-40` | `#FFC3A9` | orange-130 | `#FBC7B7` |
| `--orange-50` | `#F7A480` | orange-120 | `#F5B6A1` |
| `--orange-60` | `#E98457` | orange-110 | `#EEA58E` |
| `--orange-70` | `#D6632E` | orange-100 | `#E18C71` |
| `--orange-80` | *(missing)* | orange-90  | `#CF7659` |
| `--orange-90` | `#BC4C16` | orange-80  | `#B45E43` |
| `--orange-100`| `#9D441A` | orange-70  | `#964E37` |
| `--orange-110`| `#833B1B` | orange-60  | `#77402F` |
| `--orange-120`| *(missing)* | orange-50  | `#643829` |
| `--orange-130`| `#612F19` | orange-40  | `#4F2C21` |
| `--orange-140`| `#4C2716` | orange-30  | `#3B2119` |
| `--orange-150`| `#3F2114` | orange-20  | `#331D16` |
| `--orange-160`| `#28150D` | orange-10  | `#261611` |

> **Note:** Current code uses non-standard numbering for orange (skips 80, 120 and uses 150, 160). Normalize to standard 10–160 range.

### Purple

| Code Var | Old Hex | ← Figma | New Hex |
|----------|---------|---------|---------|
| `--purple-10` | `#FBF6FE` | purple-160 | `#FAF6FE` |
| `--purple-20` | `#EEE8FD` | purple-150 | `#EDE8FD` |
| `--purple-30` | `#E4DDFC` | purple-140 | `#E2DBFC` |
| `--purple-40` | `#D5C9FB` | purple-130 | `#D6CDFB` |
| `--purple-50` | `#BEADF9` | purple-120 | `#C9BDFA` |
| `--purple-60` | `#A88EF8` | purple-110 | `#BBACF9` |
| `--purple-70` | `#946AF9` | purple-100 | `#A894F6` |
| `--purple-80` | *(missing)* | purple-90  | `#967BEF` |
| `--purple-90` | `#7F52E0` | purple-80  | `#8060DB` |
| `--purple-100`| `#6A4BB5` | purple-70  | `#6C4EBB` |
| `--purple-110`| `#584291` | purple-60  | `#574092` |
| `--purple-120`| *(missing)* | purple-50  | `#4A387B` |
| `--purple-130`| `#423468` | purple-40  | `#3A2D5F` |
| `--purple-140`| `#342B51` | purple-30  | `#2B2245` |
| `--purple-150`| `#2B2442` | purple-20  | `#261E3C` |
| `--purple-160`| `#1B1728` | purple-10  | `#1C172B` |

> **Note:** Current code uses non-standard numbering for purple (skips 80, 120 and uses 150, 160). Normalize to standard 10–160 range.

### Teal

| Code Var | Old Hex | ← Figma | New Hex |
|----------|---------|---------|---------|
| `--teal-10` | `#F3F8F6` | teal-160 | `#F5F9F8` |
| `--teal-20` | `#E2EEEC` | teal-150 | `#E1EEEC` |
| `--teal-30` | `#D0E5E2` | teal-140 | `#CDE4E0` |
| `--teal-40` | `#B7D7D2` | teal-130 | `#B9D9D4` |
| `--teal-50` | `#90C2BC` | teal-120 | `#A2CDC7` |
| `--teal-60` | `#63ABA4` | teal-110 | `#8CC1BA` |
| `--teal-70` | `#28938C` | teal-100 | `#6AAEA6` |
| `--teal-80` | *(missing)* | teal-90  | `#4B9B93` |
| `--teal-90` | `#1C7B75` | teal-80  | `#31827B` |
| `--teal-100`| `#256964` | teal-70  | `#2A6C67` |
| `--teal-110`| `#265854` | teal-60  | `#285653` |
| `--teal-120`| *(missing)* | teal-50  | `#244A46` |
| `--teal-130`| `#23423F` | teal-40  | `#1E3A38` |
| `--teal-140`| `#1E3533` | teal-30  | `#182B2A` |
| `--teal-150`| `#1B2C2B` | teal-20  | `#152624` |
| `--teal-160`| `#121C1A` | teal-10  | `#111C1B` |

> **Note:** Current code uses non-standard numbering for teal (skips 80, 120 and uses 150, 160). Normalize to standard 10–160 range.

### Transparent Colors (NEW — add to `:root`)

```css
/* Transparent White */
--transparent-white-10: #FFFFFF12;
--transparent-white-20: #FFFFFF17;
--transparent-white-30: #FFFFFF21;
--transparent-white-40: #FFFFFF29;
--transparent-white-50: #FFFFFF3B;

/* Transparent Black */
--transparent-black-10: #00000008;
--transparent-black-20: #00000012;
--transparent-black-30: #0000001F;
--transparent-black-40: #00000024;
--transparent-black-50: #00000042;
```

---

## Step 2: Update Dark Theme Semantic Variables

**File:** `src/ui/styles/Themes.css`, `.theme-dark` block

After palette hex values change, every semantic variable that uses `var(--gray-N)` may now resolve to a different color. We must re-map each semantic variable by tracing the Figma semantic token chain:

```
Figma semantic token → (optional Figma intermediate) → Color palette:{color}-N → Code var(--{color}-M)
```

### Figma-to-Code Palette Name Conversion

When the Figma semantic JSON says `"$alias": "Color palette:gray-130"`, convert using:

| Figma palette name | Code variable name |
|---|---|
| gray-160 | `--gray-10` |
| gray-150 | `--gray-20` |
| gray-140 | `--gray-30` |
| gray-130 | `--gray-40` |
| gray-120 | `--gray-50` |
| gray-110 | `--gray-60` |
| gray-100 | `--gray-70` |
| gray-90  | `--gray-80` |
| gray-80  | `--gray-90` |
| gray-70  | `--gray-100` |
| gray-60  | `--gray-110` |
| gray-50  | `--gray-120` |
| gray-40  | `--gray-130` |
| gray-30  | `--gray-140` |
| gray-20  | `--gray-150` |
| gray-10  | `--gray-160` |

Same pattern applies to all color families (blue, green, red, etc.).

### Key Dark Theme Semantic Changes

Resolved from `src/tokens/Int UI Kit  Islands. Semantic colors.json`:

#### Backgrounds

| CSS Variable | Current | Figma Chain (Dark) | New |
|---|---|---|---|
| `--bg-primary` | `var(--gray-140)` | layer-0-bg → gray-10 | `var(--gray-160)` |
| `--bg-elevated` | `var(--gray-130)` | layer-1-bg → gray-30 | `var(--gray-140)` |
| `--bg-secondary` | `var(--gray-110)` | layer-2-bg → gray-40 | `var(--gray-130)` |
| `--bg-tertiary` | `var(--gray-120)` | (review needed) | TBD |

#### Text

| CSS Variable | Current | Figma Chain (Dark) | New |
|---|---|---|---|
| `--text-primary` | `var(--gray-30)` | text-default → gray-130 | `var(--gray-40)` |
| `--text-secondary` | `var(--gray-80)` | text-secondary → gray-80 | `var(--gray-90)` |
| `--text-muted` | `var(--gray-60)` | text-muted → gray-100 | `var(--gray-70)` |
| `--text-disabled` | `var(--gray-90)` | text-disabled → gray-60 | `var(--gray-110)` |

#### Borders

| CSS Variable | Current | Figma Chain (Dark) | New |
|---|---|---|---|
| `--border-primary` | `var(--gray-130)` | layer-0-border → gray-30 | `var(--gray-140)` |
| `--border-secondary` | `var(--gray-100)` | (review from Figma) | TBD |
| `--border-control` | `var(--gray-100)` | (review from Figma) | TBD |

#### Tool Windows

| CSS Variable | Current | Figma Chain (Dark) | New |
|---|---|---|---|
| `--tool-window-bg` | `#191A1C` | tool-window-bg → layer-0 → gray-10 | `var(--gray-160)` |
| `--tool-window-header-bg` | `var(--bg-secondary)` | (resolve via Figma) | TBD |

#### Island Layout

| CSS Variable | Current | Figma Chain (Dark) | New |
|---|---|---|---|
| `--island-bg` | `#2B2D30` | main-window-bg → layer-1 → gray-30 | `var(--gray-140)` |
| `--island-editor-bg` | `#17181A` | editor-bg → layer-0 → gray-10 | `var(--gray-160)` |

> **Process:** For every semantic variable in `.theme-dark`, read its Figma semantic alias chain from the token JSON, resolve to a palette color, convert to code variable name. Variables marked TBD need full resolution from the semantic token file during implementation.

### New Semantic Variables to Add

From Figma tokens not present in code:

```css
/* Layer System */
--layer-0-bg: var(--gray-160);       /* Dark: gray-10 */
--layer-0-border: var(--gray-140);   /* Dark: gray-30 */
--layer-1-bg: var(--gray-140);       /* Dark: gray-30 */
--layer-1-border: var(--gray-130);   /* Dark: gray-40 */
--layer-2-bg: var(--gray-130);       /* Dark: gray-40 */
--layer-2-border: ...;               /* resolve from Figma */

/* Containers */
--main-window-bg: var(--layer-1-bg);
--main-window-border: var(--layer-1-border);
--editor-bg: var(--layer-0-bg);
--editor-border: var(--layer-0-border);
--dialog-bg: var(--layer-1-bg);
--dialog-border: var(--layer-1-border);

/* Toolbar */
--toolbar-bg-hovered: ...;   /* resolve: core-bg-transparent-hovered */
--toolbar-bg-pressed: ...;   /* resolve: core-bg-transparent-pressed */

/* Shadow Definitions */
--shadow-main-window: 0 4px 30px #00000040;
--shadow-popup: ...;
--shadow-dialog: ...;
--shadow-notification: ...;

/* Scrollbar */
--scrollbar-bg: ...;
--scrollbar-bg-hovered: ...;

/* Toggle */
--toggle-off-bg: ...;
--toggle-button-bg: ...;
--toggle-border: ...;
```

---

## Step 3: Update Light Theme Semantic Variables

**File:** `src/ui/styles/Themes.css`, `.theme-light` block

Same approach as Step 2, using "Light" mode values from the Figma semantic colors JSON.

Key differences in Light theme:
- layer-0-bg → gray-150 (code: `var(--gray-20)`)
- layer-1-bg → gray-160 (code: `var(--gray-10)`)
- layer-2-bg → white (code: `var(--gray-white)`)
- text-default → black
- main-window-bg → layer-0-bg
- editor-bg → layer-2-bg

---

## Step 4: Replace Hardcoded Hex Values in Component CSS

**Already partially done:** `IDELayout.css` now uses `var(--island-bg)`, `var(--island-editor-bg)`, etc.

**Remaining:** Update the island-* variable values in `.theme-dark` to use proper palette references (Step 2 handles this).

Search all CSS files for remaining hardcoded hex values in `.theme-dark`/`.theme-light` that should reference palette variables. Known ones:
- `--icon-button-hover-bg: #393B40` → verify against new palette
- `--stripe-selected-bg: #3574F0` → verify against new palette
- `--search-bg: #2B2D30` → should become `var(--main-window-bg)` or palette ref
- Various segmented-control, table hex values

---

## Step 5: Update IDELayout.jsx Default State

**File:** `src/ui/components/idelayout/IDELayout.jsx`

The Figma mockup shows no right tool window open by default in Islands theme. Update the default `showRightPanel` for island theme from `true` to `false`.

---

## Files Modified

| File | Scope |
|------|-------|
| `src/ui/styles/Themes.css` | **Major**: palette hex values, semantic vars, new tokens |
| `src/ui/components/idelayout/IDELayout.jsx` | Minor: default panel state |

## Source of Truth (read-only)

| File | Contains |
|------|----------|
| `src/tokens/Int UI Kit  Islands. Color palette.json` | Base palette hex values |
| `src/tokens/Int UI Kit  Islands. Semantic colors.json` | Semantic token aliases (Dark + Light modes) |
| `src/tokens/Int UI Kit  Islands. Spacing and arcs.json` | Spacing scale, border-radius values |

## Verification

1. Run the app → navigate to Main Window (Islands theme)
2. Visual comparison with Figma screenshot (dark theme)
3. Toggle to light theme → verify no regressions
4. Check other component pages (Alert, Checkbox, Dropdown, etc.) still look correct
5. Compare via Figma MCP screenshot tool

## Risk

- **Global impact**: Changing palette hex values affects ALL components using those variables
- **Mitigation**: Update semantic references simultaneously so resolved colors are correct
- **Testing**: Visual regression check on all component showcase pages after changes
