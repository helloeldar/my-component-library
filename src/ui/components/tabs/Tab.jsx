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
    count,
    active = false,
    focused = false,
    disabled = false,
    closable = false,
    onClick,
    onClose,
    ...props
}) {
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    const classes = [
        'tab',
        active ? 'tab-selected' : 'tab-default',
        active && focused ? 'tab-selected-active' : '',
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
        <div className="tab-wrapper">
            <button 
                className={classes}
                onClick={onClick}
                disabled={disabled}
                {...props}
            >
                {renderIcon()}
                <span className="tab-label text-ui-default">{label}</span>
                {count != null && (
                    <span className="tab-count text-ui-default">{count}</span>
                )}
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
