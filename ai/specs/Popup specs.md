# Popup Specs

## Figma
- [Popup / Projects](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6445-76525&t=V8DOXcjhgUO6bzb3-4)
- [Popup / Branches](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=6451-81294&t=V8DOXcjhgUO6bzb3-4)

## Common popup behavior

- Only one popup can be open at a time — opening one closes the others
- Clicking outside any popup closes it (transparent fixed overlay catches clicks)
- Items with `iconGap` are auto-computed — if any item in the list has an icon, all non-icon items get a gap for alignment

## Popup positioning

Popups must render **above all layers** (use `position: fixed` with high `z-index`).

### Smart positioning logic

| Rule | Behavior |
|---|---|
| Default direction | Bottom-right — popup appears below the trigger, left edge aligned with trigger's left edge |
| No space on right | Flip to left — popup's right edge aligns with trigger's right edge |
| No space on bottom | Flip to top — popup appears above the trigger |
| Gap | 4px between the trigger element and the popup edge |
| Context menu (right-click) | Appears at cursor position, same flip logic, no gap |

### Trigger button state

- The clicked trigger button must keep a **"clicked" / active visual state** while its popup is open
- State is removed when the popup closes

### Implementation

- Popups use `position: fixed` and `z-index: 10000` to guarantee rendering above all layers
- Click-outside overlay uses `position: fixed` and `z-index: 9999`
- Trigger button rect is captured when the popup opens; a `useLayoutEffect` measures the popup and calculates final position before paint (no flash)
- The `positionPopup()` utility handles the flip logic for both button-triggered and cursor-triggered menus
- **Important:** Measure the inner `.popup` element, not the wrapper — `position: absolute` children don't contribute to the wrapper's dimensions

### Library Exports (for consumers)

| Export | Type | Location |
|---|---|---|
| `positionPopup(popupEl, anchor, gap?)` | function | `src/ui/utils/positionPopup.js` |
| `PositionedPopup` | React component | `src/ui/components/popup/PositionedPopup.jsx` |

**`positionPopup(popupEl, anchor, gap = 4)`** — imperative util. Pass a DOM element (wrapper, must start at `opacity: 0`) and an anchor rect; sets `top`, `left`, `opacity: 1`.

**`PositionedPopup`** — declarative wrapper. Props: `triggerRect`, `onDismiss`, `gap`, `children`. Calls `positionPopup` via `useLayoutEffect` and renders a fixed overlay for click-outside.

```jsx
const [open, setOpen] = useState(false);
const [rect, setRect] = useState(null);

<button onClick={e => { setRect(e.currentTarget.getBoundingClientRect()); setOpen(true); }}>
  Open
</button>

{open && (
  <PositionedPopup triggerRect={rect} onDismiss={() => setOpen(false)}>
    <Popup>...</Popup>
  </PositionedPopup>
)}
```

## PopupCell

### Selection vs hover width

- Selected state (`popup-cell-selected::before`) must use the **same width** as hover state
- Both use `left: 0; right: 0` (full cell width) with `border-radius: 4px`
