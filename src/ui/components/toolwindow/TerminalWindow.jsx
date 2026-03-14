import React from 'react';
import ToolWindow from './ToolWindow';
import './TerminalWindow.css';

/**
 * TerminalWindow - A standalone terminal tool window component.
 * 
 * Can be used independently for prototypes or embedded inside Main Window (IDELayout).
 * Renders a terminal-style interface with monospace text and command prompt.
 * 
 * @param {string} title - Window title (default: "Terminal")
 * @param {number|string} width - Window width (default: 600)
 * @param {number|string} height - Window height (default: 250)
 * @param {Array} tabs - Terminal session tabs (default: single "Local" tab)
 * @param {number} activeTab - Active tab index (default: 0)
 * @param {Function} onTabChange - Tab change callback
 * @param {Array} actions - Header action buttons (default: ['add', 'more', 'minimize'])
 * @param {Array} lines - Terminal output lines. Each line is { text, type? } where type is 'command', 'output', 'success', or 'prompt'
 * @param {string} className - Additional CSS classes
 */
function TerminalWindow({
    title = "Terminal",
    width = 600,
    height = 250,
    tabs = [{ label: 'Local', closable: true }],
    activeTab = 0,
    onTabChange,
    actions = ['add', 'more', 'minimize'],
    lines = [
        { text: 'user@machine:~/projects/intellij$ git status', type: 'command' },
        { text: 'On branch main', type: 'output' },
        { text: 'Your branch is up to date with \'origin/main\'.', type: 'output' },
        { text: 'user@machine:~/projects/intellij$ _', type: 'prompt' }
    ],
    className = "",
    ...props
}) {
    const renderLine = (line, index) => {
        if (typeof line === 'string') {
            return <div key={index}>{line}</div>;
        }

        const { text, type } = line;

        if (type === 'command' || type === 'prompt') {
            const parts = text.match(/^(.+?)(:\s*)(.+?)(\$\s*.*)$/);
            if (parts) {
                return (
                    <div key={index} style={type === 'prompt' ? { marginTop: '8px' } : undefined}>
                        <span className="terminal-user">{parts[1]}</span>
                        {parts[2]}
                        <span className="terminal-path">{parts[3]}</span>
                        {parts[4]}
                    </div>
                );
            }
            return <div key={index}>{text}</div>;
        }

        if (type === 'success') {
            return <div key={index} className="terminal-success">{text}</div>;
        }

        return <div key={index}>{text}</div>;
    };

    return (
        <ToolWindow
            title={title}
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
            <div className="terminal-content">
                {lines.map(renderLine)}
            </div>
        </ToolWindow>
    );
}

export default TerminalWindow;
