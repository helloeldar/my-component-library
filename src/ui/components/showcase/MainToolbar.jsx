import React from 'react';
import { MainToolbarIconButton } from '../iconbutton/IconButton';
import ProjectSelector from '../projectselector/ProjectSelector';
import ToolbarDropdown from '../toolbardropdown/ToolbarDropdown';
import './MainToolbar.css';

function MainToolbar({ 
    projectName = "intellij",
    projectIcon = "IJ",
    projectColor = "cobalt",
    branchName = "main",
    runConfig = "IDEA Community",
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
                <div className="run-widget">
                    <ToolbarDropdown
                        icon="runConfigurations/application"
                        text={runConfig}
                    />
                    <MainToolbarIconButton icon="run/run_stroke" tooltip="Run" shortcut="⌃R" />
                    <MainToolbarIconButton icon="run/debug_stroke" tooltip="Debug" shortcut="⌃D" />
                    <MainToolbarIconButton icon="run/stop_stroke" tooltip="Stop" disabled />
                </div>
                
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
