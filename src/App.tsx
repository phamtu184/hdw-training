import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from 'Layout';
import RequireAuth from 'routes/RequireAuth';
import PublicAuth from 'routes/PublicAuth';
import { privateRoutes, publicRoutes } from 'routes/routesConfig';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectIsAuthen } from 'features/auth/authSlice';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

function App() {
    const dispatch = useAppDispatch();
    const isAuthen = useAppSelector(selectIsAuthen);
    useEffect(() => {
        const access_token = localStorage.getItem('access_token') || '';
        if (Boolean(access_token)) {
            dispatch(authActions.checkAuth(access_token));
        }
    }, []);
    return (
        <>
            {isAuthen ? (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress color="inherit" size={60} />
                        <Typography variant="h5" component="h1" textAlign={'center'}>
                            Authenticated...
                        </Typography>
                    </Box>
                </Backdrop>
            ) : (
                <Routes>
                    <Route element={<Layout />}>
                        {publicRoutes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PublicAuth>
                                            <route.component {...route.props} />
                                        </PublicAuth>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <RequireAuth>
                                            <route.component {...route.props} />
                                        </RequireAuth>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            )}
        </>
    );
}
export default App;
