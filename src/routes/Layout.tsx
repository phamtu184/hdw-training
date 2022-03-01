import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const auth = false;
    if (!auth) {
        return (
            <div>
                <Outlet />
            </div>
        );
    }
    return (
        <div>
            <ul>
                <li>
                    <Link to="/login">Login Page</Link>
                </li>
                <li>
                    <Link to="/">Home Page</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
};
export default Layout;
