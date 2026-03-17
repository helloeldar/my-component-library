import React from 'react';
import DialogHeader from './DialogHeader';
import DialogFooter from './DialogFooter';
import './Dialog.css';

/**
 * Dialog - A modal dialog window matching the Figma Islands UI Kit Dialog component.
 *
 * Composed of DialogHeader (macOS buttons + title), content area, and DialogFooter (help + buttons).
 *
 * @param {string} title - Dialog title
 * @param {number|string} width - Dialog width (default: 480)
 * @param {number|string} height - Dialog height (default: 'auto')
 * @param {boolean} showMacOSButtons - Show macOS traffic light buttons in header (default: true)
 * @param {boolean} showHelp - Show help icon in footer (default: true)
 * @param {Function} onHelpClick - Help icon click callback
 * @param {Array} buttons - Footer button configs (see DialogFooter)
 * @param {React.ReactNode} leftContent - Custom left content for footer
 * @param {React.ReactNode} children - Dialog body content
 * @param {string} className - Additional CSS classes
 */
function Dialog({
    title = "Title",
    width = 480,
    height = 'auto',
    showMacOSButtons = true,
    showHelp = true,
    onHelpClick,
    buttons,
    leftContent,
    children,
    className = "",
    ...props
}) {
    const style = {
        width: typeof width === 'number' ? `${width}px` : width,
    };
    if (height !== 'auto') {
        style.height = typeof height === 'number' ? `${height}px` : height;
    }

    return (
        <div className={`dialog ${className}`} style={style} {...props}>
            <DialogHeader
                title={title}
                showMacOSButtons={showMacOSButtons}
            />
            <div className="dialog-content">
                {children}
            </div>
            <DialogFooter
                showHelp={showHelp}
                onHelpClick={onHelpClick}
                buttons={buttons}
                leftContent={leftContent}
            />
        </div>
    );
}

export default Dialog;
