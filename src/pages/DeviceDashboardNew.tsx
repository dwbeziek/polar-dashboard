import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {MetricCard} from "../components/MetricCard";
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'; // Speed
import DoorFrontOutlinedIcon from '@mui/icons-material/DoorFrontOutlined'; // Door
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import {GaugeMetricCard} from "../components/GaugeMetricCard";
import {useQuery} from "@tanstack/react-query";
import {fetchLatestDeviceData} from "../api/deviceData";
import {fetchThresholdsByDevice} from "../api/thresholds";
import {fetchNotificationsByDevice} from "../api/notifications";
import {fetchDeviceDetails} from "../api/devices";

export const DeviceDashboardNew = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();

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

    const { data: deviceDetails, isLoading: isLoadingDevice } = useQuery({
        queryKey: ['deviceDetails', id],
        queryFn: () => fetchDeviceDetails(id!),
    });


    const handleDetailClick = (metric: string) => {
        console.log(`Navigate to ${metric} detail screen`); // Placeholder
    };
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
            <Box
                sx={{
                    py: 2,
                    mb: 2,
                    position: 'relative',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {deviceDetails?.name || ''} - {deviceDetails?.code || ''}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                    {deviceDetails?.description || 'N/A'}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary, position: 'absolute', bottom: 8, right: 8 }}
                >
                    IMEI: {deviceDetails?.imei || ''}
                </Typography>
            </Box>

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
                    <MetricCard
                        title="Temperature"
                        value={19}
                        unit="°C"
                        icon={<ThermostatOutlinedIcon />}
                        status="Good"
                        thresholdInfo="Keep between 20°C and 30°C"
                        onDetailClick={() => handleDetailClick('Temperature')}
                    />
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
                    <GaugeMetricCard
                        title="Humidity"
                        value={34}
                        unit="%"
                        icon={<WaterDropOutlinedIcon />}
                        status="Good"
                        thresholdInfo="Keep between 30% and 70%"
                        onDetailClick={() => handleDetailClick('Humidity')}
                    />
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
                    <MetricCard
                        title="Speed"
                        value={45}
                        unit="km/h"
                        icon={<SpeedOutlinedIcon />}
                        status="Good"
                        thresholdInfo="Keep below 80 km/h"
                        onDetailClick={() => handleDetailClick('Speed')}
                    />
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
                    <GaugeMetricCard
                        title="Battery"
                        value={79}
                        unit="%"
                        icon={<Battery0BarIcon />}
                        status="Good"
                        thresholdInfo="Plan replacement at 15%"
                        onDetailClick={() => handleDetailClick('Battery')}
                    />
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
                    <MetricCard
                        title="Door"
                        value={2} // Number of times opened as placeholder
                        unit="times"
                        icon={<DoorFrontOutlinedIcon />}
                        status="Good"
                        thresholdInfo="Max 5 times per hour"
                        onDetailClick={() => handleDetailClick('Door')}
                    />
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
                    <MetricCard
                        title="Movement"
                        value={1}
                        unit=""
                        icon={<DirectionsRunOutlinedIcon />}
                        status="Good"
                        thresholdInfo="Detected when moving"
                        onDetailClick={() => handleDetailClick('Movement')}
                      />
                </Card>
            </Box>
        </Box>
    );
};