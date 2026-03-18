import { forwardRef, useMemo } from 'react';
import Icon from '../icon/Icon';

const EditorGutter = forwardRef(function EditorGutter({
    lineCount = 1,
    activeLine = 1,
    breakpoints = new Set(),
    onBreakpointToggle,
    gutterActions = [],
    isFocused = true,
}, ref) {
    const actionsMap = useMemo(() => {
        const map = {};
        gutterActions.forEach(action => {
            if (!map[action.line]) map[action.line] = [];
            map[action.line].push(action);
        });
        return map;
    }, [gutterActions]);

    const lines = useMemo(
        () => Array.from({ length: lineCount }, (_, i) => i + 1),
        [lineCount]
    );

    return (
        <div className="editor-gutter" ref={ref}>
            <div className="editor-gutter-inner">
                {lines.map(lineNum => {
                    const hasBreakpoint = breakpoints.has(lineNum);
                    const isActive = lineNum === activeLine;
                    const lineActions = actionsMap[lineNum];

                    return (
                        <div
                            key={lineNum}
                            className={`editor-gutter-row${isActive ? ' active' : ''}`}
                        >
                            <div
                                className={`editor-gutter-line-number${hasBreakpoint ? ' breakpoint' : ''}`}
                                onClick={() => onBreakpointToggle?.(lineNum)}
                            >
                                {hasBreakpoint ? (
                                    <span className="editor-breakpoint-dot" />
                                ) : (
                                    <span className="editor-line-num">{lineNum}</span>
                                )}
                            </div>
                            {lineActions && (
                                <div className="editor-gutter-actions">
                                    {lineActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            className="editor-gutter-action"
                                            onClick={action.onClick}
                                            title={action.tooltip}
                                        >
                                            {action.icon && <Icon name={action.icon} size={12} />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default EditorGutter;
