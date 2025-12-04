import SettingsButton from './SettingsButton';
import { HelpIcon as HelpIconSVG, KeyboardIcon, PluginUpdateIcon } from '../../../../icons';
import Icon from '../../../../ui/components/icon/Icon';
import './SettingsButtons.css';

// Simple icon components
const ThemeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2C8 2 6 4 6 8C6 12 8 14 8 14C10 14 12 12 12 8C12 4 10 2 8 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
);
const ScaleIcon = () => <Icon name="FontLight" size={16} />;
const KeymapIcon = () => <KeyboardIcon style={{ width: '16px', height: '16px', color: 'currentColor' }} />;
const PluginsIcon = () => <PluginUpdateIcon style={{ width: '16px', height: '16px', color: 'currentColor' }} />;
const HelpIcon = () => <HelpIconSVG style={{ width: '16px', height: '16px', color: 'currentColor' }} />;

function SettingsButtons() {
    const settings = [
        {
            label: 'Theme: Dark',
            icon: <ThemeIcon />,
            hasDropdown: true
        },
        {
            label: 'Scale: Default',
            icon: <ScaleIcon />,
            hasDropdown: true
        },
        {
            label: 'Keymap: VS Code (macOS)',
            icon: <KeymapIcon />,
            hasDropdown: true
        },
        {
            label: 'Explore plugins',
            icon: <PluginsIcon />
        },
        {
            label: 'Help',
            icon: <HelpIcon />
        }
    ];

    return (
        <div className="settings-buttons" data-name="Settings">
            {settings.map((setting, index) => (
                <SettingsButton
                    key={index}
                    label={setting.label}
                    icon={setting.icon}
                    hasDropdown={setting.hasDropdown}
                />
            ))}
        </div>
    );
}

export default SettingsButtons;

