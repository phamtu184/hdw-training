import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { selectLogged } from 'features/auth/authSlice';
import Header from 'components/Header';

const Layout: React.FC = () => {
    const auth = useAppSelector(selectLogged);
    if (!auth) {
        return (
            <div>
                <Outlet />
            </div>
        );
    }
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};
export default Layout;
