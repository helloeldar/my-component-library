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
 * ProjectWindow - A standalone Project tool window component.
 * 
 * Can be used independently for prototypes or embedded inside Main Window (IDELayout).
 * Renders a file tree using the Tree component.
 * 
 * @param {string} title - Window title (default: "Project")
 * @param {number|string} width - Window width (default: 320)
 * @param {number|string} height - Window height (default: 400)
 * @param {Array} treeData - Tree data for the file hierarchy (default: sample project tree)
 * @param {Array} actions - Header action buttons (default: ['more', 'minimize'])
 * @param {Function} onNodeSelect - Node selection callback
 * @param {Function} onNodeToggle - Node expand/collapse callback
 * @param {string} className - Additional CSS classes
 */
function ProjectWindow({
    title = "Project",
    width = 320,
    height = 400,
    treeData = defaultTreeData,
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
                onNodeSelect={onNodeSelect}
                onNodeToggle={onNodeToggle}
            />
        </ToolWindow>
    );
}

export default ProjectWindow;
