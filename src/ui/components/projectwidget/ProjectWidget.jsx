import { useState, useRef, useEffect } from 'react';
import Popup from '../popup/Popup';
import PopupProjects from '../popup/PopupProjects';
import Icon from '../icon/Icon';
import './ProjectWidget.css';

function ProjectWidget(props) {
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

    let classes = ['project-widget'];
    if (props.state === 'hovered' || isOpen) {
        classes.push('project-widget-hovered');
    }
    if (props.state === 'pressed') {
        classes.push('project-widget-pressed');
    }

    const popupStyle = {
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: '4px',
        zIndex: 1000
    };

    return (
        <div className="project-widget-container" ref={containerRef}>
            <button className={classes.join(' ')} onClick={handleClick}>
                <div className="project-widget-content">
                    <div className={`project-icon ${props.projectColor ? `project-icon-${props.projectColor}` : ''}`}>
                        <div className="project-icon-background">
                            <span className="project-icon-text">
                                {props.projectIcon || 'IJ'}
                            </span>
                        </div>
                    </div>
                    <div className="project-text-dropdown">
                        <span className="project-text text-ui-default">
                            {props.projectName || 'Project Name'}
                        </span>
                        <div className="chevron-down">
                            <Icon name="general/chevronDown" size={16} />
                        </div>
                    </div>
                </div>
            </button>

            {isOpen && props.projects && (
                <Popup
                    visible={isOpen}
                    style={{ ...popupStyle, minWidth: '300px' }}
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

            {isOpen && !props.projects && (
                <PopupProjects style={popupStyle} />
            )}
        </div>
    );
}

export default ProjectWidget;
