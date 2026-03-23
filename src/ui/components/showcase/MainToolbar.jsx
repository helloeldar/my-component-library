import React, { useState, useRef, useEffect } from 'react';
import { MainToolbarIconButton } from '../iconbutton/IconButton';
import ProjectWidget from '../projectwidget/ProjectWidget';
import PopupBranches from '../popup/PopupBranches';
import PopupRunWidget from '../popup/PopupRunWidget';
import RunWidget from '../runwidget/RunWidget';
import ToolbarDropdown from '../toolbardropdown/ToolbarDropdown';
import './MainToolbar.css';

function MainToolbar({
    projectName = "intellij",
    projectIcon = "IJ",
    projectColor = "cobalt",
    branchName = "main",
    runConfig = "IDEA Community",
    runState = "default",
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
            <div className="window-controls">
                <div className="window-control close"></div>
                <div className="window-control minimize"></div>
                <div className="window-control maximize"></div>
            </div>

            {/* Left Side - Project and VCS */}
            <div className="toolbar-left">
                    <ProjectWidget
                        projectName={projectName}
                        projectIcon={projectIcon}
                        projectColor={projectColor}
                    />

                    <div className="vcs-dropdown-container" ref={vcsRef}>
                        <ToolbarDropdown
                            icon="toolwindows/vcs"
                            text={branchName}
                            theme="dark"
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

                <div className="toolbar-actions">
                    <MainToolbarIconButton icon="toolwindows/aiAssistantToolWindow@20x20" tooltip="AI Assistant" />
                    <MainToolbarIconButton icon="general/search@20x20" tooltip="Search Everywhere" shortcut="Double ⇧" />
                    <MainToolbarIconButton icon="general/settings@20x20" tooltip="Settings" />
                </div>
            </div>
        </div>
    );
}

export default MainToolbar;
