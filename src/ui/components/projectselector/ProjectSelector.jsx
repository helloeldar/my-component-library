import { useState } from 'react';
import Popup from '../popup/Popup';
import './ProjectSelector.css';

function ProjectSelector(props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        if (props.onClick) {
            props.onClick();
        }
    };

    const handleProjectSelect = (project) => {
        setIsOpen(false);
        if (props.onProjectSelect) {
            props.onProjectSelect(project);
        }
    };

    let classes = ['project-selector'];
    if (props.state === 'hovered' || isOpen) {
        classes.push('project-selector-hovered');
    }
    if (props.state === 'pressed') {
        classes.push('project-selector-pressed');
    }

    return (
        <div className="project-selector-container">
            <button className={classes.join(' ')} onClick={handleClick}>
                <div className="project-selector-content">
                    <div className={`project-icon ${props.projectColor ? `project-icon-${props.projectColor}` : ''}`}>
                        <div className="project-icon-background">
                            <span className="project-icon-text">
                                {props.projectIcon || 'IJ'}
                            </span>
                        </div>
                    </div>
                    <div className="project-text-dropdown">
                        <span className="project-text">
                            {props.projectName || 'Project Name'}
                        </span>
                        <div className="chevron-down">
                            <svg viewBox="0 0 16 16" fill="currentColor">
                                <path d="M4.427 6.427a.6.6 0 0 1 .849 0L8 9.151l2.724-2.724a.6.6 0 1 1 .849.849L8.424 10.424a.6.6 0 0 1-.849 0L4.427 7.276a.6.6 0 0 1 0-.849Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </button>
            
            {isOpen && props.projects && (
                <Popup 
                    visible={isOpen}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        minWidth: '300px',
                        zIndex: 1000
                    }}
                >
                    {props.projects.map((project, index) => (
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
        </div>
    );
}

export default ProjectSelector;