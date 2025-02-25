import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchDeviceDetails, updateDevice } from '../api/devices'; // Correct for device details
// No fetchDeviceData here unless you added it

export const EditDevice = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();

    const [device, setDevice] = useState({
        imei: '',
        code: '',
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const data = await fetchDeviceDetails(id!);
                setDevice(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchDevice();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDevice({ ...device, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateDevice(id!, device);
            navigate('/devices');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                {t('editDevice')}
            </Typography>
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