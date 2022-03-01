import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from 'routes/Layout';
import RequireAuth from 'routes/RequireAuth';
import PublicAuth from 'routes/PublicAuth';
import { privateRoutes, publicRoutes } from 'routes/routesConfig';
import cityApi from 'api/cityApi';

function App() {
    useEffect(() => {
        cityApi.fetch().then((res) => console.log(res));
    }, []);
    return (
        <div>
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
        </div>
    );
}
export default App;
