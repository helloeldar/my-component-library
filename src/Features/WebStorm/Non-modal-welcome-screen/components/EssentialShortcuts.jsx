import { SearchIcon, HistoryIcon, OpenIcon, MoreVerticalIcon } from '../../../../icons';
import './EssentialShortcuts.css';

function EssentialShortcuts() {
    const shortcuts = [
        {
            icon: 'search',
            title: 'Search Everywhere',
            description: 'Global search across classes, files, and actions',
            shortcut: ['Double', '⇧']
        },
        {
            icon: 'file',
            title: 'Go to File',
            description: 'Search and open files',
            shortcut: ['⇧', '⌘', 'O']
        },
        {
            icon: 'history',
            title: 'Recent Files',
            description: 'Navigate between recent files',
            shortcut: ['⌘', 'E']
        },
        {
            icon: 'history',
            title: 'Search in File',
            description: 'Find and replace in current file',
            shortcut: ['⌘', 'F']
        },
        {
            icon: 'terminal',
            title: 'Toggle Terminal',
            description: '',
            shortcut: ['⌥', 'F', '12']
        }
    ];

    const renderIcon = (iconName) => {
        const iconStyle = { width: '16px', height: '16px', color: '#6B9BFA' };
        switch (iconName) {
            case 'search':
                return <SearchIcon style={iconStyle} />;
            case 'file':
                return <OpenIcon style={iconStyle} />;
            case 'history':
                return <HistoryIcon style={iconStyle} />;
            case 'terminal':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="3" width="12" height="10" rx="1" stroke="#6B9BFA" strokeWidth="1.5" fill="none"/>
                        <path d="M5 7L7 9L5 11" stroke="#6B9BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <path d="M9 9H12" stroke="#6B9BFA" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="essential-shortcuts" data-name="Essential Shortcuts">
            <div className="essential-shortcuts-header" data-name="AIA Tool window Header">
                <div className="essential-shortcuts-label" data-name="Label">
                    <p>Essential Shortcuts</p>
                </div>
                <div className="essential-shortcuts-icons" data-name="Icons">
                    <div className="essential-shortcuts-icon-button" data-name="Toolbar / Icon">
                        <MoreVerticalIcon style={{ width: '16px', height: '16px', color: '#CED0D6' }} />
                    </div>
                    <div className="essential-shortcuts-icon-button" data-name="Toolbar / Icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 8L12 8" stroke="#CED0D6" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="essential-shortcuts-content" data-name="Content">
                <div className="essential-shortcuts-list" data-name="Content">
                    {shortcuts.map((shortcut, index) => (
                        <div key={index} className="essential-shortcut-item" data-name="Action 01">
                            <div className="essential-shortcut-icon" data-name="general / search">
                                {renderIcon(shortcut.icon)}
                            </div>
                            <div className="essential-shortcut-info" data-name="Info">
                                <p className="essential-shortcut-title">{shortcut.title}</p>
                                {shortcut.description && (
                                    <p className="essential-shortcut-description">{shortcut.description}</p>
                                )}
                            </div>
                            <div className="essential-shortcut-keys" data-name="Shortcut">
                                {shortcut.shortcut.map((key, keyIndex) => (
                                    <div key={keyIndex} className="shortcut-key" data-name="_Shortcut Key">
                                        <p>{key}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="essential-shortcuts-link" data-name="Link">
                        <p>Configure keymap…</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EssentialShortcuts;

