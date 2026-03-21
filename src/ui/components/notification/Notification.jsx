import React from 'react';
import Icon from '../icon/Icon';
import Link from '../link/Link';
import './Notification.css';
import '../../styles/Typography.css';

/**
 * Notification - Toast notification balloon matching Figma "Notification" component (node 3595:83697).
 *
 * Appears in the bottom-right of the IDE to inform users of events, build results, or actions.
 *
 * @param {'info'|'warning'|'error'|'success'} type - Notification type (default: 'info')
 * @param {string} title - Notification title
 * @param {React.ReactNode} children - Body content
 * @param {Array<{label: string, onClick?: function}>} actions - Action links
 * @param {boolean} showCloseButton - Show close button (default: true)
 * @param {function} onClose - Close callback
 * @param {string} timestamp - Optional timestamp text (e.g. "just now", "2 min ago")
 * @param {string} className - Additional CSS classes
 */
function Notification({
    type = 'info',
    title,
    children,
    actions = [],
    showCloseButton = true,
    onClose,
    timestamp,
    className = '',
    ...props
}) {
    const classes = [
        'notification',
        `notification-${type}`,
        className
    ].filter(Boolean).join(' ');

    const getIconName = () => {
        const iconMap = {
            info: 'status/infoOutline',
            warning: 'status/warningOutline',
            error: 'status/errorOutline',
            success: 'status/success'
        };
        return iconMap[type] || iconMap.info;
    };

    return (
        <div className={classes} role="alert" {...props}>
            <div className="notification-header">
                <span className="notification-icon">
                    <Icon name={getIconName()} size={16} />
                </span>
                {title && (
                    <span className="notification-title text-ui-default-bold">{title}</span>
                )}
                <div className="notification-header-right">
                    {timestamp && (
                        <span className="notification-timestamp text-ui-small">{timestamp}</span>
                    )}
                    {showCloseButton && (
                        <button
                            type="button"
                            className="notification-close"
                            onClick={onClose}
                            aria-label="Close notification"
                        >
                            <Icon name="general/closeSmall" size={16} />
                        </button>
                    )}
                </div>
            </div>
            {(children || actions.length > 0) && (
                <div className="notification-body">
                    {children && (
                        <div className="notification-content text-ui-default">{children}</div>
                    )}
                    {actions.length > 0 && (
                        <div className="notification-actions">
                            {actions.map((action, index) => (
                                <Link
                                    key={index}
                                    onClick={action.onClick}
                                    type="default"
                                    className="notification-action"
                                >
                                    {action.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Notification;
