import { Box, Card, CardContent, Typography, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'; // Correct import
import { useQuery } from '@tanstack/react-query';
import LazyLoad from 'react-lazyload'; // For lazy loading
import { fetchNotificationsByDevice } from '../api/notifications'; // Adjust path if needed


interface NotificationCardProps {
    deviceId: string;
}

export const NotificationCard = ({ deviceId }: NotificationCardProps) => {
    const theme = useTheme();

    const { data: notifications, isLoading } = useQuery<Notification[]>({
        queryKey: ['notifications', deviceId],
        queryFn: () => fetchNotificationsByDevice(deviceId),
    });

    const totalNotifications = notifications?.length || 0;

    if (isLoading) return <Typography>Loading...</Typography>;

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
                    p: 1,
                    '&:last-child': { pb: 1 },
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Badge badgeContent={totalNotifications} color="primary">
                        <NotificationsIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                    </Badge>
                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                        Notifications
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <Timeline sx={{ m: 0, p: 0 }}>
                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <LazyLoad key={notification.id} height={60} offset={100} once>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                variant={notification.read ? 'outlined' : 'filled'}
                                                sx={{
                                                    bgcolor: notification.read ? 'transparent' : theme.palette.primary.main,
                                                    borderColor: theme.palette.primary.main,
                                                    width: 10,
                                                    height: 10,
                                                    m: 0,
                                                }}
                                            />
                                            <TimelineConnector sx={{ bgcolor: theme.palette.divider }} />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: 0.5, px: 1 }}>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                                                {notification.message}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                                {new Date(notification.timestamp).toLocaleString()}
                                            </Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                </LazyLoad>
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, p: 1 }}>
                                No notifications
                            </Typography>
                        )}
                    </Timeline>
                </Box>
            </CardContent>
        </Card>
    );
};