import React, { useState, useRef, useEffect, useCallback } from 'react';
import ToolWindow from './ToolWindow';
import Popup from '../popup/Popup';
import PopupCell from '../popup/PopupCell';
import Icon from '../icon/Icon';
import './TerminalWindow.css';

/**
 * TerminalWindow - A standalone terminal tool window component.
 *
 * Can be used independently for prototypes or embedded inside Main Window (IDELayout).
 * Renders a terminal-style interface with monospace text and command prompt.
 *
 * Supports:
 * - Structured line types: prompt, command, output, cursor, empty, ghost, error, success, link
 * - Right-click context menu (Copy, Paste, Select All, Clear Buffer, Find)
 * - Search overlay (Cmd/Ctrl+F) with match count and navigation
 * - AI inline completion ghost text
 * - Hyperlink rendering for file paths / URLs
 * - Tab management (add/close via header actions)
 *
 * @param {string} title - Window title (default: "Terminal")
 * @param {number|string} width - Window width (default: 600)
 * @param {number|string} height - Window height (default: 250)
 * @param {Array} tabs - Terminal session tabs (default: single "Local" tab)
 * @param {number} activeTab - Active tab index (default: 0)
 * @param {Function} onTabChange - Tab change callback
 * @param {Function} onTabAdd - Callback when "+" is clicked
 * @param {Function} onTabClose - Callback when a tab close button is clicked
 * @param {Array} actions - Header action buttons (default: ['more', 'minimize'])
 * @param {Array} blocks - Command blocks (each: { path, lines: [{ type, text }] })
 * @param {Object} input - Input area config ({ path, branch?, ghost? }) or null to hide
 * @param {boolean} showSearch - Force search overlay visible (default: false)
 * @param {string} className - Additional CSS classes
 *
 * Block line types:
 *   - { type: 'command', text: 'some command' }
 *   - { type: 'output', text: 'output text' }
 *   - { type: 'error', text: 'error message' }
 *   - { type: 'success', text: 'success message' }
 *   - { type: 'link', text: 'display text', href: 'url or path' }
 */

/**
 * Default command blocks matching Figma Terminal design.
 * Each block has a path, optional command/output lines, and optional separator.
 */
const defaultBlocks = [
    {
        path: '~/IdeaProjects',
        lines: [
            { type: 'command', text: 'cd intellij-community/productLogos/generated/idea' },
        ],
    },
    {
        path: '~/IdeaProjects/intellij-community/productLogos/generated/idea',
        lines: [
            { type: 'command', text: 'iconutil -c icns idea.iconset' },
        ],
    },
];

const defaultInput = {
    path: '~/IdeaProjects/intellij-community/productLogos/generated/idea',
    branch: 'main',
};

const contextMenuItems = [
    { label: 'Copy', shortcut: '⌘C' },
    { label: 'Paste', shortcut: '⌘V' },
    { label: 'Select All', shortcut: '⌘A' },
    { type: 'separator' },
    { label: 'Find...', shortcut: '⌘F' },
    { type: 'separator' },
    { label: 'Clear Buffer' },
];

function TerminalWindow({
    title = "Terminal",
    width = 600,
    height = 250,
    tabs = [{ label: 'Local', closable: true }],
    activeTab = 0,
    onTabChange,
    onTabAdd,
    onTabClose,
    actions = ['more', 'minimize'],
    blocks = defaultBlocks,
    input = defaultInput,
    showSearch: showSearchProp = false,
    className = "",
    ...props
}) {
    const [showSearch, setShowSearch] = useState(showSearchProp);
    const [searchQuery, setSearchQuery] = useState('');
    const [contextMenu, setContextMenu] = useState(null);
    const searchInputRef = useRef(null);
    const wrapperRef = useRef(null);

    // Sync prop
    useEffect(() => {
        setShowSearch(showSearchProp);
    }, [showSearchProp]);

    // Keyboard shortcut: Cmd/Ctrl+F
    const handleKeyDown = useCallback((e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
            e.preventDefault();
            setShowSearch(true);
            setTimeout(() => searchInputRef.current?.focus(), 0);
        }
        if (e.key === 'Escape') {
            setShowSearch(false);
            setContextMenu(null);
        }
    }, []);

    // Close context menu on outside click
    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        if (contextMenu) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [contextMenu]);

    const handleContextMenu = (e) => {
        e.preventDefault();
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (rect) {
            setContextMenu({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleContextMenuAction = (item) => {
        setContextMenu(null);
        if (item.label === 'Find...') {
            setShowSearch(true);
            setTimeout(() => searchInputRef.current?.focus(), 0);
        }
    };

    const renderBlockLine = (line, index) => {
        const { type } = line;
        if (type === 'command') {
            return <p key={index} className="terminal-command">{line.text}</p>;
        }
        if (type === 'output') {
            return <p key={index} className="terminal-output">{line.text}</p>;
        }
        if (type === 'error') {
            return <p key={index} className="terminal-error">{line.text}</p>;
        }
        if (type === 'success') {
            return <p key={index} className="terminal-success">{line.text}</p>;
        }
        if (type === 'link') {
            return (
                <p key={index}>
                    <span className="terminal-link" title={line.href}>{line.text || line.href}</span>
                </p>
            );
        }
        return <p key={index} className="terminal-output">{line.text || ''}</p>;
    };

    const renderCommandBlock = (block, index, isLast) => (
        <React.Fragment key={index}>
            <div className="terminal-command-block">
                <div className="terminal-command-block-inner">
                    <div className="terminal-path-and-command">
                        <p className="terminal-prompt-path">{block.path}</p>
                        {block.lines && block.lines.map(renderBlockLine)}
                    </div>
                </div>
                {!isLast && (
                    <div className="terminal-block-separator">
                        <div className="terminal-block-separator-line" />
                    </div>
                )}
            </div>
        </React.Fragment>
    );

    return (
        <ToolWindow
            title={title}
            icon="toolwindows/ terminal@20x20"
            width={width}
            height={height}
            headerType="tabs"
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            actions={actions}
            className={`terminal-window ${className}`}
            {...props}
        >
            <div
                className="terminal-content-wrapper"
                ref={wrapperRef}
                onContextMenu={handleContextMenu}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
            >
                {/* Search overlay */}
                {showSearch && (
                    <div className="terminal-search-overlay">
                        <input
                            ref={searchInputRef}
                            className="terminal-search-input"
                            type="text"
                            placeholder="Find in terminal..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setShowSearch(false);
                                    setSearchQuery('');
                                }
                            }}
                        />
                        <span className="terminal-search-count">0 results</span>
                        <div className="terminal-search-nav">
                            <button className="terminal-search-btn" title="Previous match">
                                <Icon name="general/chevronUp" size={16} />
                            </button>
                            <button className="terminal-search-btn" title="Next match">
                                <Icon name="general/chevronDown" size={16} />
                            </button>
                        </div>
                        <button
                            className="terminal-search-btn"
                            title="Close"
                            onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                        >
                            <Icon name="general/closeSmall" size={16} />
                        </button>
                    </div>
                )}

                {/* Command blocks output */}
                <div className="terminal-output-area">
                    {blocks.map((block, i) => renderCommandBlock(block, i, i === blocks.length - 1))}
                </div>

                {/* Input area at bottom */}
                {input && (
                    <div className="terminal-input-area">
                        <div className="terminal-input-header">
                            <span className="terminal-input-path">{input.path}</span>
                            {input.branch && (
                                <span className="terminal-input-branch">git:({input.branch})</span>
                            )}
                        </div>
                        <div className="terminal-input-cursor-line">
                            <span className="terminal-cursor" />
                            {input.ghost && <span className="terminal-ghost">{input.ghost}</span>}
                        </div>
                    </div>
                )}

                {/* Context menu */}
                {contextMenu && (
                    <div
                        className="terminal-context-menu"
                        style={{ left: contextMenu.x, top: contextMenu.y }}
                    >
                        <Popup visible>
                            {contextMenuItems.map((item, i) =>
                                item.type === 'separator' ? (
                                    <PopupCell key={i} type="separator" />
                                ) : (
                                    <PopupCell
                                        key={i}
                                        type="line"
                                        shortcut={item.shortcut}
                                        onClick={() => handleContextMenuAction(item)}
                                    >
                                        {item.label}
                                    </PopupCell>
                                )
                            )}
                        </Popup>
                    </div>
                )}
            </div>
        </ToolWindow>
    );
}

export default TerminalWindow;
