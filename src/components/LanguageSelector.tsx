import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem } from '@mui/material';

export const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'pt', name: 'Português', flag: '🇵🇹' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹' },
        { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
        { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
        { code: 'da', name: 'Dansk', flag: '🇩🇰' },
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    ];

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        handleMenuClose();
    };

    return (
        <>
            <Button
                color="inherit"
                onClick={handleMenuOpen}
                sx={{
                    textTransform: 'none',
                    fontFamily: theme => theme.typography.fontFamily, // Matches default MUI font
                    fontSize: '1rem', // Matches default Button size
                    padding: '6px 8px', // Matches default Button padding
                    minWidth: 'auto', // Ensures size stays compact
                }}
            >
                {languages.find(lang => lang.code === i18n.language)?.flag || ''} {' '}
                {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1, // Matches default MUI Menu spacing
                    },
                }}
            >
                {languages.map(lang => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        sx={{
                            fontFamily: theme => theme.typography.fontFamily,
                            fontSize: '0.875rem', // Matches default MenuItem size
                            padding: '6px 16px', // Matches default MenuItem padding
                        }}
                    >
                        {lang.flag} {lang.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};