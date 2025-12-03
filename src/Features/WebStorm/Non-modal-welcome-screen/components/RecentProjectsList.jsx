import './RecentProjectsList.css';

function RecentProjectsList() {
    const projects = [
        {
            name: 'angular-something',
            path: '~/ideaProject/intellij-idea',
            icon: 'II',
            color: 'grass'
        },
        {
            name: 'calculator-unit-tests-java',
            path: '~/Library/Application Support/calculator-uni...',
            icon: 'CU',
            color: 'ocean'
        }
    ];

    return (
        <div className="recent-projects" data-name="Recent projects">
            <div className="recent-projects-header" data-name="Popup / Cell / Regular">
                <div className="recent-projects-header-text" data-name="Text">
                    <p>Recent projects</p>
                </div>
            </div>
            <div className="recent-projects-list" data-name="Projects">
                {projects.map((project, index) => (
                    <div 
                        key={index}
                        className="recent-project-item" 
                        data-name="Popup / Cell / Regular"
                        role="button"
                        tabIndex={0}
                    >
                        <div className="recent-project-content" data-name="Content">
                            <div className="recent-project-icon-container" data-name="Icon">
                                <div className={`project-icon project-icon-${project.color}`}>
                                    <div className="project-icon-background">
                                        <span className="project-icon-text">
                                            {project.icon}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="recent-project-info" data-name="Content">
                                <p className="recent-project-name" data-name="Name">
                                    {project.name}
                                </p>
                                <div className="recent-project-path" data-name="Path">
                                    <p>{project.path}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentProjectsList;

