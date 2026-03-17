import { useState } from 'react';
import Icon from '../icon/Icon';
import './Tab.css';

/**
 * Tab component — Islands pill-style design
 * 
 * States:
 * - default: Transparent background, no border
 * - selected: Filled background with border (pill shape)
 * - disabled: Reduced opacity, no interaction
 * 
 * Hover behavior:
 * - Background fill appears on hover
 * - Close button appears on hover (always visible when selected)
 */
function Tab({
    label,
    icon,
    active = false,
    focused = false,
    disabled = false,
    closable = false,
    size,
    onClick,
    onClose,
    ...props
}) {
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    const classes = [
        'tab',
        active ? 'tab-selected' : '',
        active && focused ? 'tab-selected-active' : '',
        size === 'small' ? 'tab-small' : ''
    ].filter(Boolean).join(' ');

    const renderIcon = () => {
        if (!icon) return null;
        if (typeof icon === 'string') {
            return <Icon name={icon} size={16} className="tab-icon" />;
        }
        return <span className="tab-icon">{icon}</span>;
    };

    const handleClose = (e) => {
        e.stopPropagation();
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={`tab-wrapper ${size === 'small' ? 'tab-wrapper-small' : ''}`}>
            <button 
                className={classes}
                onClick={onClick}
                disabled={disabled}
                {...props}
            >
                {renderIcon()}
                <span className="tab-label">{label}</span>
                {closable && (
                    <span
                        className="tab-close"
                        onClick={handleClose}
                        onMouseEnter={() => setIsCloseHovered(true)}
                        onMouseLeave={() => setIsCloseHovered(false)}
                    >
                        <Icon name={isCloseHovered ? "general/closeSmallHovered" : "general/closeSmall"} size={16} />
                    </span>
                )}
            </button>
        </div>
    );
}

export default Tab;
