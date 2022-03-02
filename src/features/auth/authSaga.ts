import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { IUser } from 'interface/user';
import { take, fork, call, put, all, delay } from 'redux-saga/effects';
import { LoginFormValues } from 'validationForm/loginSchema';
import { authActions } from './authSlice';
import History from 'routes/history';
import { IResponseData } from 'interface';

function* handleLogin(payload: LoginFormValues) {
    try {
        const response: IUser = yield call(authApi.login, payload);
        localStorage.setItem('access_token', response.access_token);
        yield put(authActions.loginSuccess(response));
        History.push('/');
    } catch (err: any) {
        yield put(authActions.loginFail(err));
    }
}

function* handleLogout() {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (isLoggedIn) {
        localStorage.removeItem('access_token');
        History.push('/login');
    }
}

function* watchLoginFlow() {
    while (true) {
        const actionLogin: PayloadAction<LoginFormValues> = yield take(authActions.login.type);
        yield fork(handleLogin, actionLogin.payload);

        yield take([authActions.loginFail.type, authActions.logout.type]);
        yield fork(handleLogout);
    }
}
// blocking: take, call
// non-blocking: put, fork
function* handleCheckAuth() {
    try {
        const action: PayloadAction = yield take(authActions.checkAuth.type);
        const infoUser: IResponseData = yield call(authApi.checkAuth, action.payload);
        yield delay(1000);
        yield put(authActions.checkAuthSuccess(infoUser.data));

        yield take(authActions.logout.type);
        yield call(handleLogout);
    } catch (err) {
        yield put(authActions.checkAuthFail());
    }
}

export default function* authSaga() {
    yield all([watchLoginFlow(), handleCheckAuth()]);
}
