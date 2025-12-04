import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../icons/common/IntelliJPlatformLogo.svg';
import Icon from '../ui/components/icon/Icon';
import { useTheme } from '../ThemeContext';
import { getSortedComponentsOnly, getSortedWidgets } from '../componentsConfig';
import './Layout.css';

function Layout({ children }) {
    const location = useLocation();
    const { theme, themeMode, toggleTheme } = useTheme();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="app">
            <div className="sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="logo">
                        <Logo className="logo-icon" />
                        <span className="logo-text">Library</span>
                    </Link>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {themeMode === 'auto' ? (
                            <span className="theme-toggle-auto">A</span>
                        ) : (
                            <Icon
                                name={theme === 'light' ? 'LightDarkTheme' : 'DarkLightTheme'}
                                size={16}
                            />
                        )}
                    </button>
                </div>
                
                <div className="nav-category">
                    <Link
                        to="/"
                        className={`nav-item ${isActive('/') ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                </div>
                
                <div className="nav-category">
                    <div className="nav-category-title">Styles</div>
                    <Link
                        to="/styles/typography"
                        className={`nav-item ${isActive('/styles/typography') ? 'active' : ''}`}
                    >
                        Typography
                    </Link>
                    <Link
                        to="/styles/colors"
                        className={`nav-item ${isActive('/styles/colors') ? 'active' : ''}`}
                    >
                        Colors
                    </Link>
                </div>
                
                <div className="nav-category">
                    <div className="nav-category-title">Components</div>
                    {getSortedComponentsOnly().map((component) => (
                        <Link
                            key={component.key}
                            to={`/components/${component.key}`}
                            className={`nav-item ${isActive(`/components/${component.key}`) ? 'active' : ''}`}
                        >
                            {component.name}
                        </Link>
                    ))}
                </div>
                
                <div className="nav-category">
                    <div className="nav-category-title">Widgets</div>
                    {getSortedWidgets().map((widget) => (
                        <Link
                            key={widget.key}
                            to={`/widgets/${widget.key}`}
                            className={`nav-item ${isActive(`/widgets/${widget.key}`) ? 'active' : ''}`}
                        >
                            {widget.name}
                        </Link>
                    ))}
                </div>
                
                <div className="nav-category">
                    <div className="nav-category-title">Features</div>
                    <Link
                        to="/features/non-modal-welcome-screen"
                        className={`nav-item ${isActive('/features/non-modal-welcome-screen') ? 'active' : ''}`}
                    >
                        Non-modal Welcome Screen
                    </Link>
                </div>
            </div>

            <div className="main-content">
                {children}
            </div>
        </div>
    );
}

export default Layout;

