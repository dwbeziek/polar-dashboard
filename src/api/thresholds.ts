export const fetchThresholdsByDevice = async (deviceId: string) => {
    const response = await fetch(`http://localhost:8080/api/thresholds/device/${deviceId}`);
    if (!response.ok) throw new Error('Failed to fetch thresholds');
    return response.json(); // Returns Threshold[]
};