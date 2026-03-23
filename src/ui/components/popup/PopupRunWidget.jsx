import Popup from './Popup';
import PopupCell from './PopupCell';
import PopupLineWithActions from './PopupLineWithActions';
import './PopupRunWidget.css';

const RECENT_CONFIGURATIONS = [
    { name: 'AccurateMath app', icon: 'runConfigurations/application' },
    { name: 'Server', icon: 'runConfigurations/application' },
    { name: 'App tests', icon: 'runConfigurations/junit' },
    { name: 'Server tests', icon: 'runConfigurations/junit' },
];

const CONFIG_ACTIONS = [
    { icon: 'run/run', tooltip: 'Run' },
    { icon: 'run/debug', tooltip: 'Debug' },
    { icon: 'general/moreVertical', tooltip: 'More' },
];

function PopupRunWidget({ style, className = '', activeConfig, onSelect }) {
    return (
        <Popup
            visible={true}
            className={`popup-run-widget ${className}`}
            style={{ position: 'static', width: '292px', ...style }}
        >
            <div className="popup-run-widget-spacer" />

            <div className="popup-run-widget-section-header">
                <span className="text-ui-small-semibold">Recent Configurations</span>
            </div>

            {RECENT_CONFIGURATIONS.map((config) => (
                <PopupLineWithActions
                    key={config.name}
                    icon={config.icon}
                    text={config.name}
                    selected={activeConfig === config.name}
                    actions={CONFIG_ACTIONS}
                    onClick={() => onSelect?.({ name: config.name, icon: config.icon })}
                />
            ))}

            <PopupCell type="separator" />

            <PopupCell
                type="line"
                icon="general/chevronRight"
                hint="25"
            >
                All Configurations
            </PopupCell>

            <PopupCell type="line" iconGap>
                Current File
            </PopupCell>

            <PopupCell type="separator" />

            <PopupCell type="line" iconGap shortcut="⌃⌥E">
                Edit Configurations...
            </PopupCell>

            <div className="popup-run-widget-spacer" />
        </Popup>
    );
}

export default PopupRunWidget;
