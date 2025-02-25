import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem } from '@mui/material';
import {languages} from "../constants/languages";

export const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);

    // const languages = [
    //     { code: 'en', name: 'English', flag: '🇬🇧' },
    //     { code: 'es', name: 'Español', flag: '🇪🇸' },
    //     { code: 'pt', name: 'Português', flag: '🇵🇹' },
    //     { code: 'fr', name: 'Français', flag: '🇫🇷' },
    //     { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    //     { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
    //     { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    //     { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    //     { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    // ];

    const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLanguageChange = (lang: any) => {
        i18n.changeLanguage(lang);
        handleMenuClose();
    };

    return (
        <>
            <Button
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ textTransform: 'none' }} // Exact styling match
            >
                {languages.find(lang => lang.code === i18n.language)?.flag} {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {languages.map(lang => (
                    <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                        {lang.flag} {lang.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};