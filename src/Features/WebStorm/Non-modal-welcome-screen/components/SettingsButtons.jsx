import SettingsButton from './SettingsButton';
import './SettingsButtons.css';

// Simple icon components
const ThemeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2C8 2 6 4 6 8C6 12 8 14 8 14C10 14 12 12 12 8C12 4 10 2 8 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
);
const ScaleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 3V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const KeymapIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M5 7H11M7 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const PluginsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M6 6H10M6 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const HelpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 5V6M8 10V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="8" r="0.5" fill="currentColor"/>
    </svg>
);

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

