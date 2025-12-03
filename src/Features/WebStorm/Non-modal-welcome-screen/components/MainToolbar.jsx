import ProjectSelector from '../../../../ui/components/projectselector/ProjectSelector';
import './MainToolbar.css';

// Simple icon components for toolbar
const AIAIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
);

const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M14 14L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.657 4.343L14.243 5.757M5.757 14.243L4.343 15.657M15.657 15.657L14.243 14.243M5.757 5.757L4.343 4.343" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

function MainToolbar() {
    const projects = [
        { 
            name: 'WebStorm', 
            displayName: 'WebStorm',
            icon: 'WS', 
            color: 'grass',
            path: '~/Projects/WebStorm' 
        }
    ];

    return (
        <div className="main-toolbar" data-name="Main Toolbar">
            <div className="main-toolbar-left" data-name="Left side">
                <div className="macos-buttons" data-name="Main Toolbar / MacOS Buttons">
                    <div className="macos-button macos-button-close" data-name="Close"></div>
                    <div className="macos-button macos-button-minimize" data-name="Minimize"></div>
                    <div className="macos-button macos-button-expand" data-name="Expand"></div>
                </div>
                <div className="main-toolbar-project" data-name="left side">
                    <ProjectSelector
                        projectName="WebStorm"
                        projectIcon="WS"
                        projectColor="grass"
                        projects={projects}
                    />
                </div>
            </div>
            <div className="main-toolbar-right" data-name="right side">
                <button className="toolbar-button" data-name="Right side">
                    <div className="toolbar-icon" data-name="search">
                        <AIAIcon />
                    </div>
                    <div className="toolbar-icon" data-name="search">
                        <SearchIcon />
                    </div>
                    <div className="toolbar-icon" data-name="settings">
                        <SettingsIcon />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default MainToolbar;

