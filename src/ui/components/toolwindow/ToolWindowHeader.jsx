import TabBar from '../tabs/TabBar';
import './ToolWindowHeader.css';

function ToolWindowHeader({ 
    title = "Header", 
    type = "label", 
    tabs = [], 
    activeTab = 0,
    onTabChange,
    showSeparator = false,
    actions = ['more', 'minimize'],
    onActionClick
}) {
    const renderActions = () => {
        if (!actions || actions.length === 0) return null;

        return (
            <div className="tool-window-header-actions">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className="tool-window-action-button"
                        onClick={() => onActionClick && onActionClick(action)}
                    >
                        {action === 'more' && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="2" r="1.5" fill="currentColor"/>
                                <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                                <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
                            </svg>
                        )}
                        {action === 'minimize' && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        )}
                        {action === 'close' && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        )}
                        {action === 'add' && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        );
    };

    const renderTabs = () => {
        if (!tabs || tabs.length === 0) return null;

        return (
            <div className="tool-window-tabs">
                <TabBar 
                    tabs={tabs}
                    direction="horizontal"
                    size="small"
                    activeTab={activeTab}
                    onTabClick={onTabChange}
                    onTabClose={(index) => {
                        // Handle tab close if needed
                        console.log('Tab close:', index);
                    }}
                />
            </div>
        );
    };

    return (
        <div className="tool-window-header">
            <div className="tool-window-header-content">
                {type === 'tabs' ? (
                    <>
                        <div className="tool-window-header-left">
                            <h3 className="tool-window-header-title">{title}</h3>
                            {renderTabs()}
                        </div>
                        {renderActions()}
                    </>
                ) : (
                    <>
                        <h3 className="tool-window-header-title">{title}</h3>
                        {renderActions()}
                    </>
                )}
            </div>
            {(showSeparator || type === 'separator') && (
                <div className="tool-window-header-separator"></div>
            )}
        </div>
    );
}

export default ToolWindowHeader;