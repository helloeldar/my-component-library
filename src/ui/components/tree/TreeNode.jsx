import { useState } from 'react';
import Icon from '../icon/Icon';
import './TreeNode.css';

function TreeNode({ 
    label, 
    icon, 
    secondaryText,
    level = 1, 
    hasChildren = false, 
    isExpanded = false, 
    isSelected = false, 
    onToggle, 
    onSelect, 
    prefix,
    children,
    className = '',
    style,
    flat = false,
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

    const renderIcon = () => {
        if (!icon) return null;
        if (typeof icon === 'string') {
            return <Icon name={icon} size={16} className="tree-node-icon" />;
        }
        return <span className="tree-node-icon">{icon}</span>;
    };

    const indentWidth = flat ? 0 : (level === 1 ? 16 : level === 2 ? 32 : 50 + (level - 3) * 18);

    return (
        <div className={`tree-node-container ${className}`} style={style}>
            <div 
                className={`tree-node text-ui-default ${isSelected ? 'tree-node-selected' : ''}`}
                style={{ paddingLeft: `${indentWidth}px` }}
                onClick={handleSelect}
            >
                {!flat && hasChildren && (
                    <button 
                        className={`tree-node-toggle ${expanded ? 'expanded' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggle();
                        }}
                    >
                        <Icon 
                            name={expanded ? 'general/chevronDown' : 'general/chevronRight'} 
                            size={16} 
                        />
                    </button>
                )}
                {!flat && !hasChildren && <div className="tree-node-spacer" />}
                
                {prefix && <div className="tree-node-prefix" onClick={e => e.stopPropagation()}>{prefix}</div>}
                {renderIcon()}
                <span className="tree-node-label">{label}</span>
                {secondaryText && (
                    <span className="tree-node-secondary">{secondaryText}</span>
                )}
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
