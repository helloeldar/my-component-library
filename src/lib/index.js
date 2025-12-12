/**
 * JetBrains Int UI - React Component Library
 * A design system for building JetBrains-style interfaces
 */

// Theme Provider
export { ThemeProvider, useTheme } from '../ThemeContext';

// Core Components
export { default as Button } from '../ui/components/button/Button';
export { default as Checkbox } from '../ui/components/checkbox/Checkbox';
export { default as Combobox } from '../ui/components/combobox/Combobox';
export { default as Dropdown } from '../ui/components/dropdown/Dropdown';
export { default as Icon } from '../ui/components/icon/Icon';
export { default as IconButton } from '../ui/components/iconbutton/IconButton';
export { default as Input } from '../ui/components/input/Input';
export { default as Popup } from '../ui/components/popup/Popup';
export { default as PopupCell } from '../ui/components/popup/PopupCell';
export { default as ProgressBar } from '../ui/components/progressbar/ProgressBar';
export { default as Radio, RadioGroup } from '../ui/components/radio/Radio';
export { default as Toggle } from '../ui/components/toggle/Toggle';

// Layout Components
export { default as IDELayout } from '../ui/components/idelayout/IDELayout';
export { default as IDEWindow } from '../ui/components/idewindow/IDEWindow';
export { default as MainWindow } from '../ui/components/mainwindow/MainWindow';

// Navigation Components
export { default as Tab } from '../ui/components/tabs/Tab';
export { default as TabBar } from '../ui/components/tabs/TabBar';
export { default as Stripe } from '../ui/components/stripe/Stripe';
export { default as StripeContainer } from '../ui/components/stripe/StripeContainer';

// Toolbar Components
export { default as ToolbarDropdown } from '../ui/components/toolbardropdown/ToolbarDropdown';
export { default as ProjectSelector } from '../ui/components/projectselector/ProjectSelector';

// Status Bar Components
export { default as StatusBar } from '../ui/components/statusbar/StatusBar';
export { default as StatusBarBreadcrumb } from '../ui/components/statusbar/StatusBarBreadcrumb';
export { default as StatusBarProgress } from '../ui/components/statusbar/StatusBarProgress';
export { default as StatusBarWidget } from '../ui/components/statusbar/StatusBarWidget';

// Tool Window Components
export { default as ToolWindow } from '../ui/components/toolwindow/ToolWindow';
export { default as ToolWindowHeader } from '../ui/components/toolwindow/ToolWindowHeader';

// Tree Components
export { default as Tree } from '../ui/components/tree/Tree';
export { default as TreeNode } from '../ui/components/tree/TreeNode';

// Icon Registry
export { default as iconRegistry, iconNames, getIcon } from '../icons';
