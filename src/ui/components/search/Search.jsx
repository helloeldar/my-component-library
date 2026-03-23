import { useState, useRef } from 'react';
import Icon from '../icon/Icon';
import './Search.css';

/**
 * Search component following IntelliJ UI Guidelines
 * https://plugins.jetbrains.com/docs/intellij/search-field.html
 * 
 * @param {Object} props
 * @param {string} props.value - Controlled input value
 * @param {function} props.onChange - Callback when value changes
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.invalid - Whether the search has an invalid/error state
 * @param {boolean} props.showClose - Whether to show the close/clear button
 * @param {function} props.onClear - Callback when clear button is clicked
 * @param {function} props.onFocus - Callback when input is focused
 * @param {function} props.onBlur - Callback when input loses focus
 * @param {string} props.className - Additional CSS classes
 */
function Search({ 
    value = '',
    onChange,
    placeholder = 'Search...',
    invalid = false,
    showClose = true,
    onClear,
    onFocus,
    onBlur,
    className = '',
    ...rest
}) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const handleChange = (e) => {
        onChange?.(e.target.value);
    };

    const handleClear = () => {
        onChange?.('');
        onClear?.();
        inputRef.current?.focus();
    };

    const contentClasses = [
        'search-content',
        isFocused ? 'focused' : '',
        invalid ? 'invalid' : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={`search ${className}`.trim()}>
            <div className={contentClasses}>
                {/* Search Icon */}
                <div className="search-icon">
                    <Icon name="general/search" size={16} />
                </div>

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    className="search-input text-ui-default"
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    {...rest}
                />

                {/* Actions */}
                <div className="search-actions">
                    {showClose && (
                        <button
                            type="button"
                            className={`search-close ${!value ? 'hidden' : ''}`}
                            onClick={handleClear}
                            tabIndex={-1}
                        >
                            <Icon name="general/closeSmall" size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;

