import { useAppSelector } from 'app/hooks';
import { selectLogged } from 'features/auth/authSlice';
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function RequireAuth({ children }: any) {
    const auth = useAppSelector(selectLogged);
    const location = useLocation();

    if (!auth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}
export default RequireAuth;
