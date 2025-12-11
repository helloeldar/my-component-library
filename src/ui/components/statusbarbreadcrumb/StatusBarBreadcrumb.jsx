import { useState } from 'react';
import Icon from '../icon/Icon';
import './StatusBarBreadcrumb.css';

function StatusBarBreadcrumb({
    text = 'Breadcrumb',
    icon,
    module = false,
    state = 'default', // 'default' | 'selected' | 'selected-inactive'
    disabled = false,
    onClick,
    className = '',
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);

    const getClasses = () => {
        const classes = ['statusbar-breadcrumb'];
        
        if (disabled) {
            classes.push('statusbar-breadcrumb-disabled');
        } else if (state === 'selected') {
            classes.push('statusbar-breadcrumb-selected');
        } else if (state === 'selected-inactive') {
            classes.push('statusbar-breadcrumb-selected-inactive');
        } else if (isHovered) {
            classes.push('statusbar-breadcrumb-hovered');
        } else {
            classes.push('statusbar-breadcrumb-default');
        }
        
        if (className) classes.push(className);
        
        return classes.join(' ');
    };

    const isInteractive = !disabled && (state === 'default' || state === 'selected');
    const Element = isInteractive ? 'button' : 'div';

    return (
        <Element
            className={getClasses()}
            onClick={!disabled ? onClick : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={disabled}
            {...props}
        >
            {icon && (
                <span className="statusbar-breadcrumb-icon">
                    <Icon name={icon} size={16} />
                </span>
            )}
            {module && (
                <span className="statusbar-breadcrumb-module">
                    <span className="module-dot" />
                </span>
            )}
            <span className="statusbar-breadcrumb-text">{text}</span>
        </Element>
    );
}

export default StatusBarBreadcrumb;

