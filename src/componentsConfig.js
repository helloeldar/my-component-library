// Shared configuration for all components
export const componentsConfig = [
    { name: 'Buttons', key: 'buttons', description: 'Primary and secondary button variants', category: 'components' },
    { name: 'Code Example', key: 'codeexample', description: 'Code display with syntax highlighting and line numbers', category: 'components' },
    { name: 'Inputs', key: 'inputs', description: 'Text input fields with various states', category: 'components' },
    { name: 'Popup', key: 'popup', description: 'Contextual menus and dropdowns with various cell types', category: 'components' },
    { name: 'Stripe', key: 'stripe', description: 'Vertical toolbar buttons with container', category: 'components' },
    { name: 'Tabs', key: 'tabs', description: 'Horizontal and vertical tab navigation', category: 'components' },
    { name: 'Project Selector', key: 'projectselector', description: 'Dropdown for selecting active project with icon and name', category: 'widgets' },
    { name: 'Tool Window', key: 'toolwindow', description: 'Resizable panels with optional tabs', category: 'components' },
    { name: 'Tree', key: 'tree', description: 'Hierarchical file tree component', category: 'components' }
];

// Function to get components sorted alphabetically
export const getSortedComponents = () => {
    return [...componentsConfig].sort((a, b) => a.name.localeCompare(b.name));
};

// Function to get only components (category: 'components')
export const getSortedComponentsOnly = () => {
    return [...componentsConfig]
        .filter(item => item.category === 'components')
        .sort((a, b) => a.name.localeCompare(b.name));
};

// Function to get only widgets (category: 'widgets')
export const getSortedWidgets = () => {
    return [...componentsConfig]
        .filter(item => item.category === 'widgets')
        .sort((a, b) => a.name.localeCompare(b.name));
};

// Categories configuration
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
        name: 'Widgets',
        description: 'Complex widgets and panels',
        pages: getSortedWidgets()
    }
];