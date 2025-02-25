import api from './axios';
import { Device, DeviceData } from '../types/device';

export const fetchDevices = async ({ page = 1, search = '' }) => {
  const { data } = await api.get<{ devices: Device[]; total: number }>('/api/devices', {
    params: { page, search, limit: 50 },
  });

  return data;

};

export const fetchDevice = async (id: string) => {
  const { data } = await api.get<Device>(`/api/devices/${id}`);
  return data;
};

export const fetchDeviceData = async (
  deviceId: string,
  { startDate, endDate, page = 1 }: { startDate?: string; endDate?: string; page?: number }
) => {
  const { data } = await api.get<{ data: DeviceData[]; total: number }>(`/api/device-data/${deviceId}`, {
    params: { startDate, endDate, page, limit: 100 },
  });
  return data;
};

export const fetchLiveDevices = async () => {
  const { data } = await api.get<DeviceData[]>('/api/device-data/live');
  return data;
};

export const createDevice = async (device: Partial<Device>) => {
  const { data } = await api.post<Device>('/api/devices', device);
  return data;
};

export const updateDevice = async (id: string, device: Partial<Device>) => {
  const { data } = await api.put<Device>(`/api/devices/${id}`, device);
  return data;
};

export const deleteDevice = async (id: string) => {
  await api.delete(`/api/devices/${id}`);
};