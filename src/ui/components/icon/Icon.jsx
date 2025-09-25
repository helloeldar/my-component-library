import * as Icons from '../../../icons';

function Icon({ name, size = 16, className, ...props }) {
    const IconComponent = Icons[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return (
        <IconComponent
            width={size}
            height={size}
            className={`icon ${className || ''}`}
            {...props}
        />
    );
}

export default Icon;
