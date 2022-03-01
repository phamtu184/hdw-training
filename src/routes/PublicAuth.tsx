import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function PublicAuth({ children }: any) {
    const auth = false;
    const location = useLocation();

    if (auth) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
}
export default PublicAuth;
