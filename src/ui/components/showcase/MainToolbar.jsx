import React from 'react';
import ToolbarIconButton from '../iconbutton/IconButton';
import Icon from '../icon/Icon';
import './MainToolbar.css';

function MainToolbar({ 
    projectName = "intellij",
    branchName = "main",
    runConfig = "IDEA Community",
    className = "",
    ...props 
}) {
    return (
        <div className={`main-toolbar ${className}`} {...props}>
            {/* macOS Window Controls */}
            <div className="window-controls">
                <div className="window-control close"></div>
                <div className="window-control minimize"></div>
                <div className="window-control maximize"></div>
            </div>

            {/* Left Side - Project and VCS */}
            <div className="toolbar-left">
                <div className="project-widget">
                    <div className="project-icon">IJ</div>
                    <span className="project-name">{projectName}</span>
                    <span className="dropdown-arrow">▼</span>
                </div>
                
                <div className="vcs-widget">
                    <Icon name="vcs/branch" size={16} />
                    <span className="branch-name">{branchName}</span>
                    <span className="dropdown-arrow">▼</span>
                </div>
            </div>

            {/* Right Side - Run Widget and Actions */}
            <div className="toolbar-right">
                <div className="run-widget">
                    <div className="run-config">
                        <Icon name="runConfigurations/application" size={16} />
                        <span className="config-name">{runConfig}</span>
                        <span className="dropdown-arrow">▼</span>
                    </div>
                    <ToolbarIconButton icon="run/run" tooltip="Run" shortcut="⌃R" />
                    <ToolbarIconButton icon="run/debug" tooltip="Debug" shortcut="⌃D" />
                    <ToolbarIconButton icon="run/stop" tooltip="Stop" disabled />
                </div>
                
                <div className="toolbar-actions">
                    <ToolbarIconButton icon="codeWithMe/cwmAccess" tooltip="Code With Me" />
                    <ToolbarIconButton icon="general/search" tooltip="Search Everywhere" shortcut="Double ⇧" />
                    <ToolbarIconButton icon="general/settings" tooltip="Settings" />
                </div>
            </div>
        </div>
    );
}

export default MainToolbar;
