import { useState } from 'react';
import Icon from '../icon/Icon';
import './PopupLineWithActions.css';

function PopupLineWithActions({
    icon,
    text,
    selected = false,
    actions = [],
    onClick,
    className = '',
}) {
    const [isHovered, setIsHovered] = useState(false);
    const showActions = (selected || isHovered) && actions.length > 0;

    const classes = [
        'popup-line-with-actions',
        selected ? 'popup-line-with-actions-selected' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classes}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="popup-line-with-actions-left">
                {icon ? (
                    <div className="popup-line-with-actions-icon">
                        <Icon name={icon} size={16} />
                    </div>
                ) : (
                    <div className="popup-line-with-actions-icon-gap" />
                )}
                <span className="popup-line-with-actions-text text-ui-default">{text}</span>
            </div>

            {showActions && (
                <div className="popup-line-with-actions-right">
                    <div className="popup-line-with-actions-separator" />
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            className="popup-line-with-actions-btn"
                            title={action.tooltip}
                            onClick={(e) => {
                                e.stopPropagation();
                                action.onClick?.();
                            }}
                        >
                            <Icon name={action.icon} size={16} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PopupLineWithActions;
