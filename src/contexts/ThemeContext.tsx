import { createContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider, GlobalStyles } from '@mui/material';
import { getTheme } from '../theme/theme';

interface ThemeContextType {
    toggleTheme: () => void;
    mode: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType>({ toggleTheme: () => {}, mode: 'light' });

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const theme = useMemo(() => getTheme(mode), [mode]);

    const globalStyles = (
        <GlobalStyles
            styles={{
                '.MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.paper, // Direct theme value
                },
                'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active': {
                    WebkitBoxShadow: `0 0 0 30px ${theme.palette.background.paper} inset !important`,
                    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                    backgroundColor: `${theme.palette.background.paper} !important`,
                    transition: 'background-color 5000s ease-in-out 0s',
                },
            }}
        />
    );

    const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                {globalStyles}
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};