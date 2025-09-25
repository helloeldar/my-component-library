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
    return (
        <button className={classes.join(' ')} onClick={props.onClick}>
            {props.icon && <span className="tab-icon">{props.icon}</span>}
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
