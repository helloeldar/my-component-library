import { useState } from 'react';
import './Checkbox.css';

function Checkbox({
    checked = false,
    indeterminate = false,
    disabled = false,
    invalid = false,
    label,
    hint,
    onChange,
    className = '',
    ...props
}) {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        if (!disabled && onChange) {
            onChange(e.target.checked);
        }
    };

    const getCheckboxClasses = () => {
        let classes = ['checkbox-box'];
        
        if (checked || indeterminate) {
            classes.push('checkbox-checked');
        }
        if (indeterminate) {
            classes.push('checkbox-indeterminate');
        }
        if (disabled) {
            classes.push('checkbox-disabled');
        }
        if (isFocused && !disabled) {
            classes.push('checkbox-focused');
        }
        if (invalid && !disabled) {
            classes.push('checkbox-invalid');
        }
        
        return classes.join(' ');
    };

    return (
        <label
            className={`checkbox-container ${disabled ? 'checkbox-container-disabled' : ''} ${className}`}
            {...props}
        >
            <div className="checkbox-wrapper">
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="checkbox-input"
                    ref={(el) => {
                        if (el) {
                            el.indeterminate = indeterminate;
                        }
                    }}
                />
                <div className={getCheckboxClasses()}>
                    {checked && !indeterminate && (
                        <svg className="checkbox-checkmark" viewBox="0 0 11 9" fill="none">
                            <path
                                d="M1 4.5L4 7.5L9.5 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                    {indeterminate && (
                        <div className="checkbox-indeterminate-mark" />
                    )}
                </div>
            </div>
            {(label || hint) && (
                <div className="checkbox-content">
                    {label && <span className="checkbox-label text-ui-default">{label}</span>}
                    {hint && <span className="checkbox-hint text-ui-small">{hint}</span>}
                </div>
            )}
        </label>
    );
}

export default Checkbox;


