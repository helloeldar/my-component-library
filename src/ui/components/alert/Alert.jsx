import React, { useState, useEffect } from 'react';
import './Alert.css';
import Button from '../button/Button';
import Checkbox from '../checkbox/Checkbox';
import Icon from '../icon/Icon';
import '../../styles/Typography.css';

function Alert({
    title,
    body,
    type = 'question', // 'question', 'error', 'warning'
    buttons = [],
    showCheckbox = false,
    checkboxLabel = "Don't ask again",
    checkboxChecked = false,
    onCheckboxChange,
    onButtonClick,
    className = '',
    ...props
}) {
    const [checkboxState, setCheckboxState] = useState(checkboxChecked);

    // Sync internal state with prop changes
    useEffect(() => {
        setCheckboxState(checkboxChecked);
    }, [checkboxChecked]);

    const handleCheckboxChange = (checked) => {
        setCheckboxState(checked);
        if (onCheckboxChange) {
            onCheckboxChange(checked);
        }
    };

    const handleButtonClick = (button, index) => {
        if (onButtonClick) {
            onButtonClick(button, index);
        } else if (button.onClick) {
            button.onClick();
        }
    };

    const getIconName = () => {
        switch (type) {
            case 'error':
                return 'general/errorDialog';
            case 'warning':
                return 'general/warningDialog';
            case 'question':
            default:
                return 'general/questionDialog';
        }
    };

    const classes = ['alert'];
    if (className) {
        classes.push(className);
    }

    return (
        <div 
            className={classes.join(' ')} 
            {...props}
        >
            <div className="alert-icon">
                <Icon name={getIconName()} size={28} />
            </div>
            
            <div className="alert-content">
                <div className={`alert-text ${!showCheckbox ? 'alert-text-no-checkbox' : ''}`}>
                    {title && (
                        <h2 className="alert-title text-ui-h2">{title}</h2>
                    )}
                    {body && (
                        <p className="alert-body text-ui-paragraph">{body}</p>
                    )}
                    {showCheckbox && (
                        <div className="alert-checkbox">
                            <Checkbox
                                label={checkboxLabel}
                                checked={checkboxState}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            
            {buttons.length > 0 && (
                <div className="alert-buttons">
                    {buttons.map((button, index) => {
                        const buttonProps = typeof button === 'string' 
                            ? { children: button, type: index === buttons.length - 1 ? 'primary' : 'secondary' }
                            : { ...button, type: button.type || (index === buttons.length - 1 ? 'primary' : 'secondary') };
                        
                        return (
                            <Button
                                key={index}
                                {...buttonProps}
                                onClick={() => handleButtonClick(button, index)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Alert;

