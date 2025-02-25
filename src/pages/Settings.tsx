import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

export const Settings = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                {t('settings')}
            </Typography>
            {/* Empty as requested */}
        </Box>
    );
};