import Icon from '../icon/Icon';
import './Tab.css';

function Tab(props) {
    let classes = ['tab'];

    if (props.active) {
        classes.push('tab-active')
    }

    if (props.size === 'small') {
        classes.push('tab-small');
        classes.push('text-ui-small');
    } else {
        classes.push('tab-default');
        classes.push('text-ui-default');
    }

    const renderIcon = () => {
        if (!props.icon) return null;
        // If icon is a string, treat it as an icon name from the registry
        if (typeof props.icon === 'string') {
            return <Icon name={props.icon} size={16} className="tab-icon" />;
        }
        // Otherwise render it directly (React element)
        return <span className="tab-icon">{props.icon}</span>;
    };

    return (
        <button className={classes.join(' ')} onClick={props.onClick}>
            {renderIcon()}
            <span className="tab-label">{props.label}</span>
            {props.closable && (
                <span className="tab-close" onClick={props.onClose}>
          ×
        </span>
            )}
        </button>
    );
}

export default Tab;
