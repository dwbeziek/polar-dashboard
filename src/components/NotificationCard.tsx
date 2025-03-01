import { Box, Card, CardContent, Typography, Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material/styles';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotificationsByDevice } from '../api/notifications';
import {blue} from "@mui/material/colors";

const ITEMS_PER_PAGE = 5;

export const NotificationCard = ({ deviceId }: { deviceId: string }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);

    const { data: notifications, isLoading } = useQuery<Notification[]>({
        queryKey: ['notifications', deviceId],
        queryFn: () => fetchNotificationsByDevice(deviceId),
    });

    const totalNotifications = notifications?.length || 0;
    const totalPages = Math.ceil(totalNotifications / ITEMS_PER_PAGE);
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalNotifications);
    const paginatedNotifications = notifications?.slice(startIndex, endIndex) || [];

    const handlePreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

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
                    p: 2,
                    '&:last-child': { pb: 2 },
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Badge badgeContent={totalNotifications} color="primary">
                        <NotificationsIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                    </Badge>
                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                        Notifications
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <Timeline
                        sx={{
                            m: 0,
                            p: 0,
                            '& .MuiTimelineItem-root:before': { display: 'none' },
                        }}
                    >
                        {paginatedNotifications.length > 0 ? (
                            paginatedNotifications.map((notification, index) => {
                                console.log(`Notification ${notification.id} read status: ${notification.read}`); // Debug log
                                return (
                                    <TimelineItem key={notification.id} sx={{ mb: 1 }}>
                                        <TimelineSeparator>
                                            <CircleIcon color={'blue'}
                                                sx={{
                                                    fontSize: 10,
                                                    // color: notification.read ? theme.palette.grey[500] : theme.palette.primary.main, // Direct color
                                                    color: blue,
                                                    ml: 0.5,
                                                }}
                                            />
                                            {index < paginatedNotifications.length - 1 && (
                                                <TimelineConnector sx={{ bgcolor: theme.palette.divider, width: 1, ml: 0.5 }} />
                                            )}
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: 0.5, pl: 1.5, pr: 0 }}>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: '0.875rem' }}>
                                                {notification.message}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
                                                {new Date(notification.timestamp).toLocaleString()}
                                            </Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                );
                            })
                        ) : (
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, p: 1 }}>
                                No notifications
                            </Typography>
                        )}
                    </Timeline>
                </Box>
                {totalNotifications > ITEMS_PER_PAGE && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <IconButton
                            onClick={handlePreviousPage}
                            disabled={page === 0}
                            size="small"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, alignSelf: 'center' }}>
                            {page + 1} / {totalPages}
                        </Typography>
                        <IconButton
                            onClick={handleNextPage}
                            disabled={page === totalPages - 1}
                            size="small"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};