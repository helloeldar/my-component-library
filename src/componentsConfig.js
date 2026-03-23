// Shared configuration for all components
export const componentsConfig = [
    // Buttons
    { name: 'Buttons', key: 'buttons', description: 'Primary and secondary button variants', category: 'components', section: 'buttons', status: 'ready', preview: '/previews/button.png' },
    { name: 'Toolbar Icon Button', key: 'toolbariconbutton', description: 'Toolbar icon buttons with action and toggle types', category: 'components', section: 'buttons', status: 'ready', preview: '/previews/toolbar button.png' },
    { name: 'Link', key: 'link', description: 'Text links with default, dropdown, and external variants', category: 'components', section: 'buttons', status: 'ready', preview: '/previews/link.png' },

    // Inputs
    { name: 'Inputs', key: 'inputs', description: 'Text input fields with various states', category: 'components', section: 'inputs', status: 'ready', preview: '/previews/input.png' },
    { name: 'Checkbox', key: 'checkbox', description: 'Checkbox with checked, indeterminate, and disabled states', category: 'components', section: 'inputs', status: 'ready', preview: '/previews/checkbox.png' },
    { name: 'Radio Button', key: 'radio', description: 'Radio button for single selection from options', category: 'components', section: 'inputs', status: 'ready', preview: '/previews/radio button.png' },
    { name: 'Search', key: 'search', description: 'Search input field with icon and clear button', category: 'components', section: 'inputs', status: 'ready', preview: '/previews/search.png' },
    { name: 'Combobox', key: 'combobox', description: 'Editable dropdown with filtering and selection', category: 'components', section: 'inputs', status: 'ready', preview: '/previews/combo_box.png' },
    { name: 'Toggle', key: 'toggle', description: 'Toggle switch with ON/OFF states', category: 'components', section: 'inputs', status: 'ready', preview: null },
    { name: 'Dropdown', key: 'dropdown', description: 'Select dropdown with options list', category: 'components', section: 'inputs', status: 'ready', preview: '/previews/dropdown.png' },

    // Feedback
    { name: 'Banner', key: 'banner', description: 'Notification bar for important information, warnings, errors, or success messages', category: 'components', section: 'feedback', status: 'ready', preview: '/previews/banner.png' },
    { name: 'Alert', key: 'alert', description: 'Dialog alert with title, body, icon, and action buttons', category: 'components', section: 'feedback', status: 'ready', preview: '/previews/alert.png' },
    { name: 'Balloon', key: 'balloon', description: 'Notification balloon for non-modal messages', category: 'components', section: 'feedback', status: 'ready', preview: null },

    // Help
    { name: 'Tooltip', key: 'tooltip', description: 'Contextual tooltip for additional information on hover', category: 'components', section: 'help', status: 'ready', preview: null },
    { name: 'Help Text', key: 'helptext', description: 'Inline help text for form fields and settings', category: 'components', section: 'help', status: 'coming-soon', preview: null },
    { name: 'Empty State', key: 'emptystate', description: 'Placeholder content for empty views and panels', category: 'components', section: 'help', status: 'ready', preview: null },

    // Container
    { name: 'Dialog', key: 'dialog', description: 'Modal dialog window with header, content area, and footer buttons', category: 'components', section: 'container', status: 'ready', preview: '/previews/dialog.png' },
    { name: 'Popup', key: 'popup', description: 'Contextual menus and dropdowns with various cell types', category: 'components', section: 'container', status: 'ready', preview: '/previews/popup.png' },
    { name: 'Tool Window', key: 'toolwindow', description: 'Resizable panels with optional tabs', category: 'components', section: 'container', status: 'ready', preview: '/previews/tool_window.png' },

    // Navigation
    { name: 'Tabs', key: 'tabs', description: 'Horizontal and vertical tab navigation', category: 'components', section: 'navigation', status: 'ready', preview: '/previews/tabs.png' },
    { name: 'Segmented Control', key: 'segmentedcontrol', description: 'Button group for toggling between mutually exclusive options', category: 'components', section: 'navigation', status: 'ready', preview: '/previews/segmented_control.png' },

    // Information
    { name: 'Tree', key: 'tree', description: 'Hierarchical file tree component', category: 'components', section: 'information', status: 'ready', preview: '/previews/tree.png' },
    { name: 'Table', key: 'table', description: 'Data table with columns, rows, and optional toolbar', category: 'components', section: 'information', status: 'ready', preview: '/previews/table.png' },

    // Progress
    { name: 'Progress Bar', key: 'progressbar', description: 'Progress indicator with optional label and stop button', category: 'components', section: 'progress', status: 'ready', preview: '/previews/progress_bar.png' },
    { name: 'Loader', key: 'loader', description: 'Spinning or animated loader for indeterminate states', category: 'components', section: 'progress', status: 'coming-soon', preview: null },

    // App Kit
    { name: 'Stripe', key: 'stripe', description: 'Vertical toolbar buttons with container', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Code Example', key: 'codeexample', description: 'Code display with syntax highlighting and line numbers', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Editor', key: 'editor', description: 'Code editor with syntax highlighting, breakpoints, and inline gutter actions', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Main Window', key: 'mainwindow', description: 'Complete IDE window layout with island theme', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'AI Assistant', key: 'aiassistant', description: 'AI Assistant tool window with chat-like interface', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Project', key: 'projectwindow', description: 'Project tool window with file tree navigation', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Terminal', key: 'terminal', description: 'Terminal tool window with tabbed sessions', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Popup / Projects', key: 'popupprojects', description: 'Projects popup with recent projects and quick actions', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Popup / Branches', key: 'popupbranches', description: 'Branches popup with search, VCS actions, and branch tree', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Status Bar', key: 'statusbar', description: 'IDE status bar with breadcrumbs, progress, and widgets', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Status Bar Breadcrumb', key: 'statusbarbreadcrumb', description: 'Breadcrumb navigation item for status bar', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Toolbar', key: 'toolbar', description: 'Main toolbar preview with icon actions', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Toolbar Dropdown', key: 'toolbardropdown', description: 'Dropdown button for main toolbar with themes and states', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Project Widget', key: 'projectwidget', description: 'Dropdown for selecting active project with icon and name', category: 'components', section: 'appkit', status: 'ready', preview: null },
];

// Home page section definitions in display order
export const homeSections = [
    { key: 'styles', name: 'Styles', description: 'Design tokens and foundational styles' },
    { key: 'buttons', name: 'Buttons', description: 'Toolbar buttons and button variants' },
    { key: 'inputs', name: 'Inputs', description: 'Input fields, checkboxes, radios, and selection controls' },
    { key: 'feedback', name: 'Feedback', description: 'Banners, alerts, and notification balloons' },
    { key: 'help', name: 'Help', description: 'Tooltips, help text, and empty states' },
    { key: 'container', name: 'Container', description: 'Dialogs, popups, and tool windows' },
    { key: 'navigation', name: 'Content filtering', description: 'Tabs and segmented controls' },
    { key: 'information', name: 'Information', description: 'Trees and tables' },
    { key: 'progress', name: 'Progress', description: 'Progress bars and loaders' },
    { key: 'appkit', name: 'App Kit', description: 'Stripes, IDE layout, status bar, and main toolbar with widgets' },
];

// Styles pages (not part of componentsConfig, displayed separately)
export const stylesPages = [
    { name: 'Typography', key: 'typography', description: 'Text styles for UI and editor', status: 'ready', preview: '/previews/typography.png' },
    { name: 'Colors', key: 'colors', description: 'Color scales and palettes', status: 'ready', preview: '/previews/colours.png' },
];

// Returns home page sections with their pages populated
export const getHomeSections = () => {
    return homeSections.map(section => {
        if (section.key === 'styles') {
            return { ...section, pages: stylesPages };
        }
        const pages = componentsConfig
            .filter(item => item.section === section.key)
            .sort((a, b) => a.name.localeCompare(b.name));
        return { ...section, pages };
    });
};

// Function to get components sorted alphabetically
export const getSortedComponents = () => {
    return [...componentsConfig].sort((a, b) => a.name.localeCompare(b.name));
};

// Function to get only components (category: 'components') that have pages
export const getSortedComponentsOnly = () => {
    return [...componentsConfig]
        .filter(item => item.category === 'components' && item.status !== 'coming-soon')
        .sort((a, b) => a.name.localeCompare(b.name));
};

// Function to get only features (category: 'features')
export const getSortedFeaturesOnly = () => {
    return [...componentsConfig]
        .filter(item => item.category === 'features')
        .sort((a, b) => a.name.localeCompare(b.name));
};

// Function to get only windows (category: 'windows')
export const getSortedWindowsOnly = () => {
    return [...componentsConfig]
        .filter(item => item.category === 'windows')
        .sort((a, b) => a.name.localeCompare(b.name));
};

// Categories configuration (used by sidebar)
export const categoriesConfig = [
    {
        name: 'Styles',
        description: 'Design tokens and foundational styles',
        pages: [
            { name: 'Typography', key: 'typography', description: 'Text styles for UI and editor' },
            { name: 'Colors', key: 'colors', description: 'Color scales and palettes' }
        ]
    },
    {
        name: 'Components',
        description: 'Interactive UI components',
        pages: getSortedComponentsOnly()
    },
    {
        name: 'Windows',
        description: 'Complete window layouts',
        pages: getSortedWindowsOnly()
    }
];
