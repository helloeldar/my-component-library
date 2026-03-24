import Icon from '../icon/Icon';
import './Loader.css';

/**
 * Loader (Spinner) component based on IntelliJ UI Guidelines
 *
 * Props:
 * - size: 16 | 32 | 'small' | 'large' — icon size in px (default: 16)
 * - className: Additional CSS class
 */
function Loader({ size = 16, className = '', ...props }) {
    const resolvedSize = size === 'small' ? 16 : size === 'large' ? 32 : Number(size);

    return (
        <Icon
            name="loader"
            size={resolvedSize}
            className={`loader-spinner ${className}`}
            aria-label="Loading"
            role="status"
            {...props}
        />
    );
}

export default Loader;
