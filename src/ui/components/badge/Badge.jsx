import './Badge.css';

const COLOR_VARIANTS = [
    'blue-secondary',
    'blue',
    'green-secondary',
    'green',
    'purple-secondary',
    'gray-secondary',
    'disabled',
];

function Badge(props) {
    const {
        text = 'Text',
        color = 'blue-secondary',
        disabled = false,
        onClick,
        title,
        className,
        ...restProps
    } = props;

    const isDisabled = disabled || color === 'disabled';
    const isClickable = !isDisabled && typeof onClick === 'function';

    const classes = ['badge'];

    const resolvedColor = isDisabled ? 'disabled' : (COLOR_VARIANTS.includes(color) ? color : 'blue-secondary');
    classes.push(`badge--${resolvedColor}`);

    if (isClickable) classes.push('badge--clickable');
    if (isDisabled) classes.push('badge--disabled');
    if (className) classes.push(className);

    return (
        <span
            className={classes.join(' ')}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            title={title}
            onClick={isDisabled ? undefined : onClick}
            onKeyDown={isClickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(e);
                }
            } : undefined}
            aria-disabled={isDisabled || undefined}
            {...restProps}
        >
            <span className="badge__bg" aria-hidden="true" />
            <span className="badge__text">{text}</span>
        </span>
    );
}

export function BadgeNew(props) {
    return <Badge text="New" color="blue" {...props} />;
}

export function BadgeBeta(props) {
    return <Badge text="Beta" color="purple-secondary" {...props} />;
}

export function BadgeFree(props) {
    return <Badge text="Free" color="green" {...props} />;
}

export function BadgeTrial(props) {
    return <Badge text="Trial" color="green-secondary" {...props} />;
}

export default Badge;
