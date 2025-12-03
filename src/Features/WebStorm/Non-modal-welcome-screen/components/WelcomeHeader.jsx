import './WelcomeHeader.css';

function WelcomeHeader() {
    return (
        <div className="welcome-header" data-name="Header">
            <h1 className="welcome-title" data-name="Title">
                Welcome to WebStorm
            </h1>
            <p className="welcome-subtitle" data-name="Subtitle">
                The JavaScript and TypeScript IDE
            </p>
        </div>
    );
}

export default WelcomeHeader;

