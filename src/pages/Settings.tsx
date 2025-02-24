import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
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
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
        {t('settings')}
      </Typography>
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: 1,
          p: 2,
          transition: 'all 0.2s ease',
        }}>
        <FormControl
          fullWidth
          sx={{ maxWidth: 300, mb: 2 }}>
          <InputLabel sx={{ color: theme.palette.text.secondary }}>
            {t('language')}
          </InputLabel>
          <Select
            value={i18n.language}
            label={t('language')}
            onChange={(e) => handleLanguageChange(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              transition: 'all 0.2s ease',
              bgcolor: theme.palette.background.paper,
            }}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleTheme}
          sx={{ textTransform: 'none', transition: 'all 0.2s ease' }}>
          {t('toggleTheme')}
        </Button>
      </Box>
    </Box>
  );
};
