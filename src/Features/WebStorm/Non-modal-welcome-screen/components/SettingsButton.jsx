import Icon from '../../../../ui/components/icon/Icon';
import { ChevronDownIcon } from '../../../../icons';
import './SettingsButton.css';

function SettingsButton({ label, icon, hasDropdown = false, onClick }) {
    return (
        <div 
            className="settings-button" 
            data-name="Toolbar / Button"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className="settings-button-content" data-name="Content">
                <div className="settings-button-left" data-name="Content">
                    <div className="settings-button-icon" data-name="Icon">
                        {icon}
                    </div>
                    <p className="settings-button-label" data-name="Text">
                        {label}
                    </p>
                </div>
                {hasDropdown && (
                    <div className="settings-button-dropdown" data-name="Dropdown">
                        <ChevronDownIcon style={{ width: '16px', height: '16px', color: 'currentColor' }} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SettingsButton;

