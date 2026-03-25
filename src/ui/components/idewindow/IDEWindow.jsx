import { useState } from 'react';
import MainToolbar from '../maintoolbar/MainToolbar';
import StripeContainer from '../stripe/StripeContainer';
import StripeIconButton from '../stripe/Stripe';
import ToolWindow from '../toolwindow/ToolWindow';
import Tree from '../tree/Tree';
import TabBar from '../tabs/TabBar';
import CodeExample from '../showcase/CodeExample';
import './IDEWindow.css';

function IDEWindow({
    projectName = "intellij",
    projectIcon = "IJ",
    projectColor = "cobalt",
    branchName = "main",
    runConfig = "IDEA Community",
    className = "",
    ...props
}) {
    const [leftStripeSelected, setLeftStripeSelected] = useState('project');
    const [rightStripeSelected, setRightStripeSelected] = useState(null);
    const [showLeftPanel, setShowLeftPanel] = useState(true);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [focusedPanel, setFocusedPanel] = useState(null);

    // Project tree data
    const projectTreeData = [
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

    // Editor tabs
    const editorTabs = [
        { label: "VetController.java", icon: "fileTypes/java", closable: true },
        { label: "PetRepository.java", icon: "fileTypes/java", closable: true },
        { label: "OwnerService.java", icon: "fileTypes/java", closable: true }
    ];

    const handleLeftStripeClick = (id) => {
        if (leftStripeSelected === id) {
            const willClose = showLeftPanel;
            setShowLeftPanel(!showLeftPanel);
            if (willClose) {
                setFocusedPanel(null);
            } else {
                setFocusedPanel('left');
            }
        } else {
            setLeftStripeSelected(id);
            setShowLeftPanel(true);
            setFocusedPanel('left');
        }
    };

    const handleRightStripeClick = (id) => {
        if (rightStripeSelected === id) {
            const willClose = showRightPanel;
            setShowRightPanel(!showRightPanel);
            if (willClose) {
                setFocusedPanel(null);
            } else {
                setFocusedPanel('right');
            }
        } else {
            setRightStripeSelected(id);
            setShowRightPanel(true);
            setFocusedPanel('right');
        }
    };

    const getStripeState = (panel, selectionId, currentSelection, isPanelOpen) => {
        if (currentSelection !== selectionId || !isPanelOpen) return 'default';
        if (focusedPanel === panel) return 'selected';
        return 'inactive';
    };

    return (
        <div className={`ide-window ${className}`} {...props}>
            {/* Main Toolbar */}
            <MainToolbar 
                projectName={projectName}
                projectIcon={projectIcon}
                projectColor={projectColor}
                branchName={branchName}
                runConfig={runConfig}
            />

            {/* Main Content Area */}
            <div className="ide-content">
                {/* Left Stripe */}
                <StripeContainer className="ide-stripe-left">
                    <StripeIconButton
                        icon="toolwindows/project@20x20" 
                        state={getStripeState('left', 'project', leftStripeSelected, showLeftPanel)} 
                        title="Project"
                        onClick={() => handleLeftStripeClick('project')}
                    />
                    <StripeIconButton
                        icon="toolwindows/commit@20x20" 
                        state={getStripeState('left', 'commit', leftStripeSelected, showLeftPanel)}
                        title="Commit"
                        onClick={() => handleLeftStripeClick('commit')}
                    />
                    <StripeIconButton
                        icon="toolwindows/structure@20x20" 
                        state={getStripeState('left', 'structure', leftStripeSelected, showLeftPanel)}
                        title="Structure"
                        onClick={() => handleLeftStripeClick('structure')}
                    />
                    <StripeContainer.Separator />
                    <StripeIconButton
                        icon="toolwindows/bookmarks@20x20" 
                        state={getStripeState('left', 'bookmarks', leftStripeSelected, showLeftPanel)}
                        title="Bookmarks"
                        onClick={() => handleLeftStripeClick('bookmarks')}
                    />
                </StripeContainer>

                {/* Left Tool Window */}
                {showLeftPanel && (
                    <div className="ide-left-panel">
                        <ToolWindow
                            title={leftStripeSelected === 'project' ? 'Project' : 
                                   leftStripeSelected === 'commit' ? 'Commit' :
                                   leftStripeSelected === 'structure' ? 'Structure' : 'Bookmarks'}
                            width="100%"
                            height="100%"
                            actions={['more', 'minimize']}
                            focused={focusedPanel === 'left'}
                            onFocus={() => setFocusedPanel('left')}
                            className="ide-tool-window"
                        >
                            <Tree 
                                data={projectTreeData}
                                onNodeSelect={(id) => console.log('Selected:', id)}
                                onNodeToggle={(id) => console.log('Toggled:', id)}
                            />
                        </ToolWindow>
                    </div>
                )}

                {/* Editor Area */}
                <div className="ide-editor-area" onMouseDown={() => setFocusedPanel('editor')}>
                    {/* Editor Tabs */}
                    <div className="ide-editor-tabs">
                        <TabBar tabs={editorTabs} direction="horizontal" focused={focusedPanel === 'editor'} />
                    </div>
                    
                    {/* Editor Content */}
                    <div className="ide-editor-content">
                        <div className="component-examples-vertical">
                            <CodeExample 
                                showLineNumbers={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Tool Window */}
                {showRightPanel && (
                    <div className="ide-right-panel">
                        <ToolWindow
                            title={rightStripeSelected === 'notifications' ? 'Notifications' : 
                                   rightStripeSelected === 'gradle' ? 'Gradle' : 'Database'}
                            width="100%"
                            height="100%"
                            actions={['more', 'minimize']}
                            focused={focusedPanel === 'right'}
                            onFocus={() => setFocusedPanel('right')}
                            className="ide-tool-window"
                        >
                            <div style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                No content available
                            </div>
                        </ToolWindow>
                    </div>
                )}

                {/* Right Stripe */}
                <StripeContainer className="ide-stripe-right">
                    <StripeIconButton
                        icon="toolwindows/notifications@20x20" 
                        state={getStripeState('right', 'notifications', rightStripeSelected, showRightPanel)}
                        title="Notifications"
                        onClick={() => handleRightStripeClick('notifications')}
                    />
                    <StripeIconButton
                        icon="toolwindows/gradle@20x20" 
                        state={getStripeState('right', 'gradle', rightStripeSelected, showRightPanel)}
                        title="Gradle"
                        onClick={() => handleRightStripeClick('gradle')}
                    />
                    <StripeIconButton
                        icon="toolwindows/database@20x20" 
                        state={getStripeState('right', 'database', rightStripeSelected, showRightPanel)}
                        title="Database"
                        onClick={() => handleRightStripeClick('database')}
                    />
                </StripeContainer>
            </div>

            {/* Status Bar */}
            <div className="ide-status-bar">
                <div className="status-bar-left">
                    <span className="status-item">Git: {branchName}</span>
                    <span className="status-item">LF</span>
                    <span className="status-item">UTF-8</span>
                </div>
                <div className="status-bar-right">
                    <span className="status-item">Java 17</span>
                    <span className="status-item">4 spaces</span>
                    <span className="status-item">Ln 1, Col 1</span>
                </div>
            </div>
        </div>
    );
}

export default IDEWindow;

