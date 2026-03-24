import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Button from './ui/components/button/Button';
import ToolbarIconButton from './ui/components/iconbutton/IconButton';
import TabBar from './ui/components/tabs/TabBar';
import Input from './ui/components/input/Input';
import Tree from './ui/components/tree/Tree';
import ToolWindow from './ui/components/toolwindow/ToolWindow';
import TerminalWindow from './ui/components/toolwindow/TerminalWindow';
import ProjectWindow from './ui/components/toolwindow/ProjectWindow';
import AIAssistantWindow from './ui/components/toolwindow/AIAssistantWindow';
import ProblemsWindow from './ui/components/toolwindow/ProblemsWindow';
import CommitWindow from './ui/components/toolwindow/CommitWindow';
import VCSLogWindow from './ui/components/toolwindow/VCSLogWindow';
import Typography from './ui/components/showcase/Typography';
import Colors from './ui/components/showcase/Colors';
import SemanticColors from './ui/components/showcase/SemanticColors';
import ToolbarDemo from './ui/components/showcase/ToolbarDemo';
import Home from './Home';
import StripeIconButton from './ui/components/stripe/Stripe';
import StripeContainer from './ui/components/stripe/StripeContainer';
import CodeExample from './ui/components/showcase/CodeExample';
import Popup from './ui/components/popup/Popup';
import PopupProjects from './ui/components/popup/PopupProjects';
import PopupBranches from './ui/components/popup/PopupBranches';
import ProjectWidget from './ui/components/projectwidget/ProjectWidget';
import SearchEverywherePopup from './ui/components/popup/SearchEverywherePopup';
import PopupFindInFiles from './ui/components/popup/PopupFindInFiles';
import MainWindow from './ui/components/mainwindow/MainWindow';
import ToolbarDropdown from './ui/components/toolbardropdown/ToolbarDropdown';
import Checkbox from './ui/components/checkbox/Checkbox';
import Radio, { RadioGroup } from './ui/components/radio/Radio';
import Toggle from './ui/components/toggle/Toggle';
import ProgressBar from './ui/components/progressbar/ProgressBar';
import Loader from './ui/components/loader/Loader';
import Dropdown from './ui/components/dropdown/Dropdown';
import Combobox from './ui/components/combobox/Combobox';
import UILink from './ui/components/link/Link';
import Badge, { BadgeNew, BadgeBeta, BadgeFree, BadgeTrial } from './ui/components/badge/Badge';
import Banner from './ui/components/banner/Banner';
import SegmentedControl from './ui/components/segmentedcontrol/SegmentedControl';
import Search from './ui/components/search/Search';
import Table from './ui/components/table/Table';
import StatusBarBreadcrumb from './ui/components/statusbar/StatusBarBreadcrumb';
import StatusBar from './ui/components/statusbar/StatusBar';
import Alert from './ui/components/alert/Alert';
import Dialog from './ui/components/dialog/Dialog';
import WelcomeDialog from './ui/components/dialog/WelcomeDialog';
import Icon from './ui/components/icon/Icon';
import Editor from './ui/components/editor/Editor';
import Tooltip from './ui/components/tooltip/Tooltip';
import TooltipEditor from './ui/components/tooltip/TooltipEditor';
import TooltipHelp from './ui/components/tooltip/TooltipHelp';
import ValidationTooltip from './ui/components/tooltip/ValidationTooltip';
import GotItTooltip from './ui/components/tooltip/GotItTooltip';
import Notification from './ui/components/notification/Notification';
import EmptyState from './ui/components/emptystate/EmptyState';
import SettingsDialog from './ui/components/showcase/SettingsDialog';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ReactComponent as Logo } from './icons/ij-platform-logo.svg';
import { getSortedWindowsOnly, getComponentsBySection } from './componentsConfig';
import './ui/styles/Themes.css';
import './App.css';

// Page Components
function BannerPage() {
    return (
        <div className="component-showcase">
            <h1>Banner</h1>
            <p className="component-description">
                A banner is a notification bar displayed at the top of dialogs or tool windows
                to inform users about important information, warnings, errors, or success messages.
            </p>

            <div className="component-section">
                <h2>Types</h2>
                <div className="component-examples-vertical" style={{ gap: '12px' }}>
                    <Banner type="info">
                        This is an informational message.
                    </Banner>
                    <Banner type="success">
                        Operation completed successfully!
                    </Banner>
                    <Banner type="warning">
                        Please review before proceeding.
                    </Banner>
                    <Banner type="error">
                        An error occurred. Please try again.
                    </Banner>
                </div>
            </div>

            <div className="component-section">
                <h2>With Actions</h2>
                <div className="component-examples-vertical" style={{ gap: '12px' }}>
                    <Banner 
                        type="info"
                        actions={[
                            { label: 'Action A', onClick: () => console.log('Action A clicked') },
                            { label: 'Action B', onClick: () => console.log('Action B clicked') }
                        ]}
                    >
                        Update available. Would you like to install now?
                    </Banner>
                    <Banner 
                        type="warning"
                        actions={[
                            { label: 'Learn More', onClick: () => console.log('Learn more clicked') },
                            { label: 'Dismiss', onClick: () => console.log('Dismiss clicked') }
                        ]}
                    >
                        Your session will expire in 5 minutes.
                    </Banner>
                </div>
            </div>

            <div className="component-section">
                <h2>Without Icon</h2>
                <div className="component-examples-vertical" style={{ gap: '12px' }}>
                    <Banner type="info" showIcon={false}>
                        A banner without the status icon.
                    </Banner>
                    <Banner 
                        type="success" 
                        showIcon={false}
                        actions={[{ label: 'Undo', onClick: () => console.log('Undo clicked') }]}
                    >
                        Changes saved successfully.
                    </Banner>
                </div>
            </div>

            <div className="component-section">
                <h2>Without Close Button</h2>
                <div className="component-examples-vertical" style={{ gap: '12px' }}>
                    <Banner type="info" showCloseButton={false}>
                        This banner cannot be dismissed.
                    </Banner>
                    <Banner 
                        type="error" 
                        showCloseButton={false}
                        actions={[{ label: 'Retry', onClick: () => console.log('Retry clicked') }]}
                    >
                        Connection failed. Please check your network.
                    </Banner>
                </div>
            </div>

            <div className="component-section">
                <h2>Interactive</h2>
                <div className="component-examples-vertical" style={{ gap: '12px' }}>
                    <Banner 
                        type="info"
                        actions={[
                            { label: 'Configure', onClick: () => alert('Configure clicked!') },
                            { label: 'Remind Later', onClick: () => alert('Remind later clicked!') }
                        ]}
                        onClose={() => alert('Banner closed!')}
                    >
                        New features are available. Click to configure.
                    </Banner>
                </div>
            </div>
        </div>
    );
}

function BadgePage() {
    return (
        <div className="component-showcase">
            <h1>Badge</h1>
            <p className="component-description">
                A badge is a small label used to highlight status, categories, or attributes. It is non-interactive by default but can be made clickable.
            </p>

            <div className="component-section">
                <h2>Fixed Types</h2>
                <p className="component-description">Predefined badges for standard labels. Use these whenever the label is "New", "Beta", "Free", or "Trial".</p>
                <div className="component-examples" style={{ alignItems: 'center', gap: '8px' }}>
                    <BadgeNew />
                    <BadgeBeta />
                    <BadgeFree />
                    <BadgeTrial />
                </div>
            </div>

            <div className="component-section">
                <h2>Color Variants</h2>
                <div className="component-group">
                    <h3>Blue Secondary (default)</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="blue-secondary" text="Label" />
                        <Badge color="blue-secondary" text="New" />
                        <Badge color="blue-secondary" text="Longer text" />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Blue (Primary)</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="blue" text="Label" />
                        <Badge color="blue" text="New" />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Green Secondary</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="green-secondary" text="Label" />
                        <Badge color="green-secondary" text="Trial" />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Green (Primary)</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="green" text="Label" />
                        <Badge color="green" text="Free" />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Purple Secondary</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="purple-secondary" text="Label" />
                        <Badge color="purple-secondary" text="Beta" />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Gray Secondary</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="gray-secondary" text="Label" />
                        <Badge color="gray-secondary" text="Tag" />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-group">
                    <h3>Default (no action on click)</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="blue-secondary" text="Label" />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Clickable (cursor: pointer)</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="blue-secondary" text="Clickable" onClick={() => {}} />
                        <Badge color="blue" text="Clickable" onClick={() => {}} />
                        <Badge color="green-secondary" text="Clickable" onClick={() => {}} />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Disabled</h3>
                    <div className="component-examples" style={{ alignItems: 'center' }}>
                        <Badge color="disabled" text="Disabled" />
                        <Badge disabled text="Disabled" />
                        <Badge color="blue" disabled text="Disabled" />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Usage examples</h2>
                <p className="component-description">Badges can appear inline with text or next to other elements.</p>
                <div className="component-examples" style={{ alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13 }}>Feature name</span>
                    <BadgeNew />
                    <BadgeBeta />
                    <BadgeTrial />
                    <BadgeFree />
                </div>
            </div>
        </div>
    );
}

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

            <div className="component-section">
                <h2>Focused States</h2>
                <div className="component-group">
                    <h3>Default Size</h3>
                    <div className="component-examples">
                        <Button type="primary" focused>Primary Focused</Button>
                        <Button type="secondary" focused>Secondary Focused</Button>
                    </div>
                </div>
                <div className="component-group">
                    <h3>Slim Size</h3>
                    <div className="component-examples">
                        <Button type="primary" size="slim" focused>Primary Slim Focused</Button>
                        <Button type="secondary" size="slim" focused>Secondary Slim Focused</Button>
                    </div>
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
                    <Checkbox label="Invalid unchecked" checked={false} invalid={true} />
                    <Checkbox label="Invalid checked" checked={true} invalid={true} />
                    <Checkbox label="Invalid indeterminate" checked={true} indeterminate={true} invalid={true} />
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
                    <Radio label="Invalid unselected" checked={false} invalid={true} name="demo5" />
                    <Radio label="Invalid selected" checked={true} invalid={true} name="demo6" />
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

function SegmentedControlPage() {
    const [selectedLanguage, setSelectedLanguage] = useState('java');
    const [selectedView, setSelectedView] = useState('code');

    const languageOptions = [
        { value: 'java', label: 'Java' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'groovy', label: 'Groovy' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
    ];

    const viewOptions = [
        { value: 'code', label: 'Code' },
        { value: 'design', label: 'Design' },
        { value: 'split', label: 'Split' },
    ];

    return (
        <div className="component-showcase">
            <h1>Segmented Control</h1>

            <div className="component-section">
                <h2>Basic Usage</h2>
                <div className="component-group">
                    <h3>Language Selector</h3>
                    <div className="component-examples">
                        <SegmentedControl
                            options={languageOptions}
                            value={selectedLanguage}
                            onChange={setSelectedLanguage}
                        />
                    </div>
                </div>
                <div className="component-group">
                    <h3>View Mode</h3>
                    <div className="component-examples">
                        <SegmentedControl
                            options={viewOptions}
                            value={selectedView}
                            onChange={setSelectedView}
                        />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-group">
                    <h3>Disabled</h3>
                    <div className="component-examples">
                        <SegmentedControl
                            options={viewOptions}
                            value="code"
                            disabled
                        />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Focused</h3>
                    <div className="component-examples">
                        <SegmentedControl
                            options={viewOptions}
                            value="code"
                            focused
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SearchPage() {
    const [searchValue, setSearchValue] = useState('');
    const [searchWithText, setSearchWithText] = useState('Sample search text');

    return (
        <div className="component-showcase">
            <h1>Search</h1>

            <div className="component-section">
                <h2>States</h2>
                <div className="component-group">
                    <h3>Default (Empty)</h3>
                    <div className="component-examples">
                        <Search
                            value={searchValue}
                            onChange={setSearchValue}
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div className="component-group">
                    <h3>With Text</h3>
                    <div className="component-examples">
                        <Search
                            value={searchWithText}
                            onChange={setSearchWithText}
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div className="component-group">
                    <h3>Invalid</h3>
                    <div className="component-examples">
                        <Search
                            value="Invalid search"
                            onChange={() => {}}
                            invalid
                        />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Without Close Button</h2>
                <div className="component-examples">
                    <Search
                        value="No close button"
                        onChange={() => {}}
                        showClose={false}
                    />
                </div>
            </div>
        </div>
    );
}

function TablePage() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([
        { id: 1, name: 'Project Alpha', type: 'Development', status: 'Active' },
        { id: 2, name: 'Project Beta', type: 'Research', status: 'Pending' },
        { id: 3, name: 'Project Gamma', type: 'Testing', status: 'Completed' },
    ]);

    const columns = [
        { key: 'name', title: 'Name' },
        { key: 'type', title: 'Type' },
        { key: 'status', title: 'Status' },
    ];

    const handleAddRow = () => {
        const newId = tableData.length > 0 ? Math.max(...tableData.map(r => r.id)) + 1 : 1;
        const newRow = {
            id: newId,
            name: '',
            type: '',
            status: '',
        };
        setTableData([...tableData, newRow]);
    };

    const handleRemoveRow = () => {
        if (tableData.length <= 1) return; // Keep at least one row
        
        if (selectedRow !== null && tableData[selectedRow]) {
            // Delete selected row
            const newData = tableData.filter((_, index) => index !== selectedRow);
            setTableData(newData);
            setSelectedRow(null);
        } else {
            // Delete last row if nothing selected
            const newData = tableData.slice(0, -1);
            setTableData(newData);
        }
    };

    const handleCellChange = (rowIndex, columnKey, value) => {
        const newData = [...tableData];
        newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
        setTableData(newData);
    };

    // Static data for non-interactive examples
    const staticData = [
        { id: 1, name: 'Project Alpha', type: 'Development', status: 'Active' },
        { id: 2, name: 'Project Beta', type: 'Research', status: 'Pending' },
        { id: 3, name: 'Project Gamma', type: 'Testing', status: 'Completed' },
    ];

    const toolbarActions = [
        { icon: 'actions/copy', title: 'Copy', onClick: () => alert('Copy clicked') },
    ];

    return (
        <div className="component-showcase">
            <h1>Table</h1>

            <div className="component-section">
                <h2>Basic Table</h2>
                <div className="component-examples">
                    <Table
                        columns={columns}
                        data={staticData}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Editable Table with Toolbar</h2>
                <div className="component-examples">
                    <Table
                        columns={columns}
                        data={tableData}
                        showToolbar
                        onAdd={handleAddRow}
                        onRemove={handleRemoveRow}
                        disableRemove={tableData.length <= 1}
                        editable
                        onCellChange={handleCellChange}
                        selectedRowIndex={selectedRow}
                        onRowClick={(row, index) => setSelectedRow(index)}
                    />
                </div>
                <p style={{ marginTop: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    Click cells to edit. Click + to add a row. Click − to remove selected row (or last row if none selected).
                </p>
            </div>

            <div className="component-section">
                <h2>With Custom Toolbar Actions</h2>
                <div className="component-examples">
                    <Table
                        columns={columns}
                        data={staticData}
                        showToolbar
                        onAdd={() => alert('Add clicked')}
                        onRemove={() => alert('Remove clicked')}
                        toolbarActions={toolbarActions}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Row Selection</h2>
                <div className="component-examples">
                    <Table
                        columns={columns}
                        data={staticData}
                        selectedRowIndex={selectedRow}
                        onRowClick={(row, index) => setSelectedRow(index)}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Striped Rows</h2>
                <div className="component-examples">
                    <Table
                        columns={columns}
                        data={staticData}
                        striped
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

function LoaderPage() {
    return (
        <div className="component-showcase">
            <h1>Loader</h1>
            <p className="component-description">
                A spinner shown during indeterminate loading states. Based on the IntelliJ UI loader icon.
            </p>

            <div className="component-section">
                <h2>Default (16 px)</h2>
                <p className="component-description">Standard small loader used inline or in compact UIs.</p>
                <div className="component-examples">
                    <Loader />
                </div>
            </div>

            <div className="component-section">
                <h2>Large (32 px)</h2>
                <p className="component-description">Larger variant for full-panel or dialog loading states.</p>
                <div className="component-examples">
                    <Loader size={32} />
                </div>
            </div>

            <div className="component-section">
                <h2>Custom sizes</h2>
                <p className="component-description">Any pixel size is accepted via the <code>size</code> prop.</p>
                <div className="component-examples" style={{ alignItems: 'center', gap: 24 }}>
                    <Loader size={12} />
                    <Loader size={16} />
                    <Loader size={24} />
                    <Loader size={32} />
                    <Loader size={48} />
                </div>
            </div>

            <div className="component-section">
                <h2>Inline usage</h2>
                <p className="component-description">Loader can be used inline alongside text labels.</p>
                <div className="component-examples-vertical">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Loader />
                        <span className="text-ui-default">Indexing project…</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Loader />
                        <span className="text-ui-default">Loading dependencies…</span>
                    </div>
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
        { label: "Home", closable: true },
        { label: "Profile", icon: "general/user", closable: true },
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
                <h2>Wrapping Tabs</h2>
                <TabBar tabs={tabData} direction="horizontal" wrap />
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

function LinkPage() {
    return (
        <div className="component-showcase">
            <h1>Link</h1>

            <div className="component-section">
                <h2>Types</h2>
                <div className="component-group">
                    <h3>Default</h3>
                    <div className="component-examples">
                        <UILink>Default Link</UILink>
                        <UILink href="https://www.jetbrains.com">With href</UILink>
                    </div>
                </div>
                <div className="component-group">
                    <h3>Dropdown</h3>
                    <div className="component-examples">
                        <UILink type="dropdown">Dropdown</UILink>
                        <UILink type="dropdown" onClick={() => console.log('clicked')}>With onClick</UILink>
                    </div>
                </div>
                <div className="component-group">
                    <h3>External</h3>
                    <div className="component-examples">
                        <UILink type="external" href="https://www.jetbrains.com">External</UILink>
                        <UILink type="external">Without href</UILink>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Disabled States</h2>
                <div className="component-examples">
                    <UILink disabled>Default Disabled</UILink>
                    <UILink type="dropdown" disabled>Dropdown Disabled</UILink>
                    <UILink type="external" disabled>External Disabled</UILink>
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
                            <StripeIconButton
                                icon="toolwindows/project@20x20" 
                                state={selectedStripe === 'project' ? 'selected' : 'default'} 
                                title="Project"
                                onClick={() => setSelectedStripe('project')}
                            />
                            <StripeIconButton
                                icon="toolwindows/find@20x20" 
                                state={selectedStripe === 'search' ? 'selected' : 'default'}
                                title="Search"
                                onClick={() => setSelectedStripe('search')}
                            />
                            <StripeIconButton
                                icon="toolwindows/run@20x20" 
                                state={selectedStripe === 'terminal' ? 'selected' : 'default'}
                                title="Terminal"
                                onClick={() => setSelectedStripe('terminal')}
                            />
                            <StripeContainer.Separator />
                            <StripeIconButton
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
                <h2>Basic Popup (Line Cells)</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder">New Folder</Popup.Cell>
                            <Popup.Cell type="line" icon="general/search">Find in Files</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Popup with Shortcuts</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text" shortcut="⌘N">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder" shortcut="⌘⇧N">New Folder</Popup.Cell>
                            <Popup.Cell type="line" icon="general/search" shortcut="⌘⇧F">Find in Files</Popup.Cell>
                            <Popup.Cell type="line" icon="general/settings" shortcut="⌘,">Settings</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Popup with Mnemonics</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text" mnemonicGap mnemonic="1">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder" mnemonicGap mnemonic="2">New Folder</Popup.Cell>
                            <Popup.Cell type="line" icon="general/search" mnemonicGap mnemonic="3">Find in Files</Popup.Cell>
                            <Popup.Cell type="line" icon="general/settings" mnemonicGap>Settings</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Popup with Inline Hints</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text" hint="⌘N">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder" hint="⌘⇧N">New Folder</Popup.Cell>
                            <Popup.Cell type="line" icon="general/search" hint="Search">Find in Files</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Popup with Submenu Indicators</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text" submenu>New</Popup.Cell>
                            <Popup.Cell type="line" icon="general/externalTools" submenu>External Tools</Popup.Cell>
                            <Popup.Cell type="line" icon="general/settings" submenu>Preferences</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Popup with Header and Separator</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} header="Actions" style={{ position: 'static', width: '292px' }}>
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
                <h2>Popup with Separator Text</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder">New Folder</Popup.Cell>
                            <Popup.Cell type="separator" text="Recent Files" />
                            <Popup.Cell type="line" iconGap>index.html</Popup.Cell>
                            <Popup.Cell type="line" iconGap>styles.css</Popup.Cell>
                            <Popup.Cell type="line" iconGap>script.js</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Multiline Cells</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="multiline" icon="general/settings" hint="Configure IDE settings">Preferences</Popup.Cell>
                            <Popup.Cell type="multiline" icon="general/externalTools" hint="Manage external tools">External Tools</Popup.Cell>
                            <Popup.Cell type="multiline" icon="general/projectStructure" hint="View project structure">Project Structure</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Search Cell</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="search" placeholder="Search actions..." />
                            <Popup.Cell type="line" icon="fileTypes/text">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder">New Folder</Popup.Cell>
                            <Popup.Cell type="line" icon="general/search">Find in Files</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Complete Popup Example</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} header="File" footer="⌘O to open recent files" style={{ position: 'static', width: '320px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text" shortcut="⌘N">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder" shortcut="⌘⇧N">New Folder</Popup.Cell>
                            <Popup.Cell type="line" icon="fileTypes/any_type" submenu>Open Recent</Popup.Cell>
                            <Popup.Cell type="separator" />
                            <Popup.Cell type="line" icon="actions/menu-saveall" shortcut="⌘S">Save All</Popup.Cell>
                            <Popup.Cell type="line" icon="general/print">Print</Popup.Cell>
                            <Popup.Cell type="separator" text="Settings" />
                            <Popup.Cell type="multiline" icon="general/settings" hint="Configure settings">Preferences</Popup.Cell>
                            <Popup.Cell type="separator" />
                            <Popup.Cell type="search" placeholder="Search..." />
                        </Popup>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Selected State</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <Popup visible={true} style={{ position: 'static', width: '292px' }}>
                            <Popup.Cell type="line" icon="fileTypes/text">New File</Popup.Cell>
                            <Popup.Cell type="line" icon="nodes/folder" selected>New Folder</Popup.Cell>
                            <Popup.Cell type="line" icon="general/search">Find in Files</Popup.Cell>
                        </Popup>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PopupProjectsPage() {
    return (
        <div className="component-showcase">
            <h1>Popup / Projects</h1>
            <p className="component-description">
                Projects popup showing recent projects, quick actions, and project icons with colored monogram badges.
            </p>
            <div className="component-section">
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <PopupProjects />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PopupBranchesPage() {
    return (
        <div className="component-showcase">
            <h1>Popup / Branches</h1>
            <p className="component-description">
                Branches popup with search, VCS actions, and tree-structured local and remote branch listing.
            </p>
            <div className="component-section">
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <PopupBranches />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SearchEverywherePopupPage() {
    return (
        <div className="component-showcase">
            <h1>Popup / Search Everywhere</h1>
            <p className="component-description">
                Search Everywhere popup with tabbed navigation (All, Classes, Files, Symbols, Actions),
                a large search field with blue focus border, advanced result rows with icons and module info,
                and a footer hint.
            </p>
            <div className="component-section">
                <div className="component-examples">
                    <div style={{ display: 'inline-block', padding: '20px' }}>
                        <SearchEverywherePopup />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PopupFindInFilesPage() {
    return (
        <div className="component-showcase">
            <h1>Popup / Find in Files</h1>
            <p className="component-description">
                Find in Files popup with search field, inline action toggles, scope tabs, result list with code preview, and footer actions.
            </p>
            <div className="component-section">
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <PopupFindInFiles />
                    </div>
                </div>
            </div>
            <div className="component-section">
                <h2>With Replace Field</h2>
                <div className="component-examples">
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                        <PopupFindInFiles replaceField={true} />
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

function EditorPage() {
    const [breakpoints, setBreakpoints] = useState([5, 12]);

    const handleBreakpointToggle = (line) => {
        setBreakpoints(prev =>
            prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]
        );
    };

    const javaCode = `/** Convert regular functions to {@link MultivariateDifferentiableFunction}. ...*/
public static MultivariateDifferentiableFunction toDifferentiable(final MultivariateFunction f,
                                                                   final MultivariateVectorFunction gradient) {

    return new MultivariateDifferentiableFunction() {

        /** {@inheritDoc} */
        @Override
        public double value(final double[] point) { return f.value(point); }

        /** {@inheritDoc} */
        @Override
        public DerivativeStructure value(final DerivativeStructure[] point) {

            // set up the input parameters
            final double[] dPoint = new double[point.length];
            for (int i = 0; i < point.length; ++i) {
                dPoint[i] = point[i].getValue();
                if (point[i].getOrder() > 1) {
                    throw new NumberIsTooLargeException(point[i].getOrder(), 1, true);
                }
            }

            // evaluate regular functions
            final double     v = f.value(dPoint);
            final double[] dv = gradient.value(dPoint);
            if (dv.length != point.length) {
                // the gradient function is inconsistent
                throw new DimensionMismatchException(dv.length, point.length);
            }
        }
    };
}`;

    const jsCode = `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored !== null ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;`;

    return (
        <div className="component-showcase">
            <h1>Editor</h1>
            <p className="component-description">
                Code editor with Prism-based syntax highlighting, line numbers, breakpoints, 
                and inline gutter actions. Built on prism-react-editor.
            </p>

            <div className="component-section">
                <h2>Java Editor</h2>
                <div className="component-examples-vertical">
                    <div style={{ height: 400, border: '1px solid var(--border-primary)', borderRadius: 8, overflow: 'hidden' }}>
                        <Editor code={javaCode} language="java" />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>JavaScript Editor</h2>
                <div className="component-examples-vertical">
                    <div style={{ height: 300, border: '1px solid var(--border-primary)', borderRadius: 8, overflow: 'hidden' }}>
                        <Editor code={jsCode} language="javascript" />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>With Breakpoints</h2>
                <p className="section-description">
                    Click a line number to toggle a breakpoint. Lines 5 and 12 have breakpoints set by default.
                </p>
                <div className="component-examples-vertical">
                    <div style={{ height: 300, border: '1px solid var(--border-primary)', borderRadius: 8, overflow: 'hidden' }}>
                        <Editor
                            code={jsCode}
                            language="javascript"
                            breakpoints={breakpoints}
                            onBreakpointToggle={handleBreakpointToggle}
                        />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Read Only</h2>
                <div className="component-examples-vertical">
                    <div style={{ height: 200, border: '1px solid var(--border-primary)', borderRadius: 8, overflow: 'hidden' }}>
                        <Editor code={javaCode} language="java" readOnly={true} />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Without Line Numbers</h2>
                <div className="component-examples-vertical">
                    <div style={{ height: 200, border: '1px solid var(--border-primary)', borderRadius: 8, overflow: 'hidden' }}>
                        <Editor code={jsCode} language="javascript" showLineNumbers={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}

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

function ProjectWidgetPage() {
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
                <h1>Project Widget</h1>

                <div className="component-section">
                    <h2>Basic Project Widget</h2>
                    <div className="component-examples">
                        <ProjectWidget 
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
                        <ProjectWidget 
                            projectName="intellij-platform-ui"
                            projectIcon="IP"
                            projectColor="amber"
                            projects={projects}
                        />
                        <ProjectWidget 
                            projectName="kotlin-multiplatform-mobile"
                            projectIcon="KM"
                            projectColor="violet"
                            projects={projects}
                        />
                        <ProjectWidget 
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
                        <ProjectWidget 
                            projectName="react-native-app"
                            projectIcon="RN"
                            projectColor="plum"
                            projects={projects}
                        />
                        <ProjectWidget 
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
                        <div style={{ padding: '16px', fontSize: '13px', color: 'var(--text-default)' }}>
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
                    <div className="component-examples" style={{ background: 'var(--white)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-primary)', gap: '4px' }}>
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

function AlertPage() {
    const [checkboxState, setCheckboxState] = useState(false);

    return (
        <div className="component-showcase">
            <h1>Alert</h1>
            <p className="component-description">
                Alert dialogs display important messages and require user interaction. 
                They can include a title, body text, icon, optional checkbox, and 1-4 action buttons.
            </p>

            <div className="component-section">
                <h2>Types</h2>
                <p className="section-description">
                    Different alert types with appropriate icons: Question, Error, and Warning.
                </p>
                <div className="component-examples-vertical" style={{ alignItems: 'flex-start', gap: '20px' }}>
                    <Alert
                        title="Title"
                        body="Body text"
                        type="question"
                        buttons={['Cancel', 'OK']}
                    />
                    <Alert
                        title="Error"
                        body="An error has occurred. Please try again."
                        type="error"
                        buttons={['OK']}
                    />
                    <Alert
                        title="Warning"
                        body="This action cannot be undone."
                        type="warning"
                        buttons={['Cancel', 'Continue']}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Checkbox</h2>
                <p className="section-description">
                    Alert with optional "Don't ask again" checkbox.
                </p>
                <div className="component-examples-vertical" style={{ alignItems: 'flex-start', gap: '20px' }}>
                    <Alert
                        title="Confirm Exit"
                        body="Are you sure you want to exit?"
                        type="question"
                        showCheckbox={true}
                        checkboxLabel="Don't ask again"
                        checkboxChecked={checkboxState}
                        onCheckboxChange={setCheckboxState}
                        buttons={['Cancel', 'OK']}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Button Variations</h2>
                <p className="section-description">
                    Alerts can have 1 to 4 buttons. The last button is typically the primary action.
                </p>
                <div className="component-examples-vertical" style={{ alignItems: 'flex-start', gap: '20px' }}>
                    <Alert
                        title="Information"
                        body="Operation completed successfully."
                        type="question"
                        buttons={['OK']}
                    />
                    <Alert
                        title="Save Changes?"
                        body="You have unsaved changes. Do you want to save them before closing?"
                        type="question"
                        buttons={['Don\'t Save', 'Cancel', 'Save']}
                    />
                    <Alert
                        title="Multiple Actions"
                        body="Choose an action to proceed."
                        type="question"
                        buttons={['Action 1', 'Action 2', 'Action 3', 'Action 4']}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Interactive Example</h2>
                <p className="section-description">
                    Click buttons to see interactions. Checkbox state is managed.
                </p>
                <div className="component-examples-vertical" style={{ alignItems: 'flex-start', gap: '20px' }}>
                    <Alert
                        title="Interactive Alert"
                        body="This alert demonstrates interactive features. Try clicking the buttons or checkbox."
                        type="question"
                        showCheckbox={true}
                        checkboxLabel="Don't show this again"
                        checkboxChecked={checkboxState}
                        onCheckboxChange={setCheckboxState}
                        buttons={[
                            { children: 'Cancel', onClick: () => alert('Cancel clicked') },
                            { children: 'OK', onClick: () => alert('OK clicked') }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

function DialogPage() {
    return (
        <div className="component-showcase">
            <h1>Dialog</h1>
            <p className="component-description">
                Modal dialog window with header (macOS traffic light buttons + title),
                scrollable content area, and footer (help icon + action buttons).
            </p>

            <div className="component-section">
                <h2>Default Dialog</h2>
                <p className="section-description">
                    Empty dialog with default Cancel / Apply / OK buttons.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <Dialog title="Settings" width={500} height={350} />
                </div>
            </div>

            <div className="component-section">
                <h2>Dialog with Content</h2>
                <p className="section-description">
                    Dialog with custom body content and two buttons.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <Dialog
                        title="Confirm Action"
                        width={420}
                        buttons={[
                            { children: 'Cancel' },
                            { children: 'OK' },
                        ]}
                    >
                        <div style={{ padding: '20px', color: 'var(--text-default)', fontSize: '13px', lineHeight: '20px' }}>
                            <p>Are you sure you want to proceed with this action?</p>
                            <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>This operation cannot be undone.</p>
                        </div>
                    </Dialog>
                </div>
            </div>

            <div className="component-section">
                <h2>Wide Dialog</h2>
                <p className="section-description">
                    Wider dialog similar to the Settings screen in Figma.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <Dialog title="Settings" width={880} height={495} />
                </div>
            </div>
        </div>
    );
}

function WelcomeDialogPage() {
    return <WelcomeDialog />;
}

function SettingsPage() {
    return (
        <div className="component-showcase">
            <h1>Settings</h1>
            <p className="component-description">
                Settings dialog with two-panel layout: navigation tree on the left, settings content on the right.
                Built from library components only. Figma: <a href="https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7072-91658" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-link)'}}>Dialog / Settings (node 7072:91658)</a>.
            </p>
            <div className="component-section">
                <SettingsDialog />
            </div>
        </div>
    );
}

function TooltipPage() {
    return (
        <div className="component-showcase">
            <h1>Tooltip</h1>
            <p className="component-description">
                Contextual popup that appears on hover to provide additional information about a UI element.
            </p>

            <div className="component-section">
                <h2>Static Preview</h2>
                <p className="section-description">
                    Tooltip appearance — always visible for inspection.
                </p>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <div className="tooltip text-ui-default" style={{ position: 'relative', pointerEvents: 'auto' }}>
                        <span className="tooltip-text">Action name</span>
                        <span className="tooltip-shortcut">&#x2318;&#x2325;&#x2303;&#x21E7;</span>
                    </div>
                    <div className="tooltip text-ui-default" style={{ position: 'relative', pointerEvents: 'auto' }}>
                        <span className="tooltip-text">Action name</span>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Default</h2>
                <p className="section-description">
                    Tooltips are pinned open here so you can review layout without hovering.
                </p>
                <div className="component-examples" style={{ gap: '24px' }}>
                    <Tooltip text="Settings" placement="bottom" alwaysVisible>
                        <ToolbarIconButton icon="general/settings" tooltip={undefined} />
                    </Tooltip>
                    <Tooltip text="Search Everywhere" shortcut="⇧⇧" placement="bottom" alwaysVisible>
                        <ToolbarIconButton icon="actions/search" tooltip={undefined} />
                    </Tooltip>
                    <Tooltip text="Run" shortcut="⌃R" placement="bottom" alwaysVisible>
                        <ToolbarIconButton icon="actions/execute" tooltip={undefined} />
                    </Tooltip>
                </div>
            </div>

            <div className="component-section">
                <h2>Placement</h2>
                <p className="section-description">
                    Tooltips can appear on any side of the trigger element (shown pinned open).
                </p>
                <div className="component-examples" style={{ gap: '48px', padding: '32px 0' }}>
                    <Tooltip text="Top tooltip" placement="top" alwaysVisible>
                        <Button type="secondary">Top</Button>
                    </Tooltip>
                    <Tooltip text="Bottom tooltip" placement="bottom" alwaysVisible>
                        <Button type="secondary">Bottom</Button>
                    </Tooltip>
                    <Tooltip text="Left tooltip" placement="left" alwaysVisible>
                        <Button type="secondary">Left</Button>
                    </Tooltip>
                    <Tooltip text="Right tooltip" placement="right" alwaysVisible>
                        <Button type="secondary">Right</Button>
                    </Tooltip>
                </div>
            </div>

            <div className="component-section">
                <h2>With Shortcut</h2>
                <p className="section-description">
                    Tooltips can display a keyboard shortcut alongside the label.
                </p>
                <div className="component-examples" style={{ gap: '24px' }}>
                    <Tooltip text="Copy" shortcut="⌘C" placement="bottom" alwaysVisible>
                        <Button type="secondary">Copy</Button>
                    </Tooltip>
                    <Tooltip text="Paste" shortcut="⌘V" placement="bottom" alwaysVisible>
                        <Button type="secondary">Paste</Button>
                    </Tooltip>
                    <Tooltip text="Find in Files" shortcut="⇧⌘F" placement="bottom" alwaysVisible>
                        <Button type="secondary">Find in Files</Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

function TooltipHelpPage() {
    return (
        <div className="component-showcase">
            <h1>Tooltip Help</h1>
            <p className="component-description">
                Rich tooltip with header, description, shortcut, and external link.
                Used to show help text for settings and actions. Shown on hovering
                the question mark icon.
            </p>

            <div className="component-section">
                <h2>Full (Header + Body + Shortcut + Link)</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <TooltipHelp
                        header="Header"
                        body="Explain behavior that is not clear from the setting or action name."
                        shortcut="⌘⌥⌃⇧"
                        link={{ text: 'External', href: '#', external: true }}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Body Only</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <TooltipHelp
                        body="Explain behavior that is not clear from the setting or action name."
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Header</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <TooltipHelp
                        header="Header"
                        body="Explain behavior that is not clear from the setting or action name."
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Shortcut</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <TooltipHelp
                        body="Explain behavior that is not clear from the setting or action name."
                        shortcut="⌘⌥⌃⇧"
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Link</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <TooltipHelp
                        body="Explain behavior that is not clear from the setting or action name."
                        link={{ text: 'External', href: '#', external: true }}
                    />
                </div>
            </div>
        </div>
    );
}

function ValidationTooltipPage() {
    const errorActions = [
        { label: 'Action A', onClick: () => {} },
        { label: 'Action B', onClick: () => {} },
    ];
    const warningActions = [
        { label: 'Action A', onClick: () => {} },
        { label: 'Action B', onClick: () => {} },
    ];

    return (
        <div className="component-showcase">
            <h1>Validation Tooltip</h1>
            <p className="component-description">
                Inline validation feedback tooltip that appears near input fields to display
                error or warning messages. Can include optional action links.
            </p>

            <div className="component-section">
                <h2>All Variants</h2>
                <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-secondary)' }}>
                    <div className="theme-dark" style={{ flex: 1, background: '#191A1C', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                        <ValidationTooltip text="Validation error" type="error" />
                        <ValidationTooltip text="Validation error" type="error" actions={errorActions} />
                        <ValidationTooltip text="Validation warning" type="warning" />
                        <ValidationTooltip text="Validation warning" type="warning" actions={warningActions} />
                    </div>
                    <div className="theme-light" style={{ flex: 1, background: '#FFFFFF', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                        <ValidationTooltip text="Validation error" type="error" />
                        <ValidationTooltip text="Validation error" type="error" actions={errorActions} />
                        <ValidationTooltip text="Validation warning" type="warning" />
                        <ValidationTooltip text="Validation warning" type="warning" actions={warningActions} />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Error</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <ValidationTooltip text="Validation error" type="error" />
                    <ValidationTooltip text="Validation error" type="error" actions={errorActions} />
                </div>
            </div>

            <div className="component-section">
                <h2>Warning</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <ValidationTooltip text="Validation warning" type="warning" />
                    <ValidationTooltip text="Validation warning" type="warning" actions={warningActions} />
                </div>
            </div>
        </div>
    );
}

function GotItTooltipPage() {
    return (
        <div className="component-showcase">
            <h1>Got It Tooltip</h1>
            <p className="component-description">
                A Got It tooltip informs users about a new or changed feature and gives basic
                information about it. It is shown once per user and disappears after clicking
                "Got It" or can be skipped entirely.
            </p>

            <div className="component-section">
                <h2>Full (Step + Header + Body + Link + Skip)</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <GotItTooltip
                        step="01"
                        header="Header"
                        link="Link"
                        skipText="Skip All"
                        arrowPosition="top"
                    >
                        A Got It tooltip informs users about a new or changed feature and gives basic information about it.
                    </GotItTooltip>
                </div>
            </div>

            <div className="component-section">
                <h2>Arrow Positions</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <GotItTooltip
                        step="01"
                        header="Arrow Top"
                        link="Link"
                        skipText="Skip All"
                        arrowPosition="top"
                    >
                        A Got It tooltip informs users about a new or changed feature and gives basic information about it.
                    </GotItTooltip>
                    <GotItTooltip
                        step="01"
                        header="Arrow Bottom"
                        link="Link"
                        skipText="Skip All"
                        arrowPosition="bottom"
                    >
                        A Got It tooltip informs users about a new or changed feature and gives basic information about it.
                    </GotItTooltip>
                    <GotItTooltip
                        step="01"
                        header="Arrow Left"
                        link="Link"
                        skipText="Skip All"
                        arrowPosition="left"
                    >
                        A Got It tooltip informs users about a new or changed feature and gives basic information about it.
                    </GotItTooltip>
                    <GotItTooltip
                        step="01"
                        header="Arrow Right"
                        link="Link"
                        skipText="Skip All"
                        arrowPosition="right"
                    >
                        A Got It tooltip informs users about a new or changed feature and gives basic information about it.
                    </GotItTooltip>
                </div>
            </div>

            <div className="component-section">
                <h2>Without Step Counter</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <GotItTooltip
                        header="Header"
                        arrowPosition="top"
                    >
                        A Got It tooltip informs users about a new or changed feature and gives basic information about it.
                    </GotItTooltip>
                </div>
            </div>

            <div className="component-section">
                <h2>Body Only (Minimal)</h2>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start' }}>
                    <GotItTooltip arrowPosition="top">
                        A Got It tooltip informs users about a new or changed feature and gives basic information about it.
                    </GotItTooltip>
                </div>
            </div>
        </div>
    );
}

function TooltipEditorPage() {
    return (
        <div className="component-showcase">
            <h1>Tooltip Editor</h1>
            <p className="component-description">
                Rich editor tooltip with status type, directional arrow, header, main text, and hint.
                Used in code editors to show validation errors, warnings, and contextual information
                near gutter markers and inline annotations.
            </p>

            <div className="component-section">
                <h2>Types — Dark</h2>
                <p className="component-description">Info, Error, Warning, Success on dark (editor) backgrounds.</p>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <TooltipEditor
                        type="info"
                        arrow="up"
                        header="Header"
                        text="Text"
                        hint="Hint"
                    />
                    <TooltipEditor
                        type="error"
                        arrow="up"
                        header="Header"
                        text="Text"
                        hint="Hint"
                    />
                    <TooltipEditor
                        type="warning"
                        arrow="up"
                        header="Header"
                        text="Text"
                        hint="Hint"
                    />
                    <TooltipEditor
                        type="success"
                        arrow="up"
                        header="Header"
                        text="Text"
                        hint="Hint"
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Arrow Directions</h2>
                <p className="component-description">Arrow can point in any of four directions.</p>
                <div className="component-examples" style={{ gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Up</span>
                        <TooltipEditor
                            type="error"
                            arrow="up"
                            header="Unresolved reference"
                            text="Cannot resolve symbol 'foo'"
                            hint="Add import statement"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Down</span>
                        <TooltipEditor
                            type="error"
                            arrow="down"
                            header="Unresolved reference"
                            text="Cannot resolve symbol 'foo'"
                            hint="Add import statement"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Left</span>
                        <TooltipEditor
                            type="error"
                            arrow="left"
                            header="Unresolved reference"
                            text="Cannot resolve symbol 'foo'"
                            hint="Add import statement"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Right</span>
                        <TooltipEditor
                            type="error"
                            arrow="right"
                            header="Unresolved reference"
                            text="Cannot resolve symbol 'foo'"
                            hint="Add import statement"
                        />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Content Variants</h2>
                <p className="component-description">Header and hint are optional.</p>
                <div className="component-examples" style={{ gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Header + Text + Hint</span>
                        <TooltipEditor
                            type="warning"
                            arrow="up"
                            header="Deprecated API"
                            text="Use 'newMethod()' instead"
                            hint="Will be removed in v4.0"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Text only</span>
                        <TooltipEditor
                            type="info"
                            arrow="up"
                            text="No usages found"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>With menu</span>
                        <TooltipEditor
                            type="error"
                            arrow="up"
                            header="Type mismatch"
                            text="Expected String, got Int"
                            hint="Fix type"
                            menu
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Success</span>
                        <TooltipEditor
                            type="success"
                            arrow="up"
                            header="Tests passed"
                            text="All 42 tests completed"
                            hint="0 failures"
                        />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>All Types × All Directions</h2>
                <p className="component-description">Each arrow direction with all four status types.</p>
                {[
                    { arrow: 'up', label: '↑ Arrow Up' },
                    { arrow: 'down', label: '↓ Arrow Down' },
                    { arrow: 'left', label: '← Arrow Left' },
                    { arrow: 'right', label: '→ Arrow Right' },
                ].map(({ arrow, label }) => (
                    <div key={arrow} style={{ marginBottom: '32px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px', letterSpacing: '0.03em' }}>
                            {label}
                        </div>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            {['info', 'error', 'warning', 'success'].map(type => (
                                <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{type}</span>
                                    <TooltipEditor
                                        type={type}
                                        arrow={arrow}
                                        header="Header"
                                        text="Text"
                                        hint="Hint"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BalloonPage() {
    return (
        <div className="component-showcase">
            <h1>Notification</h1>
            <p className="component-description">
                Toast notifications that appear to inform users of events, build results, or actions.
                Typically shown in the bottom-right corner of the IDE.
            </p>

            <div className="component-section">
                <h2>Types</h2>
                <div className="component-examples-vertical" style={{ gap: '12px', alignItems: 'flex-start' }}>
                    <Notification
                        type="info"
                        title="Indexing Complete"
                    >
                        Project files have been indexed successfully.
                    </Notification>
                    <Notification
                        type="success"
                        title="Build Successful"
                        timestamp="just now"
                    >
                        Build completed in 12.4 seconds with no errors.
                    </Notification>
                    <Notification
                        type="warning"
                        title="Deprecated API Usage"
                    >
                        Found 3 usages of deprecated APIs in your project.
                    </Notification>
                    <Notification
                        type="error"
                        title="Build Failed"
                        timestamp="2 min ago"
                    >
                        Compilation failed with 2 errors. See the Build tool window for details.
                    </Notification>
                </div>
            </div>

            <div className="component-section">
                <h2>With Button and Actions</h2>
                <p className="section-description">
                    Matches Figma node 3595:83697 — button + link actions.
                </p>
                <div className="component-examples-vertical" style={{ gap: '12px', alignItems: 'flex-start' }}>
                    <Notification
                        type="info"
                        title="JDK 18 required"
                        button={{ label: 'Install JDK 18', onClick: () => {} }}
                        actions={[
                            { label: 'Action', onClick: () => {} },
                            { label: 'More', onClick: () => {} },
                        ]}
                    >
                        You need to install JDK 18 in order to run this project
                    </Notification>
                    <Notification
                        type="info"
                        title="Plugin Update Available"
                        actions={[
                            { label: 'Update', onClick: () => {} },
                            { label: 'Release Notes', onClick: () => {} },
                        ]}
                    >
                        Kotlin plugin 1.9.0 is available.
                    </Notification>
                    <Notification
                        type="error"
                        title="Unresolved Reference"
                        actions={[
                            { label: 'Add Import', onClick: () => {} },
                        ]}
                    >
                        Cannot resolve symbol 'useState'.
                    </Notification>
                </div>
            </div>

            <div className="component-section">
                <h2>Title Only</h2>
                <div className="component-examples-vertical" style={{ gap: '12px', alignItems: 'flex-start' }}>
                    <Notification type="success" title="File saved" />
                    <Notification type="info" title="VCS update completed" timestamp="3 min ago" />
                    <Notification
                        type="info"
                        title="2,662 files updated in 844 commits"
                        actions={[
                            { label: 'Action', onClick: () => {} },
                            { label: 'More', onClick: () => {} },
                        ]}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>Warning — Low Memory</h2>
                <div className="component-examples-vertical" style={{ gap: '12px', alignItems: 'flex-start' }}>
                    <Notification
                        type="warning"
                        title="Low memory"
                        actions={[
                            { label: 'Action', onClick: () => {} },
                            { label: 'More', onClick: () => {} },
                        ]}
                    >
                        The IDE is running low on memory and this might affect performance.
                        Please consider increasing the heap size.
                    </Notification>
                </div>
            </div>

            <div className="component-section">
                <h2>With ⋮ and × Buttons</h2>
                <div className="component-examples-vertical" style={{ gap: '12px', alignItems: 'flex-start' }}>
                    <Notification
                        type="info"
                        title="JDK 18 required"
                        button={{ label: 'Install JDK 18', onClick: () => {} }}
                        actions={[
                            { label: 'Action', onClick: () => {} },
                            { label: 'More', onClick: () => {} },
                        ]}
                        onMore={() => {}}
                        onClose={() => {}}
                        forceHoverButtons
                    >
                        You need to install JDK 18 in order to run this project
                    </Notification>
                    <Notification
                        type="error"
                        title="Build Failed"
                        actions={[{ label: 'Open Build Log', onClick: () => {} }]}
                        onMore={() => {}}
                        onClose={() => {}}
                        forceHoverButtons
                    >
                        Compilation failed with 2 errors.
                    </Notification>
                </div>
            </div>
        </div>
    );
}

function TerminalWindowPage() {
    return (
        <div className="component-showcase">
            <h1>Terminal</h1>
            <p className="component-description">
                Terminal tool window with tabbed sessions. Supports right-click context menu,
                search overlay (⌘F), AI ghost text, colored output, and hyperlinks.
            </p>

            <div className="component-section">
                <h2>Single Session</h2>
                <p className="section-description">
                    Default terminal with command history. Right-click for context menu, ⌘F to search.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <TerminalWindow />
                </div>
            </div>

            <div className="component-section">
                <h2>Multiple Sessions with Output</h2>
                <p className="section-description">
                    Terminal with multiple tabs, colored output, and error messages.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <TerminalWindow
                        tabs={[
                            { label: 'Local', closable: true },
                            { label: 'Local (1)', closable: true },
                            { label: 'Local (2)', closable: true }
                        ]}
                        blocks={[
                            {
                                path: '~/projects/intellij',
                                lines: [
                                    { type: 'command', text: 'npm run build' },
                                    { type: 'output', text: 'Building project...' },
                                    { type: 'success', text: '✓ Build completed successfully' },
                                ],
                            },
                            {
                                path: '~/projects/intellij',
                                lines: [
                                    { type: 'command', text: 'npm test' },
                                    { type: 'output', text: 'Running 42 tests...' },
                                    { type: 'error', text: 'FAIL src/utils/math.test.js' },
                                    { type: 'error', text: '  ✕ should calculate sum correctly (3ms)' },
                                    { type: 'output', text: 'Tests: 1 failed, 41 passed, 42 total' },
                                ],
                            },
                        ]}
                        input={{ path: '~/projects/intellij', branch: 'main' }}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>AI Inline Completion</h2>
                <p className="section-description">
                    Ghost text shows AI-suggested command completion (press → to accept).
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <TerminalWindow
                        width={600}
                        height={180}
                        blocks={[
                            {
                                path: '~/projects/intellij',
                                lines: [
                                    { type: 'command', text: 'git commit -m "Add new feature"' },
                                    { type: 'output', text: '[feature-x 3a1b2c3] Add new feature' },
                                    { type: 'output', text: ' 3 files changed, 42 insertions(+), 7 deletions(-)' },
                                ],
                            },
                        ]}
                        input={{ path: '~/projects/intellij', branch: 'feature-x', ghost: 'git push origin feature-x' }}
                    />
                </div>
            </div>

            <div className="component-section">
                <h2>With Search Overlay</h2>
                <p className="section-description">
                    Search bar visible (triggered by ⌘F). Shows match count and navigation.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <TerminalWindow
                        width={600}
                        height={200}
                        showSearch={true}
                        blocks={[
                            {
                                path: '~/projects/intellij',
                                lines: [
                                    { type: 'command', text: 'grep -r "error" src/' },
                                    { type: 'output', text: 'src/utils/logger.js:12: handleError(err)' },
                                    { type: 'output', text: 'src/api/client.js:45: throw new Error("timeout")' },
                                    { type: 'output', text: 'src/tests/app.test.js:8: expect(error).toBeDefined()' },
                                ],
                            },
                        ]}
                        input={{ path: '~/projects/intellij', branch: 'main' }}
                    />
                </div>
            </div>
        </div>
    );
}

function ProjectWindowPage() {
    const compactTreeData = [
        {
            id: '1',
            label: 'my-app',
            icon: 'nodes/folder',
            isExpanded: true,
            children: [
                { id: '1-1', label: 'node_modules', icon: 'nodes/folder' },
                {
                    id: '1-2',
                    label: 'src',
                    icon: 'nodes/folder',
                    isExpanded: true,
                    children: [
                        { id: '1-2-1', label: 'App.js', icon: 'fileTypes/javaScript' },
                        { id: '1-2-2', label: 'index.js', icon: 'fileTypes/javaScript' },
                        { id: '1-2-3', label: 'styles.css', icon: 'fileTypes/css' }
                    ]
                },
                { id: '1-3', label: 'package.json', icon: 'fileTypes/json' },
                { id: '1-4', label: 'README.md', icon: 'fileTypes/text' }
            ]
        }
    ];

    return (
        <div className="component-showcase">
            <h1>Project</h1>
            <p className="component-description">
                Project tool window displaying a hierarchical file tree for navigating the project structure.
                Supports expand/collapse of directories and file type icons.
            </p>

            <div className="component-section">
                <h2>Standard Project Tree</h2>
                <p className="section-description">
                    Full project tree with nested directories and various file types.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <ProjectWindow />
                </div>
            </div>

            <div className="component-section">
                <h2>Compact Project</h2>
                <p className="section-description">
                    A smaller project with fewer files, typical for simple applications.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <ProjectWindow
                        width={280}
                        height={300}
                        treeData={compactTreeData}
                    />
                </div>
            </div>
        </div>
    );
}

function AIAssistantWindowPage() {
    return (
        <div className="component-showcase">
            <h1>AI Assistant</h1>
            <p className="component-description">
                AI Assistant tool window providing a chat-like interface for code assistance, 
                explanations, and suggestions.
            </p>

            <div className="component-section">
                <h2>Chat Interface</h2>
                <p className="section-description">
                    AI Assistant with a conversation thread showing user prompts and AI responses.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <AIAssistantWindow />
                </div>
            </div>

            <div className="component-section">
                <h2>Empty State</h2>
                <p className="section-description">
                    AI Assistant when no conversation has been started.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <AIAssistantWindow
                        height={300}
                        empty={true}
                    />
                </div>
            </div>
        </div>
    );
}

function ProblemsWindowPage() {
    return (
        <div className="component-showcase">
            <h1>Problems</h1>
            <p className="component-description">
                Problems tool window showing file-level issues with error and warning details.
                Supports tabbed views for File, Project Errors, Vulnerable Dependencies, Qodana, and AI Self-Review.
            </p>

            <div className="component-section">
                <h2>With Problems</h2>
                <p className="section-description">
                    Problems view with file nodes and error-level children showing issue messages and line numbers.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <ProblemsWindow />
                </div>
            </div>

            <div className="component-section">
                <h2>Empty State</h2>
                <p className="section-description">
                    Problems view when the current file has no issues.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <ProblemsWindow
                        empty={true}
                        emptyText="No problems in crowdin.yml"
                    />
                </div>
            </div>
        </div>
    );
}

function CommitWindowPage() {
    return (
        <div className="component-showcase">
            <h1>Commit</h1>
            <p className="component-description">
                VCS Commit tool window with a file change tree, Amend option, commit message
                textarea, and Commit / Commit and Push buttons. Matches Figma node 27921:15443.
            </p>

            <div className="component-section">
                <h2>Default</h2>
                <p className="section-description">
                    Commit window with two modified Java files and a collapsed Unversioned Files group.
                </p>
                <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                    <CommitWindow />
                </div>
            </div>
        </div>
    );
}

function VCSLogWindowPage() {
    return (
        <div className="component-showcase">
            <h1>VCS Log</h1>
            <p className="component-description">
                VCS Log tool window with a Branches sidebar, commit graph, and commit details panel.
                Matches Figma node 25-3448 from the VCS Components file.
            </p>

            <div className="component-section">
                <h2>Default</h2>
                <p className="section-description">
                    Log tab active, "fixup mac/linux/win all in cross platform" commit selected.
                </p>
                <VCSLogWindow width="100%" />
            </div>
        </div>
    );
}

function MainWindowPage() {
    return (
        <div className="component-showcase">
            <h1>Main Window</h1>
            <p className="component-description">
                A full IDE window layout combining MainToolbar, Stripe panels, Tool Windows, 
                Editor tabs, Code Editor, and Status Bar. Click on stripe buttons to toggle panels.
            </p>

            <div className="component-section">
                <div className="main-window-demo">
                    <MainWindow 
                        projectName="commons-math"
                        projectIcon="CM"
                        projectColor="grass"
                        branchName="feature/new-ui"
                        runConfig="IDEA Community"
                    />
                </div>
            </div>
        </div>
    );
}

function EmptyStatePage() {
    return (
        <div className="component-showcase">
            <h1>Empty State</h1>
            <p className="component-description">
                Empty states inform users why a container is empty and provide actions to fill it.
            </p>

            <div className="component-section">
                <h2>Default</h2>
                <p className="section-description">
                    Explanation text with an action link, keyboard shortcut, and a help link.
                </p>
                <div className="component-examples" style={{ justifyContent: 'center' }}>
                    <div style={{ width: 324, height: 262, border: '1px solid var(--border-primary)', borderRadius: 4 }}>
                        <EmptyState
                            explanation="No datasources added."
                            actionText="Add data source…"
                            actionShortcut="⌘N"
                            onAction={() => {}}
                            helpText="Defining a database"
                            helpHref="https://www.jetbrains.com/help/"
                        />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Without Help</h2>
                <p className="section-description">
                    Only explanation and action link, without a help link.
                </p>
                <div className="component-examples" style={{ justifyContent: 'center' }}>
                    <div style={{ width: 324, height: 200, border: '1px solid var(--border-primary)', borderRadius: 4 }}>
                        <EmptyState
                            explanation="No configurations added."
                            actionText="Add configuration…"
                            actionShortcut="⌘N"
                            onAction={() => {}}
                        />
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Explanation Only</h2>
                <p className="section-description">
                    Minimal empty state with only the explanation text.
                </p>
                <div className="component-examples" style={{ justifyContent: 'center' }}>
                    <div style={{ width: 324, height: 160, border: '1px solid var(--border-primary)', borderRadius: 4 }}>
                        <EmptyState
                            explanation="No items to display."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sidebar Navigation Component
function Sidebar() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [collapsedSections, setCollapsedSections] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const isActive = (path) => location.pathname === path;
    const isSearching = searchQuery.trim().length > 0;
    const matchesSearch = (name) => name.toLowerCase().includes(searchQuery.trim().toLowerCase());

    const toggleSection = (section) => {
        setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const isSectionOpen = (section) => {
        if (isSearching) return true;
        return !collapsedSections[section];
    };

    const stylesItems = [
        { name: 'Typography', key: 'typography' },
        { name: 'Colors', key: 'colors' },
        { name: 'Semantic Colors', key: 'semanticcolors' }
    ];

    const windowsItems = getSortedWindowsOnly().filter(c => c.key !== 'mainwindow');
    const componentSections = getComponentsBySection();

    const filteredWindows = isSearching ? windowsItems.filter(c => matchesSearch(c.name)) : windowsItems;
    const filteredComponentSections = componentSections
        .map(sec => ({
            ...sec,
            components: isSearching ? sec.components.filter(c => matchesSearch(c.name)) : sec.components,
        }))
        .filter(sec => sec.components.length > 0);
    const filteredStyles = isSearching ? stylesItems.filter(c => matchesSearch(c.name)) : stylesItems;

    const showHome = !isSearching || matchesSearch('Home');
    const showMainWindow = !isSearching || matchesSearch('Main Window');

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Link to="/" className="logo">
                    <Logo className="logo-icon" />
                    <span className="logo-text">Int UI Kit for Web</span>
                </Link>
                <ToolbarIconButton
                    icon={theme === 'light' ? 'theme/darkTheme' : 'theme/lightTheme'}
                    tooltip={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                    onClick={toggleTheme}
                />
            </div>

            <Search
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search..."
                className="sidebar-search"
            />

            {showHome && (
                <div className="nav-category">
                    <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                        Home
                    </Link>
                </div>
            )}

            {showMainWindow && (
                <div className="nav-category">
                    <Link to="/mainwindow" className={`nav-item ${isActive('/mainwindow') ? 'active' : ''}`}>
                        Main Window
                    </Link>
                </div>
            )}

            {filteredWindows.length > 0 && (
                <div className="nav-category">
                    <div className="nav-category-title" onClick={() => toggleSection('windows')}>
                        Windows
                        <span className={`nav-category-chevron ${isSectionOpen('windows') ? 'open' : ''}`}>
                            <Icon name="general/chevronRight" size={16} />
                        </span>
                    </div>
                    {isSectionOpen('windows') && (
                        <div className="nav-category-items">
                            {filteredWindows.map((component) => (
                                <Link
                                    key={component.key}
                                    to={`/${component.key}`}
                                    className={`nav-item ${isActive(`/${component.key}`) ? 'active' : ''}`}
                                >
                                    {component.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {filteredComponentSections.length > 0 && (
                <div className="nav-category">
                    <div className="nav-category-title" onClick={() => toggleSection('components')}>
                        Components
                        <span className={`nav-category-chevron ${isSectionOpen('components') ? 'open' : ''}`}>
                            <Icon name="general/chevronRight" size={16} />
                        </span>
                    </div>
                    {isSectionOpen('components') && (
                        <div className="nav-category-items">
                            {filteredComponentSections.map((sec) => (
                                <div key={sec.sectionKey} className="nav-sub-group">
                                    {!isSearching && (
                                        <div
                                            className="nav-sub-group-title"
                                            onClick={() => toggleSection(`sub-${sec.sectionKey}`)}
                                        >
                                            {sec.sectionName}
                                            <span className={`nav-category-chevron ${isSectionOpen(`sub-${sec.sectionKey}`) ? 'open' : ''}`}>
                                                <Icon name="general/chevronRight" size={12} />
                                            </span>
                                        </div>
                                    )}
                                    {isSectionOpen(`sub-${sec.sectionKey}`) && (
                                        <div className="nav-sub-group-items">
                                            {sec.components.map((component) => (
                                                <Link
                                                    key={component.key}
                                                    to={`/${component.key}`}
                                                    className={`nav-item nav-item--indented ${isActive(`/${component.key}`) ? 'active' : ''}`}
                                                >
                                                    {component.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {filteredStyles.length > 0 && (
                <div className="nav-category">
                    <div className="nav-category-title" onClick={() => toggleSection('styles')}>
                        Styles
                        <span className={`nav-category-chevron ${isSectionOpen('styles') ? 'open' : ''}`}>
                            <Icon name="general/chevronRight" size={16} />
                        </span>
                    </div>
                    {isSectionOpen('styles') && (
                        <div className="nav-category-items">
                            {filteredStyles.map((item) => (
                                <Link
                                    key={item.key}
                                    to={`/${item.key}`}
                                    className={`nav-item ${isActive(`/${item.key}`) ? 'active' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

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
                    <Route path="/semanticcolors" element={<SemanticColors />} />
                    <Route path="/banner" element={<BannerPage />} />
                    <Route path="/badge" element={<BadgePage />} />
                    <Route path="/buttons" element={<ButtonsPage />} />
                    <Route path="/checkbox" element={<CheckboxPage />} />
                    <Route path="/radio" element={<RadioPage />} />
                    <Route path="/segmentedcontrol" element={<SegmentedControlPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/table" element={<TablePage />} />
                    <Route path="/toggle" element={<TogglePage />} />
                    <Route path="/progressbar" element={<ProgressBarPage />} />
                    <Route path="/loader" element={<LoaderPage />} />
                    <Route path="/dropdown" element={<DropdownPage />} />
                    <Route path="/emptystate" element={<EmptyStatePage />} />
                    <Route path="/combobox" element={<ComboboxPage />} />
                    <Route path="/toolbariconbutton" element={<ToolbarIconButtonPage />} />
                    <Route path="/tabs" element={<TabsPage />} />
                    <Route path="/inputs" element={<InputsPage />} />
                    <Route path="/link" element={<LinkPage />} />
                    <Route path="/tree" element={<TreePage />} />
                    <Route path="/stripe" element={<StripePage />} />
                    <Route path="/popup" element={<PopupPage />} />
                    <Route path="/popupprojects" element={<PopupProjectsPage />} />
                    <Route path="/popupbranches" element={<PopupBranchesPage />} />
                    <Route path="/popupsearcheverywhere" element={<SearchEverywherePopupPage />} />
                    <Route path="/popupfindinfiles" element={<PopupFindInFilesPage />} />
                    <Route path="/codeexample" element={<CodeExamplePage />} />
                    <Route path="/editor" element={<EditorPage />} />
                    <Route path="/toolwindow" element={<ToolWindowPage />} />
                    <Route path="/toolbardropdown" element={<ToolbarDropdownPage />} />
                    <Route path="/mainwindow" element={<MainWindowPage />} />
                    <Route path="/terminal" element={<TerminalWindowPage />} />
                    <Route path="/projectwindow" element={<ProjectWindowPage />} />
                    <Route path="/aiassistant" element={<AIAssistantWindowPage />} />
                    <Route path="/problemswindow" element={<ProblemsWindowPage />} />
                    <Route path="/projectwidget" element={<ProjectWidgetPage />} />
                    <Route path="/commit" element={<CommitWindowPage />} />
                    <Route path="/vcslog" element={<VCSLogWindowPage />} />
                    <Route path="/toolbar" element={<ToolbarDemo />} />
                    <Route path="/statusbar" element={<StatusBarPage />} />
                    <Route path="/statusbarbreadcrumb" element={<StatusBarBreadcrumbPage />} />
                    <Route path="/alert" element={<AlertPage />} />
                    <Route path="/dialog" element={<DialogPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/welcomedialog" element={<WelcomeDialogPage />} />
                    <Route path="/tooltip" element={<TooltipPage />} />
                    <Route path="/tooltiphelp" element={<TooltipHelpPage />} />
                    <Route path="/validationtooltip" element={<ValidationTooltipPage />} />
                    <Route path="/tooltipeditor" element={<TooltipEditorPage />} />
                    <Route path="/gotittooltip" element={<GotItTooltipPage />} />
                    <Route path="/notification" element={<BalloonPage />} />
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
