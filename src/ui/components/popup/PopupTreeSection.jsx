import { useState } from 'react';
import Icon from '../icon/Icon';
import './PopupTreeSection.css';

function PopupTreeSection({
    title,
    defaultOpen = true,
    children,
    className = '',
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const headerClasses = [
        'popup-tree-section-header',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="popup-tree-section">
            <div className={headerClasses} onClick={() => setIsOpen(!isOpen)}>
                <div className={`popup-tree-section-chevron ${isOpen ? '' : 'popup-tree-section-chevron-collapsed'}`}>
                    <Icon name="general/chevronDown" size={16} />
                </div>
                <span className="text-ui-default">{title}</span>
            </div>
            {isOpen && (
                <div className="popup-tree-section-children">
                    {children}
                </div>
            )}
        </div>
    );
}

export default PopupTreeSection;
