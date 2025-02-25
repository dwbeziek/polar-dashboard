import { useQuery } from '@tanstack/react-query';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchDeviceDataHistory } from '../api/deviceData';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface ChartComponentProps {
    deviceId: string;
    dataKey: string;
    label: string;
    unit?: string;
    color?: string;
    icon?: React.ReactNode;
}

export const ChartComponent = ({ deviceId, dataKey, label, unit = '', color = 'primary.main', icon }: ChartComponentProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [period, setPeriod] = useState('24h');
    const [chartType, setChartType] = useState('line');
    const [chartDataPoints, setChartDataPoints] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });

    const { data, isLoading } = useQuery({
        queryKey: ['deviceDataHistory', deviceId, period],
        queryFn: () => fetchDeviceDataHistory(deviceId, period),
        refetchInterval: 5000, // Match DeviceDashboard refetch
    });

    useEffect(() => {
        if (data && data.results) {
            const newLabels = data.results.map((d: any) => new Date(d.timestamp).toLocaleTimeString());
            const newData = data.results.map((d: any) =>
                dataKey === 'temperature' ?
                    d.sensorData?.find((s: any) => s.sensorType === 'TEMPERATURE')?.value || 0 :
                    d[dataKey] || 0
            );

            setChartDataPoints((prev) => {
                const updatedLabels = [...prev.labels, ...newLabels].slice(-50); // Keep last 50 points
                const updatedData = [...prev.data, ...newData].slice(-50);
                return { labels: updatedLabels, data: updatedData };
            });
        }
    }, [data, dataKey]);

    if (isLoading && chartDataPoints.labels.length === 0) return <Typography>Loading...</Typography>;

    const [paletteKey, shade] = color.split('.');
    const borderColor = shade ? theme.palette[paletteKey as keyof typeof theme.palette][shade as keyof typeof theme.palette[paletteKey]] : theme.palette[paletteKey as keyof typeof theme.palette];
    const backgroundColor = borderColor ? `${borderColor.replace('rgb', 'rgba').replace(')', ', 0.2)')}` : 'rgba(0, 0, 0, 0.2)';

    const chartData = {
        labels: chartDataPoints.labels,
        datasets: [{
            label: `${t(label)} (${unit})`,
            data: chartDataPoints.data,
            borderColor,
            backgroundColor: chartType === 'bar' ? borderColor : backgroundColor,
            fill: chartType === 'line',
            tension: chartType === 'line' ? 0.4 : 0, // Interpolation
            pointRadius: 5,
            pointHoverRadius: 7,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeInOutQuad',
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { font: { size: 14 } },
            },
            x: {
                title: { display: true, text: t('time'), font: { size: 16 } },
                ticks: { font: { size: 14 } },
            },
        },
        plugins: {
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${context.raw} ${unit}`,
                },
            },
            datalabels: { display: false },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {icon}
                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                        {t(label)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Type</InputLabel>
                        <Select value={chartType} onChange={(e) => setChartType(e.target.value)} label="Type">
                            <MenuItem value="line">{t('lineChart')}</MenuItem>
                            <MenuItem value="bar">{t('barChart')}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Period</InputLabel>
                        <Select value={period} onChange={(e) => setPeriod(e.target.value)} label="Period">
                            <MenuItem value="1h">1 Hour</MenuItem>
                            <MenuItem value="24h">24 Hours</MenuItem>
                            <MenuItem value="1w">1 Week</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ height: 300 }}>
                {chartType === 'line' ? <Line data={chartData} options={chartOptions} /> : <Bar data={chartData} options={chartOptions} />}
            </Box>
        </Box>
    );
};