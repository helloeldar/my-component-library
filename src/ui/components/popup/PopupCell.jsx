import './PopupCell.css';
import '../../styles/Typography.css';

function PopupCell(props) {
    let classes = ['popup-cell'];

    if (props.type === 'header') {
        classes.push('popup-cell-header');
    } else if (props.type === 'separator') {
        classes.push('popup-cell-separator');
    } else if (props.type === 'footer') {
        classes.push('popup-cell-footer');
    } else if (props.type === 'search') {
        classes.push('popup-cell-search');
    } else if (props.type === 'multiline') {
        classes.push('popup-cell-multiline');
    } else {
        classes.push('popup-cell-line');
    }

    if (props.selected) {
        classes.push('popup-cell-selected');
    }

    const renderContent = () => {
        if (props.type === 'header') {
            return (
                <div className="popup-cell-content">
                    <div className="popup-cell-header-text text-ui-default-semibold">
                        {props.children}
                    </div>
                </div>
            );
        }

        if (props.type === 'separator') {
            return <div className="popup-cell-separator-line" />;
        }

        if (props.type === 'search') {
            return (
                <div className="popup-cell-content">
                    <input 
                        type="text" 
                        className="popup-cell-search-input text-ui-default"
                        placeholder={props.placeholder || "Search..."}
                        value={props.value || ""}
                        onChange={props.onChange}
                    />
                </div>
            );
        }

        if (props.type === 'multiline') {
            return (
                <div className="popup-cell-content">
                    {props.icon && (
                        <div className="popup-cell-icon">
                            {props.icon}
                        </div>
                    )}
                    <div className="popup-cell-text-content">
                        <div className="popup-cell-primary-text text-ui-default">
                            {props.children}
                        </div>
                        {props.hint && (
                            <div className="popup-cell-hint-text text-ui-small">
                                {props.hint}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // Default line type
        return (
            <div className="popup-cell-content">
                {props.icon && (
                    <div className="popup-cell-icon">
                        {props.icon}
                    </div>
                )}
                <div className="popup-cell-text text-ui-default">
                    {props.children}
                </div>
            </div>
        );
    };

    return (
        <div className={classes.join(' ')} onClick={props.onClick}>
            {renderContent()}
        </div>
    );
}

export default PopupCell;