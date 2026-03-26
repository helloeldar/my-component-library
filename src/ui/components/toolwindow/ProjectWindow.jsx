import React from 'react';
import ToolWindow from './ToolWindow';
import Tree from '../tree/Tree';

const defaultTreeData = [
    {
        id: '1',
        label: 'intellij',
        icon: 'nodes/folder',
        isExpanded: true,
        children: [
            { id: '1-1', label: '.idea', icon: 'nodes/folder' },
            {
                id: '1-2',
                label: 'src',
                icon: 'nodes/folder',
                isExpanded: true,
                children: [
                    {
                        id: '1-2-1',
                        label: 'java',
                        icon: 'nodes/folder',
                        isExpanded: true,
                        children: [
                            { id: '1-2-1-1', label: 'analysis', icon: 'nodes/folder' },
                            { id: '1-2-1-2', label: 'BivariateFunction.java', icon: 'fileTypes/java' },
                            { id: '1-2-1-3', label: 'FunctionUtils.java', icon: 'fileTypes/java' },
                            { id: '1-2-1-4', label: 'MultivariateFunction.java', icon: 'fileTypes/java' },
                            { id: '1-2-1-5', label: 'TrivariateFunction.java', icon: 'fileTypes/java' }
                        ]
                    },
                    { id: '1-2-2', label: 'polynomials', icon: 'nodes/folder' },
                    { id: '1-2-3', label: 'solver', icon: 'nodes/folder' }
                ]
            },
            {
                id: '1-3',
                label: 'test',
                icon: 'nodes/folder',
                children: [
                    {
                        id: '1-3-1',
                        label: 'java',
                        icon: 'nodes/folder',
                        children: [
                            { id: '1-3-1-1', label: 'FunctionUtilsTest.java', icon: 'fileTypes/java' },
                            { id: '1-3-1-2', label: 'MonitoredFunction.java', icon: 'fileTypes/java' }
                        ]
                    }
                ]
            },
            { id: '1-4', label: 'External Libraries', icon: 'nodes/ppLibFolder' }
        ]
    }
];

/**
 * ProjectWindow — standalone Project tool window that renders a file tree.
 *
 * Can be used independently in prototypes or embedded inside MainWindow via
 * the default left panel renderer. Pass `treeData` to show a custom file
 * hierarchy; omit it to use the built-in sample project tree.
 *
 * @param {string}        title            - Window title. Default: "Project".
 * @param {number|string} width            - CSS width; number → pixels. Default: 320.
 * @param {number|string} height           - CSS height; number → pixels. Use "auto" to fit. Default: 400.
 * @param {TreeNodeData[]} treeData        - File hierarchy. Each node: {id?, label, icon?, children?, isExpanded?}.
 *                                           Omit `id` to have it auto-generated from position.
 * @param {string}        defaultSelectedId - ID of the node selected on first render.
 *                                           Only nodes with an explicit `id` field can be targeted.
 * @param {string[]}      actions          - Header action buttons. Default: ['more', 'minimize'].
 * @param {Function}      onNodeSelect     - Called with (nodeId, nodeData) when a node is clicked.
 * @param {Function}      onNodeToggle     - Called with (nodeId, nodeData) when a node is expanded/collapsed.
 * @param {string}        className        - Additional CSS class names.
 * @param {...*}          props            - Additional props forwarded to the underlying ToolWindow.
 */
function ProjectWindow({
    title = "Project",
    width = 320,
    height = 400,
    treeData = defaultTreeData,
    defaultSelectedId,
    actions = ['more', 'minimize'],
    onNodeSelect,
    onNodeToggle,
    className = "",
    ...props
}) {
    return (
        <ToolWindow
            title={title}
            width={width}
            height={height}
            actions={actions}
            className={`project-window ${className}`}
            {...props}
        >
            <Tree 
                data={treeData}
                defaultSelectedId={defaultSelectedId}
                onNodeSelect={onNodeSelect}
                onNodeToggle={onNodeToggle}
            />
        </ToolWindow>
    );
}

export default ProjectWindow;
