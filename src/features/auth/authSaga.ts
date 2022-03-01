import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { IUser } from 'interface/user';
import { take, fork, call, put } from 'redux-saga/effects';
import { LoginFormValues } from 'validationForm/loginSchema';
import { authActions } from './authSlice';

const isLoggedIn = Boolean(localStorage.getItem('access_token'));
function* handleLogin(payload: LoginFormValues) {
    try {
        const response: IUser = yield call(authApi.login, payload);
        localStorage.setItem('access_token', response.access_token);
        yield put(authActions.loginSuccess(response));
    } catch (err: any) {
        yield put(authActions.loginFail(err));
    }
}

function* handleLogout() {
    if (isLoggedIn) {
        localStorage.removeItem('access_token');
    }
}

function* watchLoginFlow() {
    while (true) {
        if (!isLoggedIn) {
            const action: PayloadAction<LoginFormValues> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        } else {
            yield take(authActions.logout.type);
            yield call(handleLogout);
        }
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}
