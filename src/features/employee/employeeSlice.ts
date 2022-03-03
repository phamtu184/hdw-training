import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IEmployee, IListParams, IListResponse, IPagination, IResponseData } from 'interface';

export interface IEmployeeState {
    loading: boolean;
    list: IEmployee[];
    pagination: IPagination;
}
const initialState: IEmployeeState = {
    loading: false,
    list: [],
    pagination: {
        _page: 1,
        _limit: 15,
        _total: 0,
    },
};

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        fetchEmployeeList(state, _action: PayloadAction<IListParams>) {
            state.loading = true;
        },
        fetchEmployeeListSuccess(state, action: PayloadAction<IListResponse<IEmployee>>) {
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
        },
        fetchEmployeeListFailed(state, _action: PayloadAction<IResponseData>) {
            state.loading = false;
        },
        addEmployee(state, _action: PayloadAction<IEmployee>) {
            state.loading = true;
        },
        addEmployeeSuccess(state, action: PayloadAction<IEmployee>) {
            state.list.push(action.payload);
            state.loading = false;
        },
        addEmployeeFail(state, _action: PayloadAction<IResponseData>) {
            state.loading = false;
        },
        deleteEmployee(state, _action: PayloadAction<IEmployee>) {
            state.loading = true;
        },
        deleteEmployeeSuccess(state, action: PayloadAction<IEmployee>) {
            const index = state.list.findIndex((item) => item.id === action.payload.id);
            if (index > -1) {
                state.list.splice(index, 1);
            }
            state.loading = false;
        },
        deleteEmployeeFail(state, _action: PayloadAction<IResponseData>) {
            state.loading = false;
        },
        clearEmployee(state) {
            state.loading = false;
            state.list = [];
            state.pagination = {
                _page: 1,
                _limit: 15,
                _total: 0,
            };
        },
    },
});
// actions
export const employeeActions = employeeSlice.actions;
// selectors
export const selectEmployeeList = (state: RootState) => state.employee.list;
export const selectEmployeeLoading = (state: RootState) => state.employee.loading;
export const selectEmployeePagination = (state: RootState) => state.employee.pagination;
// reducer
export default employeeSlice.reducer;
