import { IEmployee, IListParams, IListResponse } from 'interface';
import axiosClient from './axiosClient';

const employeeApi = {
    fetch(params: IListParams): Promise<IListResponse<IEmployee>> {
        const url = '/employees';
        return axiosClient.get(url, { params });
    },

    getById(id: string): Promise<IEmployee> {
        const url = '/employees/' + id;
        return axiosClient.get(url);
    },

    add(data: IEmployee): Promise<IEmployee> {
        const url = '/employees';
        return axiosClient.post(url, data);
    },

    update(data: IEmployee): Promise<IEmployee> {
        const url = '/employees';
        return axiosClient.patch(url, data);
    },

    remove(id: string): Promise<IListResponse<IEmployee>> {
        const url = '/employees/' + id;
        return axiosClient.delete(url);
    },
};
export default employeeApi;
