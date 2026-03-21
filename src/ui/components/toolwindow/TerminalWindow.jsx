import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import ToolWindow from './ToolWindow';
import Popup from '../popup/Popup';
import PopupCell from '../popup/PopupCell';
import Icon from '../icon/Icon';
import './TerminalWindow.css';

/**
 * TerminalWindow - A standalone terminal tool window component.
 *
 * Can be used independently for prototypes or embedded inside Main Window.
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
    tabs: tabsProp = [{ label: 'Local', closable: true }],
    activeTab: activeTabProp,
    onTabChange,
    onTabAdd,
    onTabClose,
    onActionClick: onActionClickProp,
    actions = ['more', 'minimize'],
    blocks: blocksProp = defaultBlocks,
    input = defaultInput,
    showSearch: showSearchProp = false,
    focused: focusedProp,
    onCommand,
    className = "",
    ...props
}) {
    // Controlled vs uncontrolled tab management
    const isControlled = onTabChange !== undefined;
    const [internalTabs, setInternalTabs] = useState(tabsProp);
    const [internalActiveTab, setInternalActiveTab] = useState(0);
    const tabCounter = useRef(0);

    const tabs = isControlled ? tabsProp : internalTabs;
    const activeTab = isControlled ? (activeTabProp ?? 0) : internalActiveTab;

    // Focus tracking for standalone mode
    const isFocusControlled = focusedProp !== undefined;
    const [internalFocused, setInternalFocused] = useState(false);
    const focused = isFocusControlled ? focusedProp : internalFocused;

    const [showSearch, setShowSearch] = useState(showSearchProp);
    const [searchQuery, setSearchQuery] = useState('');
    const [contextMenu, setContextMenu] = useState(null);
    const [currentInput, setCurrentInput] = useState('');
    const [internalBlocks, setInternalBlocks] = useState(blocksProp);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const searchInputRef = useRef(null);
    const hiddenInputRef = useRef(null);
    const wrapperRef = useRef(null);
    const scrollAreaRef = useRef(null);

    // Sync blocks prop to internal state
    useEffect(() => {
        setInternalBlocks(blocksProp);
    }, [blocksProp]);

    // Sync prop
    useEffect(() => {
        setShowSearch(showSearchProp);
    }, [showSearchProp]);

    // Auto-scroll to bottom on mount and when blocks/input change
    useLayoutEffect(() => {
        const el = scrollAreaRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [internalBlocks, input, currentInput]);

    // Focus hidden input when clicking on the terminal area
    const focusInput = useCallback(() => {
        if (hiddenInputRef.current && !showSearch) {
            hiddenInputRef.current.focus();
        }
    }, [showSearch]);

    // Handle terminal input keydown (typing, Enter, history)
    const handleTerminalInputKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && currentInput.trim()) {
            e.preventDefault();
            const command = currentInput.trim();
            // Append the typed command as a new block
            const newBlock = {
                path: input?.path || '~',
                lines: [{ type: 'command', text: command }],
            };
            setInternalBlocks(prev => [...prev, newBlock]);
            setCommandHistory(prev => [command, ...prev]);
            setHistoryIndex(-1);
            setCurrentInput('');
            if (onCommand) onCommand(command);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setCommandHistory(prev => {
                const nextIndex = historyIndex + 1;
                if (nextIndex < prev.length) {
                    setHistoryIndex(nextIndex);
                    setCurrentInput(prev[nextIndex]);
                }
                return prev;
            });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setCurrentInput(commandHistory[nextIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCurrentInput('');
            }
        }
    }, [currentInput, input, historyIndex, commandHistory, onCommand]);

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

    const renderCommandBlock = (block, index, showSeparator) => (
        <React.Fragment key={index}>
            <div className="terminal-command-block">
                <div className="terminal-command-block-inner">
                    <div className="terminal-path-and-command text-editor-default">
                        <p className="terminal-prompt-path">{block.path}</p>
                        {block.lines && block.lines.map(renderBlockLine)}
                    </div>
                </div>
                {showSeparator && (
                    <div className="terminal-block-separator">
                        <div className="terminal-block-separator-line" />
                    </div>
                )}
            </div>
        </React.Fragment>
    );

    const renderInputBlock = () => {
        if (!input) return null;
        const showGhost = !currentInput && input.ghost;
        return (
            <div className="terminal-command-block terminal-input-block" onClick={focusInput}>
                <div className="terminal-command-block-inner">
                    <div className="terminal-path-and-command text-editor-default">
                        <p className="terminal-prompt-path">{input.path}</p>
                        {input.branch && (
                            <p className="terminal-input-branch">git:({input.branch})</p>
                        )}
                        <div className="terminal-input-cursor-line">
                            {currentInput && <span className="terminal-typed-text">{currentInput}</span>}
                            <span className="terminal-cursor" />
                            {showGhost && <span className="terminal-ghost">{input.ghost}</span>}
                        </div>
                        <input
                            ref={hiddenInputRef}
                            className="terminal-hidden-input"
                            type="text"
                            value={currentInput}
                            onChange={(e) => {
                                setCurrentInput(e.target.value);
                                setHistoryIndex(-1);
                            }}
                            onKeyDown={handleTerminalInputKeyDown}
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const handleTabChange = useCallback((index) => {
        if (onTabChange) onTabChange(index);
        if (!isControlled) setInternalActiveTab(index);
    }, [onTabChange, isControlled]);

    const handleTabClose = useCallback((index) => {
        if (onTabClose) {
            onTabClose(index);
        } else if (!isControlled) {
            setInternalTabs(prev => {
                if (prev.length <= 1) return prev;
                const next = prev.filter((_, i) => i !== index);
                setInternalActiveTab(current => {
                    if (current >= next.length) return next.length - 1;
                    if (index < current) return current - 1;
                    return current;
                });
                return next;
            });
        }
    }, [onTabClose, isControlled]);

    const handleTabAdd = useCallback(() => {
        if (onTabAdd) {
            onTabAdd();
        } else if (!isControlled) {
            tabCounter.current += 1;
            const n = tabCounter.current;
            setInternalTabs(prev => {
                const next = [...prev, { label: `Local (${n})`, closable: true }];
                setInternalActiveTab(next.length - 1);
                return next;
            });
        }
    }, [onTabAdd, isControlled]);

    const handleActionClick = useCallback((action, payload) => {
        if (action === 'tabClose') {
            handleTabClose(payload);
        } else if (action === 'add') {
            handleTabAdd();
        }
        if (onActionClickProp) onActionClickProp(action, payload);
    }, [handleTabClose, handleTabAdd, onActionClickProp]);

    const handleFocus = useCallback(() => {
        if (!isFocusControlled) setInternalFocused(true);
    }, [isFocusControlled]);

    const handleBlur = useCallback((e) => {
        if (!isFocusControlled && wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
            setInternalFocused(false);
        }
    }, [isFocusControlled]);

    return (
        <ToolWindow
            title={title}
            width={width}
            height={height}
            headerType="tabs"
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onActionClick={handleActionClick}
            showSeparator={true}
            actions={actions}
            focused={focused}
            className={`terminal-window ${className}`}
            {...props}
        >
            <div
                className="terminal-content-wrapper"
                ref={wrapperRef}
                onContextMenu={handleContextMenu}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
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

                {/* Single scrollable buffer: output blocks + input prompt */}
                <div className="terminal-output-area" ref={scrollAreaRef} onClick={focusInput}>
                    {internalBlocks.map((block, i) => {
                        // Show separator after every block if there's a next block or an input following
                        const hasNext = i < internalBlocks.length - 1 || !!input;
                        return renderCommandBlock(block, i, hasNext);
                    })}
                    {renderInputBlock()}
                </div>

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
