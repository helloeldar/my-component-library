import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import ToolWindow from './ToolWindow';
import Popup from '../popup/Popup';
import PopupCell from '../popup/PopupCell';
import ToolbarIconButton from '../iconbutton/IconButton';
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

const chevronMenuItems = [
    { label: 'bash' },
    { label: 'zsh' },
    { label: 'New SSH Session...' },
    { type: 'separator' },
    { label: 'Settings', icon: 'general/settings' },
];

const moreMenuItems = [
    { label: 'Terminal Engine', submenu: true },
    { label: 'Settings', icon: 'general/settings' },
    { type: 'separator' },
    { label: 'Close All' },
    { label: 'Show Toolbar', icon: 'general/checkmark' },
    { label: 'View Mode', submenu: true },
    { label: 'Move to', submenu: true },
    { label: 'Resize', submenu: true },
    { type: 'separator' },
    { label: 'Remove from Sidebar' },
];

const headerContextMenuItems = [
    { label: 'Rename Session' },
    { label: 'Move to Editor' },
    { label: 'Terminal Engine', submenu: true },
    { label: 'Settings', icon: 'general/settings' },
    { type: 'separator' },
    { label: 'Close All' },
    { label: 'Show Toolbar', icon: 'general/checkmark' },
    { label: 'Group Tabs' },
    { label: 'View Mode', submenu: true },
    { label: 'Move to', submenu: true },
    { label: 'Resize', submenu: true },
    { type: 'separator' },
    { label: 'Remove from Sidebar' },
    { type: 'separator' },
    { label: 'Hide', shortcut: '⇧⎋' },
];

/**
 * Smart popup positioning: default bottom-right, flip left/top when no space.
 * Coordinates are viewport-relative (for position: fixed).
 */
function positionPopup(popupEl, anchor, gap = 4) {
    if (!popupEl) return;
    // Measure the .popup child — position:absolute child doesn't contribute
    // to the wrapper's dimensions, so wrapper rect would be 0×0
    const popup = popupEl.querySelector('.popup') || popupEl;
    const popupRect = popup.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const anchorBottom = anchor.bottom ?? anchor.y;
    const anchorTop = anchor.top ?? anchor.y;
    const anchorLeft = anchor.left ?? anchor.x;
    const anchorRight = anchor.right ?? anchor.x;

    // Default: below anchor, left-aligned
    let top = anchorBottom + gap;
    let left = anchorLeft;

    // Flip up if no space below
    if (top + popupRect.height > vh) {
        top = anchorTop - gap - popupRect.height;
    }

    // Flip left if no space on right
    if (left + popupRect.width > vw) {
        left = anchorRight - popupRect.width;
    }

    popupEl.style.top = `${top}px`;
    popupEl.style.left = `${left}px`;
    popupEl.style.opacity = '1';
}

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
    const [chevronMenu, setChevronMenu] = useState(null);
    const [moreMenu, setMoreMenu] = useState(null);
    const [headerContextMenu, setHeaderContextMenu] = useState(null);
    const [currentInput, setCurrentInput] = useState('');
    const [internalBlocks, setInternalBlocks] = useState(blocksProp);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const searchInputRef = useRef(null);
    const hiddenInputRef = useRef(null);
    const wrapperRef = useRef(null);
    const scrollAreaRef = useRef(null);
    const toolWindowRef = useRef(null);
    const chevronPopupRef = useRef(null);
    const morePopupRef = useRef(null);
    const headerContextPopupRef = useRef(null);

    // Sync props to internal state (uncontrolled mode)
    useEffect(() => {
        if (!isControlled) setInternalTabs(tabsProp);
    }, [tabsProp, isControlled]);

    useEffect(() => {
        if (!isControlled && activeTabProp !== undefined) setInternalActiveTab(activeTabProp);
    }, [activeTabProp, isControlled]);

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

    // Position chevron popup after render (before paint)
    useLayoutEffect(() => {
        if (chevronMenu && chevronPopupRef.current) {
            positionPopup(chevronPopupRef.current, chevronMenu.triggerRect);
        }
    }, [chevronMenu]);

    // Position more popup after render (before paint)
    useLayoutEffect(() => {
        if (moreMenu && morePopupRef.current) {
            positionPopup(morePopupRef.current, moreMenu.triggerRect);
        }
    }, [moreMenu]);

    // Position header context menu after render (before paint)
    useLayoutEffect(() => {
        if (headerContextMenu && headerContextPopupRef.current) {
            positionPopup(headerContextPopupRef.current, headerContextMenu, 0);
        }
    }, [headerContextMenu]);

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

    // Close all popups
    const closeAllPopups = useCallback(() => {
        setContextMenu(null);
        setChevronMenu(null);
        setMoreMenu(null);
        setHeaderContextMenu(null);
    }, []);

    const anyPopupOpen = contextMenu || chevronMenu || moreMenu || headerContextMenu;

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
        if (tabs.length <= 1) {
            if (onActionClickProp) onActionClickProp('minimize');
            return;
        }
        if (onTabClose) {
            onTabClose(index);
        } else if (!isControlled) {
            setInternalTabs(prev => {
                const next = prev.filter((_, i) => i !== index);
                setInternalActiveTab(current => {
                    if (current >= next.length) return next.length - 1;
                    if (index < current) return current - 1;
                    return current;
                });
                return next;
            });
        }
    }, [tabs, onTabClose, isControlled, onActionClickProp]);

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
        } else if (action === 'dropdown') {
            setMoreMenu(null);
            setHeaderContextMenu(null);
            setChevronMenu(prev => {
                if (prev) return null;
                const btn = toolWindowRef.current?.querySelector('.tab-bar-actions .tool-window-action-button:last-child');
                return btn ? { triggerRect: btn.getBoundingClientRect() } : null;
            });
        } else if (action === 'more') {
            setChevronMenu(null);
            setHeaderContextMenu(null);
            setMoreMenu(prev => {
                if (prev) return null;
                const btn = toolWindowRef.current?.querySelector('.tool-window-header-actions .tool-window-action-button:first-child');
                return btn ? { triggerRect: btn.getBoundingClientRect() } : null;
            });
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

    const handleHeaderContextMenu = useCallback((e) => {
        e.preventDefault();
        setHeaderContextMenu({ x: e.clientX, y: e.clientY });
        setChevronMenu(null);
        setMoreMenu(null);
        setContextMenu(null);
    }, []);

    const renderMenuItems = (items, onItemClick) =>
        items.map((item, i) =>
            item.type === 'separator' ? (
                <PopupCell key={i} type="separator" />
            ) : (
                <PopupCell
                    key={i}
                    type="line"
                    icon={item.icon}
                    iconGap={!item.icon && items.some(it => it.icon)}
                    shortcut={item.shortcut}
                    submenu={item.submenu}
                    selected={item.selected}
                    onClick={() => onItemClick && onItemClick(item)}
                >
                    {item.label}
                </PopupCell>
            )
        );

    return (
        <div
            className={[
                'terminal-window-wrapper',
                chevronMenu && 'terminal-dropdown-active',
                moreMenu && 'terminal-more-active',
            ].filter(Boolean).join(' ')}
            ref={toolWindowRef}
            onContextMenu={(e) => {
                // Only handle right-click on the header area (not the terminal content)
                const header = toolWindowRef.current?.querySelector('.tool-window-header');
                if (header && header.contains(e.target)) {
                    handleHeaderContextMenu(e);
                }
            }}
        >
        {/* Click-away overlay to close any open popup */}
        {anyPopupOpen && (
            <div className="terminal-popup-overlay" onClick={closeAllPopups} />
        )}
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
                            <ToolbarIconButton
                                icon="general/chevronUp"
                                tooltip="Previous match"
                                className="terminal-search-btn"
                            />
                            <ToolbarIconButton
                                icon="general/chevronDown"
                                tooltip="Next match"
                                className="terminal-search-btn"
                            />
                        </div>
                        <ToolbarIconButton
                            icon="general/closeSmall"
                            tooltip="Close"
                            onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                            className="terminal-search-btn"
                        />
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

            {/* Chevron dropdown (shell selector) */}
            {chevronMenu && (
                <div ref={chevronPopupRef} className="terminal-popup-menu" style={{ opacity: 0 }}>
                    <Popup visible>
                        {renderMenuItems(chevronMenuItems, closeAllPopups)}
                    </Popup>
                </div>
            )}

            {/* Three dots (more) menu */}
            {moreMenu && (
                <div ref={morePopupRef} className="terminal-popup-menu" style={{ opacity: 0 }}>
                    <Popup visible>
                        {renderMenuItems(moreMenuItems, closeAllPopups)}
                    </Popup>
                </div>
            )}

            {/* Header right-click context menu */}
            {headerContextMenu && (
                <div ref={headerContextPopupRef} className="terminal-popup-menu" style={{ opacity: 0 }}>
                    <Popup visible>
                        {renderMenuItems(headerContextMenuItems, closeAllPopups)}
                    </Popup>
                </div>
            )}
        </div>
    );
}

export default TerminalWindow;
