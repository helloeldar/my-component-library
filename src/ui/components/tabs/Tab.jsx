import { useState } from 'react';
import Icon from '../icon/Icon';
import './Tab.css';

function Tab({
    label,
    icon,
    active = false,
    inactive = false,
    closable = false,
    size,
    onClick,
    onClose,
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);

    let classes = ['tab'];

    if (active) {
        classes.push('tab-selected');
    } else if (inactive) {
        classes.push('tab-inactive');
    } else {
        classes.push('tab-default');
    }

    if (size === 'small') {
        classes.push('tab-small');
        classes.push('text-ui-small');
    } else {
        classes.push('tab-size-default');
        classes.push('text-ui-default');
    }

    if (isHovered) {
        classes.push('tab-hovered');
    }

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

    // Show close button when: selected or inactive (not on hover)
    const showCloseButton = closable && (active || inactive);

    return (
        <button 
            className={classes.join(' ')} 
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <div className="tab-content">
                {renderIcon()}
                <span className="tab-label">{label}</span>
                {showCloseButton && (
                    <span className="tab-close" onClick={handleClose}>
                        <Icon name="general/closeSmall" size={16} />
                    </span>
                )}
            </div>
            {(active || inactive) && (
                <div className={`tab-underline ${active ? 'tab-underline-selected' : 'tab-underline-inactive'}`} />
            )}
        </button>
    );
}

export default Tab;
