// Shared configuration for all components
export const componentsConfig = [
    // Buttons
    { name: 'Buttons', key: 'buttons', description: 'Primary and secondary button variants', category: 'components', section: 'buttons', status: 'ready', preview: '/previews/button.png' },
    { name: 'Badge', key: 'badge', description: 'Status badge with color variants: blue, green, purple, gray, and disabled', category: 'components', section: 'buttons', status: 'ready', preview: null },
    { name: 'Link', key: 'link', description: 'Text links with default, dropdown, and external variants', category: 'components', section: 'buttons', status: 'ready', preview: '/previews/link.png' },

    // Toolbar (regular — 26px, tool-window toolbars)
    { name: 'Toolbar Icon Button', key: 'toolbariconbutton', description: 'Toolbar icon buttons with action and toggle types', category: 'components', section: 'toolbar', status: 'ready', preview: '/previews/toolbar button.png' },
    { name: 'Toolbar Button', key: 'toolbarbutton', description: 'Text action button for tool-window toolbars with optional icon and dropdown arrow', category: 'components', section: 'toolbar', status: 'ready', preview: null },
    { name: 'Toolbar', key: 'toolbar', description: 'Tool-window toolbar with icon buttons, separators, and dropdowns', category: 'components', section: 'toolbar', status: 'ready', preview: null },
    { name: 'Toolbar Dropdown', key: 'toolbardropdown', description: 'Label + value filter selector for tool-window toolbars', category: 'components', section: 'toolbar', status: 'ready', preview: null },

    // Main Toolbar (40px, main application toolbar)
    { name: 'Main Toolbar', key: 'maintoolbar', description: 'Main application toolbar with icon buttons, dropdowns, and separators', category: 'components', section: 'toolbar', status: 'ready', preview: null },

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
    { name: 'Notification', key: 'notification', description: 'Notification balloon for non-modal messages', category: 'components', section: 'feedback', status: 'ready', preview: null },

    // Help
    { name: 'Tooltip', key: 'tooltip', description: 'Contextual tooltip for additional information on hover', category: 'components', section: 'help', status: 'ready', preview: null },
    { name: 'Tooltip Help', key: 'tooltiphelp', description: 'Rich tooltip with header, description, shortcut and link', category: 'components', section: 'help', status: 'ready', preview: null },
    { name: 'Validation Tooltip', key: 'validationtooltip', description: 'Validation error/warning tooltip with optional action links', category: 'components', section: 'help', status: 'ready', preview: null },
    { name: 'Tooltip Editor', key: 'tooltipeditor', description: 'Rich editor tooltip with status type, directional arrow, header, text, and hint', category: 'components', section: 'help', status: 'ready', preview: null },
    { name: 'Got It Tooltip', key: 'gotittooltip', description: 'Onboarding tooltip that introduces new or changed features with a Got It button', category: 'components', section: 'help', status: 'ready', preview: null },
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
    { name: 'Loader', key: 'loader', description: 'Spinning or animated loader for indeterminate states', category: 'components', section: 'progress', status: 'ready', preview: null },

    // App Kit
    { name: 'Stripe', key: 'stripe', description: 'Vertical toolbar buttons with container', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Code Example', key: 'codeexample', description: 'Code display with syntax highlighting and line numbers', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Editor', key: 'editor', description: 'Code editor with syntax highlighting, breakpoints, and inline gutter actions', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Welcome Dialog', key: 'welcomedialog', description: 'IntelliJ IDEA startup welcome screen with sidebar navigation, project list, and search', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Main Window', key: 'mainwindow', description: 'Complete IDE window layout with island theme', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'AI Assistant', key: 'aiassistant', description: 'AI Assistant tool window with chat-like interface', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Project', key: 'projectwindow', description: 'Project tool window with file tree navigation', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Problems', key: 'problemswindow', description: 'Problems tool window with file errors and warnings', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Terminal', key: 'terminal', description: 'Terminal tool window with tabbed sessions', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Commit', key: 'commit', description: 'VCS Commit tool window with file tree, amend option, and commit message', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'VCS Log', key: 'vcslog', description: 'VCS Log tool window with Branches sidebar, commit graph, and commit details', category: 'windows', section: 'appkit', status: 'ready', preview: null },
    { name: 'Popup / Projects', key: 'popupprojects', description: 'Projects popup with recent projects and quick actions', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Popup / Branches', key: 'popupbranches', description: 'Branches popup with search, VCS actions, and branch tree', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Popup / Search Everywhere', key: 'popupsearcheverywhere', description: 'Search Everywhere popup with tabbed navigation, large search field, and advanced result rows', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Popup / Find in Files', key: 'popupfindinfiles', description: 'Find in Files popup with search, scopes, result list and code preview', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Status Bar', key: 'statusbar', description: 'IDE status bar with breadcrumbs, progress, and widgets', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Status Bar Breadcrumb', key: 'statusbarbreadcrumb', description: 'Breadcrumb navigation item for status bar', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Toolbar', key: 'toolbar', description: 'Tool-window toolbar with icon buttons, separators, and dropdowns', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Main Toolbar', key: 'maintoolbar', description: 'Main application toolbar with icon buttons, dropdowns, and separators', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Project Widget', key: 'projectwidget', description: 'Dropdown for selecting active project with icon and name', category: 'components', section: 'appkit', status: 'ready', preview: null },
    { name: 'Settings', key: 'settings', description: 'Full Settings dialog with two-panel layout: navigation tree and settings content area', category: 'windows', section: 'appkit', status: 'ready', preview: null },
];

// Home page section definitions in display order
export const homeSections = [
    { key: 'styles', name: 'Styles', description: 'Design tokens and foundational styles' },
    { key: 'buttons', name: 'Buttons', description: 'Button variants and links' },
    { key: 'toolbar', name: 'Toolbar', description: 'Toolbar, toolbar icon buttons, and toolbar dropdown' },
    { key: 'inputs', name: 'Inputs', description: 'Input fields, checkboxes, radios, and selection controls' },
    { key: 'feedback', name: 'Feedback', description: 'Banners, alerts, and notification balloons' },
    { key: 'help', name: 'Tooltips', description: 'Tooltips, help text, and empty states' },
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
    { name: 'Semantic Colors', key: 'semanticcolors', description: 'Theme-aware semantic color tokens from Figma Islands', status: 'ready', preview: null },
    { name: 'Icons', key: 'icons', description: 'All available icons grouped by category with search', status: 'ready', preview: null },
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

// Function to get components grouped by section (for sidebar grouping)
export const getComponentsBySection = () => {
    const sectionOrder = homeSections.map(s => s.key);
    const grouped = {};
    componentsConfig
        .filter(item => item.category === 'components' && item.status !== 'coming-soon')
        .forEach(item => {
            if (!grouped[item.section]) grouped[item.section] = [];
            grouped[item.section].push(item);
        });

    return sectionOrder
        .filter(key => grouped[key])
        .map(key => {
            const section = homeSections.find(s => s.key === key);
            return {
                sectionKey: key,
                sectionName: section ? section.name : key,
                components: grouped[key].sort((a, b) => a.name.localeCompare(b.name)),
            };
        });
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
            { name: 'Colors', key: 'colors', description: 'Color scales and palettes' },
            { name: 'Semantic Colors', key: 'semanticcolors', description: 'Theme-aware semantic color tokens from Figma Islands' },
            { name: 'Icons', key: 'icons', description: 'All available icons grouped by category with search' }
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
