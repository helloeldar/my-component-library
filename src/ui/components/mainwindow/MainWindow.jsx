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
import CodeExample from '../showcase/CodeExample';
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
    const [activeTerminalTab, setActiveTerminalTab] = useState('local');
    const terminalTabs = [
        { id: 'local', label: 'Local', closable: true },
        { id: 'local1', label: 'Local (1)', closable: true },
    ];

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
        <div className={`main-window main-window-island ${className}`} {...props}>
            {/* Main Toolbar */}
            <MainToolbar
                projectName={projectName}
                projectIcon={projectIcon}
                projectColor={projectColor}
                branchName={branchName}
                runConfig={runConfig}
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
                                <CodeExample showLineNumbers={true} />
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
                                activeTab={activeTerminalTab === 'local' ? 0 : 1}
                                onTabChange={(index) => setActiveTerminalTab(index === 0 ? 'local' : 'local1')}
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
                            icon="toolwindows/aiAssistantToolWindow@20x20"
                            state={getStripeState('right', 'ai', showRightPanel)}
                            title="AI Assistant"
                            onClick={() => handleRightStripeClick('ai')}
                        />
                        <StripeIconButton
                            icon="toolwindows/services@20x20"
                            state={getStripeState('right', 'database', showRightPanel)}
                            title="Database"
                            onClick={() => handleRightStripeClick('database')}
                        />
                        <StripeIconButton
                            icon="toolwindows/dependencies@20x20"
                            state={getStripeState('right', 'maven', showRightPanel)}
                            title="Maven"
                            onClick={() => handleRightStripeClick('maven')}
                        />
                        <StripeContainer.Separator />
                        <StripeIconButton
                            icon="toolwindows/notifications@20x20"
                            state={getStripeState('right', 'notifications', showRightPanel)}
                            title="Notifications"
                            onClick={() => handleRightStripeClick('notifications')}
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
