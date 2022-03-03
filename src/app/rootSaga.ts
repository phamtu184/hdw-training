import authSaga from 'features/auth/authSaga';
import employeeSaga from 'features/employee/employeeSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([authSaga(), employeeSaga()]);
}
