import WelcomeHeader from './WelcomeHeader';
import ActionButtons from './ActionButtons';
import SettingsButtons from './SettingsButtons';
import RecentProjectsList from './RecentProjectsList';
import BannerNotification from './BannerNotification';
import './WelcomeScreenContent.css';

function WelcomeScreenContent() {
    return (
        <div className="welcome-screen" data-name="Welcome Screen">
            <WelcomeHeader />
            <div className="welcome-content-grid">
                <div className="welcome-content-left">
                    <ActionButtons />
                    <RecentProjectsList />
                </div>
                <div className="welcome-content-right">
                    <SettingsButtons />
                </div>
            </div>
            <BannerNotification />
        </div>
    );
}

export default WelcomeScreenContent;

