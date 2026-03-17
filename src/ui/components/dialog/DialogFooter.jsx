import React from 'react';
import Button from '../button/Button';
import Icon from '../icon/Icon';

/**
 * DialogFooter - Footer for Dialog component with help icon and action buttons.
 *
 * @param {boolean} showHelp - Whether to show the help icon on the left (default: true)
 * @param {Function} onHelpClick - Callback when help icon is clicked
 * @param {Array} buttons - Array of button configs: { children, type?, disabled?, onClick? }
 *   Last button defaults to 'primary', others default to 'secondary'.
 * @param {React.ReactNode} leftContent - Custom content for the left side (overrides help icon)
 * @param {string} className - Additional CSS classes
 */
function DialogFooter({
    showHelp = true,
    onHelpClick,
    buttons = [
        { children: 'Cancel' },
        { children: 'Apply', disabled: true },
        { children: 'OK' },
    ],
    leftContent,
    className = "",
}) {
    return (
        <div className={`dialog-footer ${className}`}>
            <div className="dialog-footer-left">
                {leftContent || (showHelp && (
                    <div className="dialog-footer-help" onClick={onHelpClick}>
                        <Icon name="general/help" size={24} />
                    </div>
                ))}
            </div>
            <div className="dialog-footer-buttons">
                {buttons.map((button, index) => {
                    const { type, ...rest } = button;
                    const resolvedType = type || (index === buttons.length - 1 ? 'primary' : 'secondary');
                    return (
                        <Button
                            key={index}
                            type={resolvedType}
                            {...rest}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default DialogFooter;
