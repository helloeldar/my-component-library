import React, { useRef, useLayoutEffect } from 'react';
import { positionPopup } from '../../utils/positionPopup';

/**
 * PositionedPopup — wraps any popup content and positions it relative to a trigger rect.
 *
 * Usage:
 *   <PositionedPopup triggerRect={btn.getBoundingClientRect()} onDismiss={() => setOpen(false)}>
 *     <Popup>...</Popup>
 *   </PositionedPopup>
 *
 * The wrapper is rendered as `position: fixed; opacity: 0` initially.
 * positionPopup() sets the final coordinates and flips to `opacity: 1` before paint.
 */
function PositionedPopup({ triggerRect, onDismiss, children, gap = 4 }) {
    const wrapperRef = useRef(null);

    useLayoutEffect(() => {
        if (wrapperRef.current && triggerRect) {
            positionPopup(wrapperRef.current, triggerRect, gap);
        }
    }, [triggerRect, gap]);

    return (
        <>
            {/* Transparent overlay catches outside clicks */}
            <div
                style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
                onMouseDown={onDismiss}
            />
            <div
                ref={wrapperRef}
                style={{ position: 'fixed', zIndex: 10000, opacity: 0 }}
            >
                {children}
            </div>
        </>
    );
}

export default PositionedPopup;
