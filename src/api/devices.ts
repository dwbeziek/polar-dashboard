import api from './axios';
import { Device, DeviceData } from '../types/device';

export const fetchDevices = async ({ page = 1, search = '' }) => {
  const { data } = await api.get<{ devices: Device[]; total: number }>('/api/devices', {
    params: { page, search, limit: 50 },
  });

  return data;

};

export const fetchDevice = async (imei: string) => {
  const { data } = await api.get<Device>(`/api/devices/${imei}`);
  return data;
};

export const fetchDeviceData = async (
  imei: string,
  { startDate, endDate, page = 1 }: { startDate?: string; endDate?: string; page?: number }
) => {
  const { data } = await api.get<{ data: DeviceData[]; total: number }>(`/api/devices/${imei}/data`, {
    params: { startDate, endDate, page, limit: 100 },
  });
  return data;
};

export const fetchLiveDevices = async () => {
  const { data } = await api.get<DeviceData[]>('/api/devices/live');
  return data;
};

export const createDevice = async (device: Partial<Device>) => {
  const { data } = await api.post<Device>('/api/devices', device);
  return data;
};

export const updateDevice = async (imei: string, device: Partial<Device>) => {
  const { data } = await api.put<Device>(`/api/devices/${imei}`, device);
  return data;
};

export const deleteDevice = async (imei: string) => {
  await api.delete(`/api/devices/${imei}`);
};