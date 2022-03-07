import { PayloadAction } from '@reduxjs/toolkit';
import employeeApi from 'api/employeeApi';
import { IEmployee, IListParams, IListResponse } from 'interface';
import { call, cps, delay, put, takeLatest } from 'redux-saga/effects';
import { employeeActions, IPayloadEmployeeCallback } from './employeeSlice';

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
    yield delay(1000);
    try {
        const response: IEmployee = yield call(employeeApi.add, action.payload);
        yield put(employeeActions.addEmployeeSuccess(response));
    } catch (error: any) {
        yield put(employeeActions.addEmployeeFail(error));
    }
    yield put(employeeActions.closeEmployeeDialog());
}

function* deleteEmployee(action: PayloadAction<IPayloadEmployeeCallback>) {
    yield delay(1000);
    try {
        yield call(employeeApi.remove, action.payload.data?.id ?? '');
        yield put(employeeActions.deleteEmployeeSuccess(action.payload.data));
        yield cps(action.payload.callback);
    } catch (error: any) {
        yield put(employeeActions.deleteEmployeeFail(error));
    }
}

function* editEmployee(action: PayloadAction<IEmployee>) {
    yield delay(1000);
    try {
        yield call(employeeApi.update, action.payload);
        yield put(employeeActions.editEmployeeSuccess(action.payload));
    } catch (error: any) {
        yield put(employeeActions.editEmployeeFail(error));
    }
    yield put(employeeActions.closeEmployeeDialog());
}

export default function* employeeSaga() {
    yield takeLatest(employeeActions.fetchEmployeeList, fetchEmployeeList);
    yield takeLatest(employeeActions.addEmployee, addEmployee);
    yield takeLatest(employeeActions.deleteEmployee, deleteEmployee);
    yield takeLatest(employeeActions.editEmployee, editEmployee);
}
