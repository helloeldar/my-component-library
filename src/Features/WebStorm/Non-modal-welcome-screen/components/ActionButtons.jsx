import ActionButton from './ActionButton';
import Icon from '../../../../ui/components/icon/Icon';
import './ActionButtons.css';

// Simple icon components
const FolderIcon = () => <Icon name="FolderLight" size={16} />;
const AddIcon = () => <Icon name="AddLight" size={16} />;
const GitIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 2V6M8 10V14M2 8H6M10 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const RemoteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M5 8H11M8 5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

function ActionButtons() {
    const actions = [
        {
            label: 'Open...',
            icon: <FolderIcon />
        },
        {
            label: 'New...',
            icon: <AddIcon />
        },
        {
            label: 'Clone...',
            icon: <GitIcon />
        },
        {
            label: 'Remote Development...',
            icon: <RemoteIcon />
        }
    ];

    return (
        <div className="action-buttons" data-name="Buttons">
            {actions.map((action, index) => (
                <ActionButton
                    key={index}
                    label={action.label}
                    icon={action.icon}
                />
            ))}
        </div>
    );
}

export default ActionButtons;

