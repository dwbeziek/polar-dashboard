import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchLatestDeviceData } from '../api/deviceData';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const DeviceDashboard = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();

    const [sensorHistory, setSensorHistory] = useState<any[]>([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['latestDeviceData', id],
        queryFn: () => fetchLatestDeviceData(id!),
        refetchInterval: 5000, // Poll every 5 seconds
    });

    useEffect(() => {
        if (data?.results[0]) {
            setSensorHistory(prev => [...prev.slice(-19), data.results[0]].slice(-20)); // Keep last 20 data points
        }
    }, [data]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {(error as Error).message}</Typography>;

    const latestData = data?.results[0] || {};

    const chartData = (key: string) => ({
        labels: sensorHistory.map((_, i) => i.toString()),
        datasets: [{
            label: t(key),
            data: sensorHistory.map(d => d[key] || 0),
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
            fill: false,
        }],
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
    };

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
                            <Typography>lat: {latestData.latitude || 'N/A'}</Typography>
                            <Typography>lon: {latestData.longitude || 'N/A'}</Typography>
                            <Typography>alt: {latestData.altitude || 'N/A'} m</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('movement')}
                            </Typography>
                            <Typography>speed: {latestData.speed || 'N/A'} km/h</Typography>
                            <Typography>angle: {latestData.angle || 'N/A'}°</Typography>
                            <Typography>satellites: {latestData.satellites || 'N/A'}</Typography>
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
                                    {sensor.sensorType.toLowerCase()}: {sensor.value} {sensor.unit}
                                </Typography>
                            )) || <Typography>N/A</Typography>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, height: 300 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('speed')}
                            </Typography>
                            <Line data={chartData('speed')} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, height: 300 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {t('altitude')}
                            </Typography>
                            <Line data={chartData('altitude')} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};