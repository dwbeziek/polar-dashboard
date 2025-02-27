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

            {/* Outer Grid: Split into Left (9 cols) and Right (3 cols) */}
            <Grid container spacing={2} maxWidth={1400}>
                {/* Left Grid: Card 1 and Cards 3.1-3.6 (9 columns) */}
                <Grid item xs={12} md={9} sx={{ order: { xs: 1, md: 0 } }}>
                    <Grid container spacing={2}  >
                        {/* Card 1: Location (9 columns, 6 rows) */}
                        <Grid item xs={12} md={12} >
                            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '2/1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                        Card 1: Location
                                    </Typography>
                                    <Typography>Placeholder</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Cards 3.1-3.3 (3 columns each, 3 rows) */}
                        <Grid item xs={12} sm={6} md={4} sx={{ order: { xs: 2 } }}>
                            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                        Card 3.1: Temperature
                                    </Typography>
                                    <Typography>Placeholder</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ order: { xs: 3 } }}>
                            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                        Card 3.2: Humidity
                                    </Typography>
                                    <Typography>Placeholder</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ order: { xs: 4 } }}>
                            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                        Card 3.3: Speed
                                    </Typography>
                                    <Typography>Placeholder</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Cards 3.4-3.6 (3 columns each, 3 rows) */}
                        <Grid item xs={12} sm={6} md={4} sx={{ order: { xs: 5 } }}>
                            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                        Card 3.4: Battery
                                    </Typography>
                                    <Typography>Placeholder</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ order: { xs: 6 } }}>
                            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                        Card 3.5: Door
                                    </Typography>
                                    <Typography>Placeholder</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ order: { xs: 7 } }}>
                            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                        Card 3.6: Movement
                                    </Typography>
                                    <Typography>Placeholder</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* Card 4: Location (9 columns, 6 rows) */}
                        <Grid item xs={12}  sx={{ order: { xs: 8 }}}>
                            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '6/1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                        Card 4: Other Detail
                                    </Typography>
                                    <Typography>Placeholder</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                 {/*Right Grid: Card 2 (3 columns, 12 rows) */}
                <Grid item xs={12} md={3} columns={3} sx={{ order: { xs: 9 } }}>
                    <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, aspectRatio: '1/4' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                Card 2: Notifications
                            </Typography>
                            <Typography>Placeholder</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};