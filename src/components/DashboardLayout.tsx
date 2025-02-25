import {useContext, useState} from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../hooks/useAuth';
import {ThemeContext} from '../contexts/ThemeContext';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import MapIcon from '@mui/icons-material/Map';
import ReportIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {LanguageSelector} from "./LanguageSelector";

const drawerWidthFull = 260;
const drawerWidthMinimal = 64;

export const DashboardLayout = () => {
    const [isMinimal, setIsMinimal] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const { toggleTheme, mode } = useContext(ThemeContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const drawerWidth = isMinimal && !isMobile ? drawerWidthMinimal : drawerWidthFull;

    const menuItems = [
        { text: t('dashboard'), icon: <DashboardIcon />, path: '/', category: 'Main item' },
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
                bgcolor: theme.palette.mode === 'light' ? '#fcfcfc' : '#0d1117',
                color: theme.palette.text.primary,
                transition: 'background-color 0.3s ease',
                mt: '64px',
                pt: 0,
            }}
        >
            <List sx={{ flexGrow: 1, pt: 0 }}>
                {menuItems.map((item, index) => (
                    <Box key={item.text}>
                        {item.category && !isMinimal && (
                            <Typography
                                variant="body2"
                                sx={{
                                    px: 2,
                                    py: 0.25,
                                    color: theme.palette.text.secondary,
                                    fontWeight: 600,
                                }}
                            >
                                {item.category}
                            </Typography>
                        )}
                        {item.category && !isMinimal && index > 0 && (
                            <Divider sx={{ bgcolor: theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d', my: 1 }} />
                        )}
                        <ListItem
                            component="button"
                            onClick={() => {
                                navigate(item.path);
                                if (isMobile) setMobileOpen(false);
                            }}
                            sx={{
                                py: 0.75,
                                mx: isMinimal ? 0 : 1,
                                borderRadius: isMinimal ? 0 : 1,
                                bgcolor: location.pathname === item.path ? theme.palette.action.selected : 'transparent',
                                justifyContent: isMinimal ? 'center' : 'flex-start',
                                '&:hover': {
                                    bgcolor: theme.palette.action.hover,
                                    transition: 'background-color 0.2s ease',
                                    cursor: 'pointer',
                                },
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                border: 'none',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: isMinimal ? 'auto' : 40,
                                    color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
                                    transition: 'color 0.2s ease',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {!isMinimal && (
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: 500,
                                        fontSize: '0.875rem',
                                        color: location.pathname === item.path ? theme.palette.text.primary : theme.palette.text.secondary,
                                    }}
                                />
                            )}
                        </ListItem>
                    </Box>
                ))}
            </List>
            <Divider
                sx={{
                    bgcolor: theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d',
                    height: '1px',
                    border: 'none',
                    my: 0,
                }}
            />
            <List sx={{ py: 0 }}>
                <ListItem
                    component="button"
                    onClick={handleLogout}
                    sx={{
                        py: 1.5,
                        mx: isMinimal ? 0 : 1,
                        borderRadius: 0, // No rounding for logout
                        bgcolor: 'transparent', // Distinct from menu items
                        justifyContent: isMinimal ? 'center' : 'flex-start',
                        '&:hover': {
                            bgcolor: mode === 'light' ? '#f5f6fa' : '#21262d', // Subtle hover distinct from menu
                            transition: 'background-color 0.2s ease',
                            cursor: 'pointer',
                        },
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        border: 'none',
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: isMinimal ? 'auto' : 40,
                            color: theme.palette.text.secondary,
                            transition: 'color 0.2s ease',
                        }}
                    >
                        <LogoutIcon />
                    </ListItemIcon>
                    {!isMinimal && (
                        <ListItemText
                            primary={`${t('logout')} (${user?.role || 'User'})`}
                            primaryTypographyProps={{ color: theme.palette.text.secondary, fontWeight: 500, fontSize: '0.875rem' }}
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
                    bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                    width: '100%',
                    transition: theme.transitions.create('background-color', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{
                            mr: 2,
                            color: theme.palette.text.secondary,
                            border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                            borderRadius: 1,
                            p: 0.75,
                            height: 36,
                        }}
                    >
                        {isMinimal ? <MenuIcon /> : <MenuOpenIcon />}
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: 1 }} onClick={handleTitleClick}>
                        <Box
                            component="img"
                            src="/logo.png"
                            alt="Logo"
                            sx={{ height: 28, mr: 1, display: { xs: 'none', sm: 'block' } }}
                        />
                        <Typography variant="h6" noWrap sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                            Cryolytix
                        </Typography>
                    </Box>
                    <LanguageSelector />
                    <IconButton
                        onClick={toggleTheme}
                        sx={{
                            color: theme.palette.text.secondary,
                            border: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                            borderRadius: 1,
                            p: 0.75,
                            height: 36,
                        }}
                    >
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
                        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#e5e7eb' : '#30363d'}`,
                        top: '64px',
                        maxHeight: 'calc(100vh - 64px)',
                        overflowY: 'hidden',
                        transition: theme.transitions.create(['width'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                }}
            >
                {drawerContent}
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: '64px',
                    bgcolor: theme.palette.mode === 'light' ? '#fcfcfc' : '#0d1117',
                    minHeight: '100vh',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    transition: theme.transitions.create('background-color', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};