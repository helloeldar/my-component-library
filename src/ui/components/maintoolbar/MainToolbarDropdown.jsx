import Icon from '../icon/Icon';
import './MainToolbarDropdown.css';

/**
 * MainToolbarDropdown — text button with optional icon and dropdown arrow for the main toolbar.
 * 40px height, state background inset 5px with 6px border-radius — matches Figma "Main Toolbar / Dropdown".
 *
 * For regular tool-window toolbars use ToolbarDropdown (26px).
 */
function MainToolbarDropdown({
    icon,
    text = "Text",
    label,
    disabled = false,
    onClick,
    className = "",
    ...props
}) {
    const renderIcon = () => {
        if (!icon) return null;
        if (typeof icon === 'string') {
            return <Icon name={icon} size={16} className="main-toolbar-dropdown-icon" />;
        }
        // React node — render directly so it can have its own size (e.g. 20px project icon)
        return icon;
    };

    return (
        <button
            className={`main-toolbar-dropdown ${disabled ? 'main-toolbar-dropdown-disabled' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            <div className="main-toolbar-dropdown-content">
                {renderIcon()}
                <div className="main-toolbar-dropdown-text-container">
                    {label && (
                        <span className="main-toolbar-dropdown-label text-ui-default">{label}</span>
                    )}
                    <span className="main-toolbar-dropdown-text text-ui-default">{text}</span>
                    <Icon name="general/chevronDown" size={16} className="main-toolbar-dropdown-chevron" />
                </div>
            </div>
        </button>
    );
}

export default MainToolbarDropdown;
