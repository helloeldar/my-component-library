import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(current => current === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ 
            theme, 
            toggleTheme 
        }}>
            <div className={`theme-${theme}`}>
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
