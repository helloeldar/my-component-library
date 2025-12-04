import ActionButton from './ActionButton';
import Icon from '../../../../ui/components/icon/Icon';
import { VcsIcon, ExternalLinkIcon } from '../../../../icons';
import './ActionButtons.css';

// Simple icon components
const FolderIcon = () => <Icon name="FolderLight" size={16} />;
const AddIcon = () => <Icon name="AddLight" size={16} />;
const GitIcon = () => <VcsIcon style={{ width: '16px', height: '16px', color: 'currentColor' }} />;
const RemoteIcon = () => <ExternalLinkIcon style={{ width: '16px', height: '16px', color: 'currentColor' }} />;

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

