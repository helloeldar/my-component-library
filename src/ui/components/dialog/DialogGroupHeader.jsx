import React from 'react';
import '../../styles/Typography.css';

/**
 * DialogGroupHeader - Section header inside dialog content areas.
 * Matches Figma "Dialog / Group Header" component (node 7072:91228).
 *
 * Used to visually separate groups of settings or options inside a dialog.
 *
 * @param {string} title - Section title text
 * @param {string} className - Additional CSS classes
 */
function DialogGroupHeader({
    title,
    className = '',
    ...props
}) {
    const classes = [
        'dialog-group-header',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            <span className="dialog-group-header-title text-ui-default-bold">{title}</span>
            <div className="dialog-group-header-line" />
        </div>
    );
}

export default DialogGroupHeader;
