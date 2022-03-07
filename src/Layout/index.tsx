import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { selectLogged } from 'features/auth/authSlice';
import Header from 'Layout/Header';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Layout: React.FC = () => {
    const auth = useAppSelector(selectLogged);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    if (!auth) {
        return (
            <div>
                <Outlet />
            </div>
        );
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};
export default Layout;
