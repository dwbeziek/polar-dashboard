import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeightIcon from '@mui/icons-material/Height';
import { useTheme } from '@mui/material/styles';

interface MapOverlayProps {
    deviceData: {
        latitude: number;
        longitude: number;
        altitude: number;
        timestamp: string;
    } | null;
}

export const MapOverlay = ({ deviceData }: MapOverlayProps) => {
    const theme = useTheme();
    const placeName = deviceData ? "Cape Town, SA" : "Unknown Location"; // Mock—replace if real data available

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    p: 1,
                    zIndex: 1000,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <LocationOnIcon sx={{ color: theme.palette.text.secondary, fontSize: '1.25rem', mr: 0.5 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontSize: '0.875rem' }}>
                        {placeName}
                    </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem', display: 'block' }}>
                    {deviceData ? `${deviceData.latitude.toFixed(4)}, ${deviceData.longitude.toFixed(4)}` : "N/A"}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <HeightIcon sx={{ color: theme.palette.text.primary, fontSize: '2rem', mr: 0.5 }} />
                    <Box>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
                            Altitude
                        </Typography>
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontSize: '1.25rem' }}>
                            {deviceData ? `${deviceData.altitude} m` : "N/A"}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    p: 1,
                    zIndex: 1000,
                }}
            >
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: '0.875rem' }}>
                    {deviceData ? new Date(deviceData.timestamp).toLocaleString('en-US', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }) : "N/A"}
                </Typography>
            </Box>
        </>
    );
};