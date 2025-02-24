import { useQuery } from '@tanstack/react-query';
import { fetchDeviceData } from '../api/devices';

export const useDeviceData = (
  imei: string,
  options: { startDate?: string; endDate?: string; page?: number } = {}
) => {
  return useQuery({
    queryKey: ['deviceData', imei, options.startDate, options.endDate, options.page],
    queryFn: () => fetchDeviceData(imei, options),
  });
};