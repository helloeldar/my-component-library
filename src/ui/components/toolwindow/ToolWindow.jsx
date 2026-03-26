import ToolWindowHeader from './ToolWindowHeader';
import './ToolWindow.css';

/**
 * ToolWindow — the base container for all IDE-style tool windows.
 *
 * Renders a header (title label or tab bar), a content area, and optional
 * action buttons (More, Minimize). All specific tool windows (ProjectWindow,
 * CommitWindow, TerminalWindow, etc.) are built on top of this component.
 *
 * @param {string}        title          - Header title shown in label mode. Default: "Tool Window".
 * @param {number|string} width          - CSS width; number → pixels. Default: 300.
 * @param {number|string} height         - CSS height; number → pixels. Use "auto" to fit content. Default: 400.
 * @param {'label'|'tabs'} headerType    - "label" shows a plain title; "tabs" shows a tab bar. Default: "label".
 * @param {Array}         tabs           - Tab definitions when headerType="tabs". Each: {label, icon, closable}.
 * @param {number}        activeTab      - Index of the active tab when headerType="tabs". Default: 0.
 * @param {Function}      onTabChange    - Called with (index) when the user clicks a tab.
 * @param {boolean}       showSeparator  - Whether to render a separator below the header. Default: false.
 * @param {string[]}      actions        - Header action buttons to show. Options: 'more', 'minimize', 'close'.
 *                                         Default: ['more', 'minimize'].
 * @param {Function}      onActionClick  - Called with the action id string when a header button is clicked.
 * @param {boolean}       focused        - Whether this tool window currently has focus (highlights header). Default: false.
 * @param {Function}      onFocus        - Called on mousedown — use to inform the parent that focus moved here.
 * @param {ReactNode}     children       - Content rendered inside the tool window body.
 * @param {string}        className      - Additional CSS class names.
 * @param {ReactNode}     toolbarExtra   - Extra content rendered in the header toolbar row.
 * @param {boolean}       tabBarDropdown - Whether the tab bar shows a dropdown chevron. Default: false.
 * @param {CSSProperties} style          - Inline styles applied to the root element.
 */
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