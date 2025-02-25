import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchDeviceData } from '../api/deviceData';

export const DeviceData = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const theme = useTheme();

    const { data, isLoading, error } = useQuery({
        queryKey: ['deviceData', id],
        queryFn: () => fetchDeviceData(id!),
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {(error as Error).message}</Typography>;

    const latestData = data?.results[0] || {};

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                {t('deviceData')}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('location')}
                            </Typography>
                            <Typography>Lat: {latestData.latitude || 'N/A'}</Typography>
                            <Typography>Lon: {latestData.longitude || 'N/A'}</Typography>
                            <Typography>Alt: {latestData.altitude || 'N/A'} m</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('movement')}
                            </Typography>
                            <Typography>Speed: {latestData.speed || 'N/A'} km/h</Typography>
                            <Typography>Angle: {latestData.angle || 'N/A'}°</Typography>
                            <Typography>Satellites: {latestData.satellites || 'N/A'}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('sensors')}
                            </Typography>
                            {latestData.sensorDataEntityList?.map((sensor: any) => (
                                <Typography key={sensor.id}>
                                    {sensor.sensorType}: {sensor.value} {sensor.unit}
                                </Typography>
                            )) || <Typography>N/A</Typography>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};