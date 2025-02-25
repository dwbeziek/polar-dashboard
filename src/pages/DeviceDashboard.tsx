import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchLatestDeviceData } from '../api/deviceData';
import { ChartComponent } from '../components/ChartComponent';

export const DeviceDashboard = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();

    const { data, isLoading, error } = useQuery({
        queryKey: ['latestDeviceData', id],
        queryFn: () => fetchLatestDeviceData(id!),
        refetchInterval: 5000,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) {
        console.error('Fetch error:', error); // Log error for debugging
        return <Typography color="error">Error: {(error as Error).message}</Typography>;
    }

    const latestData = data?.results[0] || {};
    const currentTemp = latestData.sensorDataEntityList?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 'N/A';

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
                            <Typography>{t('lat')}: {latestData.latitude || 'N/A'}</Typography>
                            <Typography>{t('lon')}: {latestData.longitude || 'N/A'}</Typography>
                            <Typography>{t('alt')}: {latestData.altitude || 'N/A'} m</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('movement')}
                            </Typography>
                            <Typography>{t('speed')}: {latestData.speed || 'N/A'} km/h</Typography>
                            <Typography>{t('angle')}: {latestData.angle || 'N/A'}°</Typography>
                            <Typography>{t('satellites')}: {latestData.satellites || 'N/A'}</Typography>
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
                            <ChartComponent deviceId={id!} dataKey="angle" label="angle" unit="°" color="success.main" />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <ChartComponent deviceId={id!} dataKey="temperature" label="temperature" unit="°C" color="error.main" />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};