import { useState } from 'react';
import MainToolbar from '../maintoolbar/MainToolbar';
import MainToolbarIconButton from '../maintoolbar/MainToolbarIconButton';
import MainToolbarDropdown from '../maintoolbar/MainToolbarDropdown';
import MainToolbarVerticalSeparator from '../maintoolbar/MainToolbarVerticalSeparator';
import './MainToolbarDemo.css';

function MainToolbarDemo() {
    const [toggled, setToggled] = useState(false);

    return (
        <div className="component-showcase main-toolbar-demo-page">
            <h1>Main Toolbar</h1>
            <p className="main-toolbar-demo-description">
                Components for the application's main toolbar: 40px height, 20px icon buttons, dropdowns, and separators.
                Regular tool-window toolbars use the smaller Toolbar components instead.
            </p>

            {/* ── Full live preview ── */}
            <div className="component-section">
                <h2>Preview</h2>
                <p className="component-description">
                    The full main toolbar as it appears in the IDE. Interactive — try clicking the VCS branch or run widgets.
                </p>
                <div className="main-toolbar-demo-frame">
                    <MainToolbar
                        projectName="my-project"
                        branchName="main"
                        runConfig="App"
                    />
                </div>
            </div>

            {/* ── Main Toolbar Icon Button ── */}
            <div className="component-section">
                <h2>Main Toolbar Icon Button</h2>
                <p className="component-description">
                    40×40px button with a 20px icon and 6px border-radius on the state background.
                    Used exclusively in the main application toolbar.
                </p>
                <div className="component-section">
                    <h3>Action</h3>
                    <div className="main-toolbar-demo-strip">
                        <MainToolbarIconButton icon="general/search@20x20" tooltip="Search Everywhere" shortcut="Double ⇧" />
                        <MainToolbarIconButton icon="general/settings@20x20" tooltip="Settings" />
                        <MainToolbarIconButton icon="toolwindows/aiAssistantToolWindow@20x20" tooltip="AI Assistant" />
                        <MainToolbarIconButton icon="codeWithMe/cwmAccess@20x20" tooltip="Code With Me" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>Toggle</h3>
                    <div className="main-toolbar-demo-strip">
                        <MainToolbarIconButton
                            type="toggle"
                            icon="general/search@20x20"
                            tooltip={toggled ? 'Toggle (on)' : 'Toggle (off)'}
                            toggled={toggled}
                            onClick={() => setToggled(v => !v)}
                        />
                        <MainToolbarIconButton type="toggle" icon="general/settings@20x20" tooltip="Toggled on" toggled />
                        <MainToolbarIconButton type="toggle" icon="toolwindows/find@20x20" tooltip="Toggled off" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>States</h3>
                    <div className="main-toolbar-demo-strip">
                        <MainToolbarIconButton icon="general/settings@20x20" tooltip="Default" />
                        <MainToolbarIconButton icon="general/settings@20x20" tooltip="Disabled" disabled />
                    </div>
                </div>
            </div>

            {/* ── Main Toolbar Dropdown ── */}
            <div className="component-section">
                <h2>Main Toolbar Dropdown</h2>
                <p className="component-description">
                    40px text button with an optional icon and dropdown chevron.
                    Used in the main toolbar for context selectors like VCS branch or run configuration.
                </p>
                <div className="component-section">
                    <h3>Text only</h3>
                    <div className="main-toolbar-demo-strip">
                        <MainToolbarDropdown text="main" />
                        <MainToolbarDropdown text="feature/my-branch" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>With icon</h3>
                    <div className="main-toolbar-demo-strip">
                        <MainToolbarDropdown icon="toolwindows/vcs" text="main" />
                        <MainToolbarDropdown icon="run/run" text="App" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>Label + text</h3>
                    <div className="main-toolbar-demo-strip">
                        <MainToolbarDropdown label="Branch:" text="main" />
                        <MainToolbarDropdown label="Config:" text="App" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>States</h3>
                    <div className="main-toolbar-demo-strip">
                        <MainToolbarDropdown icon="toolwindows/vcs" text="Default" />
                        <MainToolbarDropdown icon="toolwindows/vcs" text="Disabled" disabled />
                    </div>
                </div>
            </div>

            {/* ── Main Toolbar Vertical Separator ── */}
            <div className="component-section">
                <h2>Main Toolbar Vertical Separator</h2>
                <p className="component-description">
                    11×40px separator between groups in the main toolbar. Renders a 1×24px line.
                </p>
                <div className="main-toolbar-demo-strip">
                    <MainToolbarIconButton icon="general/search@20x20" tooltip="Search" />
                    <MainToolbarIconButton icon="toolwindows/commit@20x20" tooltip="Commit" />
                    <MainToolbarVerticalSeparator />
                    <MainToolbarIconButton icon="toolwindows/run@20x20" tooltip="Run" />
                    <MainToolbarIconButton icon="toolwindows/debug@20x20" tooltip="Debug" />
                    <MainToolbarVerticalSeparator />
                    <MainToolbarIconButton icon="general/settings@20x20" tooltip="Settings" />
                </div>
            </div>
        </div>
    );
}

export default MainToolbarDemo;
