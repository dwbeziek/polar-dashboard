import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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

export const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event: any) => {
        i18n.changeLanguage(event.target.value as string);
    };

    return (
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Language</InputLabel>
            <Select value={i18n.language} onChange={handleLanguageChange} label="Language">
                {languages.map(lang => (
                    <MenuItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};