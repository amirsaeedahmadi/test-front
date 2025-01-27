import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
};

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};