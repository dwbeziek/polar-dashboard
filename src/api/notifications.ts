export const fetchNotificationsByDevice = async (deviceId: string) => {
    const response = await fetch(`http://localhost:8080/api/notifications/device/${deviceId}`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return response.json(); // Returns Notification[]
};