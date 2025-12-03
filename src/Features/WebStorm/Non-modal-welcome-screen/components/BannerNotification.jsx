import { useState } from 'react';
import Icon from '../../../../ui/components/icon/Icon';
import './BannerNotification.css';

function BannerNotification() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="banner-notification" data-name="banner">
            <div className="banner-close" data-name="general / close" onClick={() => setIsVisible(false)}>
                <Icon name="CloseSmallLight" size={16} />
            </div>
            <div className="banner-content" data-name="Text and button">
                <div className="banner-text" data-name="text">
                    <h3 className="banner-title" data-name="Title">
                        WebStorm 2026.1 is released
                    </h3>
                    <p className="banner-message" data-name="Message">
                        Try new commands and other language features in the new IDE Feature Trainer lesson
                    </p>
                </div>
                <div className="banner-button-container" data-name="Button">
                    <button className="banner-button" data-name="Content">
                        <span className="banner-button-text" data-name="Button">
                            Try Now…
                        </span>
                    </button>
                </div>
            </div>
            <div className="banner-icon" data-name="IDE icon">
                <Icon name="IntelliJPlatformLogo" size={74} />
            </div>
        </div>
    );
}

export default BannerNotification;

