import MainToolbar from './components/MainToolbar';
import LeftSidebar from './components/LeftSidebar';
import EssentialShortcuts from './components/EssentialShortcuts';
import WelcomeScreenContent from './components/WelcomeScreenContent';
import StatusBar from './components/StatusBar';
import './NonModalWelcomeScreen.css';

function NonModalWelcomeScreen() {
    return (
        <div className="non-modal-welcome-screen" data-name="NMWS" data-node-id="180:22535">
            <div className="main-window" data-name="Main window" data-node-id="180:22536">
                <MainToolbar />
                <div className="main-content-area" data-name="Content" data-node-id="180:22547">
                    <LeftSidebar />
                    <div className="editor-area" data-name="Content" data-node-id="180:22561">
                        <div className="editor-content-wrapper" data-name="Content" data-node-id="180:22562">
                            <div className="editor-background" data-name="Editor" data-node-id="180:22563">
                                <WelcomeScreenContent />
                            </div>
                            <EssentialShortcuts />
                        </div>
                    </div>
                    <div className="right-stripes" data-name="Stripes" data-node-id="180:22633">
                        <div className="right-stripes-top" data-name="Top">
                            {/* Empty stripes for right side */}
                        </div>
                    </div>
                </div>
                <StatusBar />
            </div>
        </div>
    );
}

export default NonModalWelcomeScreen;

