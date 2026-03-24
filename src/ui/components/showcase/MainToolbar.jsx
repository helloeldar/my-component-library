import React, { useState, useRef, useEffect } from 'react';
import MainToolbarIconButton from '../maintoolbar/MainToolbarIconButton';
import MainToolbarDropdown from '../maintoolbar/MainToolbarDropdown';
import ProjectWidget from '../projectwidget/ProjectWidget';
import PopupBranches from '../popup/PopupBranches';
import PopupRunWidget from '../popup/PopupRunWidget';
import RunWidget from '../runwidget/RunWidget';
import './MainToolbar.css';

const DEFAULT_RIGHT_ACTIONS = [
    { icon: 'toolwindows/aiAssistantToolWindow@20x20', tooltip: 'AI Assistant' },
    { icon: 'codeWithMe/cwmAccess@20x20', tooltip: 'Code With Me' },
    { icon: 'general/search@20x20', tooltip: 'Search Everywhere', shortcut: 'Double ⇧', actionKey: 'searchEverywhere' },
    { icon: 'general/settings@20x20', tooltip: 'Settings', actionKey: 'settings' },
];

function MainToolbar({
    projectName = "intellij",
    projectIcon = "IJ",
    projectColor = "cobalt",
    branchName = "main",
    runConfig = "IDEA Community",
    runState = "default",
    onSearchEverywhere,
    onSettings,
    leftExtra,
    rightActions,
    showWindowControls = true,
    className = "",
    ...props
}) {
    const [branchesOpen, setBranchesOpen] = useState(false);
    const [runPopupOpen, setRunPopupOpen] = useState(false);
    const [activeRunConfig, setActiveRunConfig] = useState({ name: runConfig, icon: 'runConfigurations/application' });
    const vcsRef = useRef(null);
    const runRef = useRef(null);

    useEffect(() => {
        if (!branchesOpen) return;
        const handleClickOutside = (e) => {
            if (vcsRef.current && !vcsRef.current.contains(e.target)) {
                setBranchesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [branchesOpen]);

    useEffect(() => {
        if (!runPopupOpen) return;
        const handleClickOutside = (e) => {
            if (runRef.current && !runRef.current.contains(e.target)) {
                setRunPopupOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [runPopupOpen]);

    return (
        <div className={`main-toolbar ${className}`} {...props}>
            {/* Left Group - Window Controls, Project, and VCS */}
            <div className="toolbar-left-group">
            {/* macOS Window Controls */}
            {showWindowControls && (
                <div className="window-controls">
                    <div className="window-control close"></div>
                    <div className="window-control minimize"></div>
                    <div className="window-control maximize"></div>
                </div>
            )}

            {/* Left Side - Project and VCS */}
            <div className="toolbar-left">
                    <ProjectWidget
                        projectName={projectName}
                        projectIcon={projectIcon}
                        projectColor={projectColor}
                    />

                    <div className="vcs-dropdown-container" ref={vcsRef}>
                        <MainToolbarDropdown
                            icon="toolwindows/vcs"
                            text={branchName}
                            onClick={() => setBranchesOpen(!branchesOpen)}
                        />
                        {branchesOpen && (
                            <PopupBranches style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                marginTop: '4px',
                                zIndex: 1000
                            }} />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side - Run Widget and Actions */}
            <div className="toolbar-right">
                <div className="run-widget-container" ref={runRef}>
                    <RunWidget
                        state={runState}
                        runConfig={activeRunConfig.name}
                        configIcon={activeRunConfig.icon}
                        onDropdownClick={() => setRunPopupOpen(!runPopupOpen)}
                    />
                    {runPopupOpen && (
                        <PopupRunWidget
                            activeConfig={activeRunConfig.name}
                            onSelect={(config) => {
                                setActiveRunConfig(config);
                                setRunPopupOpen(false);
                            }}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '4px',
                                zIndex: 1000
                            }}
                        />
                    )}
                </div>

                {leftExtra}

                <div className="toolbar-actions">
                    {rightActions !== undefined ? (
                        React.isValidElement(rightActions) ? rightActions : (
                            rightActions.map((action, i) => (
                                <MainToolbarIconButton
                                    key={i}
                                    icon={action.icon}
                                    tooltip={action.tooltip}
                                    shortcut={action.shortcut}
                                    onClick={
                                        action.onClick ||
                                        (action.actionKey === 'searchEverywhere' ? onSearchEverywhere : undefined) ||
                                        (action.actionKey === 'settings' ? onSettings : undefined)
                                    }
                                />
                            ))
                        )
                    ) : (
                        DEFAULT_RIGHT_ACTIONS.map((action, i) => (
                            <MainToolbarIconButton
                                key={i}
                                icon={action.icon}
                                tooltip={action.tooltip}
                                shortcut={action.shortcut}
                                onClick={
                                    action.actionKey === 'searchEverywhere' ? onSearchEverywhere :
                                    action.actionKey === 'settings' ? onSettings :
                                    undefined
                                }
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainToolbar;
export { DEFAULT_RIGHT_ACTIONS };
