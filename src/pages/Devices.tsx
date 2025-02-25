import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Button, IconButton, Menu, MenuItem, Modal, TextField, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Badge
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchDevices, deleteDevice } from '../api/devices';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

export const Devices = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState({ name: '', imei: '', code: '' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['devices', searchParams],
    queryFn: () => fetchDevices(searchParams),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      setOpenDeleteModal(false);
    },
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, device: any) => {
    if (!device || !device.id) {
      console.error('Invalid device selected:', device);
      return;
    }
    setAnchorEl(event.currentTarget);
    setSelectedDevice(device);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDevice(null);
  };

  const handleDelete = () => {
    if (selectedDevice) deleteMutation.mutate(String(selectedDevice.id));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {(error as Error).message}</Typography>;

  return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            {t('devices')}
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/devices/create">
            {t('createDevice')}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
              label={t('searchByName')}
              name="name"
              value={searchParams.name}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
          />
          <TextField
              label={t('searchByImei')}
              name="imei"
              value={searchParams.imei}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
          />
          <TextField
              label={t('searchByCode')}
              name="code"
              value={searchParams.code}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
          />
        </Box>
        <TableContainer sx={{ bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('name')}</TableCell>
                <TableCell>{t('imei')}</TableCell>
                <TableCell>{t('code')}</TableCell>
                <TableCell>{t('description')}</TableCell>
                <TableCell>Status</TableCell> {/* New column */}
                <TableCell>{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.devices.map((device: any) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.imei}</TableCell>
                    <TableCell>{device.code}</TableCell>
                    <TableCell>{device.description}</TableCell>
                    <TableCell>
                      <Badge
                          badgeContent="Active" // Placeholder—replace with real status logic if available
                          color="success"
                          sx={{
                            '& .MuiBadge-badge': {
                              borderRadius: '12px',
                              padding: '2px 8px',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                            },
                          }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, device)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem component={Link} to={`/devices/${selectedDevice?.id}`} onClick={handleMenuClose}>
            {t('viewData')}
          </MenuItem>
          <MenuItem component={Link} to={`/devices/${selectedDevice?.id}/edit`} onClick={handleMenuClose}>
            {t('edit')}
          </MenuItem>
          <MenuItem onClick={() => setOpenDeleteModal(true)}>{t('delete')}</MenuItem>
        </Menu>
        <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            bgcolor: theme.palette.background.paper, p: 3, borderRadius: 1, border: `1px solid ${theme.palette.divider}`,
            maxWidth: 400, width: '100%'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{t('confirmDelete')}</Typography>
            <Typography>{t('areYouSure', { name: selectedDevice?.name || 'Unknown' })}</Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="error" onClick={handleDelete}>
                {t('delete')}
              </Button>
              <Button variant="outlined" onClick={() => setOpenDeleteModal(false)}>
                {t('cancel')}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
  );
};