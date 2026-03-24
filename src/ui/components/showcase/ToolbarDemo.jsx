import ToolbarIconButton from '../iconbutton/IconButton';
import ToolbarButton from '../toolbar/ToolbarButton';
import ToolbarSeparator from '../toolbar/ToolbarSeparator';
import ToolbarDropdown from '../toolbardropdown/ToolbarDropdown';
import './ToolbarDemo.css';

function ToolbarDemo() {
    return (
        <div className="component-showcase toolbar-demo-page">
            <h1>Toolbar</h1>
            <p className="toolbar-demo-description">
                Components for tool-window toolbars: icon buttons (26px), separators, and dropdown buttons.
                These live inside panels like the Project, VCS Log, or Terminal tool windows.
            </p>

            {/* ── Live preview strip ── */}
            <div className="component-section">
                <h2>Preview</h2>
                <p className="component-description">
                    A sample horizontal tool-window toolbar showing icon buttons, a separator, and a dropdown.
                </p>
                <div className="toolbar-demo-strip">
                    <ToolbarIconButton icon="general/add" tooltip="New" />
                    <ToolbarIconButton icon="general/refresh" tooltip="Refresh" />
                    <ToolbarIconButton icon="general/filter" tooltip="Filter" showBadge />
                    <ToolbarSeparator />
                    <ToolbarButton icon="vcs/fetch" text="Fetch" />
                    <ToolbarButton text="Rebase…" showChevron />
                    <ToolbarSeparator />
                    <ToolbarDropdown label="Branch:" text="main" />
                    <ToolbarDropdown label="User:" text="All" />
                    <ToolbarSeparator />
                    <ToolbarIconButton icon="general/expandAll" tooltip="Expand All" />
                    <ToolbarIconButton icon="general/collapseAll" tooltip="Collapse All" />
                    <ToolbarIconButton type="toggle" toggled icon="general/show" tooltip="Show Details" />
                </div>
            </div>

            {/* ── Toolbar Icon Button ── */}
            <div className="component-section">
                <h2>Toolbar Icon Button</h2>
                <p className="component-description">
                    26×26px button with a 16px icon. Two types: <code>action</code> (triggers once) and <code>toggle</code> (on/off state).
                </p>
                <div className="component-section">
                    <h3>Action</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarIconButton icon="general/settings" tooltip="Settings" />
                        <ToolbarIconButton icon="general/search" tooltip="Search" shortcut="⌘K" />
                        <ToolbarIconButton icon="vcs/commit" tooltip="Commit" shortcut="⌘K" />
                        <ToolbarIconButton icon="run/run" tooltip="Run" />
                        <ToolbarIconButton icon="run/debug" tooltip="Debug" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>Toggle</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarIconButton type="toggle" icon="general/show" tooltip="Show (off)" />
                        <ToolbarIconButton type="toggle" toggled icon="general/show" tooltip="Show (on)" />
                        <ToolbarIconButton type="toggle" icon="general/filter" tooltip="Filter (off)" />
                        <ToolbarIconButton type="toggle" toggled icon="general/filter" tooltip="Filter (on)" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>States</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarIconButton icon="general/settings" tooltip="Default" />
                        <ToolbarIconButton icon="general/settings" tooltip="Disabled" disabled />
                        <ToolbarIconButton icon="general/filter" tooltip="With badge" showBadge />
                    </div>
                </div>
            </div>

            {/* ── Toolbar Button ── */}
            <div className="component-section">
                <h2>Toolbar Button</h2>
                <p className="component-description">
                    26px text action button. Use for labeled actions like "Fetch", "Rebase…", "Cherry-pick".
                    Add <code>showChevron</code> when the button opens a submenu.
                </p>
                <div className="component-section">
                    <h3>Text only</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarButton text="Commit…" />
                        <ToolbarButton text="Rebase…" />
                        <ToolbarButton text="Cherry-pick" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>With icon</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarButton icon="vcs/fetch" text="Fetch" />
                        <ToolbarButton icon="vcs/update" text="Update" />
                        <ToolbarButton icon="vcs/push" text="Push" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>With dropdown arrow</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarButton text="Commit…" showChevron />
                        <ToolbarButton icon="vcs/fetch" text="Fetch" showChevron />
                    </div>
                </div>
                <div className="component-section">
                    <h3>States</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarButton text="Default" />
                        <ToolbarButton text="Disabled" disabled />
                    </div>
                </div>
            </div>

            {/* ── Toolbar Separator ── */}
            <div className="component-section">
                <h2>Toolbar Separator</h2>
                <p className="component-description">
                    Divides action groups. Vertical (9×26px) for horizontal toolbars; horizontal (26×9px) for vertical toolbars.
                </p>
                <div className="component-section">
                    <h3>Vertical (default)</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarIconButton icon="general/add" tooltip="Add" />
                        <ToolbarIconButton icon="general/refresh" tooltip="Refresh" />
                        <ToolbarSeparator />
                        <ToolbarIconButton icon="general/settings" tooltip="Settings" />
                        <ToolbarIconButton icon="general/show" tooltip="Show" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>Horizontal (vertical toolbars)</h3>
                    <div className="toolbar-demo-strip-vertical">
                        <ToolbarIconButton icon="general/add" tooltip="Add" />
                        <ToolbarIconButton icon="general/refresh" tooltip="Refresh" />
                        <ToolbarSeparator orientation="horizontal" />
                        <ToolbarIconButton icon="general/settings" tooltip="Settings" />
                    </div>
                </div>
            </div>

            {/* ── Toolbar Dropdown ── */}
            <div className="component-section">
                <h2>Toolbar Dropdown</h2>
                <p className="component-description">
                    Text button with an optional icon and dropdown chevron. Used as a filter selector inside tool-window toolbars.
                </p>
                <div className="component-section">
                    <h3>Text only</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarDropdown text="Branch" />
                        <ToolbarDropdown text="User" />
                        <ToolbarDropdown text="Time Range" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>Label + text</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarDropdown label="Branch:" text="main" />
                        <ToolbarDropdown label="User:" text="All" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>With icon</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarDropdown icon="general/settings" text="Options" />
                        <ToolbarDropdown icon="general/filter" text="Filter" />
                    </div>
                </div>
                <div className="component-section">
                    <h3>States</h3>
                    <div className="toolbar-demo-strip">
                        <ToolbarDropdown text="Default" />
                        <ToolbarDropdown text="Disabled" disabled />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToolbarDemo;
