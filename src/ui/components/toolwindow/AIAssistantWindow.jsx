import React from 'react';
import ToolWindow from './ToolWindow';
import './AIAssistantWindow.css';

const defaultMessages = [
    { role: 'user', content: 'Explain this function' },
    { 
        role: 'assistant', 
        content: (
            <>
                This function calculates the bivariate interpolation using a polynomial basis. It takes two parameters:
                <ul>
                    <li><code>x</code> — the first variable</li>
                    <li><code>y</code> — the second variable</li>
                </ul>
                The return value is a <code>double</code> representing the interpolated result.
            </>
        )
    },
    { role: 'user', content: 'Can you refactor it to use streams?' },
    { role: 'assistant', content: 'Generating response...', loading: true }
];

/**
 * AIAssistantWindow - A standalone AI Assistant tool window component.
 * 
 * Can be used independently for prototypes or embedded inside Main Window (IDELayout).
 * Renders a chat-like interface with user prompts and AI responses.
 * 
 * @param {string} title - Window title (default: "AI Assistant")
 * @param {number|string} width - Window width (default: 380)
 * @param {number|string} height - Window height (default: 450)
 * @param {Array} messages - Chat messages. Each: { role: 'user'|'assistant', content: string|ReactNode, loading?: boolean }
 * @param {string} placeholder - Input placeholder text (default: "Ask a question...")
 * @param {boolean} empty - Show empty state instead of messages (default: false)
 * @param {Array} actions - Header action buttons (default: ['add', 'more', 'minimize'])
 * @param {string} className - Additional CSS classes
 */
function AIAssistantWindow({
    title = "AI Assistant",
    width = 380,
    height = 450,
    messages = defaultMessages,
    placeholder = "Ask a question...",
    empty = false,
    actions = ['add', 'more', 'minimize'],
    className = "",
    ...props
}) {
    return (
        <ToolWindow
            title={title}
            width={width}
            height={height}
            actions={actions}
            className={`ai-assistant-window ${className}`}
            {...props}
        >
            {empty ? (
                <div className="ai-assistant-empty">
                    <div className="ai-assistant-empty-text">
                        Ask AI Assistant anything about your code
                    </div>
                    <div className="ai-assistant-input-placeholder">
                        {placeholder}
                    </div>
                </div>
            ) : (
                <div className="ai-assistant-chat">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`ai-assistant-message ${
                                msg.role === 'user' ? 'ai-assistant-message-user' : 'ai-assistant-message-assistant'
                            }${msg.loading ? ' ai-assistant-message-loading' : ''}`}
                        >
                            {msg.content}
                        </div>
                    ))}
                </div>
            )}
        </ToolWindow>
    );
}

export default AIAssistantWindow;
