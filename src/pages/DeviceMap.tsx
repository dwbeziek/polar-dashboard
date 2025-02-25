import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchAllLatestDeviceData } from '../api/deviceData';
import { Link } from 'react-router-dom';

// Custom icons
const fridgeIcon = new L.Icon({ iconUrl: '❄️', iconSize: [25, 25] }); // Replace with real icon
const shipIcon = new L.Icon({ iconUrl: '🚢', iconSize: [25, 25] }); // Replace with real icon

export const DeviceMap = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    const { data, isLoading, error } = useQuery({
        queryKey: ['allLatestDeviceData'],
        queryFn: () => fetchAllLatestDeviceData(),
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {(error as Error).message}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                {t('deviceMap')}
            </Typography>
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data?.results.map((d: any) => (
                    <Marker
                        key={d.deviceId}
                        position={[d.latitude || 0, d.longitude || 0]}
                        icon={d.speed ? shipIcon : fridgeIcon} // Example logic—adjust as needed
                    >
                        <Popup>
                            <Typography variant="h6">{d.deviceId}</Typography>
                            <Typography>Temp: {d.sensorDataEntityList?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 'N/A'} °C</Typography>
                            <Typography>Speed: {d.speed || 'N/A'} km/h</Typography>
                            <Button component={Link} to={`/devices/${d.deviceId}`} variant="contained" size="small">
                                {t('viewData')}
                            </Button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
};