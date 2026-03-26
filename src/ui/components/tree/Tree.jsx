import { useState } from 'react';
import TreeNode from './TreeNode';
import './Tree.css';

/**
 * Tree — interactive item list for tool window content.
 *
 * Works for both hierarchical (file trees) and flat lists
 * (tasks, sessions, bookmarks, run configs, results).
 * Pass items without `children` for a flat list.
 * All hover/selection/sizing is handled automatically.
 *
 * Use the `flat` prop for non-hierarchical content — it hides
 * chevrons and indentation so the list feels like a plain item list.
 *
 * In the real IDE, Tree is reused for: Project files, Bookmarks,
 * Run configurations, AI chat sessions, Agent Tasks, and more.
 */
function Tree({ data = [], onNodeSelect, onNodeToggle, flat = false }) {
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const renderTreeNodes = (nodes, level = 1) => {
        return nodes.map((node, index) => {
            const nodeId = node.id || `${level}-${index}`;
            return (
                <TreeNode
                    key={nodeId}
                    label={node.label}
                    icon={node.icon}
                    secondaryText={node.secondaryText}
                    level={level}
                    hasChildren={node.children && node.children.length > 0}
                    isExpanded={node.isExpanded}
                    isSelected={selectedNodeId === nodeId}
                    flat={flat}
                    onToggle={(expanded) => {
                        if (onNodeToggle) {
                            onNodeToggle(nodeId, expanded);
                        }
                    }}
                    onSelect={(selected) => {
                        if (selected) {
                            setSelectedNodeId(nodeId);
                        } else {
                            setSelectedNodeId(null);
                        }
                        if (onNodeSelect) {
                            onNodeSelect(nodeId, selected);
                        }
                    }}
                >
                    {node.children && node.children.length > 0 && 
                        renderTreeNodes(node.children, level + 1)
                    }
                </TreeNode>
            );
        });
    };

    return (
        <div className="tree">
            {renderTreeNodes(data)}
        </div>
    );
}

export default Tree;
