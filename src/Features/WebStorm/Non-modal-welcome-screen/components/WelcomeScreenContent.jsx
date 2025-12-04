import WelcomeHeader from './WelcomeHeader';
import ActionButtons from './ActionButtons';
import SettingsButtons from './SettingsButtons';
import RecentProjectsList from './RecentProjectsList';
import './WelcomeScreenContent.css';

function WelcomeScreenContent() {
    return (
        <div className="welcome-screen" data-name="Welcome Screen" data-node-id="180:22571">
            <WelcomeHeader />
            <div className="welcome-content-grid" data-node-id="180:22575">
                <div className="welcome-content-left" data-name="Buttons" data-node-id="180:22576">
                    <ActionButtons />
                    <SettingsButtons />
                </div>
                <div className="welcome-content-right" data-node-id="180:22581">
                    <RecentProjectsList />
                </div>
            </div>
            <div className="welcome-footer" data-node-id="180:22584">
                <button className="welcome-footer-button" data-name="Toolbar / Button" data-node-id="180:22585">
                    <div className="welcome-footer-button-content" data-name="Content">
                        <div className="welcome-footer-button-inner" data-name="Content">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 6L8 2L14 6" stroke="#CED0D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                                <path d="M2 10L8 14L14 10" stroke="#CED0D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg>
                            <p>Learn more about WebStorm</p>
                        </div>
                    </div>
                </button>
                <button className="welcome-footer-button" data-name="Toolbar / Button" data-node-id="180:22586">
                    <div className="welcome-footer-button-content" data-name="Content">
                        <div className="welcome-footer-button-inner" data-name="Content">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="12" height="12" rx="2" stroke="#CED0D6" strokeWidth="1.5" fill="none"/>
                                <path d="M6 6H10M6 10H10" stroke="#CED0D6" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <p>Essential Shortcuts</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default WelcomeScreenContent;

