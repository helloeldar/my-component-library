import './Notification.css';
import Icon from '../icon/Icon';
import UILink from '../link/Link';
import Button from '../button/Button';

/**
 * Notification (Balloon) component following IntelliJ UI Guidelines
 * https://plugins.jetbrains.com/docs/intellij/balloon.html
 *
 * Appears as a floating card (360px wide) in the bottom-right of the IDE
 * to inform users about events, build results, or required actions.
 * On hover, two icon buttons appear top-right: "More" (⋮) and "Close" (×).
 *
 * @param {'info' | 'error' | 'warning' | 'success'} props.type - Notification type
 * @param {string} props.title - Bold heading (optional)
 * @param {React.ReactNode} props.children - Body text (optional)
 * @param {{ label: string, onClick?: function, href?: string }} props.button - Primary action button (optional)
 * @param {Array<{ label: string, onClick?: function, href?: string }>} props.actions - Link-style actions
 * @param {string} props.timestamp - Relative timestamp shown below body (optional)
 * @param {function} props.onClose - Close button handler; shows the × icon button on hover
 * @param {function} props.onMore - More button handler; shows the ⋮ icon button on hover
 * @param {boolean} props.forceHoverButtons - Force hover buttons to always be visible (useful for showcases)
 * @param {string} props.className - Extra CSS classes
 */
function Notification({
    type = 'info',
    title,
    children,
    button,
    actions = [],
    timestamp,
    onClose,
    onMore,
    forceHoverButtons = false,
    className = '',
    ...rest
}) {
    const iconMap = {
        info: 'status/info',
        error: 'status/error',
        warning: 'status/warning',
        success: 'status/success',
    };

    const hasActions = button || actions.length > 0;
    const hasHoverButtons = onClose !== undefined || onMore !== undefined;

    return (
        <div
            className={['notification', forceHoverButtons && 'notification--buttons-visible', className].filter(Boolean).join(' ')}
            role="alert"
            {...rest}
        >
            <div className="notification-icon-text">
                <span className="notification-type-icon">
                    <Icon name={iconMap[type] || 'status/info'} size={16} />
                </span>
                <div className="notification-body">
                    {(title || children) && (
                        <div className="notification-heading-text">
                            {title && (
                                <p className="notification-title text-ui-default-semibold">
                                    {title}
                                </p>
                            )}
                            {children && (
                                <p className="notification-text text-ui-default">
                                    {children}
                                </p>
                            )}
                        </div>
                    )}
                    {hasActions && (
                        <div className="notification-actions">
                            {button && (
                                <Button
                                    type="secondary"
                                    className="notification-action-btn"
                                    onClick={button.onClick}
                                >
                                    {button.label}
                                </Button>
                            )}
                            <div className="notification-links">
                                {actions.map((action, i) => (
                                    <UILink
                                        key={i}
                                        onClick={action.onClick}
                                        href={action.href}
                                        className="notification-link"
                                    >
                                        {action.label}
                                    </UILink>
                                ))}
                            </div>
                        </div>
                    )}
                    {timestamp && (
                        <p className="notification-timestamp text-ui-small">
                            {timestamp}
                        </p>
                    )}
                </div>
            </div>

            {hasHoverButtons && (
                <div className="notification-hover-buttons" aria-hidden="true">
                    {onMore !== undefined && (
                        <button
                            type="button"
                            className="notification-icon-btn"
                            onClick={onMore}
                            aria-label="More options"
                        >
                            <Icon name="general/moreVertical" size={16} />
                        </button>
                    )}
                    {onClose !== undefined && (
                        <button
                            type="button"
                            className="notification-icon-btn"
                            onClick={onClose}
                            aria-label="Close notification"
                        >
                            <Icon name="general/close" size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Notification;
