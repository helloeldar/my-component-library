import Icon from '../icon/Icon';
import Tab from '../tabs/Tab';
import './ToolWindowHeader.css';

function ToolWindowHeader({
    title = "Header", 
    icon,
    type = "label", 
    tabs = [], 
    activeTab = 0,
    onTabChange,
    showSeparator = false,
    border = true,
    dropdown = false,
    actions = ['more', 'minimize'],
    onActionClick,
    focused = false
}) {
    const getActionIcon = (action) => {
            switch (action) {
                case 'more':
                    return 'general/moreVertical';
                case 'minimize':
                    return 'general/hide';
                case 'close':
                    return 'general/closeSmall';
                case 'add':
                    return 'general/add';
            default:
                return null;
        }
    };

    const renderActions = () => {
        if (!actions || actions.length === 0) return null;

        return (
            <div className="tool-window-header-actions">
                {actions.map((action, index) => {
                    const iconName = getActionIcon(action);
                    return (
                        <button
                            key={index}
                            className="tool-window-action-button"
                            onClick={() => onActionClick && onActionClick(action)}
                        >
                            {iconName && <Icon name={iconName} size={16} />}
                        </button>
                    );
                })}
            </div>
        );
    };

    const renderTabs = () => {
        if (!tabs || tabs.length === 0) return null;

        return (
            <div className="tw-tab-bar">
                <div className="tw-tab-bar-tabs">
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            active={index === activeTab}
                            focused={focused}
                            closable={tab.closable}
                            onClick={() => onTabChange && onTabChange(index)}
                            onClose={() => onActionClick && onActionClick('tabClose', index)}
                        />
                    ))}
                </div>
                <div className="tw-tab-bar-icons">
                    <button
                        className="tool-window-action-button"
                        onClick={() => onActionClick && onActionClick('add')}
                    >
                        <Icon name="general/add" size={16} />
                    </button>
                    <button
                        className="tool-window-action-button"
                        onClick={() => onActionClick && onActionClick('dropdown')}
                    >
                        <Icon name="general/chevronDown" size={16} />
                    </button>
                </div>
            </div>
        );
    };

    const renderTitle = () => (
        <div className="tool-window-header-title-group">
            {icon && <Icon name={icon} size={20} />}
            <h3 className="tool-window-header-title">{title}</h3>
            {dropdown && (
                <button
                    type="button"
                    className="tool-window-header-dropdown"
                    onClick={() => onActionClick && onActionClick('dropdown')}
                >
                    <Icon name="general/chevronDown" size={16} />
                </button>
            )}
        </div>
    );

    return (
        <div className="tool-window-header">
            <div className="tool-window-header-content">
                {type === 'tabs' ? (
                    <>
                        <div className="tool-window-header-left">
                            {renderTitle()}
                            {renderTabs()}
                        </div>
                        {renderActions()}
                    </>
                ) : (
                    <>
                        {renderTitle()}
                        {renderActions()}
                    </>
                )}
            </div>
            {(border || showSeparator || type === 'separator') && (
                <div className="tool-window-header-separator"></div>
            )}
        </div>
    );
}

export default ToolWindowHeader;
