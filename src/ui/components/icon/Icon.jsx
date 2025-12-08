import iconRegistry from '../../../icons';

const normalizeName = (name) =>
    name
        ?.replace(/^\.\//, '')
        .replace(/\.svg$/, '')
        .replace(/\\/g, '/');

function Icon({ name, size = 16, className, ...props }) {
    const normalizedName = normalizeName(name);
    const iconEntry = normalizedName ? iconRegistry[normalizedName] : null;

    if (!iconEntry) {
        // eslint-disable-next-line no-console
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    if (typeof iconEntry === 'string') {
        return (
            <img
                src={iconEntry}
                width={size}
                height={size}
                className={`icon ${className || ''}`}
                alt={normalizedName}
                {...props}
            />
        );
    }

    const IconComponent = iconEntry;

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
