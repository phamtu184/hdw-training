import React from 'react';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { MoreVert, Menu as MenuIcon } from '@mui/icons-material';
import { drawerWidth } from 'constants/mui';

interface Props {
    open: boolean;
    handleDrawerOpen: () => void;
}
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const Header: React.FC<Props> = ({ open, handleDrawerOpen }) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openSubmenu = Boolean(anchorEl);
    const handleClickSubmenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseSubmenu = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(authActions.logout());
    };
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div">
                    Simple App
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton size="large" edge="end" color="inherit" onClick={handleClickSubmenu}>
                    <MoreVert />
                </IconButton>
                <Menu anchorEl={anchorEl} open={openSubmenu} onClose={handleCloseSubmenu}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
