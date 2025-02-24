import { useQuery } from '@tanstack/react-query';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { fetchLiveDevices } from '../api/devices';
import { useTranslation } from 'react-i18next';

mapboxgl.accessToken = 'your-mapbox-token';

export const DeviceMap = () => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { t } = useTranslation();
  const theme = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ['liveDevices'],
    queryFn: fetchLiveDevices,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: theme.palette.mode === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11',
        center: [0, 0],
        zoom: 2,
      });
    }

    if (data && map.current) {
      map.current.on('load', () => {
        data.forEach((device) => {
          const temp = device.sensorData.find((s) => s.sensorType === 'TEMPERATURE')?.value || 'N/A';
          new mapboxgl.Marker({ color: temp > 8 ? '#d32f2f' : '#2e7d32' })
              .setLngLat([device.longitude, device.latitude])
              .setPopup(new mapboxgl.Popup().setText(`${device.imei} - Temp: ${temp}°C`))
              .addTo(map.current!);
        });
      });
    }
  }, [data, theme.palette.mode]);

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>{t('deviceMap')}</Typography>
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