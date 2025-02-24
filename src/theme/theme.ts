import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? '#24292f' : '#c9d1d9',
            },
            secondary: { main: '#0288d1' },
            error: { main: '#d32f2f' },
            success: { main: '#2e7d32' },
            background: {
                default: mode === 'light' ? '#fcfcfc' : '#0d1117',
                paper: mode === 'light' ? '#ffffff' : '#161b22',
            },
            grey: {
                50: '#f5f6fa',
                200: '#e5e7eb',
                600: '#8d949e',
                800: '#24292f',
                900: '#30363d',
            },
            text: {
                primary: mode === 'light' ? '#24292f' : '#c9d1d9',
                secondary: mode === 'light' ? '#8d949e' : '#8b949e',
            },
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h5: { fontSize: '1.5rem', fontWeight: 600 },
            body1: { fontSize: '0.875rem', fontWeight: 400 },
            body2: { fontSize: '0.75rem', fontWeight: 400 },
            button: { fontWeight: 500, textTransform: 'none' },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        zIndex: 1300,
                        backgroundColor: mode === 'light' ? '#f5f6fa' : '#161b22',
                        borderBottom: `1px solid ${mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                        border: `1px solid ${mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        border: `1px solid ${mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                        padding: '6px 12px',
                    },
                    contained: {
                        boxShadow: 'none',
                        backgroundColor: mode === 'light' ? '#24292f' : '#c9d1d9',
                        color: mode === 'light' ? '#ffffff' : '#24292f',
                        '&:hover': {
                            backgroundColor: mode === 'light' ? '#1c2526' : '#b0b8c4',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: { backgroundColor: mode === 'light' ? '#ffffff' : '#161b22' },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: mode === 'light' ? '#f5f6fa' : '#161b22',
                        borderRight: `1px solid ${mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'light' ? '#ffffff' : '#161b22',
                            '& fieldset': { borderColor: mode === 'light' ? '#e5e7eb' : '#30363d' },
                            '&:hover fieldset': { borderColor: mode === 'light' ? '#8d949e' : '#8b949e' },
                            '&.Mui-focused fieldset': { borderColor: mode === 'light' ? '#24292f' : '#c9d1d9' },
                            '& input': { backgroundColor: mode === 'light' ? '#ffffff' : '#161b22' },
                        },
                    },
                },
            },
        },
    });