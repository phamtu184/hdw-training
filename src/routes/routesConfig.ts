import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
enum ROUTE_PATHS {
    ROOT = '/',
    LOGIN = '/login',
}
interface IRoute {
    path: string;
    exact: boolean;
    component: any;
    props?: any;
    isPrivate: boolean;
}
export const privateRoutes: IRoute[] = [
    {
        path: ROUTE_PATHS.ROOT,
        component: HomePage,
        isPrivate: true,
        exact: true,
    },
];
export const publicRoutes: IRoute[] = [
    {
        path: ROUTE_PATHS.LOGIN,
        component: LoginPage,
        isPrivate: true,
        exact: true,
    },
];
