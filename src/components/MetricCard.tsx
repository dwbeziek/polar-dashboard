import { Box, Card, CardContent, Chip, IconButton, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Outlined for detail button

interface MetricCardProps {
    title: string;
    value: number | string;
    unit: string;
    icon: ReactNode;
    status?: 'Good' | 'High' | 'Low'; // Shortened status
    thresholdInfo?: string; // User-friendly threshold
    onDetailClick?: () => void; // Callback for detail button
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
                {/* Top Section: Icon and Title */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', position: 'relative' }}>
                    <Box sx={{ fontSize: '2.5rem', color: theme.palette.text.primary, mb:0, pb:0 }}>{icon}</Box> {/* Larger icon */}
                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem', mt:0, pt:0 }}>
                        {title}
                    </Typography>
                    {/* Detail Button (Top Right) */}
                    <IconButton
                        onClick={onDetailClick}
                        sx={{ position: 'absolute', top: 8, right: 8, color: theme.palette.text.primary }}
                    >
                        <InfoOutlinedIcon fontSize="small" /> {/* Outlined icon */}
                    </IconButton>
                </Box>

                {/* Middle Section: Value and Status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        {value} <Typography component="span" sx={{ fontSize: '1.5rem' }}>{unit}</Typography>
                    </Typography>
                    {status && (
                        <Chip
                            label={status}
                            color={statusColor}
                            size="small"
                            sx={{ fontWeight: 500, borderRadius: '12px', px: 1 }}
                        />
                    )}
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