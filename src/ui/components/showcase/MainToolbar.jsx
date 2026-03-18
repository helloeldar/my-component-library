import React from 'react';
import { MainToolbarIconButton } from '../iconbutton/IconButton';
import ProjectSelector from '../projectselector/ProjectSelector';
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
                    
                    <ToolbarDropdown 
                        icon="vcs/branch" 
                        text={branchName} 
                        theme="dark" 
                    />
                </div>
            </div>

            {/* Right Side - Run Widget and Actions */}
            <div className="toolbar-right">
                <RunWidget
                    state={runState}
                    runConfig={runConfig}
                />
                
                <div className="toolbar-actions">
                    <MainToolbarIconButton icon="codeWithMe/cwmAccess@20x20" tooltip="Code With Me" />
                    <MainToolbarIconButton icon="general/search@20x20" tooltip="Search Everywhere" shortcut="Double ⇧" />
                    <MainToolbarIconButton icon="general/settings@20x20" tooltip="Settings" />
                </div>
            </div>
        </div>
    );
}

export default MainToolbar;
