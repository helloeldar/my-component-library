import React, { useState } from 'react';
import DialogHeader from './DialogHeader';
import Button from '../button/Button';
import ToolbarIconButton from '../iconbutton/IconButton';
import Icon from '../icon/Icon';
import Search from '../search/Search';
import ideaIcon32 from '../../../productLogos/idea/icon_32.svg';
import sshIcon from '../../../icons/python/ssh.svg';
import './WelcomeDialog.css';

/**
 * Figma asset URL for JetBrains Space icon — not available in the icon library.
 */
const SPACE_ICON_URL = "https://www.figma.com/api/mcp/asset/bf73fbd7-1fbb-4dcf-bcb8-c45ed3ef762d";

const DEFAULT_PROJECTS = [
    { id: 'commons-math', name: 'commons-math', path: '~/ideaProject/commons-math', initials: 'CM', gradient: ['#5fad65', '#3d968b'] },
    { id: 'kotlin', name: 'kotlin', path: '~/ideaProject/kotlin', initials: 'K', gradient: ['#3b92b8', '#6183ec'] },
    { id: 'intellij-idea', name: 'IntelliJ IDEA', path: '~/ideaProject/intellij-idea', initials: 'IJ', gradient: ['#874ece', '#963dcc'] },
    { id: 'webstorm', name: 'WebStorm', path: '~/ideaProject/webstorm', initials: 'WS', gradient: ['#b08b14', '#bb7f19'] },
];

const NAV_ITEMS = [
    { id: 'projects', label: 'Projects', level: 1, chevron: 'none' },
    { id: 'remote-development', label: 'Remote Development', level: 1, chevron: 'down' },
    { id: 'ssh', label: 'SSH', level: 2, chevron: 'right', iconUrl: sshIcon },
    { id: 'jetbrains-space', label: 'JetBrains Space', level: 2, chevron: 'right', iconUrl: SPACE_ICON_URL },
    { id: 'customize', label: 'Customize', level: 1, chevron: 'down' },
    { id: 'plugins', label: 'Plugins', level: 1, chevron: 'down' },
    { id: 'tutorials', label: 'Tutorials', level: 1, chevron: 'down' },
];

function ProjectIcon({ initials, gradient }) {
    return (
        <div
            className="welcome-project-icon"
            style={{ background: `linear-gradient(to bottom, ${gradient[0]}, ${gradient[1]})` }}
        >
            <span className="welcome-project-icon-initials">{initials}</span>
        </div>
    );
}

function NavItem({ item, isSelected, onClick }) {
    const paddingLeft = item.level === 2 ? 32 : 16;

    return (
        <div
            className={`welcome-nav-item ${isSelected ? 'welcome-nav-item-selected' : ''}`}
            onClick={() => onClick(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(item.id); }}
            style={{ paddingLeft }}
        >
            <div className="welcome-nav-item-chevron">
                {item.chevron === 'down' && (
                    <Icon name="general/chevronDown" size={16} />
                )}
                {item.chevron === 'right' && (
                    <Icon name="general/chevronRight" size={16} />
                )}
            </div>
            <div className="welcome-nav-item-content">
                {item.iconUrl && (
                    <img
                        className="welcome-nav-item-icon"
                        src={item.iconUrl}
                        alt=""
                        width={16}
                        height={16}
                    />
                )}
                <span className={`welcome-nav-item-label text-ui-default ${isSelected ? 'welcome-nav-item-label-selected' : ''}`}>
                    {item.label}
                </span>
            </div>
        </div>
    );
}

/**
 * WelcomeDialog - The IntelliJ IDEA "Welcome to IntelliJ IDEA" startup screen.
 *
 * Matches Figma node 11490-43649 "Dialog / Welcome Screen".
 *
 * @param {string} ideTitle - IDE product name shown in sidebar header (default: "IntelliJ IDEA")
 * @param {string} ideVersion - IDE version string (default: "Ultimate 2025.2")
 * @param {string} ideIconUrl - URL for the IDE product icon
 * @param {Array} projects - List of recent projects { id, name, path, initials, gradient }
 * @param {string} activeNav - Controlled active navigation item id (default: "projects")
 * @param {Function} onNavChange - Callback when nav item is selected
 * @param {string} selectedProjectId - Controlled selected project id
 * @param {Function} onProjectSelect - Callback when a project is clicked
 * @param {string} searchValue - Controlled search value
 * @param {Function} onSearchChange - Callback when search changes
 * @param {Function} onNewProject - "New Project" button callback
 * @param {Function} onOpen - "Open" button callback
 * @param {Function} onGetFromVCS - "Get From VCS" button callback
 * @param {Function} onSettings - Settings icon button callback
 * @param {Function} onNotifications - Notifications icon button callback
 * @param {string} className - Additional CSS classes
 */
function WelcomeDialog({
    ideTitle = "IntelliJ IDEA",
    ideVersion = "Ultimate 2025.2",
    ideIconUrl = ideaIcon32,
    projects = DEFAULT_PROJECTS,
    navItems = NAV_ITEMS,
    activeNav,
    onNavChange,
    selectedProjectId,
    onProjectSelect,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search projects",
    actionLabels,
    onNewProject,
    onOpen,
    onGetFromVCS,
    onSettings,
    onNotifications,
    className = "",
}) {
    const [internalNav, setInternalNav] = useState('projects');
    const [internalProject, setInternalProject] = useState(projects[0]?.id ?? null);
    const [internalSearch, setInternalSearch] = useState('');

    const currentNav = activeNav !== undefined ? activeNav : internalNav;
    const currentProject = selectedProjectId !== undefined ? selectedProjectId : internalProject;
    const currentSearch = searchValue !== undefined ? searchValue : internalSearch;

    const handleNavChange = (id) => {
        if (onNavChange) { onNavChange(id); }
        else { setInternalNav(id); }
    };

    const handleProjectSelect = (id) => {
        if (onProjectSelect) { onProjectSelect(id); }
        else { setInternalProject(id); }
    };

    const handleSearchChange = (val) => {
        if (onSearchChange) { onSearchChange(val); }
        else { setInternalSearch(val); }
    };

    const labels = {
        newProject: 'New Project',
        open: 'Open',
        getFromVcs: 'Get From VCS',
        ...actionLabels,
    };

    return (
        <div className={`welcome-dialog ${className}`}>
            <DialogHeader title={`Welcome to ${ideTitle}`} showMacOSButtons={true} />

            <div className="welcome-dialog-body">
                {/* Left sidebar */}
                <div className="welcome-sidebar">
                    <div className="welcome-sidebar-content">
                        <div className="welcome-sidebar-ide-header">
                            <img
                                className="welcome-ide-icon"
                                src={ideIconUrl}
                                alt={ideTitle}
                                width={32}
                                height={32}
                            />
                            <div className="welcome-ide-name">
                                <span className="welcome-ide-title text-ui-default">{ideTitle}</span>
                                <span className="welcome-ide-version text-ui-small">{ideVersion}</span>
                            </div>
                        </div>

                        <nav className="welcome-nav">
                            {navItems.map(item => (
                                <NavItem
                                    key={item.id}
                                    item={item}
                                    isSelected={item.id === currentNav}
                                    onClick={handleNavChange}
                                />
                            ))}
                        </nav>
                    </div>

                    <div className="welcome-sidebar-footer">
                        <ToolbarIconButton
                            icon="general/settings"
                            tooltip="Settings"
                            onClick={onSettings}
                        />
                    </div>
                </div>

                {/* Right content area */}
                <div className="welcome-content">
                    <div className="welcome-content-inner">
                        <div className="welcome-search-area">
                            <div className="welcome-search-row">
                                <Search
                                    value={currentSearch}
                                    onChange={handleSearchChange}
                                    placeholder={searchPlaceholder}
                                    showClose={!!currentSearch}
                                />
                                <div className="welcome-action-buttons">
                                    <Button type="secondary" onClick={onNewProject}>{labels.newProject}</Button>
                                    <Button type="secondary" onClick={onOpen}>{labels.open}</Button>
                                    <Button type="secondary" onClick={onGetFromVCS}>{labels.getFromVcs}</Button>
                                </div>
                            </div>
                            <div className="welcome-search-separator" />
                        </div>

                        <div className="welcome-project-list">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className={`welcome-project-cell ${project.id === currentProject ? 'welcome-project-cell-selected' : ''}`}
                                    onClick={() => handleProjectSelect(project.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProjectSelect(project.id); }}
                                >
                                    <div className="welcome-project-cell-content">
                                        <ProjectIcon initials={project.initials} gradient={project.gradient} />
                                        <div className="welcome-project-cell-info">
                                            <span className="welcome-project-name text-ui-default">{project.name}</span>
                                            <span className="welcome-project-path text-ui-small">{project.path}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="welcome-content-footer">
                        <ToolbarIconButton
                            icon="toolwindows/notifications"
                            tooltip="Notifications"
                            showBadge={true}
                            onClick={onNotifications}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeDialog;
export { DEFAULT_PROJECTS, NAV_ITEMS };
