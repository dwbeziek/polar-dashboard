import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTheme } from '@mui/material/styles';
import {MapboxMapOverlay} from "./MapboxMapOverlay";

interface MapboxDeviceLocationMonitorProps {
    deviceData: {
        latitude: number;
        longitude: number;
        altitude: number;
        timestamp: string;
    } | null;
}

export const MapboxDeviceLocationMonitor = ({ deviceData }: MapboxDeviceLocationMonitorProps) => {
    const theme = useTheme();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Set Mapbox access token
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHdiZXppZWsiLCJhIjoiY2s4NjM2Z2lpMDB2MDNtcHJndnYyeHQ5dyJ9.hMUfwxksjvbLW-R8WkKxhA'; // Add to .env

        // Initialize map
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: theme.palette.mode === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11',
            zoom: 15,
            center: deviceData
                ? [deviceData.longitude - 0.004, deviceData.latitude - 0.002] // Offset for right quarter, bottom third
                : [18.534847, -33.877778], // Default
        });

        // Add marker
        if (deviceData) {
            new mapboxgl.Marker({ color: '#007cbf' }) // Blue marker
                .setLngLat([deviceData.longitude, deviceData.latitude])
                .addTo(mapRef.current);
        }

        // Cleanup
        return () => {
            mapRef.current?.remove();
        };
    }, []); // Initialize once

    // Update map center and marker on deviceData change
    useEffect(() => {
        if (!mapRef.current || !deviceData) return;

        mapRef.current.setCenter([deviceData.longitude - 0.004, deviceData.latitude - 0.002]); // Offset
        mapRef.current.setZoom(15);

        // Remove existing markers and add new one
        document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
        new mapboxgl.Marker({ color: '#007cbf' })
            .setLngLat([deviceData.longitude, deviceData.latitude])
            .addTo(mapRef.current);
    }, [deviceData]);

    return (
        <div ref={mapContainerRef} style={{ height: '100%', width: '100%', position: 'relative' }}>
            <MapboxMapOverlay deviceData={deviceData} />
        </div>
    );
};