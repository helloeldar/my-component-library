import React, { useState } from 'react';
import MainToolbar from '../maintoolbar/MainToolbar';
import StripeContainer from '../stripe/StripeContainer';
import StripeIconButton from '../stripe/Stripe';
import StatusBar from '../statusbar/StatusBar';
import ToolWindow from '../toolwindow/ToolWindow';
import TerminalWindow from '../toolwindow/TerminalWindow';
import ProjectWindow from '../toolwindow/ProjectWindow';
import AIAssistantWindow from '../toolwindow/AIAssistantWindow';
import ProblemsWindow from '../toolwindow/ProblemsWindow';
import CommitWindow from '../toolwindow/CommitWindow';
import VCSLogWindow from '../toolwindow/VCSLogWindow';
import SearchEverywherePopup from '../popup/SearchEverywherePopup';
import SettingsDialog from '../dialog/SettingsDialog';
import TabBar from '../tabs/TabBar';
import Editor from '../editor/Editor';
import './MainWindow.css';

/* ─── Default data (exported for consumer reuse) ─────────────────────────────── */

const DEFAULT_EDITOR_TABS = [
    { id: '1', label: 'FunctionUtils.java', icon: 'fileTypes/java', closable: true },
    { id: '2', label: 'add-hover.svg', icon: 'fileTypes/svg', closable: true },
    { id: '3', label: 'add.svg', icon: 'fileTypes/svg', closable: true },
    { id: '4', label: 'AdapterScript.java', icon: 'fileTypes/java', closable: true },
    { id: '5', label: 'AdapterScriptInterface.java', icon: 'fileTypes/java', closable: true },
];

const DEFAULT_JAVA_CODE = [
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

const DEFAULT_PROJECT_TREE_DATA = [
    {
        id: '1',
        label: 'intellij',
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

const DEFAULT_LEFT_STRIPE_ITEMS = [
    { id: 'project', icon: 'toolwindows/project@20x20', tooltip: 'Project', section: 'top' },
    { id: 'commit', icon: 'toolwindows/commit@20x20', tooltip: 'Commit', section: 'top' },
    { id: '_separator_1', separator: true, section: 'top' },
    { id: 'structure', icon: 'toolwindows/structure@20x20', tooltip: 'Structure', section: 'top' },
    { id: 'git', icon: 'toolwindows/vcs@20x20', tooltip: 'Git', panel: 'bottom', section: 'bottom' },
    { id: 'terminal', icon: 'toolwindows/terminal@20x20', tooltip: 'Terminal', panel: 'bottom', section: 'bottom' },
    { id: 'problems', icon: 'toolwindows/problems@20x20', tooltip: 'Problems', panel: 'bottom', section: 'bottom' },
];

const DEFAULT_RIGHT_STRIPE_ITEMS = [
    { id: 'notifications', icon: 'toolwindows/notifications@20x20', tooltip: 'Notifications' },
    { id: 'ai', icon: 'toolwindows/aiAssistantToolWindow@20x20', tooltip: 'AI Assistant' },
    { id: 'database', icon: 'toolwindows/dbms@20x20.svg', tooltip: 'Database' },
];

const DEFAULT_BOTTOM_STRIPE_ITEMS = [];

const DEFAULT_OPEN_TOOL_WINDOWS = ['project', 'terminal'];

/* ─── Default panel content renderers ────────────────────────────────────────── */

function defaultLeftPanelContent(stripeId, { projectTreeData, focusedPanel, setFocusedPanel, setShowLeftPanel }) {
    const commonProps = {
        focused: focusedPanel === 'left',
        onFocus: () => setFocusedPanel('left'),
        onActionClick: (action) => { if (action === 'minimize') setShowLeftPanel(false); },
        className: 'main-window-tool-window main-window-tool-window-left',
    };

    if (stripeId === 'project') {
        return <ProjectWindow width={280} height="auto" treeData={projectTreeData} {...commonProps} />;
    }
    if (stripeId === 'commit') {
        return <CommitWindow width={280} height="auto" {...commonProps} />;
    }
    return (
        <ToolWindow title="Structure" width={280} height="auto" actions={['more', 'minimize']} {...commonProps}>
            <div style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                No content available
            </div>
        </ToolWindow>
    );
}

function defaultRightPanelContent(stripeId, { focusedPanel, setFocusedPanel, setShowRightPanel }) {
    const commonProps = {
        focused: focusedPanel === 'right',
        onFocus: () => setFocusedPanel('right'),
        onActionClick: (action) => { if (action === 'minimize') setShowRightPanel(false); },
        className: 'main-window-tool-window main-window-tool-window-right',
    };

    if (stripeId === 'ai') {
        return <AIAssistantWindow width={320} height="auto" empty={true} {...commonProps} />;
    }
    return (
        <ToolWindow
            title={stripeId === 'database' ? 'Database' : stripeId === 'maven' ? 'Maven' : 'Notifications'}
            width={320} height="auto" actions={['more', 'minimize']} {...commonProps}
        >
            <div style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                No content available
            </div>
        </ToolWindow>
    );
}

function defaultBottomPanelContent(stripeId, {
    projectName, focusedPanel, setFocusedPanel, setShowBottomPanel,
    terminalTabs, activeTerminalTab, setActiveTerminalTab,
    handleTerminalTabClose, handleTerminalTabAdd,
}) {
    const commonProps = {
        focused: focusedPanel === 'bottom',
        onFocus: () => setFocusedPanel('bottom'),
        onActionClick: (action) => { if (action === 'minimize') setShowBottomPanel(false); },
        className: 'main-window-tool-window main-window-tool-window-bottom',
    };

    if (stripeId === 'terminal') {
        return (
            <TerminalWindow
                width="auto" height={180}
                tabs={terminalTabs}
                activeTab={activeTerminalTab}
                onTabChange={setActiveTerminalTab}
                onTabClose={handleTerminalTabClose}
                onTabAdd={handleTerminalTabAdd}
                blocks={[]}
                input={{ path: '~/projects/' + projectName, branch: 'main' }}
                {...commonProps}
            />
        );
    }
    if (stripeId === 'git') {
        return <VCSLogWindow width="auto" height={180} {...commonProps} />;
    }
    if (stripeId === 'problems') {
        return <ProblemsWindow width="auto" height={180} {...commonProps} />;
    }
    return (
        <ToolWindow
            title={stripeId}
            width="auto" height={180} actions={['more', 'minimize']} {...commonProps}
        >
            <div style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                No content available
            </div>
        </ToolWindow>
    );
}

/* ─── MainWindow component ───────────────────────────────────────────────────── */

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
    editorTabs = DEFAULT_EDITOR_TABS,
    activeEditorTab,
    onEditorTabChange,
    onEditorTabClose,
    editorCode = DEFAULT_JAVA_CODE,
    editorLanguage = "java",
    onEditorCodeChange,
    projectTreeData = DEFAULT_PROJECT_TREE_DATA,
    leftStripeItems = DEFAULT_LEFT_STRIPE_ITEMS,
    rightStripeItems = DEFAULT_RIGHT_STRIPE_ITEMS,
    bottomStripeItems = DEFAULT_BOTTOM_STRIPE_ITEMS,
    leftPanelContent,
    rightPanelContent,
    bottomPanelContent,
    defaultOpenToolWindows = DEFAULT_OPEN_TOOL_WINDOWS,
    toolbar,
    statusBarProps,
    overlays,
    className = "",
    ...props
}) {
    const leftPanelIds = new Set(leftStripeItems.filter(i => !i.separator && i.panel !== 'bottom').map(i => i.id));
    const rightPanelIds = new Set(rightStripeItems.filter(i => !i.separator).map(i => i.id));
    const bottomPanelIds = new Set([
        ...leftStripeItems.filter(i => i.panel === 'bottom' && !i.separator).map(i => i.id),
        ...bottomStripeItems.filter(i => !i.separator).map(i => i.id),
    ]);

    const initialLeft = defaultOpenToolWindows.find(id => leftPanelIds.has(id));
    const initialRight = defaultOpenToolWindows.find(id => rightPanelIds.has(id));
    const initialBottom = defaultOpenToolWindows.find(id => bottomPanelIds.has(id));

    const [leftStripeSelection, setLeftStripeSelection] = useState(
        initialLeft || [...leftPanelIds][0] || 'project'
    );
    const [showLeftPanel, setShowLeftPanel] = useState(!!initialLeft);

    const [rightStripeSelection, setRightStripeSelection] = useState(
        initialRight || [...rightPanelIds][0] || 'ai'
    );
    const [showRightPanel, setShowRightPanel] = useState(!!initialRight);

    const [bottomStripeSelection, setBottomStripeSelection] = useState(
        initialBottom || [...bottomPanelIds][0] || 'terminal'
    );
    const [showBottomPanel, setShowBottomPanel] = useState(!!initialBottom);

    const [focusedPanel, setFocusedPanel] = useState('editor');

    const [showSearchEverywhere, setShowSearchEverywhere] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const [activeTerminalTab, setActiveTerminalTab] = useState(0);
    const [terminalTabs, setTerminalTabs] = useState([{ label: 'Local', closable: true }]);
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

    const defaultStatusBarProps = {
        breadcrumbs: [
            { label: projectName, module: true },
            { label: 'src' },
            { label: 'main' },
            { label: 'java' },
            { label: 'AdapterScript', icon: true, iconName: 'nodes/class' }
        ],
        widgets: [
            { type: 'text', text: '39:34' },
            { type: 'text', text: 'LF' },
            { type: 'text', text: 'UTF-8' },
            { type: 'icon', iconName: 'general/unlocked' }
        ],
    };

    const resolvedStatusBarProps = statusBarProps ?? defaultStatusBarProps;

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

    const panelContext = {
        projectName, projectTreeData,
        focusedPanel, setFocusedPanel,
        setShowLeftPanel, setShowRightPanel, setShowBottomPanel,
        terminalTabs, activeTerminalTab, setActiveTerminalTab,
        handleTerminalTabClose, handleTerminalTabAdd,
    };

    const renderLeftPanel = leftPanelContent || defaultLeftPanelContent;
    const renderRightPanel = rightPanelContent || defaultRightPanelContent;
    const renderBottomPanel = bottomPanelContent || defaultBottomPanelContent;

    const leftTopItems = leftStripeItems.filter(i => i.section === 'top' || (!i.section && !i.panel));
    const leftBottomItems = leftStripeItems.filter(i => i.section === 'bottom' || i.panel === 'bottom');

    const defaultOverlays = (
        <>
            {showSearchEverywhere && (
                <div className="main-window-overlay" onMouseDown={() => setShowSearchEverywhere(false)}>
                    <div className="main-window-overlay-popup" onMouseDown={(e) => e.stopPropagation()}>
                        <SearchEverywherePopup />
                    </div>
                </div>
            )}
            {showSettings && (
                <div className="main-window-overlay main-window-overlay-modal" onMouseDown={() => setShowSettings(false)}>
                    <div className="main-window-overlay-dialog" onMouseDown={(e) => e.stopPropagation()}>
                        <SettingsDialog onClose={() => setShowSettings(false)} />
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div className={`main-window main-window-island project-color-${projectColor} ${className}`} {...props}>
            <div className="main-window-gradient" aria-hidden="true" />

            {toolbar !== undefined ? toolbar : (
                <MainToolbar
                    projectName={projectName}
                    projectIcon={projectIcon}
                    projectColor={projectColor}
                    branchName={branchName}
                    runConfig={runConfig}
                    runState={runState}
                    onSearchEverywhere={() => setShowSearchEverywhere(true)}
                    onSettings={() => setShowSettings(true)}
                />
            )}

            <div className="main-window-content">
                {/* Left Stripe */}
                <div className="main-window-stripe main-window-stripe-left">
                    <StripeContainer className="stripe-section-top">
                        {leftTopItems.map(item => {
                            if (item.separator) return <StripeContainer.Separator key={item.id} />;
                            return (
                                <StripeIconButton
                                    key={item.id}
                                    icon={item.icon}
                                    state={getStripeState(item.panel || 'left', item.id, item.panel === 'bottom' ? showBottomPanel : showLeftPanel)}
                                    title={item.tooltip}
                                    onClick={() => item.panel === 'bottom' ? handleBottomStripeClick(item.id) : handleLeftStripeClick(item.id)}
                                />
                            );
                        })}
                    </StripeContainer>
                    <StripeContainer className="stripe-section-bottom">
                        {leftBottomItems.map(item => {
                            if (item.separator) return <StripeContainer.Separator key={item.id} />;
                            return (
                                <StripeIconButton
                                    key={item.id}
                                    icon={item.icon}
                                    state={getStripeState(item.panel || 'bottom', item.id, item.panel === 'bottom' ? showBottomPanel : showLeftPanel)}
                                    title={item.tooltip}
                                    onClick={() => item.panel === 'bottom' ? handleBottomStripeClick(item.id) : handleLeftStripeClick(item.id)}
                                />
                            );
                        })}
                    </StripeContainer>
                </div>

                {/* Center Content Area */}
                <div className="main-window-center">
                    <div className="main-window-top-row">
                        {showLeftPanel && renderLeftPanel(leftStripeSelection, panelContext)}

                        <div className="main-window-editor-area" onMouseDown={() => setFocusedPanel('editor')}>
                            <div className="main-window-editor-tabs">
                                <TabBar
                                    tabs={editorTabs.map(t => ({ label: t.label, icon: t.icon, closable: t.closable }))}
                                    activeTab={activeEditorTab}
                                    onTabChange={onEditorTabChange}
                                    onTabClose={onEditorTabClose}
                                    direction="horizontal"
                                    focused={focusedPanel === 'editor'}
                                />
                            </div>
                            <div className="main-window-editor-content">
                                <Editor language={editorLanguage} code={editorCode} onChange={onEditorCodeChange} />
                            </div>
                        </div>

                        {showRightPanel && renderRightPanel(rightStripeSelection, panelContext)}
                    </div>

                    {showBottomPanel && renderBottomPanel(bottomStripeSelection, panelContext)}
                </div>

                {/* Right Stripe */}
                <div className="main-window-stripe main-window-stripe-right">
                    <StripeContainer className="stripe-section-top">
                        {rightStripeItems.map(item => {
                            if (item.separator) return <StripeContainer.Separator key={item.id} />;
                            return (
                                <StripeIconButton
                                    key={item.id}
                                    icon={item.icon}
                                    state={getStripeState('right', item.id, showRightPanel)}
                                    title={item.tooltip}
                                    onClick={() => handleRightStripeClick(item.id)}
                                />
                            );
                        })}
                    </StripeContainer>
                </div>
            </div>

            <StatusBar {...resolvedStatusBarProps} />

            {overlays !== undefined ? overlays : defaultOverlays}
        </div>
    );
}

export default MainWindow;
export {
    DEFAULT_EDITOR_TABS,
    DEFAULT_JAVA_CODE,
    DEFAULT_PROJECT_TREE_DATA,
    DEFAULT_LEFT_STRIPE_ITEMS,
    DEFAULT_RIGHT_STRIPE_ITEMS,
    DEFAULT_BOTTOM_STRIPE_ITEMS,
    DEFAULT_OPEN_TOOL_WINDOWS,
};
