import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { selectLogged } from 'features/auth/authSlice';

function PublicAuth({ children }: any) {
    const auth = useAppSelector(selectLogged);
    const location = useLocation();

    if (auth) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
}
export default PublicAuth;
