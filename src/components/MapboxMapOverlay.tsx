import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeightIcon from '@mui/icons-material/Height';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

interface MapboxMapOverlayProps {
    deviceData: {
        latitude: number;
        longitude: number;
        altitude: number;
        timestamp: string;
    } | null;
}

export const MapboxMapOverlay = ({ deviceData }: MapboxMapOverlayProps) => {
    const theme = useTheme();
    const [placeName, setPlaceName] = useState('Unknown Location');

    // Fetch real place name via Mapbox Reverse Geocoding
    useEffect(() => {
        if (!deviceData) return;

        const fetchPlaceName = async () => {
            const token =  'pk.eyJ1IjoiZHdiZXppZWsiLCJhIjoiY2s4NjM2Z2lpMDB2MDNtcHJndnYyeHQ5dyJ9.hMUfwxksjvbLW-R8WkKxhA';
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${deviceData.longitude},${deviceData.latitude}.json?access_token=${token}&types=place,locality,neighborhood,poi`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                const feature = data.features[0]; // Most relevant result
                setPlaceName(feature ? feature.place_name : 'Unknown Location'); // City, suburb, or POI
            } catch (error) {
                console.error('Error fetching place name:', error);
                setPlaceName('Unknown Location');
            }
        };

        fetchPlaceName();
    }, [deviceData]);

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
                        {placeName} {/* Real place name */}
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