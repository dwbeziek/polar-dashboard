import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Badge } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchLatestDeviceData } from '../api/deviceData';
import { fetchThresholdsByDevice } from '../api/thresholds';
import { fetchNotificationsByDevice } from '../api/notifications';
import { ChartComponent } from '../components/ChartComponent';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Location
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'; // Movement
import WarningIcon from '@mui/icons-material/Warning'; // Thresholds

export const DeviceDashboard = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    console.log('Latest Data:', latestData); // Debug log
    const latest = latestData?.results[0] || {};
    const currentTemp = latest.sensorData?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 'N/A';

    const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                {/* Full-width Temperature Chart */}
                <Grid item xs={12}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                        <CardContent>
                            <ChartComponent deviceId={id!} dataKey="temperature" label="temperature" unit="°C" color="error.main" />
                        </CardContent>
                    </Card>
                </Grid>
                {/* Speed and Altitude Charts */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                        <CardContent>
                            <ChartComponent deviceId={id!} dataKey="speed" label="speed" unit="km/h" color="primary.main" />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                        <CardContent>
                            <ChartComponent deviceId={id!} dataKey="altitude" label="altitude" unit="m" color="secondary.main" />
                        </CardContent>
                    </Card>
                </Grid>
                {/* Location Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, p: 2 }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize: 32 }} />
                            <Box>
                                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                                    {t('location')}
                                </Typography>
                                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                    {t('lat')}: {latest.latitude || 'N/A'}
                                </Typography>
                                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                    {t('lon')}: {latest.longitude || 'N/A'}
                                </Typography>
                                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                    {t('alt')}: {latest.altitude || 'N/A'} m
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Movement Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, p: 2 }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <DirectionsRunIcon sx={{ color: theme.palette.secondary.main, fontSize: 32 }} />
                            <Box>
                                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                                    {t('movement')}
                                </Typography>
                                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                    {t('speed')}: {latest.speed || 'N/A'} km/h
                                </Typography>
                                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                    {t('angle')}: {latest.angle || 'N/A'}°
                                </Typography>
                                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                    {t('satellites')}: {latest.satellites || 'N/A'}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Thresholds Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, p: 2 }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <WarningIcon sx={{ color: theme.palette.warning.main, fontSize: 32 }} />
                            <Box>
                                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem', mb: 1 }}>
                                    {t('thresholds')} {isLoadingThresholds ? '(Loading...)' : ''}
                                </Typography>
                                {thresholds?.map((t: any) => (
                                    <Typography key={t.id} sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                        {t.sensorType}: {t.minValue} - {t.maxValue}
                                    </Typography>
                                )) || <Typography sx={{ color: theme.palette.text.secondary }}>N/A</Typography>}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Full-width Notifications */}
                <Grid item xs={12}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                                {t('notifications')} {isLoadingNotifications ? '(Loading...)' : ''}
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Message</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Timestamp</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {notifications?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n: any) => (
                                            <TableRow key={n.id}>
                                                <TableCell>{n.message}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        badgeContent={n.read ? 'Read' : 'Unread'}
                                                        color={n.read ? 'success' : 'error'}
                                                        sx={{
                                                            '& .MuiBadge-badge': {
                                                                borderRadius: '12px',
                                                                padding: '2px 8px',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 500,
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{new Date(n.timestamp).toLocaleString()}</TableCell>
                                            </TableRow>
                                        )) || <TableRow><TableCell colSpan={3}>N/A</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={notifications?.length || 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};