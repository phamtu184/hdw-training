import { PayloadAction } from '@reduxjs/toolkit';
import employeeApi from 'api/employeeApi';
import { IEmployee, IListParams, IListResponse } from 'interface';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { employeeActions } from './employeeSlice';

function* fetchEmployeeList(action: PayloadAction<IListParams>) {
    yield delay(1000);
    try {
        const response: IListResponse<IEmployee> = yield call(employeeApi.fetch, action.payload);
        yield put(employeeActions.fetchEmployeeListSuccess(response));
    } catch (error: any) {
        yield put(employeeActions.fetchEmployeeListFailed(error));
    }
}

function* addEmployee(action: PayloadAction<IEmployee>) {
    try {
        const response: IEmployee = yield call(employeeApi.add, action.payload);
        yield put(employeeActions.addEmployeeSuccess(response));
    } catch (error: any) {
        yield put(employeeActions.addEmployeeFail(error));
    }
}

function* deleteEmployee(action: PayloadAction<IEmployee>) {
    try {
        yield call(employeeApi.remove, action.payload?.id ?? '');
        yield put(employeeActions.deleteEmployeeSuccess(action.payload));
    } catch (error: any) {
        yield put(employeeActions.deleteEmployeeFail(error));
    }
}

export default function* employeeSaga() {
    yield takeLatest(employeeActions.fetchEmployeeList, fetchEmployeeList);
    yield takeLatest(employeeActions.addEmployee, addEmployee);
    yield takeLatest(employeeActions.deleteEmployee, deleteEmployee);
}
