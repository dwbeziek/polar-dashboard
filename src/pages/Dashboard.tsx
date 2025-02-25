import { useQuery } from '@tanstack/react-query';
import { Typography, Box, CircularProgress, Grid, Card, CardContent, useTheme } from '@mui/material';
import { fetchDevices } from '../api/devices';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['devices'],
        queryFn: () => fetchDevices({}),
    });
    const { t } = useTranslation();
    const theme = useTheme();

    if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>{t('error')}: {(error as Error).message}</Typography>;

    const totalDevices = data?.total ?? data?.devices?.length ?? 0;
    const alerts = data?.devices?.reduce((sum, d) => sum + d.notifications.filter((n) => !n.read).length, 0) || 0;
    const avgTemp =
        data?.devices
            ?.map((d) => d.latest?.sensorData.find((s) => s.sensorType === 'TEMPERATURE')?.value || 0)
            .reduce((sum, val) => sum + val, 0) / (data?.devices?.length || 1) || 0;

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>{t('dashboard')}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{t('totalDevices')}</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{totalDevices}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{t('activeAlerts')}</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: alerts > 0 ? theme.palette.error.main : theme.palette.success.main }}>{alerts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{t('avgTemperature')}</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{avgTemp.toFixed(1)}°C</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};