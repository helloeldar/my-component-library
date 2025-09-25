import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState('auto'); // 'light', 'dark', 'auto'
    const [actualTheme, setActualTheme] = useState('light');

    // Function to get system theme
    const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Update actual theme based on mode
    useEffect(() => {
        if (themeMode === 'auto') {
            setActualTheme(getSystemTheme());
            
            // Listen for system theme changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e) => {
                if (themeMode === 'auto') {
                    setActualTheme(e.matches ? 'dark' : 'light');
                }
            };
            
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            setActualTheme(themeMode);
        }
    }, [themeMode]);

    const cycleTheme = () => {
        setThemeMode(current => {
            switch (current) {
                case 'light': return 'dark';
                case 'dark': return 'auto';
                case 'auto': return 'light';
                default: return 'light';
            }
        });
    };

    return (
        <ThemeContext.Provider value={{ 
            theme: actualTheme, 
            themeMode, 
            toggleTheme: cycleTheme 
        }}>
            <div className={`theme-${actualTheme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
