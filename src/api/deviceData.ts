export const fetchLatestDeviceData = async (deviceId: string) => {
    const response = await fetch(`http://localhost:8080/api/device-data/${deviceId}/latest`);
    if (!response.ok) throw new Error('Failed to fetch latest device data');
    return response.json(); // Returns DeviceDataResponse { results: DeviceDataDTO[] }
};

export const fetchDeviceDataHistory = async (deviceId: string, period: string = '1h') => {
    const response = await fetch(`http://localhost:8080/api/device-data/${deviceId}/history?period=${period}`);
    if (!response.ok) throw new Error('Failed to fetch device data history');
    return response.json(); // Returns DeviceDataResponse { results: DeviceDataDTO[] }
};

export const fetchAllLatestDeviceData = async () => {
    const response = await fetch(`http://localhost:8080/api/device-data/live`);
    if (!response.ok) throw new Error('Failed to fetch all latest device data');
    return response.json(); // Returns DeviceDataResponse { results: DeviceDataDTO[] }
};