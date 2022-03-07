import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface INotify {
    show?: boolean;
    autoHideDuration?: number;
    severity: 'success' | 'error' | 'warning' | 'info';
    content: string;
}
export interface IAppState {
    notify: INotify;
}
const initialState: IAppState = {
    notify: {
        show: false,
        autoHideDuration: 6000,
        severity: 'success',
        content: '',
    },
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showNotify(state, _action: PayloadAction<INotify>) {
            state.notify.show = true;
            state.notify.severity = _action.payload.severity;
            state.notify.content = _action.payload.content;
        },
        closeNotify(state) {
            state.notify = initialState.notify;
        },
    },
});
// actions
export const appActions = appSlice.actions;
// selectors
export const selectAppNotify = (state: RootState) => state.app.notify;
// reducer
export default appSlice.reducer;
