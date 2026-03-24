import Icon from '../icon/Icon';
import './PopupCell.css';

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
    } else if (props.type === 'advanced') {
        classes.push('popup-cell-advanced');
    } else {
        classes.push('popup-cell-line');
    }

    if (props.selected) {
        classes.push('popup-cell-selected');
    }

    const renderIcon = () => {
        if (!props.icon && !props.iconGap) return null;
        
        // Render icon gap even if no icon (for alignment)
        if (!props.icon && props.iconGap) {
            return <div className="popup-cell-icon-gap" />;
        }
        
        // If icon is a string, treat it as an icon name from the registry
        if (typeof props.icon === 'string') {
            return (
                <div className="popup-cell-icon">
                    <Icon name={props.icon} size={16} />
                </div>
            );
        }
        // Otherwise render it directly (React element)
        return <div className="popup-cell-icon">{props.icon}</div>;
    };

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
            return (
                <>
                    {props.text && (
                        <div className="popup-cell-separator-text text-ui-small-semibold">
                            {props.text}
                        </div>
                    )}
                    <div className="popup-cell-separator-line" />
                </>
            );
        }

        if (props.type === 'search') {
            return (
                <div className="popup-cell-content popup-cell-search-content">
                    <Icon name="general/search" size={16} className="popup-cell-search-icon" />
                    <input 
                        type="text" 
                        className="popup-cell-search-input text-ui-default"
                        placeholder={props.placeholder || "Search"}
                        value={props.value || ""}
                        onChange={props.onChange}
                    />
                </div>
            );
        }

        if (props.type === 'multiline') {
            return (
                <div className="popup-cell-content">
                    {renderIcon()}
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

        // Advanced cell — Search Everywhere style: left (icon + name + path) | right (module + icon OR shortcut)
        // Selection background is handled via ::before on the outer .popup-cell-advanced element
        // so it uses inset: 0 8px from the outer cell edges (not the padded content area).
        if (props.type === 'advanced') {
            return (
                <div className="popup-cell-adv-content">
                    <div className="popup-cell-adv-left">
                        {renderIcon()}
                        <span className="popup-cell-adv-name text-ui-default">{props.children}</span>
                        {props.hint && (
                            <span className="popup-cell-adv-path text-ui-default">{props.hint}</span>
                        )}
                    </div>
                    <div className="popup-cell-adv-right">
                        {props.shortcut ? (
                            <span className="popup-cell-adv-shortcut text-ui-default">{props.shortcut}</span>
                        ) : (
                            <>
                                {props.module && (
                                    <span className="popup-cell-adv-module text-ui-default">{props.module}</span>
                                )}
                                {props.moduleIcon && (
                                    <Icon name={props.moduleIcon} size={16} />
                                )}
                            </>
                        )}
                    </div>
                </div>
            );
        }

        // Default line type
        return (
            <div className="popup-cell-content">
                <div className="popup-cell-left-content">
                    {renderIcon()}
                    <div className="popup-cell-text-wrapper">
                        {props.mnemonicGap && (
                            <div className="popup-cell-mnemonic-gap">
                                {props.mnemonic && (
                                    <span className="popup-cell-mnemonic text-ui-default">
                                        {props.mnemonic}
                                    </span>
                                )}
                            </div>
                        )}
                        <div className="popup-cell-text text-ui-default">
                            {props.children}
                        </div>
                        {props.hint && (
                            <div className="popup-cell-inline-hint text-ui-default">
                                {props.hint}
                            </div>
                        )}
                    </div>
                </div>
                {props.shortcut && (
                    <div className="popup-cell-shortcut text-ui-default">
                        {props.shortcut}
                    </div>
                )}
                {props.submenu && (
                    <div className="popup-cell-submenu-icon">
                        <Icon name="general/chevronRight" size={16} />
                    </div>
                )}
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