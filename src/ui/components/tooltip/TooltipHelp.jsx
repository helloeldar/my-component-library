import React from 'react';
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
                            <ExternalLinkIcon />
                        </span>
                    )}
                </a>
            )}
        </div>
    );
}

/**
 * External link icon — filled arrow pointing top-right.
 * Matches Figma "general / externalLink" icon, uses currentColor for theme support.
 */
function ExternalLinkIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 5.5C5 5.22386 5.22386 5 5.5 5H11V10.5C11 10.7761 10.7761 11 10.5 11C10.2239 11 10 10.7761 10 10.5V6.70711L4.85355 11.8536C4.65829 12.0488 4.34171 12.0488 4.14645 11.8536C3.95118 11.6583 3.95118 11.3417 4.14645 11.1464L9.29289 6H5.5C5.22386 6 5 5.77614 5 5.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default TooltipHelp;
