import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function RequireAuth({ children }: any) {
    const auth = false;
    const location = useLocation();

    if (!auth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}
export default RequireAuth;
