import './Button.css';
import '../../styles/Typography.css';

function Button(props) {
    const { type, size, disabled, children, className, ...restProps } = props;
    
    let classes = ['button'];

    if (type === 'primary') {
        classes.push('button-primary');
    } else if (type === 'secondary') {
        classes.push('button-secondary');
    }

    if (size === 'slim') {
        classes.push('button-slim');
        classes.push('text-ui-small');
    } else {
        classes.push('button-default');
        classes.push('text-ui-default');
    }

    if (disabled) {
        classes.push('button-disabled');
    }
    
    if (className) {
        classes.push(className);
    }
    
    return (
        <button 
            className={classes.join(' ')} 
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    );
}

export default Button;
