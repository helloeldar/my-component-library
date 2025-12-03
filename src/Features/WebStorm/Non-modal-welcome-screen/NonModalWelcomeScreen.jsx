import MainToolbar from './components/MainToolbar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import WelcomeScreenContent from './components/WelcomeScreenContent';
import StatusBar from './components/StatusBar';
import './NonModalWelcomeScreen.css';

function NonModalWelcomeScreen() {
    return (
        <div className="non-modal-welcome-screen" data-name="NMWS">
            <div className="main-window" data-name="Main window">
                <MainToolbar />
                <div className="main-content-area" data-name="Content">
                    <LeftSidebar />
                    <div className="editor-area" data-name="Content">
                        <WelcomeScreenContent />
                    </div>
                    <RightSidebar />
                </div>
                <StatusBar />
            </div>
        </div>
    );
}

export default NonModalWelcomeScreen;

