import { Box, Button, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const DeviceDashboardNew = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 3 }}>
            {/* Title and Back Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {t('deviceDashboard')}
                </Typography>
                <Button variant="outlined" onClick={() => navigate('/devices')}>
                    {t('back')}
                </Button>
            </Box>

            {/* Device Info Card (Full-width) */}
            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                        Device Info (Card)
                    </Typography>
                    <Typography>Placeholder</Typography>
                </CardContent>
            </Card>

            {/* Main Grid: 12 columns, 12 rows */}
            <Grid container spacing={2} sx={{ height: 'calc(100vh - 200px)' }}> {/* Adjust height for 12 rows */}
                {/* Card 1: Location (9 columns, 6 rows) */}
                <Grid item xs={12} md={9} sx={{ order: { xs: 1, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, height: '50%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 1: Location
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 2: Notifications (3 columns, 12 rows, last on mobile) */}
                <Grid item xs={12} md={3} sx={{ order: { xs: 8, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 2: Notifications
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.1: Temperature (3 columns, 3 rows) */}
                <Grid item xs={4} md={3} sx={{ order: { xs: 2, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, height: '25%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.1: Temperature
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.2: Humidity (3 columns, 3 rows) */}
                <Grid item xs={4} md={3} sx={{ order: { xs: 3, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, height: '25%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.2: Humidity
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.3: Speed (3 columns, 3 rows) */}
                <Grid item xs={4} md={3} sx={{ order: { xs: 4, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, height: '25%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.3: Speed
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.4: Battery (3 columns, 3 rows) */}
                <Grid item xs={4} md={3} sx={{ order: { xs: 5, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, height: '25%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.4: Battery
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.5: Door (3 columns, 3 rows) */}
                <Grid item xs={4} md={3} sx={{ order: { xs: 6, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, height: '25%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.5: Door
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.6: Movement (3 columns, 3 rows) */}
                <Grid item xs={4} md={3} sx={{ order: { xs: 7, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, height: '25%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.6: Movement
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};