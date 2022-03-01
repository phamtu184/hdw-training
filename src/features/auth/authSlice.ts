import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IErrorResponse } from 'interface';
import { IUser } from 'interface/user';
import { LoginFormValues } from 'validationForm/loginSchema';

export interface IAuthState {
    logging: boolean;
    currentUser?: IUser | null;
    errorMsg: string;
}
const initialState: IAuthState = {
    logging: false,
    currentUser: null,
    errorMsg: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginFormValues>) {
            state.logging = true;
            state.errorMsg = '';
        },
        loginSuccess(state, action: PayloadAction<IUser>) {
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFail(state, action: PayloadAction<IErrorResponse>) {
            state.logging = false;
            state.currentUser = null;
            state.errorMsg = action.payload.message;
        },
        logout(state) {
            state.currentUser = null;
        },
    },
});
// actions
export const authActions = authSlice.actions;
// selectors
export const selectLogging = (state: RootState) => state.auth.logging;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectErrorMessage = (state: RootState) => state.auth.errorMsg;
// reducer
export default authSlice.reducer;
