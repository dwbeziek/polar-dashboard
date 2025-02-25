import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchDevices } from '../api/devices'; // Assuming this is used

export const Dashboard = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ['devices'],
    queryFn: () => fetchDevices(),
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {(error as Error).message}</Typography>;

  const totalDevices = data?.devices.length || 0;
  const alerts = data?.devices.reduce((sum, d) => sum + (d.notifications?.length || 0), 0); // Line 18 - Error here

  return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
          {t('dashboard')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                  {t('totalDevices')}
                </Typography>
                <Typography>{totalDevices}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                  {t('activeAlerts')}
                </Typography>
                <Typography>{alerts}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
  );
};