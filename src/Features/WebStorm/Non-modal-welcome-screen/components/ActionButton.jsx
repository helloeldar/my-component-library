import './ActionButton.css';

function ActionButton({ label, icon, onClick }) {
    return (
        <div 
            className="action-button" 
            data-name="Disclosure Item"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className="action-button-icon" data-name="Icon Left">
                {icon}
            </div>
            <div className="action-button-label" data-name="Text">
                <p>{label}</p>
            </div>
        </div>
    );
}

export default ActionButton;

