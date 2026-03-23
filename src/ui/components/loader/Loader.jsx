import React from 'react';
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
        <svg
            className={`loader-spinner ${className}`}
            width={resolvedSize}
            height={resolvedSize}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Loading"
            role="status"
            {...props}
        >
            <rect opacity="0.93" x="2.34961" y="3.76416" width="2" height="4" rx="1" transform="rotate(-45 2.34961 3.76416)" fill="currentColor"/>
            <rect opacity="0.78" x="1" y="7" width="4" height="2" rx="1" fill="currentColor"/>
            <rect opacity="0.69" x="5.17871" y="9.40991" width="2" height="4" rx="1" transform="rotate(45 5.17871 9.40991)" fill="currentColor"/>
            <rect opacity="0.62" x="7" y="11" width="2" height="4" rx="1" fill="currentColor"/>
            <rect opacity="0.48" x="9.41003" y="10.8242" width="2" height="4" rx="1" transform="rotate(-45 9.41003 10.8242)" fill="currentColor"/>
            <rect opacity="0.38" x="11" y="7" width="4" height="2" rx="1" fill="currentColor"/>
            <rect opacity="0.3" x="12.2384" y="2.35001" width="2" height="4" rx="1" transform="rotate(45 12.2384 2.35001)" fill="currentColor"/>
            <rect x="7" y="1" width="2" height="4" rx="1" fill="currentColor"/>
        </svg>
    );
}

export default Loader;
