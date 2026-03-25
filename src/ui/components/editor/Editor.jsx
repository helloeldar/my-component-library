import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Editor as PrismEditor } from 'prism-react-editor';
import { grammarsRegistered } from './registerGrammars';
import EditorGutter from './EditorGutter';
import Icon from '../icon/Icon';
import './Editor.css';
import 'prism-react-editor/layout.css';

if (!grammarsRegistered) {
    console.warn('Editor: Prism grammars failed to register');
}

const EMPTY_BREAKPOINTS = [];

const DEFAULT_READER_MODE_TOOLTIP = {
    title: 'Exit Reader Mode',
    body: 'The Reader mode makes the code convenient to read by showing documentation as formatted text, font ligatures, code vision hints with the number of usages, and more',
    linkText: 'Configure...',
};

function ReaderModeBadge({ onClose, label = 'Reader Mode', tooltip = DEFAULT_READER_MODE_TOOLTIP }) {
    const [hovered, setHovered] = useState(false);
    const tt = { ...DEFAULT_READER_MODE_TOOLTIP, ...tooltip };

    return (
        <div
            className="editor-reader-mode"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <button className="editor-reader-mode-badge" onClick={onClose}>
                <span className="editor-reader-mode-close">
                    <Icon name="general/closeSmall" size={16} />
                </span>
                <span className="editor-reader-mode-label">{label}</span>
            </button>
            {hovered && (
                <div className="editor-reader-mode-tooltip">
                    <div className="editor-reader-mode-tooltip-title">{tt.title}</div>
                    <div className="editor-reader-mode-tooltip-body">{tt.body}</div>
                    <button className="editor-reader-mode-tooltip-link" onClick={onClose}>
                        {tt.linkText}
                    </button>
                </div>
            )}
        </div>
    );
}

function Editor({
    code = '',
    language = 'javascript',
    showLineNumbers = true,
    readOnly = false,
    breakpoints: initialBreakpoints = EMPTY_BREAKPOINTS,
    onBreakpointToggle,
    onExitReaderMode,
    onChange,
    gutterActions = [],
    readerModeLabel,
    readerModeTooltip,
    showReaderMode: showReaderModeProp,
    className = '',
    ...props
}) {
    const serializedBp = JSON.stringify(initialBreakpoints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const stableBreakpoints = useMemo(() => initialBreakpoints, [serializedBp]);

    const [breakpoints, setBreakpoints] = useState(() => new Set(initialBreakpoints));
    const [activeLine, setActiveLine] = useState(1);
    const [lineCount, setLineCount] = useState(() => code.split('\n').length);
    const [isFocused, setIsFocused] = useState(false);
    const [readerModeDismissed, setReaderModeDismissed] = useState(false);
    const editorRef = useRef(null);
    const gutterRef = useRef(null);
    const correctedLineEl = useRef(null);

    useEffect(() => {
        setBreakpoints(new Set(stableBreakpoints));
    }, [stableBreakpoints]);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor?.container) return;

        const container = editor.container;
        const textarea = editor.textarea;

        const handleScroll = () => {
            if (gutterRef.current) {
                gutterRef.current.scrollTop = container.scrollTop;
            }
        };

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        container.addEventListener('scroll', handleScroll);
        if (textarea) {
            textarea.addEventListener('focus', handleFocus);
            textarea.addEventListener('blur', handleBlur);
        }

        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (textarea) {
                textarea.removeEventListener('focus', handleFocus);
                textarea.removeEventListener('blur', handleBlur);
            }
        };
    }, []);

    const handleBreakpointToggle = useCallback((line) => {
        setBreakpoints(prev => {
            const next = new Set(prev);
            if (next.has(line)) next.delete(line);
            else next.add(line);
            return next;
        });
        onBreakpointToggle?.(line);
    }, [onBreakpointToggle]);

    const handleUpdate = useCallback((value, editor) => {
        setLineCount(value.split('\n').length);
        setActiveLine(editor.activeLine);
    }, []);

    const handleSelectionChange = useCallback((selection, value, editor) => {
        if (correctedLineEl.current) {
            correctedLineEl.current.classList.remove('active-line');
            correctedLineEl.current = null;
        }

        let line = editor.activeLine;
        const [start, end] = selection;
        if (start < end && value[end - 1] === '\n') {
            const corrected = Math.max(1, line - 1);
            if (corrected !== line) {
                const lines = editor.lines;
                lines[line]?.classList.remove('active-line');
                lines[corrected]?.classList.add('active-line');
                correctedLineEl.current = lines[corrected];
                line = corrected;
            }
        }
        setActiveLine(line);
    }, []);

    const handleExitReaderMode = useCallback(() => {
        setReaderModeDismissed(true);
        onExitReaderMode?.();
    }, [onExitReaderMode]);

    const showReaderMode = showReaderModeProp !== undefined
        ? showReaderModeProp && !readerModeDismissed
        : readOnly && !readerModeDismissed;

    return (
        <div className={`editor ${className} ${showLineNumbers ? 'editor-with-gutter' : ''} ${isFocused ? 'editor-focused' : ''}`} {...props}>
            {showLineNumbers && (
                <EditorGutter
                    ref={gutterRef}
                    lineCount={lineCount}
                    activeLine={activeLine}
                    breakpoints={breakpoints}
                    onBreakpointToggle={handleBreakpointToggle}
                    gutterActions={gutterActions}
                    isFocused={isFocused}
                />
            )}
            <div className="editor-code">
                {showReaderMode && (
                    <ReaderModeBadge
                        onClose={handleExitReaderMode}
                        label={readerModeLabel}
                        tooltip={readerModeTooltip}
                    />
                )}
                <PrismEditor
                    ref={editorRef}
                    language={language}
                    value={code}
                    lineNumbers={false}
                    readOnly={readOnly}
                    onUpdate={handleUpdate}
                    onChange={onChange}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    );
}

export default Editor;
