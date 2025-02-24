import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, useTheme } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { useTranslation } from 'react-i18next';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();

    const handleLogin = async () => {
        try {
            const data = await loginApi(username, password);
            login(data.token);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: theme.palette.mode === 'light' ? '#f5f5f5' : '#0d1117',
                transition: 'all 0.3s ease',
            }}
        >
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                    maxWidth: 400,
                    width: '100%',
                    bgcolor: theme.palette.background.paper,
                    transition: 'all 0.3s ease',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary, textAlign: 'center' }}>
                    {t('login')}
                </Typography>
                <Box>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                        {t('username')}
                    </Typography>
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{
                            transition: 'all 0.2s ease',
                            '& .MuiOutlinedInput-root': {
                                bgcolor: theme.palette.background.paper,
                                '& fieldset': { borderColor: theme.palette.grey[200] },
                                '&:hover fieldset': { borderColor: theme.palette.grey[600] },
                                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                            },
                            '& .MuiInputBase-input': {
                                bgcolor: theme.palette.background.paper,
                                py: 1,
                            },
                        }}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                        {t('password')}
                    </Typography>
                    <TextField
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{
                            transition: 'all 0.2s ease',
                            '& .MuiOutlinedInput-root': {
                                bgcolor: theme.palette.background.paper,
                                '& fieldset': { borderColor: theme.palette.grey[200] },
                                '&:hover fieldset': { borderColor: theme.palette.grey[600] },
                                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                            },
                            '& .MuiInputBase-input': {
                                bgcolor: theme.palette.background.paper,
                                py: 1,
                            },
                        }}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                    sx={{ mt: 2, transition: 'all 0.2s ease' }}
                >
                    {t('login')}
                </Button>
            </Paper>
        </Box>
    );
};