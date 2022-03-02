import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IResponseData } from 'interface';
import { IUser } from 'interface/user';
import { LoginFormValues } from 'validationForm/loginSchema';

export interface IAuthState {
    logging: boolean;
    logged: boolean;
    currentUser?: IUser | null;
    errorMsg: string;
    isAuthen: boolean;
}
const initialState: IAuthState = {
    logging: false,
    logged: false,
    currentUser: null,
    errorMsg: '',
    isAuthen: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkAuth(state, action: PayloadAction<string>) {
            state.isAuthen = true;
        },
        checkAuthSuccess(state, action: PayloadAction<IUser>) {
            state.currentUser = action.payload;
            state.logged = true;
            state.isAuthen = false;
        },
        checkAuthFail(state) {
            state.isAuthen = false;
        },
        login(state, action: PayloadAction<LoginFormValues>) {
            state.logging = true;
            state.errorMsg = '';
        },
        loginSuccess(state, action: PayloadAction<IUser>) {
            state.logging = false;
            state.logged = true;
            state.currentUser = action.payload;
        },
        loginFail(state, action: PayloadAction<IResponseData>) {
            state.logging = false;
            state.currentUser = null;
            state.errorMsg = action.payload.message;
        },
        logout(state) {
            state.currentUser = null;
            state.logged = false;
        },
    },
});
// actions
export const authActions = authSlice.actions;
// selectors
export const selectLogging = (state: RootState) => state.auth.logging;
export const selectLogged = (state: RootState) => state.auth.logged;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectErrorMessage = (state: RootState) => state.auth.errorMsg;
export const selectIsAuthen = (state: RootState) => state.auth.isAuthen;
// reducer
export default authSlice.reducer;
