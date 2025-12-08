import React from 'react';
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
                    <div className="vcs-icon">⌘</div>
                    <span className="branch-name">{branchName}</span>
                    <span className="dropdown-arrow">▼</span>
                </div>
            </div>

            {/* Right Side - Run Widget and Actions */}
            <div className="toolbar-right">
                <div className="run-widget">
                    <div className="run-config">
                        <div className="config-icon">□</div>
                        <span className="config-name">{runConfig}</span>
                        <span className="dropdown-arrow">▼</span>
                    </div>
                    <button className="run-button"><Icon name="run/run" size={16} /></button>
                    <button className="debug-button"><Icon name="run/debug" size={16} /></button>
                    <button className="stop-button"><Icon name="run/stop" size={16} /></button>
                </div>
                
                <div className="toolbar-actions">
                    <button className="action-button"><Icon name="codeWithMe/cwmAccess" size={16} /></button>
                    <button className="action-button"><Icon name="general/search" size={16} /></button>
                    <button className="action-button"><Icon name="general/settings" size={16} /></button>
                </div>
            </div>
        </div>
    );
}

export default MainToolbar;