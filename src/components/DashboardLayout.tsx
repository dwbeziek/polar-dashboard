import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import MapIcon from '@mui/icons-material/Map';
import ReportIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const drawerWidthFull = 260;
const drawerWidthMinimal = 64;

export const DashboardLayout = () => {
  const [isMinimal, setIsMinimal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerWidth =
    isMinimal && !isMobile ? drawerWidthMinimal : drawerWidthFull;

  const menuItems = [
    { text: t('dashboard'), icon: <DashboardIcon />, path: '/' },
    { text: t('devices'), icon: <DevicesIcon />, path: '/devices' },
    { text: t('deviceMap'), icon: <MapIcon />, path: '/device-map' },
    { text: t('reports'), icon: <ReportIcon />, path: '/reports' },
    { text: t('settings'), icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsMinimal((prev) => !prev);
    } else {
      setMobileOpen((prev) => !prev);
    }
  };

  const handleTitleClick = () => {
    if (isMinimal && !isMobile) setIsMinimal(false);
    navigate('/');
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: theme.palette.grey[mode === 'light' ? 50 : 900], // Light: #f5f5f5, Dark: #212121
        color: theme.palette.text.primary,
        transition: 'background-color 0.3s ease',
      }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: isMinimal ? 'center' : 'space-between',
        }}>
        {!isMinimal && (
          <Typography
            variant="h6"
            noWrap
            sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
            IoT Toolpad
          </Typography>
        )}
        {!isMobile && (
          <IconButton
            onClick={toggleSidebar}
            sx={{ ml: 'auto', color: theme.palette.text.primary }}>
            <ChevronLeftIcon
              sx={{
                transform: isMinimal ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            />
          </IconButton>
        )}
      </Toolbar>
      <Divider sx={{ bgcolor: theme.palette.grey[200] }} />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button // Correct shorthand for button={true}
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              py: 1.5,
              mx: isMinimal ? 0 : 1,
              borderRadius: isMinimal ? 0 : 4,
              bgcolor:
                location.pathname === item.path
                  ? theme.palette.action.selected
                  : 'transparent',
              justifyContent: isMinimal ? 'center' : 'flex-start',
              '&:hover': {
                bgcolor: theme.palette.action.hover,
                transition: 'background-color 0.2s ease',
              },
              transition: 'all 0.2s ease',
            }}>
            <ListItemIcon
              sx={{
                minWidth: isMinimal ? 'auto' : 40,
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                transition: 'color 0.2s ease',
              }}>
              {item.icon}
            </ListItemIcon>
            {!isMinimal && (
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 500,
                  color:
                    location.pathname === item.path
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: theme.palette.grey[200] }} />
      <List>
        <ListItem
          button // Correct shorthand for button={true}
          onClick={handleLogout}
          sx={{
            py: 1.5,
            mx: isMinimal ? 0 : 1,
            borderRadius: isMinimal ? 0 : 4,
            justifyContent: isMinimal ? 'center' : 'flex-start',
            '&:hover': {
              bgcolor: theme.palette.action.hover,
              transition: 'background-color 0.2s ease',
            },
            transition: 'all 0.2s ease',
          }}>
          <ListItemIcon
            sx={{
              minWidth: isMinimal ? 'auto' : 40,
              color: theme.palette.text.secondary,
              transition: 'color 0.2s ease',
            }}>
            <LogoutIcon />
          </ListItemIcon>
          {!isMinimal && (
            <ListItemText
              primary={t('logout')}
              primaryTypographyProps={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}
            />
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor:
            mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.background.paper, // Light: #f5f5f5, Dark: #1e1e1e
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          transition: theme.transitions.create(
            ['background-color', 'border-bottom'],
            {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }
          ),
        }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              color: theme.palette.text.secondary,
            }}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              flexGrow: 1,
            }}
            onClick={handleTitleClick}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ height: 28, mr: 1, display: { xs: 'none', sm: 'block' } }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
              IoT Toolpad
            </Typography>
          </Box>
          <IconButton
            onClick={toggleTheme}
            sx={{ color: theme.palette.text.secondary }}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            bgcolor: theme.palette.grey[mode === 'light' ? 50 : 900], // Light: #f5f5f5, Dark: #212121
            transition: theme.transitions.create(
              ['width', 'background-color'],
              {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }
            ),
            // Debug log for Drawer background color
            ...(console.log(
              'Drawer bgcolor:',
              theme.palette.grey[mode === 'light' ? 50 : 900]
            ),
            {}),
          },
        }}>
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: '64px',
          bgcolor: theme.palette.background.default,
          minHeight: '100vh',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}>
        <Outlet />
      </Box>
    </Box>
  );
};
