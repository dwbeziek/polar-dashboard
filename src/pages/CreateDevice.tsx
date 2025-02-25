import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Fixed typo from 'react-i18n'
import { createDevice } from '../api/devices';

export const CreateDevice = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();

    const [device, setDevice] = useState({
        imei: '',
        code: '',
        name: '',
        description: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDevice({ ...device, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createDevice(device);
            navigate('/devices');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                {t('createDevice')}
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label={t('imei')}
                    name="imei"
                    value={device.imei}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={t('code')}
                    name="code"
                    value={device.code}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={t('name')}
                    name="name"
                    value={device.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={t('description')}
                    name="description"
                    value={device.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {t('save')}
                </Button>
            </form>
        </Box>
    );
};