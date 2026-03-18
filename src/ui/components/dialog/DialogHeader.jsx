import React from 'react';

/**
 * DialogHeader - Header for Dialog component with macOS traffic light buttons and title.
 *
 * @param {string} title - Dialog title text
 * @param {boolean} showMacOSButtons - Whether to show macOS close/minimize/expand buttons (default: true)
 * @param {string} className - Additional CSS classes
 */
function DialogHeader({
    title = "Title",
    showMacOSButtons = true,
    className = "",
}) {
    return (
        <>
            <div className={`dialog-header ${className}`}>
                {showMacOSButtons && (
                    <div className="dialog-header-macos-buttons">
                        <div className="dialog-header-macos-button dialog-header-macos-button-close" />
                        <div className="dialog-header-macos-button dialog-header-macos-button-minimize" />
                        <div className="dialog-header-macos-button dialog-header-macos-button-expand" />
                    </div>
                )}
                <span className="dialog-header-title text-ui-default-semibold">{title}</span>
            </div>
            <div className="dialog-header-border" />
        </>
    );
}

export default DialogHeader;
