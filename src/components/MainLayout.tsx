import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const MainLayout = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
      {' '}
      {/* Offset for fixed AppBar */}
      <Navbar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}>
        <Outlet /> {/* Renders the current route's component */}
      </Box>
    </Box>
  );
};
