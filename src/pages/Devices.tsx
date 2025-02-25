import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  TextField,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDevices, createDevice, deleteDevice } from '../api/devices';
import { debounce } from '../utils/debounce';
import { useTranslation } from 'react-i18next';

export const Devices = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({ imei: '', name: '', code: '', description: '' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const theme = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ['devices', search],
    queryFn: () => fetchDevices({ search }),
  });

  const createMutation = useMutation({
    mutationFn: createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries(['devices']);
      setOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => queryClient.invalidateQueries(['devices']),
  });

  const debouncedSetSearch = useCallback(debounce((value: string) => setSearch(value), 300), []);

  const handleCreate = () => createMutation.mutate(newDevice);

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>{t('error')}: {(error as Error).message}</Typography>;

  const totalCount = data?.total ?? data?.devices?.length ?? 0;

  return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>{t('devices')}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
              label={t('search')}
              value={search}
              onChange={(e) => debouncedSetSearch(e.target.value)}
              sx={{ width: '300px', transition: 'all 0.2s ease' }}
              variant="outlined"
              size="small"
          />
          <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              sx={{ transition: 'all 0.2s ease' }}
          >
            {t('addDevice')}
          </Button>
        </Box>
        <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
              borderRadius: 1,
            }}
        >
          <List sx={{ maxHeight: '600px', overflow: 'auto' }}>
            {totalCount === 0 ? (
                <Typography sx={{ p: 2, color: theme.palette.text.secondary }}>{t('noDevices')}</Typography>
            ) : (
                (data?.devices || []).map((device, index) => (
                    <Box key={device.id}>
                      <ListItem
                          secondaryAction={
                            <Button
                                variant="text"
                                color="error"
                                onClick={() => deleteMutation.mutate(device.id)}
                                sx={{ transition: 'all 0.2s ease' }}
                            >
                              {t('delete')}
                            </Button>
                          }
                          sx={{ '&:hover': { bgcolor: theme.palette.grey[100], transition: 'all 0.2s ease' } }}
                      >
                        <ListItemText
                            primary={`${device.name} - ${device.id} - ${device.imei}`}
                            secondary={device.notifications.some((n) => !n.read) ? t('unreadAlerts') : null}
                            primaryTypographyProps={{ fontWeight: 500, color: theme.palette.text.primary }}
                            secondaryTypographyProps={{ color: theme.palette.error.main }}
                            onClick={() => navigate(`/devices/${device.id}`)}
                            sx={{ cursor: 'pointer' }}
                        />
                      </ListItem>
                      {index < totalCount - 1 && <Divider sx={{ bgcolor: theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d' }} />}
                    </Box>
                ))
            )}
          </List>
        </Box>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              '& .MuiDialog-paper': {
                borderRadius: 1,
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
              },
            }}
        >
          <DialogTitle sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{t('addDevice')}</DialogTitle>
          <DialogContent>
            <TextField
                label="IMEI"
                value={newDevice.imei}
                onChange={(e) => setNewDevice({ ...newDevice, imei: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                sx={{ transition: 'all 0.2s ease' }}
            />
            <TextField
                label={t('name')}
                value={newDevice.name}
                onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                sx={{ transition: 'all 0.2s ease' }}
            />
            <TextField
                label={t('code')}
                value={newDevice.code}
                onChange={(e) => setNewDevice({ ...newDevice, code: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                sx={{ transition: 'all 0.2s ease' }}
            />
            <TextField
                label={t('description')}
                value={newDevice.description}
                onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                sx={{ transition: 'all 0.2s ease' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={{ color: theme.palette.text.secondary, transition: 'all 0.2s ease' }}>
              {t('cancel')}
            </Button>
            <Button onClick={handleCreate} variant="contained" color="primary" sx={{ transition: 'all 0.2s ease' }}>
              {t('create')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};