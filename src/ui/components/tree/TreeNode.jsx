import { useState } from 'react';
import './TreeNode.css';

function TreeNode({ 
    label, 
    icon, 
    level = 1, 
    hasChildren = false, 
    isExpanded = false, 
    isSelected = false, 
    onToggle, 
    onSelect, 
    children 
}) {
    const [expanded, setExpanded] = useState(isExpanded);

    const handleToggle = () => {
        const newExpanded = !expanded;
        setExpanded(newExpanded);
        if (onToggle) {
            onToggle(newExpanded);
        }
    };

    const handleSelect = () => {
        if (onSelect) {
            onSelect(!isSelected);
        }
    };

    const indentWidth = level === 1 ? 16 : level === 2 ? 32 : 50 + (level - 3) * 18;

    return (
        <div className="tree-node-container">
            <div 
                className={`tree-node ${isSelected ? 'tree-node-selected' : ''}`}
                style={{ paddingLeft: `${indentWidth}px` }}
                onClick={handleSelect}
            >
                {hasChildren && (
                    <button 
                        className={`tree-node-toggle ${expanded ? 'expanded' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggle();
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path 
                                d="M6 4L10 8L6 12" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                )}
                {!hasChildren && <div className="tree-node-spacer" />}
                
                {icon && <span className="tree-node-icon">{icon}</span>}
                <span className="tree-node-label">{label}</span>
            </div>
            
            {hasChildren && expanded && children && (
                <div className="tree-node-children">
                    {children}
                </div>
            )}
        </div>
    );
}

export default TreeNode;