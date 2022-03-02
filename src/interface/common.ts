export interface IPagination {
    _limit: number;
    _page: number;
    _total: number;
}

export interface IListResponse<Data> {
    data: Data[];
    pagination: IPagination;
}

export interface IListParams<> {
    _page: number;
    _limit: number;
    _sort: string;
    _order: 'asc' | 'desc';

    [key: string]: any;
}

export interface IResponseData<> {
    status: number;
    error: boolean;
    message: string;
    data?: any;
}
