import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchLatestDeviceData } from '../api/deviceData';
import { fetchThresholdsByDevice } from '../api/thresholds';
import { fetchNotificationsByDevice } from '../api/notifications';
import { ChartComponent } from '../components/ChartComponent';
import { useState } from 'react';

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

    const latest = latestData?.results[0] || {};
    const currentTemp = latest.sensorDataEntityList?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 'N/A';

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
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                                {t('thresholds')} {isLoadingThresholds ? '(Loading...)' : ''}
                            </Typography>
                            {thresholds?.map((t: any) => (
                                <Typography key={t.id}>{t.sensorType}: {t.minValue} - {t.maxValue}</Typography>
                            )) || <Typography>N/A</Typography>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider` }}>
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
                        <TableCell sx={{ color: n.read ? 'text.secondary' : 'error.main' }}>
                          {n.read ? 'Read' : 'Unread'}
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