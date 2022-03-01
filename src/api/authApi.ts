import { IUser } from 'interface/user';
import { LoginFormValues } from 'validationForm/loginSchema';
import axiosClient from './axiosClient';

const authApi = {
    login(data: LoginFormValues): Promise<IUser> {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },
};
export default authApi;
