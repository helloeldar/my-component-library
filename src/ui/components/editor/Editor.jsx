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

function ReaderModeBadge({ onClose }) {
    const [hovered, setHovered] = useState(false);

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
                <span className="editor-reader-mode-label">Reader Mode</span>
            </button>
            {hovered && (
                <div className="editor-reader-mode-tooltip">
                    <div className="editor-reader-mode-tooltip-title">Exit Reader Mode</div>
                    <div className="editor-reader-mode-tooltip-body">
                        The Reader mode makes the code convenient to read by showing
                        documentation as formatted text, font ligatures, code vision hints
                        with the number of usages, and more
                    </div>
                    <button className="editor-reader-mode-tooltip-link" onClick={onClose}>
                        Configure...
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
    gutterActions = [],
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

    const showReaderMode = readOnly && !readerModeDismissed;

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
                    <ReaderModeBadge onClose={handleExitReaderMode} />
                )}
                <PrismEditor
                    ref={editorRef}
                    language={language}
                    value={code}
                    lineNumbers={false}
                    readOnly={readOnly}
                    onUpdate={handleUpdate}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    );
}

export default Editor;
