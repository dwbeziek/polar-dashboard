import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useTheme } from '@mui/material/styles';
import { MapOverlay } from './MapOverlay';
import { useEffect } from 'react';

interface DeviceLocationMonitorProps {
    deviceData: {
        latitude: number;
        longitude: number;
        altitude: number;
        timestamp: string;
    } | null;
}

export const DeviceLocationMonitor = ({ deviceData }: DeviceLocationMonitorProps) => {
    const theme = useTheme();
    const position: LatLngExpression = deviceData
        ? [deviceData.latitude, deviceData.longitude]
        : [-33.877778, 18.534847]; // Default fallback

    // Custom component to update map view
    const MapUpdater = () => {
        const map = useMap();
        useEffect(() => {
            if (deviceData) {
                // Offset center: right quarter, bottom third
                map.setView([deviceData.latitude - 0.002, deviceData.longitude - 0.004], 16);
            }
        }, [deviceData, map]);
        return null;
    };

    return (
        <MapContainer
            center={position}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapUpdater />
            {deviceData && (
                <Marker
                    position={position}
                    icon={L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                    })}
                />
            )}
            <MapOverlay deviceData={deviceData} />
        </MapContainer>
    );
};