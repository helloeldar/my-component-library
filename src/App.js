import { useState } from 'react';
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
import Dropdown from './ui/components/dropdown/Dropdown';
import Combobox from './ui/components/combobox/Combobox';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ReactComponent as Logo } from './icons/nodes/pluginLogo.svg';
import { getSortedComponentsOnly } from './componentsConfig';
import './ui/styles/Themes.css';
import './App.css';

function AppContent() {
    const [activeComponent, setActiveComponent] = useState('home');
    const { theme, themeMode, toggleTheme } = useTheme();

    const buttonExamples = () => (
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

    const [toggleStates, setToggleStates] = useState({
        bold: false,
        italic: true,
        underline: false
    });

    // Form controls state
    const [checkboxStates, setCheckboxStates] = useState({
        checked: false,
        indeterminate: true,
        disabled: false
    });
    const [radioValue, setRadioValue] = useState('option1');
    const [toggleOn, setToggleOn] = useState(true);
    const [dropdownValue, setDropdownValue] = useState('');
    const [comboboxValue, setComboboxValue] = useState('');

    const dropdownOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
    ];

    const comboboxOptions = [
        { value: 'java', label: 'Java' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'python', label: 'Python' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
    ];

    const checkboxExamples = () => (
        <div className="component-showcase">
            <h1>Checkbox</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples-vertical">
                    <Checkbox 
                        label="Unchecked" 
                        checked={false}
                    />
                    <Checkbox 
                        label="Checked" 
                        checked={true}
                    />
                    <Checkbox 
                        label="Indeterminate" 
                        checked={true}
                        indeterminate={true}
                    />
                    <Checkbox 
                        label="Disabled unchecked" 
                        disabled={true}
                    />
                    <Checkbox 
                        label="Disabled checked" 
                        checked={true}
                        disabled={true}
                    />
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

    const radioExamples = () => (
        <div className="component-showcase">
            <h1>Radio Button</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples-vertical">
                    <Radio 
                        label="Unselected" 
                        checked={false}
                        name="demo1"
                    />
                    <Radio 
                        label="Selected" 
                        checked={true}
                        name="demo2"
                    />
                    <Radio 
                        label="Disabled unselected" 
                        disabled={true}
                        name="demo3"
                    />
                    <Radio 
                        label="Disabled selected" 
                        checked={true}
                        disabled={true}
                        name="demo4"
                    />
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

    const toggleExamples = () => (
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
                        <Toggle 
                            checked={toggleOn} 
                            onChange={setToggleOn}
                        />
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

    const dropdownExamples = () => (
        <div className="component-showcase">
            <h1>Dropdown</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples-vertical">
                    <Dropdown 
                        placeholder="Select an option..."
                        options={dropdownOptions}
                    />
                    <Dropdown 
                        value="option1"
                        options={dropdownOptions}
                    />
                    <Dropdown 
                        placeholder="Disabled"
                        options={dropdownOptions}
                        disabled={true}
                    />
                    <Dropdown 
                        placeholder="Error state"
                        options={dropdownOptions}
                        error={true}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Label and Hint</h2>
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

    const comboboxExamples = () => (
        <div className="component-showcase">
            <h1>Combobox</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-examples-vertical">
                    <Combobox 
                        placeholder="Type or select..."
                        options={comboboxOptions}
                    />
                    <Combobox 
                        value="Java"
                        options={comboboxOptions}
                    />
                    <Combobox 
                        placeholder="Disabled"
                        options={comboboxOptions}
                        disabled={true}
                    />
                    <Combobox 
                        placeholder="Error state"
                        options={comboboxOptions}
                        error={true}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Label and Hint</h2>
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

    const toolbarIconButtonExamples = () => (
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

    const tabExamples = () => {
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
    };

    const inputExamples = () => (
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

    const treeExamples = () => {
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
    };

    const [selectedStripe, setSelectedStripe] = useState('project');

    const stripeExamples = () => {
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
    };

    const popupExamples = () => {
        return (
            <div className="component-showcase">
                <h1>Popup</h1>

                <div className="component-section">
                    <h2>Basic Popup</h2>
                    <div className="component-examples">
                        <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                            <Popup 
                                visible={true} 
                                style={{ 
                                    position: 'static',
                                    width: '250px'
                                }}
                            >
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
                            <Popup 
                                visible={true} 
                                header="File Actions"
                                style={{ 
                                    position: 'static',
                                    width: '250px'
                                }}
                            >
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
                            <Popup 
                                visible={true} 
                                header="Options"
                                footer="Press Esc to close"
                                style={{ 
                                    position: 'static',
                                    width: '280px'
                                }}
                            >
                                <Popup.Cell type="line" icon="fileTypes/text">New File</Popup.Cell>
                                <Popup.Cell type="line" icon="nodes/folder">New Folder</Popup.Cell>
                                <Popup.Cell type="separator" />
                                <Popup.Cell type="multiline" icon="general/settings" hint="Configure settings">
                                    Preferences
                                </Popup.Cell>
                                <Popup.Cell type="line" icon="general/search">Find in Files</Popup.Cell>
                                <Popup.Cell type="separator" />
                                <Popup.Cell type="search" placeholder="Search actions..." />
                            </Popup>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const codeExamples = () => {
        // Sample Java code with syntax highlighting
        const javaCodeLines = [
            {
                content: "// ...",
                tokens: [
                    { text: "// ...", type: "comment" }
                ]
            },
            {
                content: "package org.springframework.samples.petclinic.vet;",
                tokens: [
                    { text: "package", type: "keyword" },
                    { text: " org.springframework.samples.petclinic.vet;", type: null }
                ]
            },
            { content: "" },
            {
                content: "import ...",
                tokens: [
                    { text: "import", type: "keyword" },
                    { text: " ...", type: null }
                ]
            },
            { content: "" },
            {
                content: "/**",
                tokens: [
                    { text: "/**", type: "doc-comment" }
                ]
            },
            {
                content: " * @author Juergen Hoeller",
                tokens: [
                    { text: " * @author Juergen Hoeller", type: "doc-comment" }
                ]
            },
            {
                content: " * @author Mark Fisher",
                tokens: [
                    { text: " * @author Mark Fisher", type: "doc-comment" }
                ]
            },
            {
                content: " * @author Ken Krebs",
                tokens: [
                    { text: " * @author Ken Krebs", type: "doc-comment" }
                ]
            },
            {
                content: " * @author Arjen Poutsma",
                tokens: [
                    { text: " * @author Arjen Poutsma", type: "doc-comment" }
                ]
            },
            {
                content: " */",
                tokens: [
                    { text: " */", type: "doc-comment" }
                ]
            },
            {
                content: "@Controller",
                tokens: [
                    { text: "@Controller", type: "annotation" }
                ],
                annotation: "📝 Evgenia Popova + 6"
            },
            {
                content: "class VetController {",
                tokens: [
                    { text: "class", type: "keyword" },
                    { text: " VetController {", type: null }
                ]
            },
            { content: "" },
            {
                content: "    private final VetRepository vetRepository;",
                tokens: [
                    { text: "    ", type: null },
                    { text: "private", type: "keyword" },
                    { text: " ", type: null },
                    { text: "final", type: "keyword" },
                    { text: " VetRepository vetRepository;", type: null }
                ],
                annotation: "3 usages"
            },
            { content: "" },
            {
                content: "    public VetController(VetRepository clinicService) {",
                tokens: [
                    { text: "    ", type: null },
                    { text: "public", type: "keyword" },
                    { text: " VetController(VetRepository clinicService) {", type: null }
                ],
                annotation: "📝 Evgenia Popova + 1"
            },
            {
                content: "        this.vetRepository = clinicService;",
                tokens: [
                    { text: "        ", type: null },
                    { text: "this", type: "keyword" },
                    { text: ".vetRepository = clinicService;", type: null }
                ]
            },
            {
                content: "    }",
                tokens: [
                    { text: "    }", type: null }
                ]
            }
        ];

        return (
            <div className="component-showcase">
                <h1>Code Example</h1>

                <div className="component-section">
                    <h2>Basic Code Example</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            lines={javaCodeLines}
                            startLineNumber={1}
                            showLineNumbers={true}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Basic Code Editor</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter your code here..." 
                            code={`function hello() {
    console.log("Hello, World!");
}`}
                        />
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


    const toolWindowExamples = () => {
        // Create extended tree data for scrollable content
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
                                    { id: '1-2-1-3', label: 'FunctionUtils', icon: 'fileTypes/java' },
                                    { id: '1-2-1-4', label: 'MultivariateFunction', icon: 'fileTypes/java' },
                                    { id: '1-2-1-5', label: 'TrivariateFunction', icon: 'fileTypes/java' }
                                ]
                            },
                            { id: '1-2-2', label: 'polynomials', icon: 'nodes/folder' },
                            { id: '1-2-3', label: 'solver', icon: 'nodes/folder' }
                        ]
                    },
                    {
                        id: '1-3',
                        label: 'test',
                        icon: 'nodes/folder',
                        isExpanded: false,
                        children: [
                            {
                                id: '1-3-1',
                                label: 'java',
                                icon: 'nodes/folder',
                                children: [
                                    { id: '1-3-1-1', label: 'FunctionUtilsTest', icon: 'fileTypes/java' },
                                    { id: '1-3-1-2', label: 'MonitoredFunction', icon: 'fileTypes/java' },
                                    { id: '1-3-1-3', label: 'SumSyncFunction', icon: 'fileTypes/java' }
                                ]
                            }
                        ]
                    },
                    {
                        id: '1-4',
                        label: 'target',
                        icon: 'nodes/folder',
                        children: [
                            { id: '1-4-1', label: 'classes', icon: 'nodes/folder' },
                            { id: '1-4-2', label: 'generated-sources', icon: 'nodes/folder' },
                            { id: '1-4-3', label: '.gitignore', icon: 'fileTypes/text' }
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
                            <Tree 
                                data={largeTreeData}
                                onNodeSelect={(id, selected) => console.log('Node selected:', id, selected)}
                                onNodeToggle={(id, expanded) => console.log('Node toggled:', id, expanded)}
                            />
                        </ToolWindow>

                        <ToolWindow
                            title="Structure"
                            width={280}
                            height={300}
                            actions={['more', 'minimize']}
                            onActionClick={(action) => console.log('Action clicked:', action)}
                        >
                            <div style={{ padding: '12px' }}>
                                <p style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
                                    File structure view would go here
                                </p>
                                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                                    <div>├── App.js</div>
                                    <div>├── Button.jsx</div>
                                    <div>├── Input.jsx</div>
                                    <div>└── Tree.jsx</div>
                                </div>
                            </div>
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
                            onTabChange={(index) => console.log('Tab changed:', index)}
                            actions={['add', 'more', 'minimize']}
                            onActionClick={(action) => console.log('Action clicked:', action)}
                        >
                            <div style={{ padding: '16px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                <div style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Debug Console:</div>
                                <div>→ Application started</div>
                                <div>→ Breakpoint set at line 42</div>
                                <div>→ Waiting for connection...</div>
                            </div>
                        </ToolWindow>
                    </div>
                </div>
            </div>
        );
    };

    const toolbarDropdownExamples = () => {
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
                        <div className="component-examples" style={{ 
                            background: 'var(--gray-140)', 
                            padding: '8px 12px', 
                            borderRadius: '6px',
                            gap: '4px'
                        }}>
                            <ToolbarDropdown text="File" theme="dark" />
                            <ToolbarDropdown text="Edit" theme="dark" />
                            <ToolbarDropdown icon="general/settings" text="Settings" theme="dark" />
                        </div>
                    </div>

                    <div className="component-group">
                        <h3>Light Header Theme</h3>
                        <div className="component-examples" style={{ 
                            background: 'var(--gray-white)', 
                            padding: '8px 12px', 
                            borderRadius: '6px',
                            border: '1px solid var(--border-primary)',
                            gap: '4px'
                        }}>
                            <ToolbarDropdown text="File" theme="light-header" />
                            <ToolbarDropdown text="Edit" theme="light-header" />
                            <ToolbarDropdown icon="general/settings" text="Settings" theme="light-header" />
                        </div>
                    </div>
                </div>

                <div className="component-section">
                    <h2>With Icons</h2>
                    <div className="component-examples" style={{ 
                        background: 'var(--gray-140)', 
                        padding: '8px 12px', 
                        borderRadius: '6px',
                        gap: '4px'
                    }}>
                        <ToolbarDropdown icon="vcs/branch" text="main" theme="dark" />
                        <ToolbarDropdown icon="runConfigurations/application" text="IDEA Community" theme="dark" />
                        <ToolbarDropdown icon="general/settings" text="Options" theme="dark" />
                    </div>
                </div>

                <div className="component-section">
                    <h2>States</h2>
                    <p className="component-description">
                        Hover over the dropdowns to see the hover state with background highlight.
                    </p>
                    <div className="component-examples" style={{ 
                        background: 'var(--gray-140)', 
                        padding: '8px 12px', 
                        borderRadius: '6px',
                        gap: '4px'
                    }}>
                        <ToolbarDropdown text="Default" theme="dark" />
                        <ToolbarDropdown text="Disabled" theme="dark" disabled />
                    </div>
                </div>
            </div>
        );
    };

    const ideLayoutExamples = () => {
        return (
            <div className="component-showcase">
                <h1>IDE Layout</h1>
                <p className="component-description">
                    A full IDE window layout combining MainToolbar, Stripe panels, Tool Windows, 
                    Editor tabs, Code Editor, and Status Bar. Click on stripe buttons to toggle panels.
                    Supports two themes: <strong>default</strong> (traditional flat layout) and <strong>island</strong> (modern design with rounded panels).
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
    };

    const projectSelectorExamples = () => {
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
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'home':
                return <Home onNavigate={setActiveComponent} />;
            case 'buttons':
                return buttonExamples();
            case 'toolbariconbutton':
                return toolbarIconButtonExamples();
            case 'tabs':
                return tabExamples();
            case 'inputs':
                return inputExamples();
            case 'tree':
                return treeExamples();
            case 'toolwindow':
                return toolWindowExamples();
            case 'stripe':
                return stripeExamples();
            case 'popup':
                return popupExamples();
            case 'projectselector':
                return projectSelectorExamples();
            case 'idelayout':
                return ideLayoutExamples();
            case 'codeexample':
                return codeExamples();
            case 'typography':
                return <Typography />;
            case 'colors':
                return <Colors />;
            case 'toolbar':
                return <ToolbarDemo />;
            case 'toolbardropdown':
                return toolbarDropdownExamples();
            case 'checkbox':
                return checkboxExamples();
            case 'radio':
                return radioExamples();
            case 'toggle':
                return toggleExamples();
            case 'dropdown':
                return dropdownExamples();
            case 'combobox':
                return comboboxExamples();
            default:
                return <Home onNavigate={setActiveComponent} />;
        }
    };

    return (
        <div className="app">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="logo" onClick={() => setActiveComponent('home')}>
                        <Logo className="logo-icon" />
                        <span className="logo-text">Library</span>
                    </div>
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
                    <button
                        className={`nav-item ${activeComponent === 'home' ? 'active' : ''}`}
                        onClick={() => setActiveComponent('home')}
                    >
                        Home
                    </button>
                </div>
                
                <div className="nav-category">
                    <div className="nav-category-title">Styles</div>
                    <button
                        className={`nav-item ${activeComponent === 'typography' ? 'active' : ''}`}
                        onClick={() => setActiveComponent('typography')}
                    >
                        Typography
                    </button>
                    <button
                        className={`nav-item ${activeComponent === 'colors' ? 'active' : ''}`}
                        onClick={() => setActiveComponent('colors')}
                    >
                        Colors
                    </button>
                </div>
                
                <div className="nav-category">
                    <div className="nav-category-title">Components</div>
                    {getSortedComponentsOnly().map((component) => (
                        <button
                            key={component.key}
                            className={`nav-item ${activeComponent === component.key ? 'active' : ''}`}
                            onClick={() => setActiveComponent(component.key)}
                        >
                            {component.name}
                        </button>
                    ))}
                </div>
                
            </div>

            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
