import { ICity, IListResponse } from 'interface';
import axiosClient from './axiosClient';

const cityApi = {
    fetch(): Promise<IListResponse<ICity>> {
        const url = '/cities';
        return axiosClient.get(url, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
    },
};
export default cityApi;
