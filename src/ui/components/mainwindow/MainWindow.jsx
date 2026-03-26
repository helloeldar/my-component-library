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

/** Per-tab content matching DEFAULT_EDITOR_TABS — each tab has its own code and language.
 *  Pass as editorTabContents to show different content per tab out of the box. */
const DEFAULT_EDITOR_TAB_CONTENTS = {
    '1': {
        language: 'java',
        code: DEFAULT_JAVA_CODE,
    },
    '2': {
        language: 'markup',
        code: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">',
            '  <path',
            '    d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Z"',
            '    fill="none"',
            '    stroke="currentColor"',
            '    stroke-width="1.5"',
            '    class="hover-ring"',
            '  />',
            '  <circle cx="8" cy="8" r="3" fill="currentColor" />',
            '</svg>',
        ].join('\n'),
    },
    '3': {
        language: 'markup',
        code: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">',
            '  <!-- Plus icon: horizontal and vertical bars -->',
            '  <rect x="7" y="2" width="2" height="12" rx="1" fill="currentColor" />',
            '  <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />',
            '</svg>',
        ].join('\n'),
    },
    '4': {
        language: 'java',
        code: [
            'package org.apache.commons.math4.analysis;',
            '',
            '/**',
            ' * Adapter that applies a scalar multiplier to any UnivariateFunction.',
            ' *',
            ' * @since 4.0',
            ' */',
            'public class AdapterScript implements UnivariateFunction {',
            '',
            '    private final UnivariateFunction delegate;',
            '    private final double scale;',
            '',
            '    public AdapterScript(UnivariateFunction delegate, double scale) {',
            '        this.delegate = delegate;',
            '        this.scale = scale;',
            '    }',
            '',
            '    @Override',
            '    public double value(double x) {',
            '        return scale * delegate.value(x);',
            '    }',
            '}',
        ].join('\n'),
    },
    '5': {
        language: 'java',
        code: [
            'package org.apache.commons.math4.analysis;',
            '',
            '/**',
            ' * Contract for adapter scripts that wrap a UnivariateFunction.',
            ' * Implementations must declare their scale factor.',
            ' *',
            ' * @since 4.0',
            ' */',
            'public interface AdapterScriptInterface {',
            '',
            '    /**',
            '     * Returns the underlying function being adapted.',
            '     *',
            '     * @return the delegate function',
            '     */',
            '    UnivariateFunction getDelegate();',
            '',
            '    /**',
            '     * Returns the scalar multiplier applied to the delegate.',
            '     *',
            '     * @return scale factor',
            '     */',
            '    double getScale();',
            '}',
        ].join('\n'),
    },
};

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
    { id: 'ai', icon: 'aiAssistant/toolWindowChat@20x20', tooltip: 'AI Assistant' },
    { id: 'database', icon: 'toolwindows/dbms@20x20.svg', tooltip: 'Database' },
];

const DEFAULT_BOTTOM_STRIPE_ITEMS = [];

const DEFAULT_OPEN_TOOL_WINDOWS = ['project', 'terminal'];

/* ─── Default panel content renderers ────────────────────────────────────────── */

/**
 * Default left-panel renderer. Handles 'project', 'commit', and 'structure' stripe ids.
 * Import and call this inside a custom leftPanelContent to delegate unknown ids to built-in behaviour:
 * ```jsx
 * leftPanelContent={(id, ctx) => id === 'my-panel' ? <MyPanel /> : defaultLeftPanelContent(id, ctx)}
 * ```
 * @param {string}      stripeId - The active stripe item id.
 * @param {PanelContext} ctx     - Context provided by MainWindow.
 * @returns {ReactNode}
 */
function defaultLeftPanelContent(stripeId, { projectTreeData, defaultSelectedNodeId, focusedPanel, setFocusedPanel, setShowLeftPanel }) {
    const commonProps = {
        focused: focusedPanel === 'left',
        onFocus: () => setFocusedPanel('left'),
        onActionClick: (action) => { if (action === 'minimize') setShowLeftPanel(false); },
        className: 'main-window-tool-window main-window-tool-window-left',
    };

    if (stripeId === 'project') {
        return <ProjectWindow width={280} height="auto" treeData={projectTreeData} defaultSelectedId={defaultSelectedNodeId} {...commonProps} />;
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

/**
 * Default right-panel renderer. Handles 'ai', 'database', 'maven', and 'notifications' stripe ids.
 * @param {string}      stripeId - The active stripe item id.
 * @param {PanelContext} ctx     - Context provided by MainWindow.
 * @returns {ReactNode}
 */
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

/**
 * Default bottom-panel renderer. Handles 'terminal', 'git', and 'problems' stripe ids.
 * @param {string}      stripeId - The active stripe item id.
 * @param {PanelContext} ctx     - Context provided by MainWindow.
 * @returns {ReactNode}
 */
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
/**
 * MainWindow — the central IDE shell component.
 *
 * Provides a complete IDE-like layout with a toolbar, left/right/bottom panel
 * stripes, a resizable editor area, and a status bar. Most props are optional —
 * sensible defaults are provided for every area so you can start with zero config
 * and override only what you need.
 *
 * ## Quick start
 * ```jsx
 * <div style={{ height: '100vh' }}>
 *   <MainWindow height="100%" />
 * </div>
 * ```
 *
 * ## Per-tab editor content
 * ```jsx
 * <MainWindow
 *   editorTabs={[
 *     { id: 'readme', label: 'README.md', icon: 'fileTypes/markdown', closable: true },
 *     { id: 'main',   label: 'Main.java',  icon: 'fileTypes/java',     closable: true },
 *   ]}
 *   editorTabContents={{
 *     readme: { language: 'markdown', code: '# Hello World' },
 *     main:   { language: 'java',     code: 'public class Main {}' },
 *   }}
 * />
 * ```
 *
 * ## Custom left panel with built-in fallback
 * ```jsx
 * <MainWindow
 *   leftPanelContent={(id, ctx) => {
 *     if (id === 'my-panel') return <MyPanel />;
 *     return defaultLeftPanelContent(id, ctx); // built-in Project, Commit, etc.
 *   }}
 * />
 * ```
 *
 * ## Split left panel (top + bottom sub-panels)
 * Add a separator item to leftStripeItems. Icons before the separator open in
 * the top sub-panel; icons after open in the bottom sub-panel.
 * ```jsx
 * <MainWindow
 *   leftStripeItems={[
 *     { id: 'project', icon: 'toolwindows/project@20x20', tooltip: 'Project', section: 'top' },
 *     { id: '_sep', separator: true, section: 'top' },
 *     { id: 'my-panel', icon: <MyIcon />, tooltip: 'My Panel', monochrome: true, section: 'top' },
 *   ]}
 * />
 * ```
 *
 * @see defaultLeftPanelContent
 * @see defaultRightPanelContent
 * @see defaultBottomPanelContent
 * @see DEFAULT_EDITOR_TABS
 * @see DEFAULT_EDITOR_TAB_CONTENTS
 * @see DEFAULT_PROJECT_TREE_DATA
 */
function MainWindow({
    projectName = "intellij",
    projectIcon = "IJ",
    projectColor = "cobalt",
    branchName = "main",
    runConfig = "IDEA Community",
    runState = "default",
    editorTabs = DEFAULT_EDITOR_TABS,
    activeEditorTab: activeEditorTabProp,
    onEditorTabChange,
    onEditorTabClose,
    editorCode = DEFAULT_JAVA_CODE,
    editorLanguage = "java",
    onEditorCodeChange,
    editorTabContents,
    editorTopBar,
    projectTreeData = DEFAULT_PROJECT_TREE_DATA,
    defaultSelectedNodeId,
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
    height = 800,
    className = "",
    style,
    ...props
}) {
    const leftTopItems = leftStripeItems.filter(i => i.section === 'top' || (!i.section && !i.panel));
    const leftBottomItems = leftStripeItems.filter(i => i.section === 'bottom' || i.panel === 'bottom');

    // Split left top items at the first separator into two independent sub-panels
    const separatorIdx = leftTopItems.findIndex(i => i.separator);
    const leftTopPanelItems = separatorIdx >= 0 ? leftTopItems.slice(0, separatorIdx).filter(i => !i.separator) : leftTopItems.filter(i => !i.separator);
    const leftSplitPanelItems = separatorIdx >= 0 ? leftTopItems.slice(separatorIdx + 1).filter(i => !i.separator) : [];

    const leftTopPanelIds = new Set(leftTopPanelItems.map(i => i.id));
    const leftSplitPanelIds = new Set(leftSplitPanelItems.map(i => i.id));
    const rightPanelIds = new Set(rightStripeItems.filter(i => !i.separator).map(i => i.id));
    const bottomPanelIds = new Set([
        ...leftBottomItems.filter(i => !i.separator).map(i => i.id),
        ...bottomStripeItems.filter(i => !i.separator).map(i => i.id),
    ]);

    const initialTop = defaultOpenToolWindows.find(id => leftTopPanelIds.has(id));
    const initialSplit = defaultOpenToolWindows.find(id => leftSplitPanelIds.has(id));
    const initialRight = defaultOpenToolWindows.find(id => rightPanelIds.has(id));
    const initialBottom = defaultOpenToolWindows.find(id => bottomPanelIds.has(id));

    const [leftTopSelection, setLeftTopSelection] = useState(
        initialTop || [...leftTopPanelIds][0] || 'project'
    );
    const [showLeftTopPanel, setShowLeftTopPanel] = useState(!!initialTop);

    const [leftSplitSelection, setLeftSplitSelection] = useState(
        initialSplit || [...leftSplitPanelIds][0] || null
    );
    const [showLeftSplitPanel, setShowLeftSplitPanel] = useState(!!initialSplit);

    const showLeftPanel = showLeftTopPanel || showLeftSplitPanel;
    const setShowLeftPanel = (show) => {
        setShowLeftTopPanel(show);
        setShowLeftSplitPanel(show);
    };

    const [rightStripeSelection, setRightStripeSelection] = useState(
        initialRight || [...rightPanelIds][0] || 'ai'
    );
    const [showRightPanel, setShowRightPanel] = useState(!!initialRight);

    const [bottomStripeSelection, setBottomStripeSelection] = useState(
        initialBottom || [...bottomPanelIds][0] || 'terminal'
    );
    const [showBottomPanel, setShowBottomPanel] = useState(!!initialBottom);

    const [focusedPanel, setFocusedPanel] = useState('editor');
    const [focusedLeftSubPanel, setFocusedLeftSubPanel] = useState(
        initialSplit ? 'left-split' : 'left-top'
    );

    // Internal active-tab index; mirrors the controlled prop when provided
    const [internalActiveTab, setInternalActiveTab] = useState(activeEditorTabProp ?? 0);
    const activeEditorTab = activeEditorTabProp ?? internalActiveTab;

    const handleEditorTabChange = (index) => {
        setInternalActiveTab(index);
        onEditorTabChange?.(index);
    };

    // Resolve code / language / topBar from editorTabContents if provided
    const activeTabId = editorTabs[activeEditorTab]?.id;
    const activeTabContent = editorTabContents?.[activeTabId];
    const resolvedCode = activeTabContent?.code ?? editorCode;
    const resolvedLanguage = activeTabContent?.language ?? editorLanguage;
    const resolvedTopBar = activeTabContent?.topBar ?? editorTopBar;

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
        const panelKey = panelType === 'left-top' ? leftTopSelection :
                         panelType === 'left-split' ? leftSplitSelection :
                         panelType === 'right' ? rightStripeSelection :
                         bottomStripeSelection;
        if (panelKey !== id) return 'default';
        if (panelType === 'left-top' || panelType === 'left-split') {
            return focusedPanel === 'left' && focusedLeftSubPanel === panelType ? 'selected' : 'inactive';
        }
        const focusType = panelType === 'right' ? 'right' : 'bottom';
        return focusedPanel === focusType ? 'selected' : 'inactive';
    };

    const handleLeftTopClick = (id) => {
        if (leftTopSelection === id) {
            setShowLeftTopPanel(!showLeftTopPanel);
        } else {
            setLeftTopSelection(id);
            setShowLeftTopPanel(true);
        }
        setFocusedPanel('left');
        setFocusedLeftSubPanel('left-top');
    };

    const handleLeftSplitClick = (id) => {
        if (leftSplitSelection === id) {
            setShowLeftSplitPanel(!showLeftSplitPanel);
        } else {
            setLeftSplitSelection(id);
            setShowLeftSplitPanel(true);
        }
        setFocusedPanel('left');
        setFocusedLeftSubPanel('left-split');
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
        projectName, projectTreeData, defaultSelectedNodeId,
        focusedPanel, setFocusedPanel,
        setShowLeftPanel,
        setShowRightPanel, setShowBottomPanel,
        terminalTabs, activeTerminalTab, setActiveTerminalTab,
        handleTerminalTabClose, handleTerminalTabAdd,
    };

    const renderLeftPanel = leftPanelContent || defaultLeftPanelContent;
    const renderRightPanel = rightPanelContent || defaultRightPanelContent;
    const renderBottomPanel = bottomPanelContent || defaultBottomPanelContent;

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

    const heightValue = typeof height === 'number' ? `${height}px` : height;

    return (
        <div
            className={`main-window main-window-island project-color-${projectColor} ${className}`}
            style={{ height: heightValue, ...style }}
            {...props}
        >
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
                            const isTopPanel = leftTopPanelIds.has(item.id);
                            const isSplitPanel = leftSplitPanelIds.has(item.id);
                            const shown = isTopPanel ? showLeftTopPanel : isSplitPanel ? showLeftSplitPanel : false;
                            const panelType = isTopPanel ? 'left-top' : 'left-split';
                            return (
                                <StripeIconButton
                                    key={item.id}
                                    icon={item.icon}
                                    monochrome={item.monochrome}
                                    state={getStripeState(panelType, item.id, shown)}
                                    title={item.tooltip}
                                    onClick={() => isTopPanel ? handleLeftTopClick(item.id) : handleLeftSplitClick(item.id)}
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
                                    monochrome={item.monochrome}
                                    state={getStripeState('bottom', item.id, showBottomPanel)}
                                    title={item.tooltip}
                                    onClick={() => handleBottomStripeClick(item.id)}
                                />
                            );
                        })}
                    </StripeContainer>
                </div>

                {/* Center Content Area */}
                <div className="main-window-center">
                    <div className="main-window-top-row">
                        {showLeftPanel && (
                            <div className="main-window-left-panel-column">
                                {showLeftTopPanel && renderLeftPanel(leftTopSelection, {
                                    ...panelContext,
                                    focusedPanel: focusedPanel === 'left' && focusedLeftSubPanel === 'left-top' ? 'left' : focusedPanel,
                                    setFocusedPanel: (panel) => { setFocusedPanel(panel); if (panel === 'left') setFocusedLeftSubPanel('left-top'); },
                                    setShowLeftPanel: setShowLeftTopPanel,
                                })}
                                {showLeftSplitPanel && renderLeftPanel(leftSplitSelection, {
                                    ...panelContext,
                                    focusedPanel: focusedPanel === 'left' && focusedLeftSubPanel === 'left-split' ? 'left' : focusedPanel,
                                    setFocusedPanel: (panel) => { setFocusedPanel(panel); if (panel === 'left') setFocusedLeftSubPanel('left-split'); },
                                    setShowLeftPanel: setShowLeftSplitPanel,
                                })}
                            </div>
                        )}

                        <div className="main-window-editor-area" onMouseDown={() => setFocusedPanel('editor')}>
                            <div className="main-window-editor-tabs">
                                <TabBar
                                    tabs={editorTabs.map(t => ({ label: t.label, icon: t.icon, closable: t.closable }))}
                                    activeTab={activeEditorTab}
                                    onTabChange={handleEditorTabChange}
                                    onTabClose={onEditorTabClose}
                                    direction="horizontal"
                                    focused={focusedPanel === 'editor'}
                                />
                            </div>
                            <div className="main-window-editor-content">
                                <Editor
                                    language={resolvedLanguage}
                                    code={resolvedCode}
                                    onChange={onEditorCodeChange}
                                    topBar={resolvedTopBar}
                                />
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
                                    monochrome={item.monochrome}
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
    DEFAULT_EDITOR_TAB_CONTENTS,
    DEFAULT_JAVA_CODE,
    DEFAULT_PROJECT_TREE_DATA,
    DEFAULT_LEFT_STRIPE_ITEMS,
    DEFAULT_RIGHT_STRIPE_ITEMS,
    DEFAULT_BOTTOM_STRIPE_ITEMS,
    DEFAULT_OPEN_TOOL_WINDOWS,
    defaultLeftPanelContent,
    defaultRightPanelContent,
    defaultBottomPanelContent,
};
