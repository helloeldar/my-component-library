# Interaction Specs

Global interaction rules that apply to **all** components.

---

## Focus Ring — Keyboard Only

Focus rings must only appear during **keyboard navigation** (Tab / Shift+Tab), never on mouse click.

### Rule
- Use CSS `:focus-visible` for focus rings — NOT plain `:focus`
- `:focus-visible` automatically suppresses the ring on mouse click; browsers apply it only when keyboard is detected
- Never use JavaScript `isFocused` state driven by `onFocus`/`onBlur` to control focus ring visibility — it fires on mouse clicks too

### Exceptions
- `<input type="text">`, `<textarea>`, and other text-input elements: `:focus` is acceptable (users need to know where they are typing, even on mouse click)

### Implementation pattern
**Buttons, Checkboxes, Radios, Toggles, Badges, Icon Buttons:**
```css
/* Wrong — shows ring on mouse click */
.my-component:focus { outline: 2px solid ... }

/* Correct — keyboard only */
.my-component:focus-visible { outline: 2px solid ... }
/* Also suppress the browser default on mouse click: */
.my-component:focus { outline: none; }
.my-component:focus-visible { outline: 2px solid var(--control-focus-border-brand); }
```

**Checkbox / Radio (hidden `<input>` + visible custom element):**
Use CSS sibling selector — the hidden input receives `:focus-visible`, and the sibling visual element shows the ring:
```css
/* Checkbox */
.checkbox-input:focus-visible + .checkbox-box:not(.checkbox-disabled)::after {
    content: '';
    position: absolute;
    inset: -4px;
    border: 2px solid var(--control-focus-border-brand);
    border-radius: 6px;
    pointer-events: none;
}

/* Radio */
.radio-input:focus-visible + .radio-circle:not(.radio-disabled)::after {
    content: '';
    position: absolute;
    inset: -4px;
    border: 2px solid var(--control-focus-border-brand);
    border-radius: 50%;
    pointer-events: none;
}
```

### Components updated
| Component | Method | Status |
|-----------|--------|--------|
| `Checkbox` | CSS `:focus-visible` sibling selector (removed JS `isFocused` state) | ✅ |
| `Radio` | CSS `:focus-visible` sibling selector (removed JS `isFocused` state) | ✅ |
| `Button` | Already uses `:focus-visible` | ✅ |
| `Toggle` | Already uses `:focus-visible` | ✅ |
| `Badge` | Already uses `:focus-visible` | ✅ |
| `ToolbarIconButton` | Suppresses all outline (mouse-driven, acceptable) | ✅ |
| `Stripe` | Suppresses all outline (mouse-driven, acceptable) | ✅ |
| `RunWidget button` | Changed from `:focus` → `:focus-visible` | ✅ |
| `Input` / `Textarea` | Keeps `:focus` (text inputs always need visible focus) | ✅ |

---

## VCS Status Text Colors

When displaying git file change status in text (e.g. commit window summary):

| Status | Color variable | Example |
|--------|---------------|---------|
| `modified` | `--text-link` (blue) | `2 modified` |
| `added` | `--vcs-added-text` (green) | `1 added` |
| `deleted` | `--vcs-deleted-text` (red) | `1 deleted` |

CSS variables defined in `Themes.css` per theme:
- Light: `--vcs-added-text: var(--green-70)` · `--vcs-deleted-text: var(--red-80)`
- Dark: `--vcs-added-text: var(--green-100)` · `--vcs-deleted-text: var(--red-90)`
