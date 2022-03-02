import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export default function Header() {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(authActions.logout());
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div">
                    Simple App
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton size="large" edge="end" color="inherit" onClick={handleClick}>
                    <MoreVert />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
