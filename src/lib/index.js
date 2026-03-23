/**
 * JetBrains Int UI - React Component Library
 * A design system for building JetBrains-style interfaces
 */

// Theme Provider
export { ThemeProvider, useTheme } from '../ThemeContext';

// Core Components
export { default as Banner } from '../ui/components/banner/Banner';
export { default as Button } from '../ui/components/button/Button';
export { default as Checkbox } from '../ui/components/checkbox/Checkbox';
export { default as Combobox } from '../ui/components/combobox/Combobox';
export { default as Dropdown } from '../ui/components/dropdown/Dropdown';
export { default as EmptyState } from '../ui/components/emptystate/EmptyState';
export { default as Icon } from '../ui/components/icon/Icon';
export { default as IconButton, MainToolbarIconButton } from '../ui/components/iconbutton/IconButton';
export { default as Input } from '../ui/components/input/Input';
export { default as Link } from '../ui/components/link/Link';
export { default as Popup } from '../ui/components/popup/Popup';
export { default as PopupCell } from '../ui/components/popup/PopupCell';
export { default as PopupProjects } from '../ui/components/popup/PopupProjects';
export { default as PopupBranches } from '../ui/components/popup/PopupBranches';
export { default as PopupLineWithActions } from '../ui/components/popup/PopupLineWithActions';
export { default as PopupRunWidget } from '../ui/components/popup/PopupRunWidget';
export { default as ProgressBar } from '../ui/components/progressbar/ProgressBar';
export { default as Radio, RadioGroup } from '../ui/components/radio/Radio';
export { default as Toggle } from '../ui/components/toggle/Toggle';

// Dialog Components
export { default as Dialog } from '../ui/components/dialog/Dialog';
export { default as DialogHeader } from '../ui/components/dialog/DialogHeader';
export { default as DialogFooter } from '../ui/components/dialog/DialogFooter';
export { default as DialogGroupHeader } from '../ui/components/dialog/DialogGroupHeader';

// Tooltip
export { default as Tooltip } from '../ui/components/tooltip/Tooltip';

// Notification
export { default as Notification } from '../ui/components/notification/Notification';

// Editor Component
export { default as Editor } from '../ui/components/editor/Editor';

// Layout Components
export { default as MainWindow } from '../ui/components/mainwindow/MainWindow';
export { default as IDEWindow } from '../ui/components/idewindow/IDEWindow';

// Navigation Components
export { default as Tab } from '../ui/components/tabs/Tab';
export { default as TabBar } from '../ui/components/tabs/TabBar';
export { default as StripeIconButton } from '../ui/components/stripe/Stripe';
export { default as StripeContainer } from '../ui/components/stripe/StripeContainer';

// Toolbar Components
export { default as MainToolbarVerticalSeparator } from '../ui/components/maintoolbar/MainToolbarVerticalSeparator';
export { default as ToolbarSeparator } from '../ui/components/toolbar/ToolbarSeparator';
export { default as ToolbarDropdown } from '../ui/components/toolbardropdown/ToolbarDropdown';
export { default as ProjectWidget } from '../ui/components/projectwidget/ProjectWidget';
export { default as RunWidget } from '../ui/components/runwidget/RunWidget';

// Status Bar Components
export { default as StatusBar } from '../ui/components/statusbar/StatusBar';
export { default as StatusBarBreadcrumb } from '../ui/components/statusbar/StatusBarBreadcrumb';
export { default as StatusBarProgress } from '../ui/components/statusbar/StatusBarProgress';
export { default as StatusBarWidget } from '../ui/components/statusbar/StatusBarWidget';

// Tool Window Components
export { default as ToolWindow } from '../ui/components/toolwindow/ToolWindow';
export { default as ToolWindowHeader } from '../ui/components/toolwindow/ToolWindowHeader';
export { default as TerminalWindow } from '../ui/components/toolwindow/TerminalWindow';
export { default as ProjectWindow } from '../ui/components/toolwindow/ProjectWindow';
export { default as AIAssistantWindow } from '../ui/components/toolwindow/AIAssistantWindow';
export { default as ProblemsWindow } from '../ui/components/toolwindow/ProblemsWindow';

// Tree Components
export { default as Tree } from '../ui/components/tree/Tree';
export { default as TreeNode } from '../ui/components/tree/TreeNode';

// Icon Registry (static — no require.context)
export { default as iconRegistry, iconNames, getIcon } from './iconRegistry';
