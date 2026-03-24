import { useState } from 'react';
import Icon from '../icon/Icon';
import './ToolbarButton.css';

/**
 * ToolbarButton — text action button for tool-window toolbars.
 * 26px height, optional icon, optional dropdown chevron.
 *
 * Matches Figma "Toolbar / Button" (node 5701:76161).
 * Use ToolbarIconButton for icon-only buttons.
 * Use ToolbarDropdown for label+value filter selectors (e.g. "Branch: main ∨").
 * Use MainToolbarDropdown for the main application toolbar (40px).
 *
 * @see https://plugins.jetbrains.com/docs/intellij/toolbar.html
 */
function ToolbarButton({
    icon,
    text,
    showChevron = false,
    disabled = false,
    onClick,
    className = '',
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const stateClass = disabled
        ? 'toolbar-button-disabled'
        : isPressed
            ? 'toolbar-button-pressed'
            : isHovered
                ? 'toolbar-button-hovered'
                : '';

    const renderIcon = () => {
        if (!icon) return null;
        if (typeof icon === 'string') {
            return <Icon name={icon} size={16} className="toolbar-button-icon" />;
        }
        return <div className="toolbar-button-icon">{icon}</div>;
    };

    return (
        <button
            className={`toolbar-button ${stateClass} ${className}`}
            onClick={disabled ? undefined : onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => !disabled && setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            disabled={disabled}
            {...props}
        >
            {(isHovered || isPressed) && !disabled && (
                <div className="toolbar-button-state-bg" />
            )}
            <div className="toolbar-button-content">
                {renderIcon()}
                {text && (
                    <span className="toolbar-button-text text-ui-default">{text}</span>
                )}
                {showChevron && (
                    <Icon name="general/chevronDown" size={16} className="toolbar-button-chevron" />
                )}
            </div>
        </button>
    );
}

export default ToolbarButton;
