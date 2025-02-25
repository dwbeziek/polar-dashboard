export const fetchLatestDeviceData = async (deviceId: string, page: number = 1, limit: number = 100) => {
    const response = await fetch(`http://localhost:8080/api/device-data/${deviceId}/latest`);
    if (!response.ok) throw new Error('Failed to fetch latest device data');
    return response.json();
};

export const fetchDeviceDataHistory = async (deviceId: string, page: number = 1, limit: number = 100) => {
    const response = await fetch(`http://localhost:8080/api/device-data/${deviceId}/history?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch device data history');
    return response.json();
};