import React, { useState } from 'react';
import MainToolbar from '../showcase/MainToolbar';
import StripeContainer from '../stripe/StripeContainer';
import StripeIconButton from '../stripe/Stripe';
import StatusBar from '../statusbar/StatusBar';
import ToolWindow from '../toolwindow/ToolWindow';
import TerminalWindow from '../toolwindow/TerminalWindow';
import ProjectWindow from '../toolwindow/ProjectWindow';
import AIAssistantWindow from '../toolwindow/AIAssistantWindow';
import TabBar from '../tabs/TabBar';
import Editor from '../editor/Editor';
import './MainWindow.css';

/**
 * MainWindow component - IDE window layout using Island theme
 *
 * Layout structure:
 * - Main Toolbar (top)
 * - Left Stripe (vertical toolbar)
 * - Main Content Area (tool windows + editor)
 * - Right Stripe (vertical toolbar)
 * - Status Bar (bottom)
 */
function MainWindow({
    projectName = "intellij",
    projectIcon = "IJ",
    projectColor = "cobalt",
    branchName = "main",
    runConfig = "IDEA Community",
    runState = "default",
    className = "",
    ...props
}) {
    // Left stripe state
    const [leftStripeSelection, setLeftStripeSelection] = useState('project');
    const [showLeftPanel, setShowLeftPanel] = useState(true);

    // Right stripe state
    const [rightStripeSelection, setRightStripeSelection] = useState('ai');
    const [showRightPanel, setShowRightPanel] = useState(true);

    // Bottom stripe items state
    const [bottomStripeSelection, setBottomStripeSelection] = useState('terminal');
    const [showBottomPanel, setShowBottomPanel] = useState(true);

    // Focus tracking: which panel currently has focus ('editor', 'left', 'right', 'bottom')
    const [focusedPanel, setFocusedPanel] = useState('editor');

    // Editor tabs state
    const editorTabs = [
        { id: '1', label: 'FunctionUtils.java', icon: 'fileTypes/java', closable: true },
        { id: '2', label: 'add-hover.svg', icon: 'fileTypes/svg', closable: true },
        { id: '3', label: 'add.svg', icon: 'fileTypes/svg', closable: true },
        { id: '4', label: 'AdapterScript.java', icon: 'fileTypes/java', closable: true },
        { id: '5', label: 'AdapterScriptInterface.java', icon: 'fileTypes/java', closable: true },
    ];

    // Terminal tabs state
    const [activeTerminalTab, setActiveTerminalTab] = useState(0);
    const [terminalTabs, setTerminalTabs] = useState([
        { label: 'Local', closable: true },
    ]);
    const terminalTabCounter = React.useRef(0);

    const handleTerminalTabClose = (index) => {
        setTerminalTabs(prev => {
            if (prev.length <= 1) return prev;
            const next = prev.filter((_, i) => i !== index);
            setActiveTerminalTab(current => {
                if (current >= next.length) return next.length - 1;
                if (index < current) return current - 1;
                return current;
            });
            return next;
        });
    };

    const handleTerminalTabAdd = () => {
        terminalTabCounter.current += 1;
        const n = terminalTabCounter.current;
        setTerminalTabs(prev => [...prev, { label: `Local (${n})`, closable: true }]);
        setActiveTerminalTab(terminalTabs.length);
    };

    // Project tree data
    const projectTreeData = [
        {
            id: '1',
            label: projectName,
            icon: 'nodes/folder',
            isExpanded: true,
            children: [
                { id: '1-1', label: '.idea', icon: 'nodes/folder' },
                {
                    id: '1-2',
                    label: 'src',
                    icon: 'nodes/folder',
                    isExpanded: true,
                    children: [
                        {
                            id: '1-2-1',
                            label: 'java',
                            icon: 'nodes/folder',
                            isExpanded: true,
                            children: [
                                { id: '1-2-1-1', label: 'analysis', icon: 'nodes/folder' },
                                { id: '1-2-1-2', label: 'BivariateFunction.java', icon: 'fileTypes/java' },
                                { id: '1-2-1-3', label: 'FunctionUtils.java', icon: 'fileTypes/java' },
                                { id: '1-2-1-4', label: 'MultivariateFunction.java', icon: 'fileTypes/java' },
                                { id: '1-2-1-5', label: 'TrivariateFunction.java', icon: 'fileTypes/java' }
                            ]
                        },
                        { id: '1-2-2', label: 'polynomials', icon: 'nodes/folder' },
                        { id: '1-2-3', label: 'solver', icon: 'nodes/folder' }
                    ]
                },
                {
                    id: '1-3',
                    label: 'test',
                    icon: 'nodes/folder',
                    children: [
                        {
                            id: '1-3-1',
                            label: 'java',
                            icon: 'nodes/folder',
                            children: [
                                { id: '1-3-1-1', label: 'FunctionUtilsTest.java', icon: 'fileTypes/java' },
                                { id: '1-3-1-2', label: 'MonitoredFunction.java', icon: 'fileTypes/java' }
                            ]
                        }
                    ]
                },
                { id: '1-4', label: 'External Libraries', icon: 'nodes/ppLibFolder' }
            ]
        }
    ];

    const javaCode = [
        'package org.apache.commons.math4.analysis;',
        '',
        'import org.apache.commons.math4.analysis.function.Identity;',
        '',
        '/**',
        ' * Utility methods for manipulating function objects.',
        ' *',
        ' * @since 3.0',
        ' */',
        'public class FunctionUtils {',
        '',
        '    /**',
        '     * Composes functions.',
        '     *',
        '     * @param f List of functions.',
        '     * @return the composite function.',
        '     */',
        '    public static UnivariateFunction compose(final UnivariateFunction... f) {',
        '        return new UnivariateFunction() {',
        '            @Override',
        '            public double value(double x) {',
        '                double result = x;',
        '                for (int i = f.length - 1; i >= 0; i--) {',
        '                    result = f[i].value(result);',
        '                }',
        '                return result;',
        '            }',
        '        };',
        '    }',
        '',
        '    /**',
        '     * Adds functions.',
        '     *',
        '     * @param f List of functions.',
        '     * @return a function that computes the sum.',
        '     */',
        '    public static UnivariateFunction add(final UnivariateFunction... f) {',
        '        return new UnivariateFunction() {',
        '            @Override',
        '            public double value(double x) {',
        '                double result = f[0].value(x);',
        '                for (int i = 1; i < f.length; i++) {',
        '                    result += f[i].value(x);',
        '                }',
        '                return result;',
        '            }',
        '        };',
        '    }',
        '',
        '    /**',
        '     * Multiplies functions.',
        '     *',
        '     * @param f List of functions.',
        '     * @return a function that computes the product.',
        '     */',
        '    public static UnivariateFunction multiply(final UnivariateFunction... f) {',
        '        return new UnivariateFunction() {',
        '            @Override',
        '            public double value(double x) {',
        '                double result = f[0].value(x);',
        '                for (int i = 1; i < f.length; i++) {',
        '                    result *= f[i].value(x);',
        '                }',
        '                return result;',
        '            }',
        '        };',
        '    }',
        '',
        '    /**',
        '     * Returns the identity function.',
        '     *',
        '     * @return the identity function.',
        '     */',
        '    public static UnivariateFunction identity() {',
        '        return new Identity();',
        '    }',
        '}',
    ].join('\n');

    // Status bar breadcrumbs
    const breadcrumbs = [
        { label: projectName, module: true },
        { label: 'src' },
        { label: 'main' },
        { label: 'java' },
        { label: 'AdapterScript', icon: true, iconName: 'nodes/class' }
    ];

    // Status bar widgets
    const widgets = [
        { type: 'text', text: '39:34' },
        { type: 'text', text: 'LF' },
        { type: 'text', text: 'UTF-8' },
        { type: 'icon', iconName: 'general/unlocked' }
    ];

    const getStripeState = (panelType, id, isShown) => {
        if (!isShown) return 'default';
        const panelKey = panelType === 'left' ? leftStripeSelection :
                         panelType === 'right' ? rightStripeSelection :
                         bottomStripeSelection;
        if (panelKey !== id) return 'default';
        return focusedPanel === panelType ? 'selected' : 'inactive';
    };

    const handleLeftStripeClick = (id) => {
        if (leftStripeSelection === id) {
            setShowLeftPanel(!showLeftPanel);
        } else {
            setLeftStripeSelection(id);
            setShowLeftPanel(true);
        }
        setFocusedPanel('left');
    };

    const handleRightStripeClick = (id) => {
        if (rightStripeSelection === id) {
            setShowRightPanel(!showRightPanel);
        } else {
            setRightStripeSelection(id);
            setShowRightPanel(true);
        }
        setFocusedPanel('right');
    };

    const handleBottomStripeClick = (id) => {
        if (bottomStripeSelection === id) {
            setShowBottomPanel(!showBottomPanel);
        } else {
            setBottomStripeSelection(id);
            setShowBottomPanel(true);
        }
        setFocusedPanel('bottom');
    };

    return (
        <div className={`main-window main-window-island project-color-${projectColor} ${className}`} {...props}>
            {/* Project Color Gradient */}
            <div className="main-window-gradient" aria-hidden="true" />

            {/* Main Toolbar */}
            <MainToolbar
                projectName={projectName}
                projectIcon={projectIcon}
                projectColor={projectColor}
                branchName={branchName}
                runConfig={runConfig}
                runState={runState}
            />

            {/* Main Content Area */}
            <div className="main-window-content">
                {/* Left Stripe */}
                <div className="main-window-stripe main-window-stripe-left">
                    <StripeContainer className="stripe-section-top">
                        <StripeIconButton
                            icon="toolwindows/project@20x20"
                            state={getStripeState('left', 'project', showLeftPanel)}
                            title="Project"
                            onClick={() => handleLeftStripeClick('project')}
                        />
                        <StripeIconButton
                            icon="toolwindows/commit@20x20"
                            state={getStripeState('left', 'commit', showLeftPanel)}
                            title="Commit"
                            onClick={() => handleLeftStripeClick('commit')}
                        />
                        <StripeIconButton
                            icon="toolwindows/vcs@20x20"
                            state={getStripeState('left', 'pullRequests', showLeftPanel)}
                            title="Pull Requests"
                            onClick={() => handleLeftStripeClick('pullRequests')}
                        />
                        <StripeContainer.Separator />
                        <StripeIconButton
                            icon="toolwindows/structure@20x20"
                            state={getStripeState('left', 'structure', showLeftPanel)}
                            title="Structure"
                            onClick={() => handleLeftStripeClick('structure')}
                        />
                    </StripeContainer>
                    <StripeContainer className="stripe-section-bottom">
                        <StripeIconButton
                            icon="toolwindows/terminal@20x20"
                            state={getStripeState('bottom', 'terminal', showBottomPanel)}
                            title="Terminal"
                            onClick={() => handleBottomStripeClick('terminal')}
                        />
                        <StripeIconButton
                            icon="toolwindows/run@20x20"
                            state={getStripeState('bottom', 'run', showBottomPanel)}
                            title="Run"
                            onClick={() => handleBottomStripeClick('run')}
                        />
                        <StripeIconButton
                            icon="toolwindows/debug@20x20"
                            state={getStripeState('bottom', 'debug', showBottomPanel)}
                            title="Debug"
                            onClick={() => handleBottomStripeClick('debug')}
                        />
                    </StripeContainer>
                </div>

                {/* Center Content Area */}
                <div className="main-window-center">
                    {/* Top Row: Tool Windows and Editor */}
                    <div className="main-window-top-row">
                        {/* Left Tool Window (Project) */}
                        {showLeftPanel && (
                            leftStripeSelection === 'project' ? (
                                <ProjectWindow
                                    width={280}
                                    height="auto"
                                    treeData={projectTreeData}
                                    focused={focusedPanel === 'left'}
                                    onFocus={() => setFocusedPanel('left')}
                                    className="main-window-tool-window main-window-tool-window-left"
                                />
                            ) : (
                                <ToolWindow
                                    title={leftStripeSelection === 'commit' ? 'Commit' :
                                           leftStripeSelection === 'pullRequests' ? 'Pull Requests' : 'Structure'}
                                    width={280}
                                    height="auto"
                                    actions={['more', 'minimize']}
                                    focused={focusedPanel === 'left'}
                                    onFocus={() => setFocusedPanel('left')}
                                    className="main-window-tool-window main-window-tool-window-left"
                                >
                                    <div style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                        No content available
                                    </div>
                                </ToolWindow>
                            )
                        )}

                        {/* Editor Area */}
                        <div className="main-window-editor-area" onMouseDown={() => setFocusedPanel('editor')}>
                            <div className="main-window-editor-tabs">
                                <TabBar
                                    tabs={editorTabs.map(t => ({ label: t.label, icon: t.icon, closable: t.closable }))}
                                    direction="horizontal"
                                    focused={focusedPanel === 'editor'}
                                />
                            </div>
                            <div className="main-window-editor-content">
                                <Editor language="java" code={javaCode} />
                            </div>
                        </div>

                        {/* Right Tool Window (AI Assistant) */}
                        {showRightPanel && (
                            rightStripeSelection === 'ai' ? (
                                <AIAssistantWindow
                                    width={320}
                                    height="auto"
                                    empty={true}
                                    focused={focusedPanel === 'right'}
                                    onFocus={() => setFocusedPanel('right')}
                                    className="main-window-tool-window main-window-tool-window-right"
                                />
                            ) : (
                                <ToolWindow
                                    title={rightStripeSelection === 'database' ? 'Database' :
                                           rightStripeSelection === 'maven' ? 'Maven' : 'Notifications'}
                                    width={320}
                                    height="auto"
                                    actions={['more', 'minimize']}
                                    focused={focusedPanel === 'right'}
                                    onFocus={() => setFocusedPanel('right')}
                                    className="main-window-tool-window main-window-tool-window-right"
                                >
                                    <div style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                        No content available
                                    </div>
                                </ToolWindow>
                            )
                        )}
                    </div>

                    {/* Bottom Tool Window (Terminal) */}
                    {showBottomPanel && (
                        bottomStripeSelection === 'terminal' ? (
                            <TerminalWindow
                                width="auto"
                                height={180}
                                tabs={terminalTabs}
                                activeTab={activeTerminalTab}
                                onTabChange={setActiveTerminalTab}
                                onTabClose={handleTerminalTabClose}
                                onTabAdd={handleTerminalTabAdd}
                                onActionClick={(action) => {
                                    if (action === 'minimize') setShowBottomPanel(false);
                                }}
                                blocks={[]}
                                input={{ path: '~/projects/' + projectName, branch: 'main' }}
                                focused={focusedPanel === 'bottom'}
                                onFocus={() => setFocusedPanel('bottom')}
                                className="main-window-tool-window main-window-tool-window-bottom"
                            />
                        ) : (
                            <ToolWindow
                                title={bottomStripeSelection === 'run' ? 'Run' : 'Debug'}
                                width="auto"
                                height={180}
                                actions={['more', 'minimize']}
                                focused={focusedPanel === 'bottom'}
                                onFocus={() => setFocusedPanel('bottom')}
                                className="main-window-tool-window main-window-tool-window-bottom"
                            >
                                <div style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                    No content available
                                </div>
                            </ToolWindow>
                        )
                    )}
                </div>

                {/* Right Stripe */}
                <div className="main-window-stripe main-window-stripe-right">
                    <StripeContainer className="stripe-section-top">
                        <StripeIconButton
                            icon="toolwindows/notifications@20x20"
                            state={getStripeState('right', 'notifications', showRightPanel)}
                            title="Notifications"
                            onClick={() => handleRightStripeClick('notifications')}
                        />
                        <StripeIconButton
                            icon="toolwindows/aiAssistantToolWindow@20x20"
                            state={getStripeState('right', 'ai', showRightPanel)}
                            title="AI Assistant"
                            onClick={() => handleRightStripeClick('ai')}
                        />
                        <StripeIconButton
                            icon="toolwindows/dbms@20x20.svg"
                            state={getStripeState('right', 'database', showRightPanel)}
                            title="Database"
                            onClick={() => handleRightStripeClick('database')}
                        />
                    </StripeContainer>
                </div>
            </div>

            {/* Status Bar */}
            <StatusBar
                breadcrumbs={breadcrumbs}
                widgets={widgets}
            />
        </div>
    );
}

export default MainWindow;
