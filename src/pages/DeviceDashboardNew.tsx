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

            {/* Main Grid: 3 columns, 4 rows */}
            <Grid container spacing={2}>
                {/* Card 1: Location (2 columns, 2 rows) */}
                <Grid item xs={12} md={8} sx={{ order: { xs: 1, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, minHeight: { xs: 200, md: 400 } }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 1: Location
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 2: Notifications (1 column, 4 rows, last on mobile) */}
                <Grid item xs={12} md={4} sx={{ order: { xs: 8, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, minHeight: { xs: 200, md: 820 } }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 2: Notifications
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.1: Temperature */}
                <Grid item xs={4} sx={{ order: { xs: 2, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.1: Temperature
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.2: Humidity */}
                <Grid item xs={4} sx={{ order: { xs: 3, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.2: Humidity
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.3: Speed */}
                <Grid item xs={4} sx={{ order: { xs: 4, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.3: Speed
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.4: Battery */}
                <Grid item xs={4} sx={{ order: { xs: 5, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.4: Battery
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.5: Door */}
                <Grid item xs={4} sx={{ order: { xs: 6, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 3.5: Door
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3.6: Movement */}
                <Grid item xs={4} sx={{ order: { xs: 7, md: 0 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
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