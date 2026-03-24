import React, { useState, useRef, useEffect } from 'react';
import { MainToolbarIconButton } from '../iconbutton/IconButton';
import MainToolbarVerticalSeparator from '../maintoolbar/MainToolbarVerticalSeparator';
import ProjectSelector from '../projectselector/ProjectSelector';
import PopupBranches from '../popup/PopupBranches';
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
    onSearchEverywhere,
    onSettings,
    className = "",
    ...props
}) {
    const [branchesOpen, setBranchesOpen] = useState(false);
    const vcsRef = useRef(null);

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
                    <ProjectSelector
                        projectName={projectName}
                        projectIcon={projectIcon}
                        projectColor={projectColor}
                    />

                    <div className="vcs-dropdown-container" ref={vcsRef}>
                        <ToolbarDropdown
                            icon="vcs/branch"
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
                <RunWidget
                    state={runState}
                    runConfig={runConfig}
                />
                
                <MainToolbarVerticalSeparator />
                <div className="toolbar-actions">
                    <MainToolbarIconButton icon="codeWithMe/cwmAccess@20x20" tooltip="Code With Me" />
                    <MainToolbarIconButton icon="general/search@20x20" tooltip="Search Everywhere" shortcut="Double ⇧" onClick={onSearchEverywhere} />
                    <MainToolbarIconButton icon="general/settings@20x20" tooltip="Settings" onClick={onSettings} />
                </div>
            </div>
        </div>
    );
}

export default MainToolbar;
