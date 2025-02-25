import { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchDeviceData } from '../api/deviceData';
import Papa from 'papaparse';
import { useTranslation } from 'react-i18next';

export const Reports = () => {
    const [imei, setImei] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { t } = useTranslation();
    const theme = useTheme();
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['report', imei, startDate, endDate],
        queryFn: () => fetchDeviceData(imei, { startDate, endDate }),
        enabled: false,
    });

    const handleGenerateReport = () => {
        refetch().then((result) => {
            if (result.data) {
                const csvData = result.data.data.map((d) => ({
                    Timestamp: d.timestamp,
                    Temperature: d.sensorData.find((s) => s.sensorType === 'TEMPERATURE')?.value,
                    Watts: d.sensorData.find((s) => s.sensorType === 'WATTS')?.value,
                    Latitude: d.latitude,
                    Longitude: d.longitude,
                    Speed: d.speed,
                }));
                const csv = Papa.unparse(csvData);
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${imei}_report_${startDate}_${endDate}.csv`;
                a.click();
            }
        });
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>{t('reports')}</Typography>
            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                    borderRadius: 1,
                    p: 2,
                    transition: 'all 0.2s ease',
                }}
            >
                <TextField
                    label={t('deviceIMEI')}
                    value={imei}
                    onChange={(e) => setImei(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    sx={{ transition: 'all 0.2s ease', maxWidth: 300 }}
                />
                <TextField
                    label={t('startDate')}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ transition: 'all 0.2s ease', maxWidth: 300 }}
                />
                <TextField
                    label={t('endDate')}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ transition: 'all 0.2s ease', maxWidth: 300 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerateReport}
                    disabled={isLoading}
                    sx={{ mt: 2, transition: 'all 0.2s ease' }}
                >
                    {isLoading ? <CircularProgress size={24} /> : t('generateReport')}
                </Button>
            </Box>
        </Box>
    );
};