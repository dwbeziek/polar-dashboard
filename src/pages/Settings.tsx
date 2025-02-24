import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
    const { toggleTheme } = useContext(ThemeContext);
    const { i18n, t } = useTranslation();
    const theme = useTheme();

    const handleLanguageChange = (lang: string) => i18n.changeLanguage(lang);

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>{t('settings')}</Typography>
            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                    borderRadius: 1,
                    p: 2,
                    transition: 'all 0.2s ease',
                }}
            >
                <FormControl fullWidth sx={{ maxWidth: 300, mb: 2 }}>
                    <InputLabel sx={{ color: theme.palette.text.secondary }}>{t('language')}</InputLabel>
                    <Select
                        value={i18n.language}
                        label={t('language')}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ transition: 'all 0.2s ease' }}
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="pt">Portuguese</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="it">Italian</MenuItem>
                        <MenuItem value="zh-TW">Mandarin Traditional</MenuItem>
                        <MenuItem value="zh-CN">Mandarin Simplified</MenuItem>
                        <MenuItem value="da">Danish</MenuItem>
                        <MenuItem value="sv">Swedish</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleTheme}
                    sx={{ transition: 'all 0.2s ease' }}
                >
                    {t('toggleTheme')}
                </Button>
            </Box>
        </Box>
    );
};