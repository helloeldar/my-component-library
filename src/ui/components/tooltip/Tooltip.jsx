import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';
import '../../styles/Typography.css';

/**
 * Tooltip - Contextual popup that appears on hover to provide additional information.
 * Matches Figma "Tooltip / Tooltip" component (node 55:9038).
 *
 * @param {React.ReactNode} children - The element that triggers the tooltip
 * @param {string} text - Tooltip text content
 * @param {string} shortcut - Optional keyboard shortcut to display
 * @param {string} placement - Tooltip placement: 'top' | 'bottom' | 'left' | 'right' (default: 'bottom')
 * @param {number} delay - Hover delay in ms before showing (default: 500)
 * @param {string} className - Additional CSS classes
 */
function Tooltip({
    children,
    text,
    shortcut,
    placement = 'bottom',
    delay = 500,
    className = '',
    ...props
}) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    const updatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const gap = 4;

        let top = 0;
        let left = 0;

        switch (placement) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - gap;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = triggerRect.bottom + gap;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - gap;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + gap;
                break;
            default:
                top = triggerRect.bottom + gap;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        }

        setPosition({ top, left });
    };

    useEffect(() => {
        if (visible) {
            updatePosition();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setVisible(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (!text && !shortcut) {
        return children;
    }

    return (
        <span
            className="tooltip-trigger"
            ref={triggerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
            {visible && (
                <div
                    className={`tooltip tooltip-${placement} ${className}`}
                    ref={tooltipRef}
                    style={{ top: position.top, left: position.left }}
                >
                    <span className="tooltip-text text-ui-small">{text}</span>
                    {shortcut && (
                        <span className="tooltip-shortcut text-ui-small">{shortcut}</span>
                    )}
                </div>
            )}
        </span>
    );
}

export default Tooltip;
