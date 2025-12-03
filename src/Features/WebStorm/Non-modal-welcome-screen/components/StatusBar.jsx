import './StatusBar.css';

function StatusBar() {
    return (
        <div className="status-bar" data-name="Status bar">
            <button className="status-bar-breadcrumb" data-name="Breadcrumbs">
                <div className="breadcrumb-item" data-name="Status Bar / Breadcrumb">
                    <p>Welcome to WebStorm</p>
                </div>
            </button>
            <div className="status-bar-widgets" data-name="Widgets"></div>
        </div>
    );
}

export default StatusBar;

