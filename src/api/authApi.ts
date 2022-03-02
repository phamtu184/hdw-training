import { IResponseData } from 'interface';
import { IUser } from 'interface/user';
import { LoginFormValues } from 'validationForm/loginSchema';
import axiosClient from './axiosClient';

const authApi = {
    login(data: LoginFormValues): Promise<IUser> {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },
    checkAuth(data: any): Promise<IResponseData> {
        const url = '/auth/check-auth';
        return axiosClient.post(url, { access_token: data });
    },
};
export default authApi;
