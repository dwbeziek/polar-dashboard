import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchLatestDeviceData, fetchDeviceDataHistory } from '../api/deviceData';
import { fetchThresholdsByDevice } from '../api/thresholds';
import { fetchNotificationsByDevice } from '../api/notifications';
import { ChartComponent } from '../components/ChartComponent';

export const DeviceDashboard = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();

    const { data: latestData, isLoading: isLoadingLatest, error: errorLatest } = useQuery({
        queryKey: ['latestDeviceData', id],
        queryFn: () => fetchLatestDeviceData(id!),
        refetchInterval: 5000,
        refetchOnWindowFocus: false,
    });

    const { data: thresholds, isLoading: isLoadingThresholds } = useQuery({
        queryKey: ['thresholds', id],
        queryFn: () => fetchThresholdsByDevice(id!),
    });

    const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
        queryKey: ['notifications', id],
        queryFn: () => fetchNotificationsByDevice(id!),
    });

    if (isLoadingLatest) return <Typography>Loading...</Typography>;
    if (errorLatest) return <Typography color="error">Error: {(errorLatest as Error).message}</Typography>;

    const latest = latestData?.results[0] || {};
    const currentTemp = latest.sensorDataEntityList?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 'N/A';

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {t('deviceDashboard')}
                </Typography>
                <Button variant="outlined" onClick={() => navigate('/devices')}>
                    {t('back')}
                </Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('location')}
                            </Typography>
                            <Typography>{t('lat')}: {latest.latitude || 'N/A'}</Typography>
                            <Typography>{t('lon')}: {latest.longitude || 'N/A'}</Typography>
                            <Typography>{t('alt')}: {latest.altitude || 'N/A'} m</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('movement')}
                            </Typography>
                            <Typography>{t('speed')}: {latest.speed || 'N/A'} km/h</Typography>
                            <Typography>{t('angle')}: {latest.angle || 'N/A'}°</Typography>
                            <Typography>{t('satellites')}: {latest.satellites || 'N/A'}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('temperature')}
                            </Typography>
                            <Typography>{currentTemp !== 'N/A' ? `${currentTemp} °C` : 'N/A'}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <ChartComponent deviceId={id!} dataKey="speed" label="speed" unit="km/h" color="primary.main" />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <ChartComponent deviceId={id!} dataKey="altitude" label="altitude" unit="m" color="secondary.main" />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('thresholds')} {isLoadingThresholds ? '(Loading...)' : ''}
                            </Typography>
                            {thresholds?.map((t: any) => (
                                <Typography key={t.id}>{t.sensorType}: {t.minValue} - {t.maxValue}</Typography>
                            )) || <Typography>N/A</Typography>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('notifications')} {isLoadingNotifications ? '(Loading...)' : ''}
                            </Typography>
                            {notifications?.map((n: any) => (
                                <Typography key={n.id}>{n.message} ({n.read ? 'Read' : 'Unread'})</Typography>
                            )) || <Typography>N/A</Typography>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};