import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchDevices } from '../api/devices';
import { fetchAllLatestDeviceData } from '../api/deviceData'; // Optional for temp
import { fetchNotificationsByDevice } from '../api/notifications'; // New import

export const Dashboard = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    const { data: devicesData, isLoading: isLoadingDevices, error: errorDevices } = useQuery({
        queryKey: ['devices'],
        queryFn: () => fetchDevices(),
    });

    const { data: notificationsData, isLoading: isLoadingNotifications } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const devices = devicesData?.devices || [];
            const promises = devices.map((d: any) => fetchNotificationsByDevice(String(d.id)));
            const results = await Promise.all(promises);
            return results.flat(); // Flatten all notifications
        },
        enabled: !!devicesData, // Wait for devices to load
    });

    const { data: latestData, isLoading: isLoadingLatest } = useQuery({
        queryKey: ['allLatestDeviceData'],
        queryFn: () => fetchAllLatestDeviceData(),
    });

    if (isLoadingDevices || isLoadingNotifications || isLoadingLatest) return <Typography>Loading...</Typography>;
    if (errorDevices) return <Typography color="error">Error: {(errorDevices as Error).message}</Typography>;

    const totalDevices = devicesData?.devices.length || 0;
    const activeAlerts = notificationsData?.filter((n: any) => !n.read).length || 0;
    const avgTemperature = latestData?.results
        .map((d: any) => d.sensorDataEntityList?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 0)
        .reduce((sum: number, val: number) => sum + val, 0) / (latestData?.results.length || 1) || 0;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                {t('dashboard')}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('totalDevices')}
                            </Typography>
                            <Typography>{totalDevices}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('activeAlerts')}
                            </Typography>
                            <Typography>{activeAlerts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('avgTemperature')}
                            </Typography>
                            <Typography>{avgTemperature.toFixed(2)} °C</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};