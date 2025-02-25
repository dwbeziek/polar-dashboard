import { useQuery } from '@tanstack/react-query';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchDeviceDataHistory } from '../api/deviceData';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartComponentProps {
    deviceId: string;
    dataKey: string;
    label: string;
    unit?: string;
    color?: string;
}

export const ChartComponent = ({ deviceId, dataKey, label, unit = '', color = 'primary.main' }: ChartComponentProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [period, setPeriod] = useState('24h'); // Changed from '1h' to '24h'

    const { data, isLoading } = useQuery({
        queryKey: ['deviceDataHistory', deviceId, period],
        queryFn: () => fetchDeviceDataHistory(deviceId, period),
    });

    if (isLoading) return <Typography>Loading...</Typography>;

    const [paletteKey, shade] = color.split('.');
    const borderColor = shade ? theme.palette[paletteKey as keyof typeof theme.palette][shade as keyof typeof theme.palette[paletteKey]] : theme.palette[paletteKey as keyof typeof theme.palette];
    const backgroundColor = borderColor ? `${borderColor.replace('rgb', 'rgba').replace(')', ', 0.2)')}` : 'rgba(0, 0, 0, 0.2)';

    const chartData = {
        labels: data?.results.map((_, i) => `${-(data.results.length - 1 - i) * 5}s`) || [], // Adjust for larger dataset?
        datasets: [{
            label: `${t(label)} (${unit})`,
            data: data?.results.map((d: any) =>
                dataKey === 'temperature' ?
                    d.sensorDataEntityList?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 0 :
                    d[dataKey] || 0
            ) || [],
            borderColor,
            backgroundColor,
            fill: false,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true }, x: { title: { display: true, text: 'Time (hours ago)' } } }, // Updated label
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                    {t(label)}
                </Typography>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Period</InputLabel>
                    <Select value={period} onChange={(e) => setPeriod(e.target.value)} label="Period">
                        <MenuItem value="1h">1 Hour</MenuItem>
                        <MenuItem value="24h">24 Hours</MenuItem>
                        <MenuItem value="1w">1 Week</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ height: 300 }}>
                <Line data={chartData} options={chartOptions} />
            </Box>
        </Box>
    );
};