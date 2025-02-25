export const fetchDeviceData = async (deviceId: string, page: number = 1, limit: number = 100) => {
    const response = await fetch(`http://localhost:8080/api/device-data/${deviceId}/latest?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch device data');
    return response.json();
};