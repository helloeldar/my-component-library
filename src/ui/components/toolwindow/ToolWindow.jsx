import ToolWindowHeader from './ToolWindowHeader';
import './ToolWindow.css';

function ToolWindow({ 
    title = "Tool Window",
    width = 300,
    height = 400,
    headerType = "label",
    tabs = [],
    activeTab = 0,
    onTabChange,
    showSeparator = false,
    actions = ['more', 'minimize'],
    onActionClick,
    focused = false,
    onFocus,
    children,
    className = "",
    toolbarExtra,
    tabBarDropdown = false,
    style,
    ...rest
}) {
    const focusedClass = focused ? 'tool-window-focused' : '';
    return (
        <div 
            className={`tool-window ${focusedClass} ${className}`}
            style={{ 
                width: typeof width === 'number' ? `${width}px` : width, 
                height: typeof height === 'number' ? `${height}px` : height,
                ...style,
            }}
            onMouseDown={onFocus}
            {...rest}
        >
            <ToolWindowHeader
                title={title}
                type={headerType}
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
                showSeparator={showSeparator}
                actions={actions}
                onActionClick={onActionClick}
                focused={focused}
                toolbarExtra={toolbarExtra}
                tabBarDropdown={tabBarDropdown}
            />
            <div className="tool-window-content">
                {children}
            </div>
        </div>
    );
}

export default ToolWindow;