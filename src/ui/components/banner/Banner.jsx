import './Banner.css';
import Icon from '../icon/Icon';
import Link from '../link/Link';

/**
 * Banner component following IntelliJ UI Guidelines
 * https://plugins.jetbrains.com/docs/intellij/banner.html
 * 
 * A banner is a notification bar displayed at the top of dialogs or tool windows
 * to inform users about important information, warnings, errors, or success messages.
 * 
 * @param {Object} props
 * @param {'info' | 'error' | 'warning' | 'success'} props.type - Banner type (default: 'info')
 * @param {React.ReactNode} props.children - Banner text content
 * @param {boolean} props.showIcon - Whether to show the status icon (default: true)
 * @param {Array<{label: string, onClick?: function, href?: string}>} props.actions - Action links
 * @param {boolean} props.showCloseButton - Whether to show close button (default: true)
 * @param {function} props.onClose - Close button handler
 * @param {string} props.className - Additional CSS classes
 */
function Banner({
    type = 'info',
    children,
    showIcon = true,
    actions = [],
    showCloseButton = true,
    onClose,
    className = '',
    ...rest
}) {
    const classes = [
        'banner',
        `banner-${type}`,
        className
    ].filter(Boolean).join(' ');

    const getStatusIcon = () => {
        const iconMap = {
            info: 'status/info',
            error: 'status/error',
            warning: 'status/warning',
            success: 'status/success'
        };
        return iconMap[type] || iconMap.info;
    };

    return (
        <div className={classes} role="alert" {...rest}>
            <div className="banner-content">
                {showIcon && (
                    <span className="banner-icon">
                        <Icon name={getStatusIcon()} size={16} />
                    </span>
                )}
                <div className="banner-body">
                    <span className="banner-text">{children}</span>
                    {actions.length > 0 && (
                        <div className="banner-actions">
                            {actions.map((action, index) => (
                                <Link
                                    key={index}
                                    onClick={action.onClick}
                                    href={action.href}
                                    type={action.type || 'default'}
                                    className="banner-action"
                                >
                                    {action.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showCloseButton && (
                <div className="banner-close-wrapper">
                    <button 
                        type="button" 
                        className="banner-close" 
                        onClick={onClose}
                        aria-label="Close banner"
                    >
                        <Icon name="general/close" size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Banner;
