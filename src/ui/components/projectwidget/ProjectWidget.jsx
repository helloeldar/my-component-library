import { useState, useRef, useEffect } from 'react';
import Popup from '../popup/Popup';
import PopupProjects from '../popup/PopupProjects';
import MainToolbarDropdown from '../maintoolbar/MainToolbarDropdown';
import './ProjectWidget.css';

function ProjectWidget({
    projectName,
    projectIcon,
    projectColor,
    projects,
    state,
    onClick,
    onProjectSelect,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleClick = () => {
        setIsOpen(prev => !prev);
        if (onClick) onClick();
    };

    const handleProjectSelect = (project) => {
        setIsOpen(false);
        if (onProjectSelect) onProjectSelect(project);
    };

    const projectIcon20 = (
        <div className={`project-icon ${projectColor ? `project-icon-${projectColor}` : ''}`}>
            <div className="project-icon-background">
                <span className="project-icon-text">{projectIcon || 'IJ'}</span>
            </div>
        </div>
    );

    // Force hovered look while popup is open, or when parent passes state="hovered"
    const extraClass = [
        'project-widget-button',
        (state === 'hovered' || isOpen) ? 'main-toolbar-dropdown-hovered' : '',
        state === 'pressed' ? 'main-toolbar-dropdown-pressed' : '',
    ].filter(Boolean).join(' ');

    const popupStyle = {
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: '4px',
        zIndex: 1000,
    };

    return (
        <div className="project-widget-container" ref={containerRef}>
            <MainToolbarDropdown
                icon={projectIcon20}
                text={projectName || 'Project Name'}
                className={extraClass}
                onClick={handleClick}
            />

            {isOpen && projects && (
                <Popup visible style={{ ...popupStyle, minWidth: '300px' }}>
                    {projects.map((project, index) => (
                        <Popup.Cell
                            key={index}
                            type="multiline"
                            icon={
                                <div className={`project-icon ${project.color ? `project-icon-${project.color}` : ''}`}>
                                    <div className="project-icon-background">
                                        <span className="project-icon-text">
                                            {project.icon || project.name?.substring(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            }
                            hint={project.path || `~/${project.name?.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => handleProjectSelect(project)}
                        >
                            {project.displayName || project.name}
                        </Popup.Cell>
                    ))}
                </Popup>
            )}

            {isOpen && !projects && (
                <PopupProjects style={popupStyle} />
            )}
        </div>
    );
}

export default ProjectWidget;
