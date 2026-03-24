import React from 'react';
import Icon from '../icon/Icon';
import './TooltipHelp.css';
import '../../styles/Typography.css';

/**
 * TooltipHelp — Rich tooltip with header, description, shortcut and link.
 * Matches Figma "Tooltip / Help" component (node 3825:7758).
 *
 * @param {string} header - Optional header text (semibold)
 * @param {string} body - Description text (required)
 * @param {string} shortcut - Optional keyboard shortcut
 * @param {Object} link - Optional link { text, href, external }
 * @param {string} className - Additional CSS classes
 */
function TooltipHelp({
    header,
    body,
    shortcut,
    link,
    className = '',
    ...props
}) {
    return (
        <div className={`tooltip-help ${className}`.trim()} {...props}>
            {header && (
                <div className="tooltip-help-header text-ui-default-semibold">
                    {header}
                </div>
            )}
            <div className="tooltip-help-body text-ui-default">
                {body}
            </div>
            {shortcut && (
                <div className="tooltip-help-shortcut text-ui-default">
                    {shortcut}
                </div>
            )}
            {link && (
                <a
                    className="tooltip-help-link text-ui-default"
                    href={link.href || '#'}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                >
                    <span>{link.text}</span>
                    {link.external && (
                        <span className="tooltip-help-link-icon">
                            <Icon name="ide/externalLink" size={16} />
                        </span>
                    )}
                </a>
            )}
        </div>
    );
}

export default TooltipHelp;
