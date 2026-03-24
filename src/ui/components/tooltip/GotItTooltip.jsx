import React from 'react';
import Button from '../button/Button';
import UILink from '../link/Link';
import './GotItTooltip.css';
import '../../styles/Typography.css';

/**
 * GotItTooltip — Informational tooltip that introduces new or changed features.
 * Matches Figma "Tooltip / Got It" component (node 3825:8627).
 *
 * @param {string} header - Optional header text (semibold)
 * @param {React.ReactNode} children - Body text content
 * @param {string} step - Optional step counter (e.g. "01")
 * @param {string} link - Optional link text
 * @param {string} linkHref - Optional link URL
 * @param {string} buttonText - Button label (default: "Got It")
 * @param {string} skipText - Optional skip link text (e.g. "Skip All")
 * @param {'top'|'bottom'|'left'|'right'} arrowPosition - Where the arrow appears on the body (default: 'top')
 * @param {function} onGotIt - Callback when Got It button is clicked
 * @param {function} onSkip - Callback when Skip All is clicked
 * @param {string} className - Additional CSS classes
 */
function GotItTooltip({
    header,
    children,
    step,
    link,
    linkHref,
    buttonText = 'Got It',
    skipText,
    arrowPosition = 'top',
    onGotIt,
    onSkip,
    className = '',
    ...props
}) {
    const arrow = (
        <div className={`got-it-corner got-it-corner-${arrowPosition}`}>
            <Arrow position={arrowPosition} />
        </div>
    );

    const body = (
        <div className="got-it-body">
            <div className="got-it-content">
                {step && (
                    <span className="got-it-step">{step}</span>
                )}
                <div className="got-it-text-and-actions">
                    <div className="got-it-text-content">
                        {header && (
                            <div className="got-it-header text-ui-default-semibold">{header}</div>
                        )}
                        {children && (
                            <div className="got-it-text text-ui-paragraph">{children}</div>
                        )}
                        {link && (
                            <UILink href={linkHref || '#'} className="got-it-link">{link}</UILink>
                        )}
                    </div>
                    <div className="got-it-actions">
                        <Button type="secondary" className="got-it-button" onClick={onGotIt}>
                            {buttonText}
                        </Button>
                        {skipText && (
                            <span className="got-it-skip" onClick={onSkip}>{skipText}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const classes = [
        'got-it-tooltip',
        `got-it-arrow-${arrowPosition}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            {(arrowPosition === 'top' || arrowPosition === 'left') && arrow}
            {body}
            {(arrowPosition === 'bottom' || arrowPosition === 'right') && arrow}
        </div>
    );
}

/**
 * Arrow SVG for Got It tooltip.
 * Renders a filled triangle with border strokes on the exposed edges.
 * The fill matches --got-it-bg, stroke matches --got-it-border.
 */
function Arrow({ position }) {
    switch (position) {
        case 'top':
            return (
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                    <path d="M0 8 L8 0 L16 8 Z" className="got-it-arrow-fill" />
                    <path d="M0 8 L8 0 L16 8" className="got-it-arrow-stroke" />
                </svg>
            );
        case 'bottom':
            return (
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                    <path d="M0 0 L8 8 L16 0 Z" className="got-it-arrow-fill" />
                    <path d="M0 0 L8 8 L16 0" className="got-it-arrow-stroke" />
                </svg>
            );
        case 'left':
            return (
                <svg width="8" height="16" viewBox="0 0 8 16" fill="none">
                    <path d="M8 0 L0 8 L8 16 Z" className="got-it-arrow-fill" />
                    <path d="M8 0 L0 8 L8 16" className="got-it-arrow-stroke" />
                </svg>
            );
        case 'right':
            return (
                <svg width="8" height="16" viewBox="0 0 8 16" fill="none">
                    <path d="M0 0 L8 8 L0 16 Z" className="got-it-arrow-fill" />
                    <path d="M0 0 L8 8 L0 16" className="got-it-arrow-stroke" />
                </svg>
            );
        default:
            return null;
    }
}

export default GotItTooltip;
