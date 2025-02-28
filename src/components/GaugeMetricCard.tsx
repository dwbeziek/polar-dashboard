import { Box, Card, CardContent, Chip, IconButton, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import {Gauge, gaugeClasses} from '@mui/x-charts/Gauge';

interface MetricCardProps {
    title: string;
    value: number | string;
    unit: string;
    icon: ReactNode;
    status?: 'Good' | 'High' | 'Low';
    thresholdInfo?: string;
    onDetailClick?: () => void;
}

export const GaugeMetricCard = ({
                               title,
                               value,
                               unit,
                               icon,
                               status,
                               thresholdInfo,
                               onDetailClick,
                           }: MetricCardProps) => {
    const theme = useTheme();

    const statusColor = status === 'Good' ? 'success' : status === 'High' ? 'error' : 'warning';
    const humidityValue: string = value + unit;

    return (
        <Card
            sx={{
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent
                sx={{
                    p: 2, // Increased padding
                    '&:last-child': { pb: 2 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                {/* Top Section: Icon and Title (Left-Aligned) */}
                <Box sx={{ display: 'flex', alignItems: 'start', position: 'relative', mt: 0 , mb: 0}}>
                    <Box sx={{ color: theme.palette.text.primary }}>{icon}</Box>
                    {/* Detail Button (Top Right) */}
                    <IconButton
                        onClick={onDetailClick}
                        sx={{ position: 'absolute', top: -10, right: -10, color: theme.palette.text.primary }}
                    >
                        <ArrowOutwardOutlinedIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'start', position: 'relative', mt: 0 }}>
                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                        {title}
                    </Typography>
                </Box>

                {/* Middle Section: Value and Status */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0, mb: 0}}>
                    <Gauge width={200} height={100} value={value} startAngle={-90} endAngle={90} sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 25,
                            transform: 'translate(0px, 0px)',
                        },
                    }}
                    text={
                        ({value}) => `${value}%`
                    }/>
                </Box>

                {/* Bottom Section: Threshold Info */}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
                        {thresholdInfo || 'No range set'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};