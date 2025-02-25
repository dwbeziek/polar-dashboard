import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchAllLatestDeviceData } from '../api/deviceData';
import { Link } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Fridge
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat'; // Ship
import { useEffect, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';

// Custom flat icon generator
const createIcon = (IconComponent: React.ElementType, color: string) => {
    const iconHtml = ReactDOMServer.renderToString(<IconComponent style={{ color, fontSize: '24px' }} />);
    return new L.DivIcon({
        html: `<div style="display: flex; align-items: center; justify-content: center;">${iconHtml}</div>`,
        className: 'custom-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

export const DeviceMap = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    const { data, isLoading, error } = useQuery({
        queryKey: ['allLatestDeviceData'],
        queryFn: () => fetchAllLatestDeviceData(),
    });

    // Fix Leaflet icon issue in React
    useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    }, []);

    const fridgeIcon = useMemo(() => createIcon(AcUnitIcon, theme.palette.primary.main), [theme]);
    const shipIcon = useMemo(() => createIcon(DirectionsBoatIcon, theme.palette.secondary.main), [theme]);

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
                        icon={d.speed ? shipIcon : fridgeIcon} // Speed > 0 for ships, else fridges
                    >
                        <Popup>
                            <Typography variant="h6">Device {d.deviceId}</Typography>
                            <Typography>Temp: {d.sensorDataEntityList?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 'N/A'} °C</Typography>
                            <Typography>Speed: {d.speed || 'N/A'} km/h</Typography>
                            <Typography>Lat: {d.latitude || 'N/A'}, Lon: {d.longitude || 'N/A'}</Typography>
                            <Button component={Link} to={`/devices/${d.deviceId}`} variant="contained" size="small" sx={{ mt: 1 }}>
                                {t('viewData')}
                            </Button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
};