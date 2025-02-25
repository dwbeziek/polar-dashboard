export const fetchDevices = async (searchParams: { name?: string; imei?: string; code?: string } = {}) => {
  const params = new URLSearchParams(searchParams).toString();
  const response = await fetch(`http://localhost:8080/api/devices?${params}`);
  if (!response.ok) throw new Error('Failed to fetch devices');
  return response.json(); // Returns DeviceResponse { devices: Device[] }
};

export const fetchDeviceDetails = async (id: string) => {
  const response = await fetch(`http://localhost:8080/api/devices/${id}`);
  if (!response.ok) throw new Error('Failed to fetch device details');
  return response.json(); // Returns Device
};

export const createDevice = async (device: any) => {
  const response = await fetch(`http://localhost:8080/api/devices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  });
  if (!response.ok) throw new Error('Failed to create device');
  return response.json(); // Returns Device
};

export const updateDevice = async (id: string, device: any) => {
  const response = await fetch(`http://localhost:8080/api/devices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  });
  if (!response.ok) throw new Error('Failed to update device');
  return response.json(); // Returns Device
};

export const deleteDevice = async (id: string) => {
  const response = await fetch(`http://localhost:8080/api/devices/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete device');
};