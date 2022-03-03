import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface IConfirm {
    open?: boolean;
    title: string;
    content: string;
    onOk?: any;
    onCancel?: any;
}

export interface IAppState {
    confirm: IConfirm;
}
const initialState: IAppState = {
    confirm: {
        open: false,
        title: '',
        content: '',
        onOk: null,
        onCancel: null,
    },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openConfirm(state, _action: PayloadAction<IConfirm>) {
            state.confirm.open = true;
            state.confirm.title = _action.payload.title;
            state.confirm.content = _action.payload.content;
            state.confirm.onOk = _action.payload.onOk;
            state.confirm.onCancel = _action.payload.onCancel;
        },
        closeConfirm(state) {
            state.confirm = {
                open: false,
                title: '',
                content: '',
                onOk: null,
                onCancel: null,
            };
        },
    },
});
// actions
export const appActions = appSlice.actions;
// selectors
export const selectConfirm = (state: RootState) => state.app.confirm;
// reducer
export default appSlice.reducer;
