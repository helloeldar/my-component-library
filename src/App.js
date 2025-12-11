import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Button from './ui/components/button/Button';
import ToolbarIconButton from './ui/components/iconbutton/IconButton';
import TabBar from './ui/components/tabs/TabBar';
import Input from './ui/components/input/Input';
import Tree from './ui/components/tree/Tree';
import ToolWindow from './ui/components/toolwindow/ToolWindow';
import Typography from './ui/components/showcase/Typography';
import Colors from './ui/components/showcase/Colors';
import ToolbarDemo from './ui/components/showcase/ToolbarDemo';
import Home from './Home';
import Stripe from './ui/components/stripe/Stripe';
import StripeContainer from './ui/components/stripe/StripeContainer';
import CodeExample from './ui/components/showcase/CodeExample';
import Popup from './ui/components/popup/Popup';
import ProjectSelector from './ui/components/projectselector/ProjectSelector';
import IDELayout from './ui/components/idelayout/IDELayout';
import ToolbarDropdown from './ui/components/toolbardropdown/ToolbarDropdown';
import Checkbox from './ui/components/checkbox/Checkbox';
import Radio, { RadioGroup } from './ui/components/radio/Radio';
import Toggle from './ui/components/toggle/Toggle';
import ProgressBar from './ui/components/progressbar/ProgressBar';
import Dropdown from './ui/components/dropdown/Dropdown';
import Combobox from './ui/components/combobox/Combobox';
import StatusBarBreadcrumb from './ui/components/statusbar/StatusBarBreadcrumb';
import StatusBar from './ui/components/statusbar/StatusBar';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ReactComponent as Logo } from './icons/nodes/pluginLogo.svg';
import { getSortedComponentsOnly, getSortedFeaturesOnly } from './componentsConfig';
import OnboardingShowcase from './features/webstorm/onboarding/OnboardingShowcase';
import './ui/styles/Themes.css';
import './App.css';

// Page Components
function ButtonsPage() {
    return (
        <div className="component-showcase">
            <h1>Buttons</h1>

            <div className="component-section">
                <h2>Types</h2>
                <div className="component-examples">
                    <Button type="primary">Primary</Button>
                    <Button type="secondary">Secondary</Button>
                </div>
            </div>

            <div className="component-section">
                <h2>Sizes</h2>
                <div className="component-group">
                    <h3>Default Size</h3>
                    <div className="component-examples">
                        <Button type="primary">Primary</Button>
                        <Button type="secondary">Secondary</Button>
                    </div>
                </div>
                <div className="component-group">
                    <h3>Slim Size</h3>
                    <div className="component-examples">
                        <Button type="primary" size="slim">Primary Slim</Button>
                        <Button type="secondary" size="slim">Secondary Slim</Button>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Disabled States</h2>
                <div className="component-examples">
                    <Button type="primary" disabled>Primary Disabled</Button>
                    <Button type="secondary" disabled>Secondary Disabled</Button>
                </div>
            </div>
        </div>
    );
}

function CheckboxPage() {
    const [checkboxStates, setCheckboxStates] = useState({
        checked: false,
        indeterminate: true,
        disabled: false
    });

    return (
        <div className="component-showcase">
            <h1>Checkbox</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples-vertical">
                    <Checkbox label="Unchecked" checked={false} />
                    <Checkbox label="Checked" checked={true} />
                    <Checkbox label="Indeterminate" checked={true} indeterminate={true} />
                    <Checkbox label="Disabled unchecked" disabled={true} />
                    <Checkbox label="Disabled checked" checked={true} disabled={true} />
                </div>
            </div>

            <div className="component-section">
                <h2>With Hint</h2>
                <div className="component-examples-vertical">
                    <Checkbox 
                        label="Enable notifications" 
                        hint="You will receive email notifications"
                        checked={checkboxStates.checked}
                        onChange={(checked) => setCheckboxStates(s => ({...s, checked}))}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Interactive</h2>
                <div className="component-examples-vertical">
                    <Checkbox 
                        label="Click to toggle" 
                        checked={checkboxStates.checked}
                        onChange={(checked) => setCheckboxStates(s => ({...s, checked}))}
                    />
                </div>
            </div>
        </div>
    );
}

function RadioPage() {
    const [radioValue, setRadioValue] = useState('option1');

    return (
        <div className="component-showcase">
            <h1>Radio Button</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples-vertical">
                    <Radio label="Unselected" checked={false} name="demo1" />
                    <Radio label="Selected" checked={true} name="demo2" />
                    <Radio label="Disabled unselected" disabled={true} name="demo3" />
                    <Radio label="Disabled selected" checked={true} disabled={true} name="demo4" />
                </div>
            </div>

            <div className="component-section">
                <h2>Radio Group</h2>
                <div className="component-examples-vertical">
                    <RadioGroup
                        name="language"
                        value={radioValue}
                        onChange={setRadioValue}
                        options={[
                            { value: 'option1', label: 'Option 1' },
                            { value: 'option2', label: 'Option 2' },
                            { value: 'option3', label: 'Option 3' },
                        ]}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Hints</h2>
                <div className="component-examples-vertical">
                    <RadioGroup
                        name="theme-choice"
                        value={radioValue}
                        onChange={setRadioValue}
                        options={[
                            { value: 'option1', label: 'Light Theme', hint: 'Best for daytime use' },
                            { value: 'option2', label: 'Dark Theme', hint: 'Easier on the eyes at night' },
                            { value: 'option3', label: 'System', hint: 'Follow OS setting' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

function TogglePage() {
    const [toggleOn, setToggleOn] = useState(true);

    return (
        <div className="component-showcase">
            <h1>Toggle</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples">
                    <div className="component-example-item">
                        <span className="component-example-label">ON</span>
                        <Toggle checked={true} />
                    </div>
                    <div className="component-example-item">
                        <span className="component-example-label">OFF</span>
                        <Toggle checked={false} />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Disabled</h2>
                <div className="component-examples">
                    <div className="component-example-item">
                        <span className="component-example-label">Disabled ON</span>
                        <Toggle checked={true} disabled={true} />
                    </div>
                    <div className="component-example-item">
                        <span className="component-example-label">Disabled OFF</span>
                        <Toggle checked={false} disabled={true} />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Interactive</h2>
                <div className="component-examples">
                    <div className="component-example-item">
                        <span className="component-example-label">Click to toggle</span>
                        <Toggle checked={toggleOn} onChange={setToggleOn} />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Without Label</h2>
                <div className="component-examples">
                    <Toggle checked={true} showLabel={false} />
                    <Toggle checked={false} showLabel={false} />
                </div>
            </div>
        </div>
    );
}

function ProgressBarPage() {
    return (
        <div className="component-showcase">
            <h1>Progress Bar</h1>

            <div className="component-section">
                <h2>Single Progress Bar</h2>
                <p className="component-description">Basic progress bar without any additional elements.</p>
                <div className="component-examples-vertical" style={{width: '300px'}}>
                    <ProgressBar value={60} />
                    <ProgressBar value={30} />
                    <ProgressBar value={100} />
                </div>
            </div>

            <div className="component-section">
                <h2>With Stop Button</h2>
                <p className="component-description">Progress bar with a stop/cancel button.</p>
                <div className="component-examples-vertical" style={{width: '300px'}}>
                    <ProgressBar value={45} showStopButton onStop={() => alert('Stop clicked!')} />
                    <ProgressBar value={75} showStopButton />
                </div>
            </div>

            <div className="component-section">
                <h2>With Label on the Left</h2>
                <p className="component-description">Horizontal layout with label on the left side.</p>
                <div className="component-examples-vertical" style={{width: '400px'}}>
                    <ProgressBar value={50} label="Indexing..." labelPosition="left" showStopButton />
                    <ProgressBar value={80} label="Building..." labelPosition="left" showStopButton />
                </div>
            </div>

            <div className="component-section">
                <h2>With Label on Top</h2>
                <p className="component-description">Vertical layout with label above the progress bar.</p>
                <div className="component-examples-vertical" style={{width: '300px'}}>
                    <ProgressBar value={65} label="Indexing..." labelPosition="top" showStopButton />
                    <ProgressBar value={40} label="Downloading..." labelPosition="top" showStopButton />
                </div>
            </div>

            <div className="component-section">
                <h2>With Hint</h2>
                <p className="component-description">Vertical layout with label and hint text below.</p>
                <div className="component-examples-vertical" style={{width: '300px'}}>
                    <ProgressBar 
                        value={55} 
                        label="Indexing..." 
                        labelPosition="top" 
                        hint="Processing files in /src folder"
                        showStopButton 
                    />
                    <ProgressBar 
                        value={25} 
                        label="Downloading..." 
                        labelPosition="top" 
                        hint="25% complete - 2.5 MB of 10 MB"
                        showStopButton 
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Indeterminate</h2>
                <p className="component-description">When progress cannot be determined, use indeterminate mode.</p>
                <div className="component-examples-vertical" style={{width: '300px'}}>
                    <ProgressBar indeterminate label="Loading..." labelPosition="left" />
                    <ProgressBar indeterminate label="Please wait..." labelPosition="top" showStopButton />
                </div>
            </div>
        </div>
    );
}

function DropdownPage() {
    const [dropdownValue, setDropdownValue] = useState('');
    const dropdownOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
    ];

    return (
        <div className="component-showcase">
            <h1>Dropdown</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples-vertical">
                    <Dropdown placeholder="Select an option..." options={dropdownOptions} />
                    <Dropdown value="option1" options={dropdownOptions} />
                    <Dropdown placeholder="Disabled" options={dropdownOptions} disabled={true} />
                    <Dropdown placeholder="Error state" options={dropdownOptions} error={true} />
                </div>
            </div>

            <div className="component-section">
                <h2>With Label and Hint (Vertical)</h2>
                <div className="component-examples-vertical">
                    <Dropdown 
                        label="Select language"
                        hint="Choose your preferred programming language"
                        placeholder="Select..."
                        options={dropdownOptions}
                        value={dropdownValue}
                        onChange={setDropdownValue}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Horizontal Layout</h2>
                <p className="component-description">
                    Label on the left, dropdown on the right. Use labelWidth prop to control label width.
                </p>
                <div className="component-examples-vertical" style={{width: '400px'}}>
                    <Dropdown label="Language" placeholder="Select..." options={dropdownOptions} layout="horizontal" labelWidth="100px" />
                    <Dropdown label="Framework" placeholder="Select..." options={dropdownOptions} layout="horizontal" labelWidth="100px" />
                    <Dropdown label="Version" placeholder="Select..." options={dropdownOptions} layout="horizontal" labelWidth="100px" disabled={true} />
                </div>
            </div>

            <div className="component-section">
                <h2>Interactive</h2>
                <div className="component-examples-vertical">
                    <Dropdown 
                        placeholder="Click to open"
                        options={dropdownOptions}
                        value={dropdownValue}
                        onChange={setDropdownValue}
                    />
                    <p style={{color: 'var(--text-secondary)', fontSize: '12px'}}>
                        Selected: {dropdownValue || 'None'}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ComboboxPage() {
    const [comboboxValue, setComboboxValue] = useState('');
    const comboboxOptions = [
        { value: 'java', label: 'Java' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'python', label: 'Python' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
    ];

    return (
        <div className="component-showcase">
            <h1>Combobox</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples-vertical">
                    <Combobox placeholder="Type or select..." options={comboboxOptions} />
                    <Combobox value="Java" options={comboboxOptions} />
                    <Combobox placeholder="Disabled" options={comboboxOptions} disabled={true} />
                    <Combobox placeholder="Error state" options={comboboxOptions} error={true} />
                </div>
            </div>

            <div className="component-section">
                <h2>With Label and Hint (Vertical)</h2>
                <div className="component-examples-vertical">
                    <Combobox 
                        label="Programming Language"
                        hint="Type to filter or select from list"
                        placeholder="Type to search..."
                        options={comboboxOptions}
                        value={comboboxValue}
                        onChange={setComboboxValue}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Horizontal Layout</h2>
                <p className="component-description">
                    Label on the left, combobox on the right. Use labelWidth prop to control label width.
                </p>
                <div className="component-examples-vertical" style={{width: '400px'}}>
                    <Combobox label="Language" placeholder="Type to search..." options={comboboxOptions} layout="horizontal" labelWidth="100px" />
                    <Combobox label="Framework" placeholder="Type to search..." options={comboboxOptions} layout="horizontal" labelWidth="100px" />
                    <Combobox label="Version" placeholder="Type to search..." options={comboboxOptions} layout="horizontal" labelWidth="100px" disabled={true} />
                </div>
            </div>

            <div className="component-section">
                <h2>Interactive (Filterable)</h2>
                <div className="component-examples-vertical">
                    <Combobox 
                        placeholder="Type to filter options..."
                        options={comboboxOptions}
                        value={comboboxValue}
                        onChange={setComboboxValue}
                    />
                    <p style={{color: 'var(--text-secondary)', fontSize: '12px'}}>
                        Selected: {comboboxValue || 'None'}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ToolbarIconButtonPage() {
    const [toggleStates, setToggleStates] = useState({
        bold: false,
        italic: true,
        underline: false
    });

    return (
        <div className="component-showcase">
            <h1>Toolbar Icon Button</h1>

            <div className="component-section">
                <h2>Types</h2>
                <p className="component-description">
                    Toolbar icon buttons are used in toolbars. They contain only an icon and come in two types:
                    action (triggers immediately) and toggle (on/off states).
                </p>
                <div className="component-group">
                    <h3>Action</h3>
                    <div className="component-examples">
                        <ToolbarIconButton icon="general/settings" tooltip="Settings" />
                        <ToolbarIconButton icon="general/search" tooltip="Search" shortcut="⌘K" />
                        <ToolbarIconButton icon="general/refresh" tooltip="Refresh" />
                        <ToolbarIconButton icon="general/add" tooltip="Add" />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Toggle</h3>
                    <div className="component-examples">
                        <ToolbarIconButton 
                            icon="actions/checked" 
                            type="toggle" 
                            toggled={toggleStates.bold}
                            tooltip="Show checkmarks"
                            onClick={() => setToggleStates(s => ({ ...s, bold: !s.bold }))}
                        />
                        <ToolbarIconButton 
                            icon="actions/preview" 
                            type="toggle" 
                            toggled={toggleStates.italic}
                            tooltip="Preview mode"
                            onClick={() => setToggleStates(s => ({ ...s, italic: !s.italic }))}
                        />
                        <ToolbarIconButton 
                            icon="actions/highlighting" 
                            type="toggle" 
                            toggled={toggleStates.underline}
                            tooltip="Highlighting"
                            onClick={() => setToggleStates(s => ({ ...s, underline: !s.underline }))}
                        />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Size</h2>
                <p className="component-description">
                    Toolbar icon buttons are 26×26px with a 16px icon inside (5px padding).
                </p>
                <div className="component-examples">
                    <ToolbarIconButton icon="run/run" tooltip="Run" />
                    <ToolbarIconButton icon="run/debug" tooltip="Debug" />
                    <ToolbarIconButton icon="run/stop" tooltip="Stop" />
                </div>
            </div>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples">
                    <ToolbarIconButton icon="general/settings" tooltip="Default" />
                    <ToolbarIconButton icon="general/settings" tooltip="Disabled" disabled />
                    <ToolbarIconButton icon="general/filter" tooltip="With badge" showBadge />
                </div>
            </div>

            <div className="component-section">
                <h2>Toolbar Example</h2>
                <p className="component-description">
                    Toolbar icon buttons are typically grouped in toolbars.
                </p>
                <div className="component-examples" style={{ 
                    background: 'var(--bg-elevated)', 
                    padding: '8px 12px', 
                    borderRadius: '6px',
                    border: '1px solid var(--border-secondary)',
                    gap: '4px'
                }}>
                    <ToolbarIconButton icon="vcs/commit" tooltip="Commit" shortcut="⌘K" />
                    <ToolbarIconButton icon="vcs/update" tooltip="Update Project" shortcut="⌘T" />
                    <ToolbarIconButton icon="vcs/push" tooltip="Push" shortcut="⌘⇧K" />
                    <div style={{ width: '1px', height: '20px', background: 'var(--border-secondary)', margin: '0 4px' }} />
                    <ToolbarIconButton icon="run/run" tooltip="Run" shortcut="⌃R" />
                    <ToolbarIconButton icon="run/debug" tooltip="Debug" shortcut="⌃D" />
                    <ToolbarIconButton icon="run/stop" tooltip="Stop" disabled />
                    <div style={{ width: '1px', height: '20px', background: 'var(--border-secondary)', margin: '0 4px' }} />
                    <ToolbarIconButton icon="general/settings" tooltip="Settings" />
                </div>
            </div>
        </div>
    );
}

function TabsPage() {
    const tabData = [
        { label: "Home" },
        { label: "Profile", icon: "general/user" },
        { label: "Settings", icon: "general/settings", closable: true },
        { label: "Documents", closable: true }
    ];

    return (
        <div className="component-showcase">
            <h1>Tabs</h1>

            <div className="component-section">
                <h2>Horizontal Tabs</h2>
                <TabBar tabs={tabData} direction="horizontal" />
            </div>

            <div className="component-section">
                <h2>Vertical Tabs</h2>
                <div className="vertical-tab-demo">
                    <TabBar tabs={tabData} direction="vertical" />
                </div>
            </div>

            <div className="component-section">
                <h2>Small Tabs</h2>
                <TabBar tabs={tabData} direction="horizontal" size="small" />
            </div>
        </div>
    );
}

function InputsPage() {
    return (
        <div className="component-showcase">
            <h1>Inputs</h1>

            <div className="component-section">
                <h2>Basic Inputs</h2>
                <div className="component-examples-vertical">
                    <Input placeholder="Enter text..." />
                    <Input placeholder="Enter text..." disabled />
                    <Input placeholder="Enter text..." error />
                </div>
            </div>

            <div className="component-section">
                <h2>Labeled Inputs - Horizontal</h2>
                <div className="component-examples-vertical">
                    <Input label="Name" placeholder="Enter your name..." labelWidth="65px" />
                    <Input label="Email" placeholder="Enter your email..." labelWidth="65px" />
                    <Input label="Password" type="password" placeholder="Enter password..." labelWidth="65px" />
                    <Input label="Disabled" placeholder="Disabled field" disabled labelWidth="65px" />
                    <Input label="Error" placeholder="Field with error" error labelWidth="65px" />
                </div>
            </div>

            <div className="component-section">
                <h2>Labeled Inputs - Vertical</h2>
                <div className="component-examples-vertical">
                    <Input label="Full Name" placeholder="Enter your full name..." layout="vertical" />
                    <Input label="Description" placeholder="Enter description..." layout="vertical" />
                    <Input label="Disabled Field" placeholder="Disabled field" layout="vertical" disabled />
                    <Input label="Error Field" placeholder="Field with error" layout="vertical" error />
                </div>
            </div>

            <div className="component-section">
                <h2>Sizes</h2>
                <div className="component-examples-vertical">
                    <Input label="Default Size" placeholder="Default input..." />
                    <Input label="Small Size" placeholder="Small input..." size="small" />
                </div>
            </div>
        </div>
    );
}

function TreePage() {
    const treeData = [
        {
            id: '1',
            label: 'src',
            icon: 'nodes/folder',
            isExpanded: true,
            children: [
                {
                    id: '1-1',
                    label: 'components',
                    icon: 'nodes/folder',
                    isExpanded: false,
                    children: [
                        { id: '1-1-1', label: 'Button.jsx', icon: 'fileTypes/javaScript' },
                        { id: '1-1-2', label: 'Input.jsx', icon: 'fileTypes/javaScript' },
                        { id: '1-1-3', label: 'Tree.jsx', icon: 'fileTypes/javaScript' }
                    ]
                },
                { id: '1-2', label: 'App.js', icon: 'fileTypes/javaScript' },
                { id: '1-3', label: 'index.js', icon: 'fileTypes/javaScript' }
            ]
        },
        {
            id: '2',
            label: 'public',
            icon: 'nodes/folder',
            isExpanded: false,
            children: [
                { id: '2-1', label: 'index.html', icon: 'fileTypes/html' },
                { id: '2-2', label: 'favicon.ico', icon: 'fileTypes/image' }
            ]
        },
        { id: '3', label: 'package.json', icon: 'fileTypes/json' },
        { id: '4', label: 'README.md', icon: 'fileTypes/text' }
    ];

    return (
        <div className="component-showcase">
            <h1>Tree</h1>

            <div className="component-section">
                <h2>File Tree</h2>
                <div className="component-examples-vertical" style={{ maxWidth: '400px' }}>
                    <Tree 
                        data={treeData}
                        onNodeSelect={(id, selected) => console.log('Node selected:', id, selected)}
                        onNodeToggle={(id, expanded) => console.log('Node toggled:', id, expanded)}
                    />
                </div>
            </div>
        </div>
    );
}

function StripePage() {
    const [selectedStripe, setSelectedStripe] = useState('project');

    return (
        <div className="component-showcase">
            <h1>Stripe</h1>

            <div className="component-section">
                <h2>Stripe Container</h2>
                <div className="component-examples">
                    <div style={{ height: '400px', display: 'flex', justifyContent: 'center' }}>
                        <StripeContainer>
                            <Stripe 
                                icon="toolwindows/project@20x20" 
                                state={selectedStripe === 'project' ? 'selected' : 'default'} 
                                title="Project"
                                onClick={() => setSelectedStripe('project')}
                            />
                            <Stripe 
                                icon="toolwindows/find@20x20" 
                                state={selectedStripe === 'search' ? 'selected' : 'default'}
                                title="Search"
                                onClick={() => setSelectedStripe('search')}
                            />
                            <Stripe 
                                icon="toolwindows/run@20x20" 
                                state={selectedStripe === 'terminal' ? 'selected' : 'default'}
                                title="Terminal"
                                onClick={() => setSelectedStripe('terminal')}
                            />
                            <StripeContainer.Separator />
                            <Stripe 
                                icon="general/settings@20x20" 
                                state={selectedStripe === 'settings' ? 'selected' : 'default'}
                                title="Settings"
                                onClick={() => setSelectedStripe('settings')}
                            />
                        </StripeContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PopupPage() {
    return (
        <div className="component-showcase">
            <h1>Popup</h1>

            <div className="component-section">
                <h2>Basic Popup</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '250px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder">New Folder</Popup.Cell>
                            <Popup.Cell type="line" icon="general/search">Find in Files</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Popup with Header</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} header="File Actions" style={{ position: 'static', width: '250px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder">New Directory</Popup.Cell>
                            <Popup.Cell type="separator" />
                            <Popup.Cell type="line" icon="general/refresh">Refresh</Popup.Cell>
                            <Popup.Cell type="line" icon="general/settings">Settings</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Complete Popup</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} header="Options" footer="Press Esc to close" style={{ position: 'static', width: '280px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder">New Folder</Popup.Cell>
                            <Popup.Cell type="separator" />
                            <Popup.Cell type="multiline" icon="general/settings" hint="Configure settings">Preferences</Popup.Cell>
                            <Popup.Cell type="line" icon="general/search">Find in Files</Popup.Cell>
                            <Popup.Cell type="separator" />
                            <Popup.Cell type="search" placeholder="Search actions..." />
                        </Popup>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CodeExamplePage() {
    const javaCodeLines = [
        { content: "// ...", tokens: [{ text: "// ...", type: "comment" }] },
        { content: "package org.springframework.samples.petclinic.vet;", tokens: [{ text: "package", type: "keyword" }, { text: " org.springframework.samples.petclinic.vet;", type: null }] },
        { content: "" },
        { content: "import ...", tokens: [{ text: "import", type: "keyword" }, { text: " ...", type: null }] },
        { content: "" },
        { content: "/**", tokens: [{ text: "/**", type: "doc-comment" }] },
        { content: " * @author Juergen Hoeller", tokens: [{ text: " * @author Juergen Hoeller", type: "doc-comment" }] },
        { content: " */", tokens: [{ text: " */", type: "doc-comment" }] },
        { content: "@Controller", tokens: [{ text: "@Controller", type: "annotation" }], annotation: "📝 Evgenia Popova + 6" },
        { content: "class VetController {", tokens: [{ text: "class", type: "keyword" }, { text: " VetController {", type: null }] },
        { content: "" },
        { content: "    private final VetRepository vetRepository;", tokens: [{ text: "    ", type: null }, { text: "private", type: "keyword" }, { text: " ", type: null }, { text: "final", type: "keyword" }, { text: " VetRepository vetRepository;", type: null }], annotation: "3 usages" },
        { content: "}" }
    ];

    return (
        <div className="component-showcase">
            <h1>Code Example</h1>

            <div className="component-section">
                <h2>Basic Code Example</h2>
                <div className="component-examples-vertical">
                    <CodeExample lines={javaCodeLines} startLineNumber={1} showLineNumbers={true} />
                </div>
            </div>

            <div className="component-section">
                <h2>JavaScript Code Editor</h2>
                <div className="component-examples-vertical">
                    <CodeExample 
                        placeholder="Enter JavaScript code..." 
                        language="javascript"
                        code={`const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
};

// Example usage
const cartItems = [
    { name: "Laptop", price: 999, quantity: 1 },
    { name: "Mouse", price: 25, quantity: 2 }
];

const total = calculateTotal(cartItems);
console.log(\`Total: $\${total}\`);`}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Java Code Editor</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter Java code..." 
                            language="java"
                            code={`public class Calculator {
    private double result;
    
    public Calculator() {
        this.result = 0.0;
    }
    
    public double add(double number) {
        result += number;
        return result;
    }
    
    public double subtract(double number) {
        result -= number;
        return result;
    }
    
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Result: " + calc.add(10).subtract(3));
    }
}`}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Code Editor Without Line Numbers</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter code..." 
                            showLineNumbers={false}
                            code={`npm install react
npm start
npm run build`}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Resizable Code Editor</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter code..." 
                            resizable={true}
                            code={`// This editor can be resized vertically
const data = await fetch('/api/users');
const users = await data.json();

users.forEach(user => {
    console.log(\`User: \${user.name}\`);
});`}
                        />
                    </div>
                </div>
            </div>
        );
    };

function StatusBarPage() {
    return (
        <div className="component-showcase">
            <h1>Status Bar</h1>
            <p className="component-description">
                The status bar displays at the bottom of the IDE window. It shows breadcrumb navigation, 
                progress indicators, and various widgets for file information.
            </p>

            <div className="component-section">
                <h2>Default Status Bar</h2>
                <p className="section-description">
                    Shows breadcrumb navigation path and widgets on the right.
                </p>
                <div className="status-bar-demo">
                    <StatusBar />
                </div>
            </div>

            <div className="component-section">
                <h2>With Progress Bar</h2>
                <p className="section-description">
                    Shows an indexing/loading progress indicator in the center.
                </p>
                <div className="status-bar-demo">
                    <StatusBar 
                        progress={true}
                        progressLabel="Indexing..."
                        progressValue={65}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Indeterminate Progress</h2>
                <p className="section-description">
                    When the progress value is unknown, an animated indeterminate progress is shown.
                </p>
                <div className="status-bar-demo">
                    <StatusBar 
                        progress={true}
                        progressLabel="Loading..."
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Custom Breadcrumbs</h2>
                <p className="section-description">
                    Custom breadcrumb path with module indicators and icons.
                </p>
                <div className="status-bar-demo">
                    <StatusBar 
                        breadcrumbs={[
                            { label: 'my-project', module: true },
                            { label: 'src' },
                            { label: 'components' },
                            { label: 'Button.tsx', icon: true, iconName: 'fileTypes/typeScript' }
                        ]}
                        widgets={[
                            { type: 'text', text: '12:45' },
                            { type: 'text', text: 'LF' },
                            { type: 'text', text: 'UTF-8' }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

function StatusBarBreadcrumbPage() {
    return (
        <div className="component-showcase">
            <h1>Status Bar Breadcrumb</h1>
            <p className="component-description">
                Breadcrumb items used in the status bar for navigation. Supports different states and optional module indicators.
            </p>

            <div className="component-section">
                <h2>States</h2>
                <p className="section-description">
                    Different visual states for the breadcrumb component.
                </p>
                <div className="component-examples">
                    <StatusBarBreadcrumb label="Default" state="default" />
                    <StatusBarBreadcrumb label="Hovered" state="hovered" />
                    <StatusBarBreadcrumb label="Selected" state="selected" />
                    <StatusBarBreadcrumb label="Selected Inactive" state="selectedInactive" />
                </div>
            </div>

            <div className="component-section">
                <h2>With Icon</h2>
                <p className="section-description">
                    Breadcrumbs can display an icon before the label.
                </p>
                <div className="component-examples">
                    <StatusBarBreadcrumb label="Default" icon={true} state="default" />
                    <StatusBarBreadcrumb label="Hovered" icon={true} state="hovered" />
                    <StatusBarBreadcrumb label="Selected" icon={true} state="selected" />
                    <StatusBarBreadcrumb label="Selected Inactive" icon={true} state="selectedInactive" />
                </div>
            </div>

            <div className="component-section">
                <h2>With Module Indicator</h2>
                <p className="section-description">
                    Module indicator shows a colored square to indicate module membership.
                </p>
                <div className="component-examples">
                    <StatusBarBreadcrumb label="Module A" icon={true} module={true} state="default" />
                    <StatusBarBreadcrumb label="Module B" icon={true} module={true} state="hovered" />
                    <StatusBarBreadcrumb label="Module C" icon={true} module={true} state="selected" />
                </div>
            </div>

            <div className="component-section">
                <h2>Without Icon</h2>
                <p className="section-description">
                    Text-only breadcrumbs for simpler navigation paths.
                </p>
                <div className="component-examples">
                    <StatusBarBreadcrumb label="src" icon={false} state="default" />
                    <StatusBarBreadcrumb label="components" icon={false} state="default" />
                    <StatusBarBreadcrumb label="Button.jsx" icon={false} state="selected" />
                </div>
            </div>

            <div className="component-section">
                <h2>Interactive Example</h2>
                <p className="section-description">
                    Hover over breadcrumbs to see the hover effect.
                </p>
                <div className="component-examples" style={{
                    background: 'var(--bg-primary)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-secondary)'
                }}>
                    <StatusBarBreadcrumb label="org" icon={false} />
                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                    <StatusBarBreadcrumb label="springframework" icon={false} />
                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                    <StatusBarBreadcrumb label="samples" icon={false} />
                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                    <StatusBarBreadcrumb label="VetController" icon={true} iconName="fileTypes/java" state="selected" />
                </div>
            </div>
        </div>
    );
}

function ProjectSelectorPage() {
        const projects = [
            { 
                name: 'my-component-library', 
                displayName: 'my-component-library',
                icon: 'MC', 
                color: 'cobalt',
                path: '~/Desktop/my-component-library' 
            },
            { 
                name: 'intellij-platform-ui', 
                displayName: 'intellij-platform-ui',
                icon: 'IP', 
                color: 'amber',
                path: '~/Projects/intellij-platform-ui' 
            },
            { 
                name: 'jetbrains-webstorm', 
                displayName: 'jetbrains-webstorm',
                icon: 'JW', 
                color: 'ocean',
                path: '~/Development/jetbrains-webstorm' 
            },
            { 
                name: 'kotlin-multiplatform-mobile', 
                displayName: 'kotlin-multiplatform-mobile',
                icon: 'KM', 
                color: 'violet',
                path: '~/Code/kotlin-multiplatform-mobile' 
            },
            { 
                name: 'spring-boot-samples', 
                displayName: 'spring-boot-samples',
                icon: 'SB', 
                color: 'grass',
                path: '~/Workspace/spring-boot-samples' 
            },
            { 
                name: 'react-native-app', 
                displayName: 'react-native-app',
                icon: 'RN', 
                color: 'plum',
                path: '~/Mobile/react-native-app' 
            }
        ];

        return (
            <div className="component-showcase">
                <h1>Project Selector</h1>

                <div className="component-section">
                    <h2>Basic Project Selector</h2>
                    <div className="component-examples">
                        <ProjectSelector 
                            projectName="my-component-library"
                            projectIcon="MC"
                            projectColor="cobalt"
                            projects={projects}
                            onProjectSelect={(project) => console.log('Selected project:', project)}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Different Project Names</h2>
                    <div className="component-examples">
                        <ProjectSelector 
                            projectName="intellij-platform-ui"
                            projectIcon="IP"
                            projectColor="amber"
                            projects={projects}
                        />
                        <ProjectSelector 
                            projectName="kotlin-multiplatform-mobile"
                            projectIcon="KM"
                            projectColor="violet"
                            projects={projects}
                        />
                        <ProjectSelector 
                            projectName="spring-boot-samples"
                            projectIcon="SB"
                            projectColor="grass"
                            projects={projects}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Interactive States</h2>
                    <div className="component-examples">
                        <ProjectSelector 
                            projectName="react-native-app"
                            projectIcon="RN"
                            projectColor="plum"
                            projects={projects}
                        />
                        <ProjectSelector 
                            projectName="jetbrains-webstorm"
                            projectIcon="JW"
                            projectColor="ocean"
                            state="hovered"
                            projects={projects}
                        />
                    </div>
                </div>
            </div>
        );
}

function ToolWindowPage() {
    const largeTreeData = [
        {
            id: '1',
            label: 'intellij',
            icon: 'nodes/folder',
            isExpanded: true,
            children: [
                { id: '1-1', label: '.idea', icon: 'nodes/folder' },
                {
                    id: '1-2',
                    label: 'src',
                    icon: 'nodes/folder',
                    isExpanded: true,
                    children: [
                        {
                            id: '1-2-1',
                            label: 'java',
                            icon: 'nodes/folder',
                            isExpanded: true,
                            children: [
                                { id: '1-2-1-1', label: 'analysis', icon: 'fileTypes/java' },
                                { id: '1-2-1-2', label: 'BivariateFunction', icon: 'fileTypes/java' },
                            ]
                        },
                    ]
                },
                { id: '1-5', label: 'External Libraries', icon: 'nodes/libraryFolder' }
            ]
        }
    ];

    return (
        <div className="component-showcase">
            <h1>Tool Window</h1>

            <div className="component-section">
                <h2>Tool Window</h2>
                <div style={{ justifyContent: 'flex-start', gap: '20px' }}>
                    <ToolWindow
                        title="Project"
                        width={320}
                        height={400}
                        actions={['more', 'minimize']}
                        onActionClick={(action) => console.log('Action clicked:', action)}
                    >
                        <Tree data={largeTreeData} />
                    </ToolWindow>
                </div>
            </div>

            <div className="component-section">
                <h2>Tabbed Tool Window</h2>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <ToolWindow
                        title="Debug"
                        headerType="tabs"
                        width={350}
                        height={250}
                        tabs={[
                            { label: "Debugger" },
                            { label: "Console", closable: true },
                            { label: "Variables" }
                        ]}
                        activeTab={0}
                        actions={['add', 'more', 'minimize']}
                    >
                        <div style={{ padding: '16px', fontSize: '13px', color: 'var(--text-primary)' }}>
                            <div style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Debug Console:</div>
                            <div>→ Application started</div>
                            <div>→ Breakpoint set at line 42</div>
                        </div>
                    </ToolWindow>
                </div>
            </div>
        </div>
    );
}

function ToolbarDropdownPage() {
    return (
        <div className="component-showcase">
            <h1>Toolbar Dropdown</h1>

            <div className="component-section">
                <h2>Themes</h2>
                <p className="component-description">
                    Toolbar dropdown buttons adapt to different toolbar backgrounds with appropriate text and hover colors.
                </p>
                
                <div className="component-group">
                    <h3>Dark Theme (Default)</h3>
                    <div className="component-examples" style={{ background: 'var(--gray-140)', padding: '8px 12px', borderRadius: '6px', gap: '4px' }}>
                        <ToolbarDropdown text="File" theme="dark" />
                        <ToolbarDropdown text="Edit" theme="dark" />
                        <ToolbarDropdown icon="general/settings" text="Settings" theme="dark" />
                    </div>
                </div>

                <div className="component-group">
                    <h3>Light Header Theme</h3>
                    <div className="component-examples" style={{ background: 'var(--gray-white)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-primary)', gap: '4px' }}>
                        <ToolbarDropdown text="File" theme="light-header" />
                        <ToolbarDropdown text="Edit" theme="light-header" />
                        <ToolbarDropdown icon="general/settings" text="Settings" theme="light-header" />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples" style={{ background: 'var(--gray-140)', padding: '8px 12px', borderRadius: '6px', gap: '4px' }}>
                    <ToolbarDropdown text="Default" theme="dark" />
                    <ToolbarDropdown text="Disabled" theme="dark" disabled />
                </div>
            </div>
        </div>
    );
}

function IDELayoutPage() {
    return (
        <div className="component-showcase">
            <h1>IDE Layout</h1>
            <p className="component-description">
                A full IDE window layout combining MainToolbar, Stripe panels, Tool Windows, 
                Editor tabs, Code Editor, and Status Bar. Click on stripe buttons to toggle panels.
            </p>

            <div className="component-section">
                <h2>Default Theme</h2>
                <p className="section-description">
                    Traditional flat layout with solid borders - classic IDE appearance.
                </p>
                <div className="ide-layout-demo">
                    <IDELayout 
                        theme="default"
                        projectName="petclinic"
                        projectIcon="PC"
                        projectColor="grass"
                        branchName="main"
                        runConfig="PetClinicApplication"
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Island Theme</h2>
                <p className="section-description">
                    Modern design with rounded panels, gaps between elements, and gradient backgrounds.
                </p>
                <div className="ide-layout-demo">
                    <IDELayout 
                        theme="island"
                        projectName="commons-math"
                        projectIcon="CM"
                        projectColor="teal"
                        branchName="feature/new-ui"
                        runConfig="IDEA Community"
                    />
                </div>
            </div>
        </div>
    );
}

// Sidebar Navigation Component
function Sidebar() {
    const location = useLocation();
    const { theme, themeMode, toggleTheme } = useTheme();
    
    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Link to="/" className="logo">
                    <Logo className="logo-icon" />
                    <span className="logo-text">Library</span>
                </Link>
                <ToolbarIconButton
                    icon={themeMode === 'auto' 
                        ? 'theme/systemTheme' 
                        : (theme === 'light' ? 'theme/darkTheme' : 'theme/lightTheme')}
                    tooltip={themeMode === 'auto' 
                        ? 'Using system theme' 
                        : `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                    onClick={toggleTheme}
                />
            </div>
            
            <div className="nav-category">
                <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                    Home
                </Link>
            </div>
            
            <div className="nav-category">
                <div className="nav-category-title">Styles</div>
                <Link to="/typography" className={`nav-item ${isActive('/typography') ? 'active' : ''}`}>
                    Typography
                </Link>
                <Link to="/colors" className={`nav-item ${isActive('/colors') ? 'active' : ''}`}>
                    Colors
                </Link>
            </div>
            
            <div className="nav-category">
                <div className="nav-category-title">Components</div>
                {getSortedComponentsOnly().map((component) => (
                    <Link
                        key={component.key}
                        to={`/${component.key}`}
                        className={`nav-item ${isActive(`/${component.key}`) ? 'active' : ''}`}
                    >
                        {component.name}
                    </Link>
                ))}
            </div>

            <div className="nav-category">
                <div className="nav-category-title">Features</div>
                {getSortedFeaturesOnly().map((feature) => (
                    <Link
                        key={feature.key}
                        to={`/${feature.key}`}
                        className={`nav-item ${isActive(`/${feature.key}`) ? 'active' : ''}`}
                    >
                        {feature.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Home page wrapper to handle navigation
function HomePage() {
    return <Home />;
}

function AppContent() {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/typography" element={<Typography />} />
                    <Route path="/colors" element={<Colors />} />
                    <Route path="/buttons" element={<ButtonsPage />} />
                    <Route path="/checkbox" element={<CheckboxPage />} />
                    <Route path="/radio" element={<RadioPage />} />
                    <Route path="/toggle" element={<TogglePage />} />
                    <Route path="/progressbar" element={<ProgressBarPage />} />
                    <Route path="/dropdown" element={<DropdownPage />} />
                    <Route path="/combobox" element={<ComboboxPage />} />
                    <Route path="/toolbariconbutton" element={<ToolbarIconButtonPage />} />
                    <Route path="/tabs" element={<TabsPage />} />
                    <Route path="/inputs" element={<InputsPage />} />
                    <Route path="/tree" element={<TreePage />} />
                    <Route path="/stripe" element={<StripePage />} />
                    <Route path="/popup" element={<PopupPage />} />
                    <Route path="/codeexample" element={<CodeExamplePage />} />
                    <Route path="/toolwindow" element={<ToolWindowPage />} />
                    <Route path="/toolbardropdown" element={<ToolbarDropdownPage />} />
                    <Route path="/idelayout" element={<IDELayoutPage />} />
                    <Route path="/projectselector" element={<ProjectSelectorPage />} />
                    <Route path="/toolbar" element={<ToolbarDemo />} />
                    <Route path="/statusbar" element={<StatusBarPage />} />
                    <Route path="/statusbarbreadcrumb" element={<StatusBarBreadcrumbPage />} />
                    <Route path="/webstorm-onboarding" element={<OnboardingShowcase />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
