import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState } from 'react';
import { fetchDevice, updateDevice } from '../api/devices';
import { useDeviceData } from '../hooks/useDeviceData';
import { useTranslation } from 'react-i18next';

export const DeviceDetails = () => {
  const { imei } = useParams();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [editDevice, setEditDevice] = useState({
    name: '',
    code: '',
    description: '',
  });
  const { t } = useTranslation();
  const theme = useTheme();

  const { data: device, isLoading: deviceLoading } = useQuery({
    queryKey: ['device', imei],
    queryFn: () => fetchDevice(imei!),
  });
  const { data: history, isLoading: historyLoading } = useDeviceData(imei!);

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Device>) => updateDevice(imei!, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['device', imei]);
      setEditOpen(false);
    },
  });

  if (deviceLoading || historyLoading)
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  const tempData =
    history?.data.map((d) => ({
      timestamp: new Date(d.timestamp),
      value:
        d.sensorData.find((s) => s.sensorType === 'TEMPERATURE')?.value || 0,
    })) || [];
  const wattsData =
    history?.data.map((d) => ({
      timestamp: new Date(d.timestamp),
      value: d.sensorData.find((s) => s.sensorType === 'WATTS')?.value || 0,
    })) || [];

  const handleEdit = () => {
    setEditDevice({
      name: device?.name || '',
      code: device?.code || '',
      description: device?.description || '',
    });
    setEditOpen(true);
  };

  const handleUpdate = () => updateMutation.mutate(editDevice);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          {device?.name}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          sx={{ textTransform: 'none', transition: 'all 0.2s ease' }}>
          {t('editDevice')}
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: 1,
          p: 2,
          mb: 3,
          transition: 'all 0.2s ease',
        }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
          IMEI: {device?.imei}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
          Code: {device?.code}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
          Description: {device?.description}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
          Latest Sensors:{' '}
          {device?.latest?.sensorData
            .map((s) => `${s.sensorType}: ${s.value}${s.unit}`)
            .join(', ')}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
          Location: Lat: {device?.latest?.latitude}, Lon:{' '}
          {device?.latest?.longitude}, Speed: {device?.latest?.speed}km/h
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: 1,
          p: 2,
          mb: 3,
          transition: 'all 0.2s ease',
        }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, mb: 1, color: theme.palette.text.primary }}>
          {t('thresholds')}
        </Typography>
        <List dense>
          {device?.thresholds.map((t) => (
            <ListItem key={t.id}>
              <ListItemText
                primary={`${t.sensorType} (${t.thresholdType}): ${t.minValue !== null ? t.minValue : ''} - ${t.maxValue !== null ? t.maxValue : ''} ${t.unit}`}
                primaryTypographyProps={{ color: theme.palette.text.primary }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: 1,
          p: 2,
          mb: 3,
          transition: 'all 0.2s ease',
        }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, mb: 1, color: theme.palette.text.primary }}>
          {t('notifications')}
        </Typography>
        <List dense>
          {device?.notifications.map((n) => (
            <ListItem key={n.id}>
              <ListItemText
                primary={n.message}
                primaryTypographyProps={{
                  color: n.read
                    ? theme.palette.text.secondary
                    : theme.palette.error.main,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {tempData.length > 0 && (
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.grey[200]}`,
            borderRadius: 1,
            p: 2,
            mb: 3,
            transition: 'all 0.2s ease',
          }}>
          <LineChart
            xAxis={[
              { data: tempData.map((d) => d.timestamp), scaleType: 'time' },
            ]}
            series={[
              {
                data: tempData.map((d) => d.value),
                label: 'Temperature (°C)',
                color: '#1976d2',
              },
            ]}
            height={300}
          />
          <LineChart
            xAxis={[
              { data: wattsData.map((d) => d.timestamp), scaleType: 'time' },
            ]}
            series={[
              {
                data: wattsData.map((d) => d.value),
                label: 'Watts (W)',
                color: '#0288d1',
              },
            ]}
            height={300}
          />
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: 'none', transition: 'all 0.2s ease' }}>
        {t('downloadReport')}
      </Button>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 1,
            bgcolor: theme.palette.background.paper, // Solid color, no gradient
            transition: 'all 0.2s ease',
          },
        }}>
        <DialogTitle
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          {t('editDevice')}
        </DialogTitle>
        <DialogContent>
          <TextField
            label={t('name')}
            value={editDevice.name}
            onChange={(e) =>
              setEditDevice({ ...editDevice, name: e.target.value })
            }
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            sx={{
              transition: 'all 0.2s ease',
              bgcolor: theme.palette.background.paper,
            }}
          />
          <TextField
            label={t('code')}
            value={editDevice.code}
            onChange={(e) =>
              setEditDevice({ ...editDevice, code: e.target.value })
            }
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            sx={{
              transition: 'all 0.2s ease',
              bgcolor: theme.palette.background.paper,
            }}
          />
          <TextField
            label={t('description')}
            value={editDevice.description}
            onChange={(e) =>
              setEditDevice({ ...editDevice, description: e.target.value })
            }
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            sx={{
              transition: 'all 0.2s ease',
              bgcolor: theme.palette.background.paper,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditOpen(false)}
            sx={{
              textTransform: 'none',
              color: theme.palette.text.secondary,
              transition: 'all 0.2s ease',
            }}>
            {t('cancel')}
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none', transition: 'all 0.2s ease' }}>
            {t('update')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
