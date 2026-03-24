import { useState } from 'react';
import Icon from '../icon/Icon';
import './ToolbarDropdown.css';

/**
 * ToolbarDropdown — text button with optional icon and dropdown arrow for regular toolbars.
 * 26px height, used in tool-window toolbars.
 *
 * Matches Figma "Toolbar / Button" (node 5701:76161) and "Toolbar / Dropdown" (node 9393:66721).
 * For the main application toolbar use MainToolbarDropdown (40px).
 */
function ToolbarDropdown({
    icon,
    text = "Text",
    label,
    theme = "dark",
    disabled = false,
    onClick,
    className = "",
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        if (!disabled && onClick) onClick();
    };

    const getStateClass = () => {
        if (disabled) return 'toolbar-dropdown-disabled';
        if (isPressed) return 'toolbar-dropdown-pressed';
        if (isHovered) return 'toolbar-dropdown-hovered';
        return '';
    };

    const getThemeClass = () => {
        switch (theme) {
            case 'light':        return 'toolbar-dropdown-theme-light';
            case 'light-header': return 'toolbar-dropdown-theme-light-header';
            case 'dark':
            default:             return 'toolbar-dropdown-theme-dark';
        }
    };

    const renderIcon = () => {
        if (!icon) return null;
        if (typeof icon === 'string') {
            return <Icon name={icon} size={16} className="toolbar-dropdown-icon" />;
        }
        return <div className="toolbar-dropdown-icon">{icon}</div>;
    };

    return (
        <button
            className={`toolbar-dropdown ${getThemeClass()} ${getStateClass()} ${className}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            disabled={disabled}
            {...props}
        >
            {(isHovered || isPressed) && !disabled && (
                <div className="toolbar-dropdown-state-bg" />
            )}
            <div className="toolbar-dropdown-content">
                {renderIcon()}
                <div className="toolbar-dropdown-text-container">
                    {label && (
                        <span className="toolbar-dropdown-label text-ui-default">{label}</span>
                    )}
                    <span className="toolbar-dropdown-text text-ui-default">{text}</span>
                    <Icon name="general/chevronDown" size={16} className="toolbar-dropdown-chevron" />
                </div>
            </div>
        </button>
    );
}

export default ToolbarDropdown;
