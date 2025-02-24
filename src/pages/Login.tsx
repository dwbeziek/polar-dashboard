import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
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
        bgcolor: theme.palette.background.default,
        transition: 'all 0.3s ease',
      }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 1,
          border: `1px solid ${theme.palette.grey[200]}`,
          maxWidth: 400,
          width: '100%',
          bgcolor: theme.palette.background.paper, // Solid color, no gradient
          transition: 'all 0.3s ease',
        }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: theme.palette.text.primary,
            textAlign: 'center',
          }}>
          {t('login')}
        </Typography>
        <TextField
          label={t('username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          size="small"
          sx={{
            transition: 'all 0.2s ease',
            bgcolor: theme.palette.background.paper,
          }}
        />
        <TextField
          label={t('password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          size="small"
          sx={{
            transition: 'all 0.2s ease',
            bgcolor: theme.palette.background.paper,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ mt: 2, textTransform: 'none', transition: 'all 0.2s ease' }}>
          {t('login')}
        </Button>
      </Paper>
    </Box>
  );
};
