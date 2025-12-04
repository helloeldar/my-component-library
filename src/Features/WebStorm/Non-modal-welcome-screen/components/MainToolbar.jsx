import ProjectSelector from '../../../../ui/components/projectselector/ProjectSelector';
import { SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG } from '../../../../icons';
import './MainToolbar.css';

// Simple icon components for toolbar
const AIAIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
);

const SearchIcon = () => <SearchIconSVG style={{ width: '20px', height: '20px', color: 'currentColor' }} />;

const SettingsIcon = () => <SettingsIconSVG style={{ width: '20px', height: '20px', color: 'currentColor' }} />;

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

