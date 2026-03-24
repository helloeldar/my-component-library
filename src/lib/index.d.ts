import { FC, ReactNode, HTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes, CSSProperties } from 'react';

// Theme Provider
export interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps>;
export function useTheme(): ThemeContextValue;

// Badge
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  text?: string;
  color?: 'blue-secondary' | 'blue' | 'green-secondary' | 'green' | 'purple-secondary' | 'gray-secondary' | 'disabled';
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
  className?: string;
}

export const Badge: FC<BadgeProps>;
export const BadgeNew: FC<Omit<BadgeProps, 'text' | 'color'>>;
export const BadgeBeta: FC<Omit<BadgeProps, 'text' | 'color'>>;
export const BadgeFree: FC<Omit<BadgeProps, 'text' | 'color'>>;
export const BadgeTrial: FC<Omit<BadgeProps, 'text' | 'color'>>;

// Banner
export interface BannerAction {
  label: string;
  onClick?: () => void;
  href?: string;
  type?: string;
}

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'error' | 'warning' | 'success';
  children?: ReactNode;
  showIcon?: boolean;
  actions?: BannerAction[];
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Banner: FC<BannerProps>;

// Button
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'primary' | 'secondary';
  size?: 'default' | 'slim';
  disabled?: boolean;
  children?: ReactNode;
}

export const Button: FC<ButtonProps>;

// Checkbox
export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  label?: string;
  hint?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: FC<CheckboxProps>;

// Dropdown
export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options?: DropdownOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  layout?: 'vertical' | 'horizontal';
  labelWidth?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Dropdown: FC<DropdownProps>;
export const Combobox: FC<DropdownProps>;

// EmptyState
export interface EmptyStateProps {
  explanation: string;
  actionText?: string;
  actionShortcut?: string;
  onAction?: () => void;
  helpText?: string;
  helpHref?: string;
  className?: string;
}

export const EmptyState: FC<EmptyStateProps>;

// Icon
export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  forceTheme?: 'light' | 'dark';
}

export const Icon: FC<IconProps>;

// IconButton
export interface IconButtonProps {
  icon: string;
  size?: number;
  type?: 'action' | 'toggle';
  variant?: 'default' | 'mainToolbar';
  isActive?: boolean;
  disabled?: boolean;
  tooltip?: string;
  onClick?: () => void;
  className?: string;
}

export const IconButton: FC<IconButtonProps>;

// Input
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'default' | 'small';
  error?: boolean;
  invalid?: boolean;
  label?: string;
  layout?: 'vertical' | 'horizontal';
  labelWidth?: string;
}

export const Input: FC<InputProps>;

// Link
export interface LinkProps {
  children?: ReactNode;
  type?: 'default' | 'dropdown' | 'external';
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const Link: FC<LinkProps>;

// Loader
export interface LoaderProps {
  size?: number | 'small' | 'large';
  className?: string;
}

export const Loader: FC<LoaderProps>;

// Popup
export interface PopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
}

export const Popup: FC<PopupProps>;

export interface PopupCellProps {
  icon?: string;
  label: string;
  type?: 'default' | 'advanced' | 'footer';
  shortcut?: string;
  module?: string;
  moduleIcon?: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const PopupCell: FC<PopupCellProps>;

// PopupProjects
export interface PopupProjectsProps {
  className?: string;
  style?: CSSProperties;
}

export const PopupProjects: FC<PopupProjectsProps>;

// PopupBranches
export interface PopupBranchesProps {
  style?: CSSProperties;
}

export const PopupBranches: FC<PopupBranchesProps>;

// PopupLineWithActions
export interface PopupLineWithActionsAction {
  icon: string;
  tooltip?: string;
  onClick?: () => void;
}

export interface PopupLineWithActionsProps {
  icon?: string;
  text: string;
  selected?: boolean;
  actions?: PopupLineWithActionsAction[];
  onClick?: () => void;
  className?: string;
}

export const PopupLineWithActions: FC<PopupLineWithActionsProps>;

// PopupRunWidget
export interface PopupRunWidgetProps {
  style?: CSSProperties;
  className?: string;
}

export const PopupRunWidget: FC<PopupRunWidgetProps>;

// PopupFindInFiles
export interface PopupFindInFilesResult {
  icon?: string;
  name: string;
  line: string;
  snippet: string;
}

export interface PopupFindInFilesProps {
  title?: string;
  matchSummary?: string;
  replaceField?: boolean;
  results?: PopupFindInFilesResult[];
  className?: string;
  style?: CSSProperties;
}

export const PopupFindInFiles: FC<PopupFindInFilesProps>;

// ProgressBar
export interface ProgressBarProps {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  label?: string;
  showStopButton?: boolean;
  onStop?: () => void;
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps>;

// Radio
export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  label?: string;
  hint?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Radio: FC<RadioProps>;

export interface RadioGroupOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options?: RadioGroupOption[];
  value?: string;
  name?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup: FC<RadioGroupProps>;

// Search
export interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  showClose?: boolean;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: string;
  alwaysFocused?: boolean;
  className?: string;
}

export const Search: FC<SearchProps>;

// SegmentedControl
export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options?: SegmentedControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  focused?: boolean;
  className?: string;
}

export const SegmentedControl: FC<SegmentedControlProps>;

// Table
export interface TableColumn {
  key: string;
  title?: ReactNode;
  width?: string | number;
  icon?: string | (() => ReactNode);
  render?: (value: any, row: any, rowIndex: number) => ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  showToolbar?: boolean;
  toolbarActions?: any[];
  onAdd?: () => void;
  onRemove?: () => void;
  disableRemove?: boolean;
  editable?: boolean;
  onCellChange?: (rowIndex: number, columnKey: string, value: any) => void;
  striped?: boolean;
  selectedRowIndex?: number | null;
  onRowClick?: (row: any, rowIndex: number) => void;
  className?: string;
}

export const Table: FC<TableProps>;

// Toggle
export interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Toggle: FC<ToggleProps>;

// Alert
export interface AlertButton {
  children?: ReactNode;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  body?: ReactNode;
  type?: 'question' | 'error' | 'warning';
  buttons?: (string | AlertButton)[];
  showCheckbox?: boolean;
  checkboxLabel?: string;
  checkboxChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  onButtonClick?: (button: string | AlertButton, index: number) => void;
  className?: string;
}

export const Alert: FC<AlertProps>;

// Dialog
export interface DialogButtonConfig {
  children?: ReactNode;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  width?: number | string;
  height?: number | string;
  showMacOSButtons?: boolean;
  showHelp?: boolean;
  onHelpClick?: () => void;
  buttons?: DialogButtonConfig[];
  leftContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Dialog: FC<DialogProps>;

export interface DialogHeaderProps {
  title?: string;
  showMacOSButtons?: boolean;
  className?: string;
}

export const DialogHeader: FC<DialogHeaderProps>;

export interface DialogFooterProps {
  showHelp?: boolean;
  onHelpClick?: () => void;
  buttons?: DialogButtonConfig[];
  leftContent?: ReactNode;
  className?: string;
}

export const DialogFooter: FC<DialogFooterProps>;

export interface DialogGroupHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
}

export const DialogGroupHeader: FC<DialogGroupHeaderProps>;

// WelcomeDialog
export interface WelcomeDialogProject {
  id: string;
  name: string;
  path: string;
  initials?: string;
  gradient?: [string, string];
}

export interface WelcomeDialogProps {
  ideTitle?: string;
  ideVersion?: string;
  ideIconUrl?: string;
  projects?: WelcomeDialogProject[];
  activeNav?: string;
  onNavChange?: (id: string) => void;
  selectedProjectId?: string;
  onProjectSelect?: (id: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onNewProject?: () => void;
  onOpen?: () => void;
  onGetFromVCS?: () => void;
  onSettings?: () => void;
  onNotifications?: () => void;
  className?: string;
}

export const WelcomeDialog: FC<WelcomeDialogProps>;

// Tooltip
export interface TooltipProps {
  children: ReactNode;
  text?: string;
  shortcut?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  alwaysVisible?: boolean;
  className?: string;
}

export const Tooltip: FC<TooltipProps>;

// TooltipEditor
export interface TooltipEditorProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'error' | 'warning' | 'success';
  arrow?: 'up' | 'down' | 'left' | 'right';
  header?: string;
  text?: string;
  hint?: string;
  menu?: boolean;
  className?: string;
}

export const TooltipEditor: FC<TooltipEditorProps>;

// TooltipHelp
export interface TooltipHelpLink {
  text: string;
  href?: string;
  external?: boolean;
}

export interface TooltipHelpProps extends HTMLAttributes<HTMLDivElement> {
  header?: string;
  body?: ReactNode;
  shortcut?: string;
  link?: TooltipHelpLink;
  className?: string;
}

export const TooltipHelp: FC<TooltipHelpProps>;

// ValidationTooltip
export interface ValidationTooltipAction {
  label: string;
  onClick?: () => void;
}

export interface ValidationTooltipProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  type?: 'error' | 'warning';
  actions?: ValidationTooltipAction[];
  className?: string;
}

export const ValidationTooltip: FC<ValidationTooltipProps>;

// GotItTooltip
export interface GotItTooltipProps extends HTMLAttributes<HTMLDivElement> {
  header?: string;
  children?: ReactNode;
  step?: string;
  link?: string;
  linkHref?: string;
  buttonText?: string;
  skipText?: string;
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right';
  onGotIt?: () => void;
  onSkip?: () => void;
  className?: string;
}

export const GotItTooltip: FC<GotItTooltipProps>;

// Notification
export interface NotificationAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'error' | 'warning' | 'success';
  title?: string;
  children?: ReactNode;
  button?: { label: string; onClick?: () => void };
  actions?: NotificationAction[];
  timestamp?: string;
  onClose?: () => void;
  onMore?: () => void;
  forceHoverButtons?: boolean;
  className?: string;
}

export const Notification: FC<NotificationProps>;

// Editor
export interface EditorProps extends HTMLAttributes<HTMLDivElement> {
  code?: string;
  language?: string;
  showLineNumbers?: boolean;
  readOnly?: boolean;
  breakpoints?: number[];
  onBreakpointToggle?: (line: number) => void;
  onExitReaderMode?: () => void;
  gutterActions?: any[];
  className?: string;
}

export const Editor: FC<EditorProps>;

// Layout Components
export const IDEWindow: FC<{ children?: ReactNode; className?: string }>;
export const MainWindow: FC<{ children?: ReactNode; className?: string }>;

// Navigation Components
export const Tab: FC<{ label: string; icon?: string | ReactNode; active?: boolean; focused?: boolean; disabled?: boolean; closable?: boolean; onClick?: () => void; onClose?: () => void }>;
export const TabBar: FC<{ tabs?: Array<{ label: string; icon?: string; closable?: boolean }>; activeTab?: number; onTabChange?: (index: number) => void; onTabClose?: (index: number) => void; focused?: boolean; direction?: 'horizontal' | 'vertical'; wrap?: boolean; actions?: string[]; onActionClick?: (action: string) => void; className?: string }>;
export const StripeIconButton: FC<{ icon: string; label?: string; active?: boolean; inactive?: boolean; badge?: boolean; position?: 'left' | 'right'; onClick?: () => void }>;
export const StripeContainer: FC<{ children?: ReactNode; position?: 'left' | 'right' }>;

// Toolbar Components (regular — 26px, for tool-window toolbars)
export const ToolbarButton: FC<{ text?: string; icon?: string | ReactNode; showChevron?: boolean; disabled?: boolean; onClick?: () => void; className?: string }>;
export const ToolbarSeparator: FC<{ orientation?: 'vertical' | 'horizontal'; className?: string }>;
export const ToolbarDropdown: FC<{ text?: string; label?: string; icon?: string; theme?: 'dark' | 'light' | 'light-header'; disabled?: boolean; onClick?: () => void; className?: string }>;

// Main Toolbar Components (40px, for the main application toolbar)
export const MainToolbarIconButton: FC<Omit<IconButtonProps, 'variant'>>;
export const MainToolbarDropdown: FC<{ text?: string; label?: string; icon?: string | ReactNode; disabled?: boolean; onClick?: () => void; className?: string }>;
export const MainToolbarVerticalSeparator: FC<{}>;
export const ProjectWidget: FC<{ projectName: string; projectIcon?: string; disabled?: boolean; onClick?: () => void }>;

// RunWidget
export interface RunWidgetProps {
  state?: 'default' | 'running' | 'debugging';
  runConfig?: string;
  configIcon?: string;
  onRun?: () => void;
  onDebug?: () => void;
  onStop?: () => void;
  onRerun?: () => void;
  onRestartDebug?: () => void;
  onMore?: () => void;
  onDropdownClick?: () => void;
  className?: string;
}

export const RunWidget: FC<RunWidgetProps>;

// Status Bar Components
export const StatusBar: FC<{ children?: ReactNode; className?: string }>;
export const StatusBarBreadcrumb: FC<{ items?: any[]; className?: string }>;
export const StatusBarProgress: FC<{ label?: string; value?: number; indeterminate?: boolean }>;
export const StatusBarWidget: FC<{ icon?: string; label?: string; onClick?: () => void }>;

// Tool Window Components
export const ToolWindow: FC<{ title?: string; icon?: string; children?: ReactNode; tabs?: any[]; activeTab?: string; onTabChange?: (id: string) => void; showSeparator?: boolean; onClose?: () => void; toolbarExtra?: ReactNode }>;
export const ToolWindowHeader: FC<{ title?: string; icon?: string; actions?: ReactNode; showSeparator?: boolean; onClose?: () => void; toolbarExtra?: ReactNode }>;
export const TerminalWindow: FC<{ title?: string; width?: number | string; height?: number | string; tabs?: any[]; activeTab?: number; onTabChange?: (index: number) => void; actions?: string[]; lines?: any[]; className?: string; toolbarExtra?: ReactNode }>;
export const ProjectWindow: FC<{ title?: string; width?: number | string; height?: number | string; treeData?: any[]; actions?: string[]; onNodeSelect?: (id: string) => void; onNodeToggle?: (id: string) => void; className?: string; toolbarExtra?: ReactNode }>;
export const AIAssistantWindow: FC<{ title?: string; width?: number | string; height?: number | string; messages?: any[]; placeholder?: string; empty?: boolean; actions?: string[]; className?: string; toolbarExtra?: ReactNode }>;

// ProblemsWindow
export interface ProblemsWindowProps {
  title?: string;
  width?: number | string;
  height?: number | string;
  tabs?: any[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  onActionClick?: (action: string) => void;
  treeData?: any[];
  empty?: boolean;
  emptyText?: string;
  actions?: string[];
  focused?: boolean;
  className?: string;
}

export const ProblemsWindow: FC<ProblemsWindowProps>;

// CommitWindow
export interface CommitWindowProps {
  title?: string;
  width?: number | string;
  height?: number | string;
  files?: any[];
  commitMessage?: string;
  previousCommitMessage?: string;
  onCommit?: (message: string, amend: boolean, checkedFileIds: string[]) => void;
  onCommitAndPush?: (message: string, amend: boolean, checkedFileIds: string[]) => void;
  focused?: boolean;
  onFocus?: () => void;
  onActionClick?: (action: string) => void;
  className?: string;
}

export const CommitWindow: FC<CommitWindowProps>;

// Tree Components
export const Tree: FC<{ data?: any[]; selectedId?: string; onSelect?: (id: string) => void; onExpand?: (id: string, expanded: boolean) => void }>;
export const TreeNode: FC<{ node: any; level?: number; selectedId?: string; onSelect?: (id: string) => void; onExpand?: (id: string, expanded: boolean) => void; prefix?: ReactNode }>;

// Icon Registry
export const iconRegistry: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;
export const iconNames: string[];
export function getIcon(name: string): React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;
