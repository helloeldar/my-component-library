import React from 'react';
import Icon from '../icon/Icon';
import './TooltipEditor.css';

/**
 * Inline SVG arrow triangles — each direction draws the two visible diagonal
 * edges with the tooltip border color; the flat base is hidden behind the
 * content box. The SVG is 1px larger on the base side for a seamless overlap.
 */
function ArrowUp() {
    return (
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 9L8 0L16 9Z" fill="var(--tooltip-editor-bg)" />
            <line x1="0" y1="9" x2="8" y2="0" stroke="var(--tooltip-editor-border)" strokeWidth="0.5" />
            <line x1="8" y1="0" x2="16" y2="9" stroke="var(--tooltip-editor-border)" strokeWidth="0.5" />
        </svg>
    );
}

function ArrowDown() {
    return (
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 0L16 0L8 9Z" fill="var(--tooltip-editor-bg)" />
            <line x1="0" y1="0" x2="8" y2="9" stroke="var(--tooltip-editor-border)" strokeWidth="0.5" />
            <line x1="8" y1="9" x2="16" y2="0" stroke="var(--tooltip-editor-border)" strokeWidth="0.5" />
        </svg>
    );
}

function ArrowLeft() {
    return (
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 0L9 16L0 8Z" fill="var(--tooltip-editor-bg)" />
            <line x1="9" y1="0" x2="0" y2="8" stroke="var(--tooltip-editor-border)" strokeWidth="0.5" />
            <line x1="0" y1="8" x2="9" y2="16" stroke="var(--tooltip-editor-border)" strokeWidth="0.5" />
        </svg>
    );
}

function ArrowRight() {
    return (
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 0L9 8L0 16Z" fill="var(--tooltip-editor-bg)" />
            <line x1="0" y1="0" x2="9" y2="8" stroke="var(--tooltip-editor-border)" strokeWidth="0.5" />
            <line x1="9" y1="8" x2="0" y2="16" stroke="var(--tooltip-editor-border)" strokeWidth="0.5" />
        </svg>
    );
}

const ARROWS = { up: ArrowUp, down: ArrowDown, left: ArrowLeft, right: ArrowRight };

/**
 * Status icon names — map to existing project icons in src/icons/status/.
 * The Icon component handles dark/light theme switching automatically.
 * Matches Figma "status / error|warning|success" components (nodes 3825:7314, 3825:7370, 3825:7381).
 */
const STATUS_ICON_NAMES = {
    error: 'status/error',
    warning: 'status/warning',
    success: 'status/success',
};

/**
 * TooltipEditor — Rich editor tooltip with status type, directional arrow,
 * optional header, main text, hint, and menu icon.
 *
 * Matches Figma "Tooltip / Editor" component (node 3825:8626).
 *
 * @param {'info'|'error'|'warning'|'success'} type - Status type (default: 'info')
 * @param {'up'|'down'|'left'|'right'} arrow - Arrow direction (default: 'up')
 * @param {string} header - Optional header text (semibold)
 * @param {string} text - Main body text (required)
 * @param {string} hint - Optional hint text (secondary color)
 * @param {boolean} menu - Show the three-dot menu icon (default: false)
 * @param {string} className - Additional CSS classes
 */
function TooltipEditor({
    type = 'info',
    arrow = 'up',
    header,
    text,
    hint,
    menu = false,
    className = '',
    ...props
}) {
    const ArrowComponent = ARROWS[arrow] || ArrowUp;
    const statusIconName = STATUS_ICON_NAMES[type] || null;

    return (
        <div
            className={`tooltip-editor tooltip-editor--${type} tooltip-editor--arrow-${arrow} ${className}`.trim()}
            {...props}
        >
            <div className="tooltip-editor-inner">
                <div className="tooltip-editor-content">
                    <div className={`tooltip-editor-step${statusIconName ? ' tooltip-editor-step--with-icon' : ''}`}>
                        {statusIconName && (
                            <Icon
                                name={statusIconName}
                                size={16}
                                className="tooltip-editor-status-icon"
                            />
                        )}
                        <div className="tooltip-editor-text-group">
                            {header && <p className="tooltip-editor-header">{header}</p>}
                            {text && <p className="tooltip-editor-text">{text}</p>}
                            {hint && <p className="tooltip-editor-hint">{hint}</p>}
                        </div>
                    </div>
                    {menu && (
                        <div className="tooltip-editor-menu-icon" aria-hidden="true">
                            <div className="tooltip-editor-menu-dot" />
                            <div className="tooltip-editor-menu-dot" />
                            <div className="tooltip-editor-menu-dot" />
                        </div>
                    )}
                </div>
                <div className="tooltip-editor-corner">
                    <ArrowComponent />
                </div>
            </div>
        </div>
    );
}

export default TooltipEditor;
