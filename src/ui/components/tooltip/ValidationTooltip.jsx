import React from 'react';
import './ValidationTooltip.css';

/**
 * ValidationTooltip — Inline validation feedback tooltip.
 * Matches Figma "Tooltip / Validation" component (node 3825:7736).
 *
 * @param {string} text - Validation message text
 * @param {'error'|'warning'} type - Validation type (default: 'error')
 * @param {Array<{label: string, onClick?: function}>} actions - Optional action links
 * @param {string} className - Additional CSS classes
 */
function ValidationTooltip({
    text,
    type = 'error',
    actions = [],
    className = '',
    ...props
}) {
    const hasActions = actions.length > 0;
    const typeClass = type === 'warning' ? 'validation-warning' : 'validation-error';

    return (
        <div
            className={`validation-tooltip ${typeClass}${hasActions ? ' has-actions' : ''} ${className}`.trim()}
            {...props}
        >
            <span className="validation-tooltip-text">{text}</span>
            {hasActions && (
                <div className="validation-tooltip-actions">
                    {actions.map((action, i) => (
                        <span
                            key={i}
                            className="validation-tooltip-action"
                            onClick={action.onClick}
                        >
                            {action.label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ValidationTooltip;
