/**
 * Smart popup positioning: default bottom-right, flip left/top when no space.
 * Coordinates are viewport-relative (for position: fixed).
 *
 * @param {HTMLElement} popupEl - The wrapper element (position: fixed, opacity: 0 initially)
 * @param {{ top?: number, bottom?: number, left?: number, right?: number, x?: number, y?: number }} anchor - Trigger rect
 * @param {number} [gap=4] - Gap between anchor and popup in pixels
 */
export function positionPopup(popupEl, anchor, gap = 4) {
    if (!popupEl) return;
    // Measure the .popup child — position:absolute child doesn't contribute
    // to the wrapper's dimensions, so wrapper rect would be 0×0
    const popup = popupEl.querySelector('.popup') || popupEl;
    const popupRect = popup.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const anchorBottom = anchor.bottom ?? anchor.y;
    const anchorTop = anchor.top ?? anchor.y;
    const anchorLeft = anchor.left ?? anchor.x;
    const anchorRight = anchor.right ?? anchor.x;

    // Default: below anchor, left-aligned
    let top = anchorBottom + gap;
    let left = anchorLeft;

    // Flip up if no space below
    if (top + popupRect.height > vh) {
        top = anchorTop - gap - popupRect.height;
    }

    // Flip left if no space on right
    if (left + popupRect.width > vw) {
        left = anchorRight - popupRect.width;
    }

    popupEl.style.top = `${top}px`;
    popupEl.style.left = `${left}px`;
    popupEl.style.opacity = '1';
}
