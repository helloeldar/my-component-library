import StatusBarBreadcrumb from './StatusBarBreadcrumb';
import StatusBarWidget from './StatusBarWidget';
import ProgressBar from '../progressbar/ProgressBar';
import Icon from '../icon/Icon';
import './StatusBar.css';

function ChevronRight() {
    return (
        <div className="status-bar-chevron">
            <Icon name="general/chevronRight" size={16} forceTheme="dark" />
        </div>
    );
}

/**
 * StatusBar component - displays the IDE status bar with breadcrumbs, progress, and widgets
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.progress=false] - Whether to show the progress bar
 * @param {string} [props.progressLabel='Indexing...'] - Progress bar label
 * @param {number} [props.progressValue] - Progress value (0-100), undefined for indeterminate
 * @param {Function} [props.onProgressStop] - Callback when progress stop button is clicked
 * @param {Array} [props.breadcrumbs] - Array of breadcrumb items: { label, icon?, module?, onClick? }. Omit for defaults, pass [] for intentionally empty.
 * @param {Array} [props.widgets] - Array of widget items: { type, text?, iconName?, onClick? }. Omit for defaults, pass [] for intentionally empty.
 * @param {string} [props.className] - Additional CSS classes
 */
const DEFAULT_BREADCRUMBS = [
    { label: 'intellij', module: true },
    { label: 'accurate-math-core', module: true },
    { label: 'src' },
    { label: 'main' },
    { label: 'java' },
    { label: 'org' },
    { label: 'math' },
    { label: 'core' },
    { label: 'AccurateMath', icon: true, iconName: 'nodes/class' }
];

const DEFAULT_WIDGETS = [
    { type: 'text', text: '39:34' },
    { type: 'text', text: 'LF' },
    { type: 'text', text: 'UTF-8' },
    { type: 'icon', iconName: 'general/unlocked' }
];

function StatusBar({
    progress = false,
    progressLabel = 'Indexing...',
    progressValue,
    onProgressStop,
    breadcrumbs,
    widgets,
    className,
    ...props
}) {
    const breadcrumbItems = breadcrumbs != null ? breadcrumbs : DEFAULT_BREADCRUMBS;
    const widgetItems = widgets != null ? widgets : DEFAULT_WIDGETS;

    return (
        <div className={`status-bar ${className || ''}`} {...props}>
            {/* Top border */}
            <div className="status-bar-border" />
            
            {/* Breadcrumbs section */}
            <div className="status-bar-breadcrumbs">
                {breadcrumbItems.map((item, index) => (
                    <span key={index} style={{ display: 'contents' }}>
                        <StatusBarBreadcrumb
                            label={item.label}
                            icon={item.icon || false}
                            iconName={item.iconName}
                            module={item.module || false}
                            state={item.state || 'default'}
                            onClick={item.onClick}
                        />
                        {index < breadcrumbItems.length - 1 && <ChevronRight />}
                    </span>
                ))}
            </div>

            {/* Right section: Progress + Widgets */}
            <div className="status-bar-right">
                {/* Progress bar (optional) */}
                {progress && (
                    <div className="status-bar-progress-container">
                        <ProgressBar
                            label={progressLabel}
                            value={progressValue}
                            showStopButton={true}
                            onStop={onProgressStop}
                            indeterminate={progressValue === undefined || progressValue === null}
                        />
                    </div>
                )}

                {/* Widgets section */}
                <div className="status-bar-widgets">
                    {widgetItems.map((item, index) => (
                        <StatusBarWidget
                            key={index}
                            type={item.type || 'text'}
                            text={item.text}
                            iconName={item.iconName}
                            state={item.state || 'default'}
                            onClick={item.onClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StatusBar;
export { DEFAULT_BREADCRUMBS, DEFAULT_WIDGETS };
