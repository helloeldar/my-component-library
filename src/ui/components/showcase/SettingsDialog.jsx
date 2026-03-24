import { useState } from 'react';
import Dialog from '../dialog/Dialog';
import DialogGroupHeader from '../dialog/DialogGroupHeader';
import Search from '../search/Search';
import TreeNode from '../tree/TreeNode';
import Checkbox from '../checkbox/Checkbox';
import Dropdown from '../dropdown/Dropdown';
import UILink from '../link/Link';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import './SettingsDialog.css';

const THEME_OPTIONS = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'darcula', label: 'Darcula' },
    { value: 'high-contrast', label: 'High Contrast' },
];

const ZOOM_OPTIONS = ['75%', '90%', '100%', '125%', '150%'].map(v => ({ value: v, label: v }));

const ANTIALIASING_OPTIONS = [
    { value: 'subpixel', label: 'Subpixel' },
    { value: 'greyscale', label: 'Greyscale' },
    { value: 'none', label: 'No antialiasing' },
];

const FONT_OPTIONS = [
    { value: 'inter', label: 'Inter' },
    { value: 'jetbrains-mono', label: 'JetBrains Mono' },
    { value: 'system', label: 'System Font' },
];

const SIZE_OPTIONS = ['11', '12', '13', '14', '15', '16'].map(v => ({ value: v, label: v }));

function SettingsDialog({
    title = 'Settings',
    width = 891,
    height = 653,
    buttons: buttonsProp,
    onClose,
    children: childrenProp,
    className: extraClassName = '',
}) {
    const [searchValue, setSearchValue] = useState('');
    const [selectedNode, setSelectedNode] = useState('appearance');

    const [theme, setTheme] = useState('dark');
    const [syncWithOS, setSyncWithOS] = useState(false);
    const [zoom, setZoom] = useState('100%');
    const [useCustomFont, setUseCustomFont] = useState(false);
    const [font, setFont] = useState('inter');
    const [fontSize, setFontSize] = useState('13');

    const [screenReaders, setScreenReaders] = useState(false);
    const [contrastScrollbars, setContrastScrollbars] = useState(false);
    const [colorAdjust, setColorAdjust] = useState(false);

    const [treeIndentGuides, setTreeIndentGuides] = useState(false);
    const [smallerIndents, setSmallerIndents] = useState(false);
    const [mnemonicsMenu, setMnemonicsMenu] = useState(true);
    const [mnemonicsControls, setMnemonicsControls] = useState(false);
    const [smoothScrolling, setSmoothScrolling] = useState(true);
    const [dragDropAlt, setDragDropAlt] = useState(true);
    const [fullPathHeader, setFullPathHeader] = useState(false);
    const [iconsInMenu, setIconsInMenu] = useState(true);

    const [ideAA, setIdeAA] = useState('subpixel');
    const [editorAA, setEditorAA] = useState('subpixel');

    const sel = (id) => setSelectedNode(id);

    const resolvedButtons = buttonsProp ?? [
        { children: 'Cancel', onClick: onClose },
        { children: 'Apply', disabled: true },
        { children: 'OK', onClick: onClose },
    ];

    const defaultContent = (
        <div className="settings-layout">
            {/* Left Tree Panel */}
            <div className="settings-tree-panel">
                    <div className="settings-tree-search">
                        <Search value={searchValue} onChange={setSearchValue} placeholder="" />
                    </div>
                    <div className="settings-tree-nodes">
                        <TreeNode
                            label="Appearance and Behavior"
                            level={1}
                            hasChildren
                            isExpanded
                            isSelected={selectedNode === 'appearance-behavior'}
                            onSelect={() => sel('appearance-behavior')}
                        >
                            <TreeNode label="Appearance" level={2} isSelected={selectedNode === 'appearance'} onSelect={() => sel('appearance')} />
                            <TreeNode label="Menus and Toolbar" level={2} isSelected={selectedNode === 'menus-toolbar'} onSelect={() => sel('menus-toolbar')} />
                            <TreeNode label="System Settings" level={2} hasChildren isSelected={selectedNode === 'system-settings'} onSelect={() => sel('system-settings')} />
                            <TreeNode label="File Colors" level={2} isSelected={selectedNode === 'file-colors'} onSelect={() => sel('file-colors')} />
                            <TreeNode label="Scopes" level={2} hasChildren isSelected={selectedNode === 'scopes'} onSelect={() => sel('scopes')} />
                            <TreeNode label="Notifications" level={2} isSelected={selectedNode === 'notifications'} onSelect={() => sel('notifications')} />
                            <TreeNode label="Path Variables" level={2} isSelected={selectedNode === 'path-variables'} onSelect={() => sel('path-variables')} />
                        </TreeNode>
                        <TreeNode label="Keymap" level={1} isSelected={selectedNode === 'keymap'} onSelect={() => sel('keymap')} />
                        <TreeNode label="Editor" level={1} hasChildren isSelected={selectedNode === 'editor'} onSelect={() => sel('editor')} />
                        <TreeNode label="Plugins" level={1} isSelected={selectedNode === 'plugins'} onSelect={() => sel('plugins')} />
                        <TreeNode label="Version Control" level={1} hasChildren isSelected={selectedNode === 'version-control'} onSelect={() => sel('version-control')} />
                        <TreeNode label="Build, Execution, Deployment" level={1} hasChildren isSelected={selectedNode === 'build-execution'} onSelect={() => sel('build-execution')} />
                        <TreeNode label="Languages and Frameworks" level={1} hasChildren isSelected={selectedNode === 'languages'} onSelect={() => sel('languages')} />
                        <TreeNode label="Tools" level={1} hasChildren isSelected={selectedNode === 'tools'} onSelect={() => sel('tools')} />
                    </div>
                </div>

                {/* Right Content Panel */}
                <div className="settings-content-panel">
                    {/* Breadcrumb */}
                    <div className="settings-breadcrumb">
                        <span className="text-ui-default-semibold">Appearance and Behavior</span>
                        <Icon name="general/chevronRight" size={16} />
                        <span className="text-ui-default-semibold">Appearance</span>
                        <Icon name="general/chevronRight" size={16} />
                        <span className="text-ui-default-semibold">Editor Tabs</span>
                    </div>

                    {/* Top Controls */}
                    <div className="settings-group">
                        <div className="settings-controls-row">
                            <Dropdown
                                label="Theme"
                                layout="horizontal"
                                value={theme}
                                options={THEME_OPTIONS}
                                onChange={setTheme}
                                labelWidth="50px"
                                style={{ width: 195 }}
                            />
                            <Checkbox label="Sync with OS" checked={syncWithOS} onChange={setSyncWithOS} />
                            <UILink type="external" href="#">Get more themes</UILink>
                        </div>
                        <div className="settings-controls-row">
                            <Dropdown
                                label="Zoom"
                                layout="horizontal"
                                value={zoom}
                                options={ZOOM_OPTIONS}
                                onChange={setZoom}
                                labelWidth="44px"
                                hint="Change with ⌥⌃= or ⌥⌃-. Set to 100% with ⌥⌃0"
                                style={{ width: 230 }}
                            />
                        </div>
                        <div className="settings-controls-row">
                            <div className="settings-inline-row">
                                <Checkbox label="Use custom font:" checked={useCustomFont} onChange={setUseCustomFont} />
                                <Dropdown
                                    value={font}
                                    options={FONT_OPTIONS}
                                    onChange={setFont}
                                    disabled={!useCustomFont}
                                    style={{ width: 178 }}
                                />
                            </div>
                            <Dropdown
                                label="Size"
                                layout="horizontal"
                                value={fontSize}
                                options={SIZE_OPTIONS}
                                onChange={setFontSize}
                                disabled={!useCustomFont}
                                labelWidth="34px"
                                style={{ width: 110 }}
                            />
                        </div>
                    </div>

                    {/* Accessibility */}
                    <div className="settings-group">
                        <DialogGroupHeader title="Accessibility" />
                        <div className="settings-group-indented">
                            <Checkbox
                                label="Support screen readers"
                                hint="⌘⇥ and ⇧⌘⇥ will navigate UI controls in dialogs and will not be available for switching editor tabs or other IDE actions"
                                checked={screenReaders}
                                onChange={setScreenReaders}
                            />
                            <Checkbox label="Use contrast scrollbars" checked={contrastScrollbars} onChange={setContrastScrollbars} />
                            <Checkbox
                                label="Adjust colors for red-green vision deficiency"
                                hint="Requires restart. For protanopia and deuteranopia."
                                checked={colorAdjust}
                                onChange={setColorAdjust}
                            />
                        </div>
                    </div>

                    {/* UI Options */}
                    <div className="settings-group">
                        <DialogGroupHeader title="UI Options" />
                        <div className="settings-two-columns">
                            <div className="settings-column">
                                <Checkbox label="Show tree indent guides" checked={treeIndentGuides} onChange={setTreeIndentGuides} />
                                <Checkbox label="Use smaller indents in trees" checked={smallerIndents} onChange={setSmallerIndents} />
                                <Checkbox label="Enable mnemonics in menu" checked={mnemonicsMenu} onChange={setMnemonicsMenu} />
                                <Checkbox label="Enable mnemonics in controls" checked={mnemonicsControls} onChange={setMnemonicsControls} />
                            </div>
                            <div className="settings-column settings-column-no-indent">
                                <Checkbox label="Smooth scrolling" checked={smoothScrolling} onChange={setSmoothScrolling} />
                                <Checkbox label="Drag-and-drop with Alt pressed only" checked={dragDropAlt} onChange={setDragDropAlt} />
                                <Checkbox label="Always show full path in window header" checked={fullPathHeader} onChange={setFullPathHeader} />
                                <Checkbox label="Display icons in menu items" checked={iconsInMenu} onChange={setIconsInMenu} />
                            </div>
                        </div>
                        <div className="settings-group-indented">
                            <Button type="secondary">Background Image</Button>
                        </div>
                    </div>

                    {/* Antialiasing */}
                    <div className="settings-group">
                        <DialogGroupHeader title="Antialiasing" />
                        <div className="settings-two-columns settings-two-columns-indented">
                            <Dropdown
                                label="IDE"
                                layout="horizontal"
                                value={ideAA}
                                options={ANTIALIASING_OPTIONS}
                                onChange={setIdeAA}
                                labelWidth="30px"
                                style={{ width: 230 }}
                            />
                            <Dropdown
                                label="Editor"
                                layout="horizontal"
                                value={editorAA}
                                options={ANTIALIASING_OPTIONS}
                                onChange={setEditorAA}
                                labelWidth="46px"
                                style={{ width: 213 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
    );

    return (
        <Dialog
            title={title}
            width={width}
            height={height}
            className={`settings-dialog ${extraClassName}`}
            buttons={resolvedButtons}
        >
            {childrenProp !== undefined ? childrenProp : defaultContent}
        </Dialog>
    );
}

export default SettingsDialog;
