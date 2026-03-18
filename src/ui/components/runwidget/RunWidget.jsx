import Icon from '../icon/Icon';
import ToolbarDropdown from '../toolbardropdown/ToolbarDropdown';
import './RunWidget.css';

/**
 * RunWidgetButton — Internal action button for the Run Widget.
 * 34px wide × 40px tall with 16×16 stroke icons and optional accent background.
 * NOT exported — use RunWidget instead.
 */
function RunWidgetButton({
    icon,
    tooltip,
    shortcut,
    accent = null,
    disabled = false,
    onClick,
    className = '',
    ...props
}) {
    const classes = [
        'run-widget-button',
        accent === 'run' ? 'run-widget-button-accent-run' : '',
        accent === 'stop' ? 'run-widget-button-accent-stop' : '',
        className
    ].filter(Boolean).join(' ');

    const tooltipText = tooltip
        ? (shortcut ? `${tooltip} (${shortcut})` : tooltip)
        : undefined;

    return (
        <button
            className={classes}
            disabled={disabled}
            onClick={onClick}
            title={tooltipText}
            {...props}
        >
            <Icon name={icon} size={16} />
        </button>
    );
}

/**
 * RunWidget — Run/Debug control group for the main toolbar.
 * Matches Figma "Main Toolbar / Run Widget" component.
 *
 * Three states:
 * - default:   Dropdown | Run | Debug | More
 * - running:   Dropdown(+badge) | Rerun(green) | Debug | Stop(red) | More
 * - debugging: Dropdown(+badge) | Run | RestartDebug(green) | Stop(red) | More
 */
function RunWidget({
    state = 'default',
    runConfig = 'IDEA Community',
    configIcon = 'runConfigurations/application',
    onRun,
    onDebug,
    onStop,
    onRerun,
    onRestartDebug,
    onMore,
    onDropdownClick,
    className = '',
    ...props
}) {
    const isRunning = state === 'running';
    const isDebugging = state === 'debugging';
    const showBadge = isRunning || isDebugging;

    return (
        <div className={`run-widget ${className}`} {...props}>
            {/* Run Configuration Dropdown */}
            <div className="run-widget-dropdown">
                <ToolbarDropdown
                    icon={configIcon}
                    text={runConfig}
                    onClick={onDropdownClick}
                />
                {showBadge && <div className="run-widget-badge" />}
            </div>

            {/* Run / Rerun button */}
            {isRunning ? (
                <RunWidgetButton
                    icon="run/rerun_stroke"
                    tooltip="Rerun"
                    accent="run"
                    onClick={onRerun}
                />
            ) : (
                <RunWidgetButton
                    icon="run/run_stroke"
                    tooltip="Run"
                    shortcut="⌃R"
                    onClick={onRun}
                />
            )}

            {/* Debug / RestartDebug button */}
            {isDebugging ? (
                <RunWidgetButton
                    icon="run/restartDebug_stroke"
                    tooltip="Restart Debugger"
                    accent="run"
                    onClick={onRestartDebug}
                />
            ) : (
                <RunWidgetButton
                    icon="run/debug_stroke"
                    tooltip="Debug"
                    shortcut="⌃D"
                    onClick={onDebug}
                />
            )}

            {/* Stop button (Running/Debugging only) */}
            {(isRunning || isDebugging) && (
                <RunWidgetButton
                    icon="run/stop_stroke"
                    tooltip="Stop"
                    accent="stop"
                    onClick={onStop}
                />
            )}

            {/* More button (always visible) */}
            <RunWidgetButton
                icon="general/moreVertical_stroke"
                tooltip="More"
                onClick={onMore}
            />
        </div>
    );
}

export default RunWidget;
