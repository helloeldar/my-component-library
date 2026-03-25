import { useState } from 'react';
import Dialog from './Dialog';
import DialogGroupHeader from './DialogGroupHeader';
import Search from '../search/Search';
import TreeNode from '../tree/TreeNode';
import Checkbox from '../checkbox/Checkbox';
import Dropdown from '../dropdown/Dropdown';
import UILink from '../link/Link';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import './SettingsDialog.css';

export const DEFAULT_SETTINGS_TREE_ITEMS = [
    {
        id: 'appearance-behavior',
        label: 'Appearance and Behavior',
        expanded: true,
        children: [
            { id: 'appearance', label: 'Appearance' },
            { id: 'menus-toolbar', label: 'Menus and Toolbar' },
            { id: 'system-settings', label: 'System Settings', hasChildren: true },
            { id: 'file-colors', label: 'File Colors' },
            { id: 'scopes', label: 'Scopes', hasChildren: true },
            { id: 'notifications', label: 'Notifications' },
            { id: 'path-variables', label: 'Path Variables' },
        ],
    },
    { id: 'keymap', label: 'Keymap' },
    { id: 'editor', label: 'Editor', hasChildren: true },
    { id: 'plugins', label: 'Plugins' },
    { id: 'version-control', label: 'Version Control', hasChildren: true },
    { id: 'build-execution', label: 'Build, Execution, Deployment', hasChildren: true },
    { id: 'languages', label: 'Languages and Frameworks', hasChildren: true },
    { id: 'tools', label: 'Tools', hasChildren: true },
];

function collectInitialExpanded(items) {
    const result = {};
    (items || []).forEach(item => {
        if (item.expanded) result[item.id] = true;
        if (item.children) Object.assign(result, collectInitialExpanded(item.children));
    });
    return result;
}

function getFirstLeafId(items) {
    if (!items || items.length === 0) return null;
    const first = items[0];
    if (first.expanded && first.children && first.children.length > 0) {
        return first.children[0].id;
    }
    return first.id;
}

function renderTreeItems(items, level, selectedNode, onSelect, expandedMap, toggleExpanded) {
    return (items || []).map(item => {
        const hasData = item.children && item.children.length > 0;
        const isExpanded = !!expandedMap[item.id];
        return (
            <TreeNode
                key={item.id}
                label={item.label}
                level={level}
                hasChildren={item.hasChildren || hasData}
                isExpanded={hasData ? isExpanded : undefined}
                isSelected={selectedNode === item.id}
                onToggle={hasData ? () => toggleExpanded(item.id) : undefined}
                onSelect={() => onSelect(item.id)}
            >
                {hasData && renderTreeItems(item.children, level + 1, selectedNode, onSelect, expandedMap, toggleExpanded)}
            </TreeNode>
        );
    });
}

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
    treeItems: treeItemsProp,
    buttons: buttonsProp,
    onClose,
    children: childrenProp,
    className: extraClassName = '',
}) {
    const resolvedTreeItems = treeItemsProp ?? DEFAULT_SETTINGS_TREE_ITEMS;

    const [searchValue, setSearchValue] = useState('');
    const [selectedNode, setSelectedNode] = useState(() => getFirstLeafId(resolvedTreeItems));
    const [expandedMap, setExpandedMap] = useState(() => collectInitialExpanded(resolvedTreeItems));

    const toggleExpanded = (id) => setExpandedMap(prev => {
        const next = { ...prev };
        if (next[id]) delete next[id];
        else next[id] = true;
        return next;
    });

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
                        {renderTreeItems(resolvedTreeItems, 1, selectedNode, setSelectedNode, expandedMap, toggleExpanded)}
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
