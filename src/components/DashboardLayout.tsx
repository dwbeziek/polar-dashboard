import { useState } from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import MapIcon from '@mui/icons-material/Map';
import ReportIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { LanguageSelector } from './LanguageSelector'; // Only change: imported component

const drawerWidth = 240;

export const DashboardLayout = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        Polar Dashboard
                    </Typography>
                    <LanguageSelector /> {/* Only change: replaced inline selector */}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', p: 1, justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/devices">
                        <ListItemIcon><DevicesIcon /></ListItemIcon>
                        <ListItemText primary="Devices" />
                    </ListItem>
                    <ListItem button component={Link} to="/device-map">
                        <ListItemIcon><MapIcon /></ListItemIcon>
                        <ListItemText primary="Device Map" />
                    </ListItem>
                    <ListItem button component={Link} to="/reports">
                        <ListItemIcon><ReportIcon /></ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItem>
                    <ListItem button component={Link} to="/settings">
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button component={Link} to="/login">
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
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
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};