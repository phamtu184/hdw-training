import Employee from 'pages/EmployeeManagement';
import LoginPage from 'pages/Login';
import SomePage from 'pages/Another';
import React from 'react';
import { People, Mail } from '@mui/icons-material';

enum ROUTE_PATHS {
    EMPLOYEE = '/',
    LOGIN = '/login',
    SOME = '/some',
}
interface IRoute {
    path: string;
    exact: boolean;
    component: React.ElementType;
    icon?: any;
    name: string;
    props?: any;
}
export const privateRoutes: IRoute[] = [
    {
        path: ROUTE_PATHS.EMPLOYEE,
        component: Employee,
        exact: true,
        name: 'Employee',
        icon: People,
    },
    {
        path: ROUTE_PATHS.SOME,
        component: SomePage,
        exact: true,
        name: 'Some page',
        icon: Mail,
    },
];
export const publicRoutes: IRoute[] = [
    {
        path: ROUTE_PATHS.LOGIN,
        component: LoginPage,
        exact: true,
        name: 'Login',
    },
];
