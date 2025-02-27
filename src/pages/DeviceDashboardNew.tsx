import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const DeviceDashboardNew = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, mb: 2, flex: '0 0 auto' }}>
                <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                        Device Info (Card)
                    </Typography>
                    <Typography>Placeholder</Typography>
                </CardContent>
            </Card>

            {/* Main Grid: 12 columns, 12 rows */}
            <Box
                sx={{
                    flex: 1, // Takes remaining height
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'repeat(12, 1fr)',
                    gap: theme.spacing(1), // Tighter spacing
                    [theme.breakpoints.down('sm')]: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(1.5), // Slightly larger on mobile
                    },
                }}
            >
                {/* Card 1: Location (9 columns, 6 rows) */}
                <Card container spacing={2}
                    sx={{
                        gridColumn: '1 / span 9',
                        gridRow: '1 / span 6',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        minHeight: { xs: 200, md: 300 }, // Base size for scaling
                        order: { xs: 1, md: 0 },
                    }}
                >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, height: '100%' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                            Card 1: Location
                        </Typography>
                        <Typography>Placeholder</Typography>
                    </CardContent>
                </Card>

                {/* Card 2: Notifications (3 columns, 12 rows) */}
                <Card container spacing={2}
                    sx={{
                        gridColumn: '10 / span 3',
                        gridRow: '1 / span 12',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        minHeight: { xs: 200, md: 620 }, // Matches Card 1 + 3.1-3.6
                        order: { xs: 8, md: 0 },
                    }}
                >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, height: '100%' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                            Card 2: Notifications
                        </Typography>
                        <Typography>Placeholder</Typography>
                    </CardContent>
                </Card>

                {/* Card 3.1: Temperature (3 columns, 3 rows) */}
                <Card container spacing={2}
                    sx={{
                        gridColumn: '1 / span 3',
                        gridRow: '7 / span 3',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        aspectRatio: '1/1', // Square shape
                        maxHeight: '100%', // Prevents overflow
                        order: { xs: 2, md: 0 },
                        [theme.breakpoints.down('sm')]: {
                            minHeight: 120, // Readable on small screens
                        },
                    }}
                >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                            Card 3.1: Temperature
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem' }}>Placeholder</Typography>
                    </CardContent>
                </Card>

                {/* Card 3.2: Humidity (3 columns, 3 rows) */}
                <Card container spacing={2}
                    sx={{
                        gridColumn: '4 / span 3',
                        gridRow: '7 / span 3',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        aspectRatio: '1/1',
                        maxHeight: '100%',
                        order: { xs: 3, md: 0 },
                        [theme.breakpoints.down('sm')]: {
                            minHeight: 120,
                        },
                    }}
                >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                            Card 3.2: Humidity
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem' }}>Placeholder</Typography>
                    </CardContent>
                </Card>

                {/* Card 3.3: Speed (3 columns, 3 rows) */}
                <Card
                    sx={{
                        gridColumn: '7 / span 3',
                        gridRow: '7 / span 3',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        aspectRatio: '1/1',
                        maxHeight: '100%',
                        order: { xs: 4, md: 0 },
                        [theme.breakpoints.down('sm')]: {
                            minHeight: 120,
                        },
                    }}
                >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                            Card 3.3: Speed
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem' }}>Placeholder</Typography>
                    </CardContent>
                </Card>

                {/* Card 3.4: Battery (3 columns, 3 rows) */}
                <Card
                    sx={{
                        gridColumn: '1 / span 3',
                        gridRow: '10 / span 3',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        aspectRatio: '1/1',
                        maxHeight: '100%',
                        order: { xs: 5, md: 0 },
                        [theme.breakpoints.down('sm')]: {
                            minHeight: 120,
                        },
                    }}
                >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                            Card 3.4: Battery
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem' }}>Placeholder</Typography>
                    </CardContent>
                </Card>

                {/* Card 3.5: Door (3 columns, 3 rows) */}
                <Card
                    sx={{
                        gridColumn: '4 / span 3',
                        gridRow: '10 / span 3',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        aspectRatio: '1/1',
                        maxHeight: '100%',
                        order: { xs: 6, md: 0 },
                        [theme.breakpoints.down('sm')]: {
                            minHeight: 120,
                        },
                    }}
                >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                            Card 3.5: Door
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem' }}>Placeholder</Typography>
                    </CardContent>
                </Card>

                {/* Card 3.6: Movement (3 columns, 3 rows) */}
                <Card
                    sx={{
                        gridColumn: '7 / span 3',
                        gridRow: '10 / span 3',
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        aspectRatio: '1/1',
                        maxHeight: '100%',
                        order: { xs: 7, md: 0 },
                        [theme.breakpoints.down('sm')]: {
                            minHeight: 120,
                        },
                    }}
                >
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                            Card 3.6: Movement
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem' }}>Placeholder</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};