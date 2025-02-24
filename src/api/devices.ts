import api from './axios';
import { Device, DeviceData } from '..//types/device';

export const fetchDevices = async ({ page = 1, search = '' }) => {
  // const { data } = await api.get<{ devices: Device[]; total: number }>('/devices', {
  //   params: { page, search, limit: 50 },
  // });

  // return data;
return {
    devices: [
      {
        id: 1,
        imei: '123456789',
        code: 'FRIDGE01',
        name: 'Fridge 1',
        description: 'Main storage fridge',
        thresholds: [
          {
            id: 1,
            deviceId: 1,
            thresholdType: 'RANGE',
            sensorType: 'TEMPERATURE',
            parameterCode: '10800',
            unit: 'CELSIUS',
            minValue: 2,
            maxValue: 8,
          },
        ],
        notifications: [],
        latest: {
          imei: '123456789',
          timestamp: '2025-02-23T10:00:00Z',
          latitude: 51.5074,
          longitude: -0.1278,
          altitude: 10,
          angle: 90,
          satellites: 8,
          speed: 0,
          sensorData: [
            { parameterCode: '10800', sensorType: 'TEMPERATURE', value: 5.5, unit: 'CELSIUS' },
            { parameterCode: '10801', sensorType: 'WATTS', value: 150, unit: 'WATTS' },
          ],
        },
      },
    ],
    total: 1,
  };

};

export const fetchDevice = async (imei: string) => {
  const { data } = await api.get<Device>(`/devices/${imei}`);
  return data;
};

export const fetchDeviceData = async (
  imei: string,
  { startDate, endDate, page = 1 }: { startDate?: string; endDate?: string; page?: number }
) => {
  const { data } = await api.get<{ data: DeviceData[]; total: number }>(`/devices/${imei}/data`, {
    params: { startDate, endDate, page, limit: 100 },
  });
  return data;
};

export const fetchLiveDevices = async () => {
  const { data } = await api.get<DeviceData[]>('/devices/live');
  return data;
};

export const createDevice = async (device: Partial<Device>) => {
  const { data } = await api.post<Device>('/devices', device);
  return data;
};

export const updateDevice = async (imei: string, device: Partial<Device>) => {
  const { data } = await api.put<Device>(`/devices/${imei}`, device);
  return data;
};

export const deleteDevice = async (imei: string) => {
  await api.delete(`/devices/${imei}`);
};