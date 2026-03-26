import { useState } from 'react';
import Tab from './Tab';
import ToolbarIconButton from '../iconbutton/IconButton';
import './TabBar.css';

const actionIcons = {
    add: 'general/add',
    dropdown: 'general/chevronDown',
};

function TabBar({
    tabs: tabsProp = [],
    activeTab: controlledActiveTab,
    onTabChange,
    onTabClose,
    focused = false,
    direction = 'horizontal',
    wrap = false,
    actions,
    onActionClick,
    className = '',
}) {
    // Controlled vs uncontrolled mode
    const isControlled = controlledActiveTab !== undefined;
    const [internalActiveTab, setInternalActiveTab] = useState(0);
    const [internalTabs, setInternalTabs] = useState(tabsProp);

    const activeTab = isControlled ? controlledActiveTab : internalActiveTab;
    const tabs = isControlled ? tabsProp : internalTabs;

    const handleTabClick = (index) => {
        if (onTabChange) onTabChange(index);
        if (!isControlled) setInternalActiveTab(index);
    };

    const handleTabClose = (index) => {
        if (onTabClose) {
            onTabClose(index);
        } else if (!isControlled) {
            const newTabs = internalTabs.filter((_, i) => i !== index);
            setInternalTabs(newTabs);

            if (index === internalActiveTab && internalActiveTab > 0) {
                setInternalActiveTab(internalActiveTab - 1);
            } else if (index < internalActiveTab) {
                setInternalActiveTab(internalActiveTab - 1);
            }
        }
    };

    let classes = ['tab-bar'];
    if (direction === 'vertical') {
        classes.push('tab-bar-vertical');
    } else {
        classes.push('tab-bar-horizontal');
        if (wrap) {
            classes.push('tab-bar-wrap');
        }
    }
    if (className) {
        classes.push(className);
    }

    return (
        <div className={classes.join(' ')}>
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    label={tab.label}
                    icon={tab.icon}
                    count={tab.count}
                    active={index === activeTab}
                    focused={focused}
                    closable={tab.closable}
                    onClick={() => handleTabClick(index)}
                    onClose={() => handleTabClose(index)}
                />
            ))}
            {actions && actions.length > 0 && (
                <div className="tab-bar-actions">
                    {actions.map((action, i) => (
                        actionIcons[action] && (
                            <ToolbarIconButton
                                key={i}
                                icon={actionIcons[action]}
                                onClick={() => onActionClick && onActionClick(action)}
                            />
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

export default TabBar;
