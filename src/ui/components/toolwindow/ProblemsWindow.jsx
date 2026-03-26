import React from 'react';
import ToolWindow from './ToolWindow';
import Tree from '../tree/Tree';
import EmptyState from '../emptystate/EmptyState';
import ToolbarIconButton from '../iconbutton/IconButton';
import './ProblemsWindow.css';

const defaultTabs = [
    { label: 'File', count: 3 },
    { label: 'Project Errors' },
    { label: 'Vulnerable Dependencies' },
    { label: 'Qodana' },
    { label: 'AI Self-Review' },
];

const defaultTreeData = [
    {
        id: 'file-1',
        label: 'adapter_script.java',
        icon: 'nodes/abstractException',
        secondaryText: '~/IdeaProjects/FastMath/src/main/java/com/example   4 problems',
        isExpanded: true,
        children: [
            {
                id: 'error-1',
                label: 'Identified expected',
                icon: 'status/error',
                secondaryText: ':17',
            },
            {
                id: 'error-2',
                label: "Cannot resolve symbol 'Value'",
                icon: 'status/error',
                secondaryText: ':21',
            },
        ],
    },
];

const DEFAULT_TOOLBAR_BUTTONS = [
    { icon: 'general/show', tooltip: 'Preview' },
    { icon: 'codeInsight/intentionBulb', tooltip: 'Show Quick-Fixes' },
    { icon: 'general/settings', tooltip: 'Settings' },
];

/**
 * ProblemsWindow - Problems tool window with tabbed header, sidebar toolbar,
 * and a tree of file-level / error-level nodes.
 *
 * @param {string}  title      - Window title (default: "Problems")
 * @param {number|string} width
 * @param {number|string} height
 * @param {Array}   tabs       - Tab definitions (default: File, Project Errors, …)
 * @param {number}  activeTab  - Active tab index
 * @param {Function} onTabChange
 * @param {Array}   treeData   - Problems tree (file nodes with error children)
 * @param {boolean} empty      - Show empty state instead of tree
 * @param {string}  emptyText  - Custom empty-state explanation text
 * @param {Array}   actions    - Header action buttons (default: ['more', 'minimize'])
 * @param {boolean} focused
 * @param {string}  className
 */
function ProblemsWindow({
    title = 'Problems',
    width = 874,
    height = 227,
    tabs = defaultTabs,
    activeTab = 0,
    onTabChange,
    onActionClick,
    treeData = defaultTreeData,
    empty = false,
    emptyText = 'No problems found',
    actions = ['more', 'minimize'],
    /** Left sidebar toolbar buttons. Default: Preview, Show Quick-Fixes, Settings.
     *  Pass an empty array to hide the toolbar entirely. */
    toolbarButtons = DEFAULT_TOOLBAR_BUTTONS,
    focused = true,
    className = '',
    ...props
}) {
    return (
        <ToolWindow
            title={title}
            width={width}
            height={height}
            headerType="tabs"
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            onActionClick={onActionClick}
            showSeparator={true}
            actions={actions}
            focused={focused}
            className={`problems-window ${className}`}
            {...props}
        >
            <div className="problems-content">
                {toolbarButtons && toolbarButtons.length > 0 && (
                    <div className="problems-toolbar">
                        {toolbarButtons.map((btn, i) => (
                            <ToolbarIconButton
                                key={i}
                                icon={btn.icon}
                                tooltip={btn.tooltip}
                                onClick={btn.onClick}
                            />
                        ))}
                    </div>
                )}
                <div className="problems-tree-area">
                    {empty ? (
                        <EmptyState explanation={emptyText} />
                    ) : (
                        <Tree data={treeData} />
                    )}
                </div>
            </div>
        </ToolWindow>
    );
}

export default ProblemsWindow;
export { DEFAULT_TOOLBAR_BUTTONS as DEFAULT_PROBLEMS_TOOLBAR_BUTTONS };
