import Icon from '../icon/Icon';
import TabBar from '../tabs/TabBar';
import ToolbarIconButton from '../iconbutton/IconButton';
import './ToolWindowHeader.css';

function ToolWindowHeader({
    title = "Header",
    icon,
    type = "label",
    tabs = [],
    activeTab = 0,
    onTabChange,
    showSeparator = false,
    dropdown = false,
    actions = ['more', 'minimize'],
    onActionClick,
    focused = false,
    toolbarExtra
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
                    if (!iconName) return null;
                    return (
                        <ToolbarIconButton
                            key={index}
                            icon={iconName}
                            onClick={() => onActionClick && onActionClick(action)}
                        />
                    );
                })}
            </div>
        );
    };

    const renderTabs = () => {
        if (!tabs || tabs.length === 0) return null;

        return (
            <TabBar
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
                onTabClose={(index) => onActionClick && onActionClick('tabClose', index)}
                focused={focused}
                actions={['add']}
                onActionClick={onActionClick}
            />
        );
    };

    const renderTitle = () => (
        <div className="tool-window-header-title-group">
            {icon && <Icon name={icon} size={20} />}
            <h3 className="tool-window-header-title text-ui-default-semibold">{title}</h3>
            {dropdown && (
                <ToolbarIconButton
                    icon="general/chevronDown"
                    className="tool-window-header-dropdown"
                    onClick={() => onActionClick && onActionClick('dropdown')}
                />
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
                        {toolbarExtra}
                        {renderActions()}
                    </>
                ) : (
                    <>
                        {renderTitle()}
                        {toolbarExtra}
                        {renderActions()}
                    </>
                )}
            </div>
            {showSeparator && (
                <div className="tool-window-header-separator"></div>
            )}
        </div>
    );
}

export default ToolWindowHeader;
