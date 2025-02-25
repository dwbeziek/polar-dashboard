import { useQuery } from '@tanstack/react-query';
import { fetchLatestDeviceData } from '../api/deviceData';

export const useDeviceData = (
    deviceId: string,
  options: { startDate?: string; endDate?: string; page?: number } = {}
) => {
  return useQuery({
    queryKey: ['deviceData', deviceId, options.startDate, options.endDate, options.page],
    queryFn: () => fetchLatestDeviceData(deviceId, options),
  });
};