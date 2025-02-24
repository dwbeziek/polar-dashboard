import { useQuery } from '@tanstack/react-query';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHdiZXppZWsiLCJhIjoiY2s4NjM2Z2lpMDB2MDNtcHJndnYyeHQ5dyJ9.hMUfwxksjvbLW-R8WkKxhA';

export const DeviceMap = () => {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const { t } = useTranslation();
    const theme = useTheme();

    const { data, isLoading } = useQuery({
        queryKey: ['liveDeviceData'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/api/device-data/live'); // Adjust to your API URL
            if (!response.ok) throw new Error('Failed to fetch live device data');
            return response.json();
        },
        refetchInterval: 5000, // Sync with your 5-second simulator
    });

    useEffect(() => {
        if (!map.current && mapContainer.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: theme.palette.mode === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11',
                center: [20, -30], // Rough center for South Africa to Europe
                zoom: 2,
            });
        }

        if (data && map.current && data.results) {
            map.current.on('load', () => {
                // Clear existing markers
                document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());

                data.results.forEach((deviceData: any) => {
                    const tempSensor = deviceData.sensorDataEntityList.find((sensor: any) => sensor.sensorType === 'TEMPERATURE');
                    const temperature = tempSensor ? tempSensor.value : 'N/A';
                    new mapboxgl.Marker({ color: temperature > 8 ? '#d32f2f' : '#2e7d32' })
                        .setLngLat([deviceData.longitude, deviceData.latitude])
                        .setPopup(new mapboxgl.Popup().setText(`${deviceData.device.imei} - Temp: ${temperature}°C`))
                        .addTo(map.current!);
                });

                // Auto-fit bounds to show all markers
                const bounds = new mapboxgl.LngLatBounds();
                data.results.forEach((d: any) => bounds.extend([d.longitude, d.latitude]));
                map.current.fitBounds(bounds, { padding: 50 });
            });
        }
    }, [data, theme.palette.mode]);

    if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>{t('deviceMap')}</Typography>
            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                    borderRadius: 1,
                    height: '600px',
                    transition: 'all 0.2s ease',
                }}
            >
                <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
            </Box>
        </Box>
    );
};