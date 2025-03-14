import { Box, Card, CardContent, Chip, IconButton, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined'; // Outlined for detail button

interface MetricCardProps {
    title: string;
    value: number | string;
    unit: string;
    icon: ReactNode;
    status?: 'Good' | 'High' | 'Low';
    thresholdInfo?: string;
    onDetailClick?: () => void;
}

export const MetricCard = ({
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="h3" sx={{ fontWeight: 500, fontSize: '4.5rem', color: theme.palette.text.primary, pr: 0, mr: 0 }}>
                        {value} <Typography  component="span" sx={{ fontSize: '2rem', pl: 0, ml: 0 }}>{unit}</Typography>
                    </Typography>
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