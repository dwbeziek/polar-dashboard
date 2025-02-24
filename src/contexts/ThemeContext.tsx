import { createContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'light',
});

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#1976d2' },
          secondary: { main: '#0288d1' },
          error: { main: '#d32f2f' },
          success: { main: '#2e7d32' },
          background: {
            default: mode === 'light' ? '#f6f8fa' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          grey: {
            50: mode === 'light' ? '#f6f8fa' : '#212121',
            200: mode === 'light' ? '#e5e7eb' : '#424242',
            600: mode === 'light' ? '#757575' : '#b0b0b0',
            800: mode === 'light' ? '#424242' : '#e0e0e0',
            900: mode === 'light' ? '#212121' : '#ffffff',
          },
          text: {
            primary: mode === 'light' ? '#424242' : '#ffffff',
            secondary: mode === 'light' ? '#757575' : '#b0b0b0',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h5: { fontSize: '1.5rem', fontWeight: 600 },
          body1: { fontSize: '0.875rem', fontWeight: 400 },
          body2: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: mode === 'light' ? '#757575' : '#b0b0b0',
          },
          button: { fontWeight: 500, textTransform: 'none' },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                zIndex: 1300,
                backgroundColor: mode === 'light' ? '#fff' : '#1a2035',
                borderBottom: `1px solid ${mode === 'light' ? '#e5e7eb' : '#2e344e'}`,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
                border: `1px solid ${mode === 'light' ? '#e5e7eb' : '#2e344e'}`,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: { borderRadius: 4 },
              contained: { boxShadow: 'none' },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      console.log('Toggling theme to:', newMode); // Debug log
      return newMode;
    });
  };

  console.log('Current theme mode:', mode); // Debug log

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
