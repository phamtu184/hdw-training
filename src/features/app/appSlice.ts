import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: '',
    reducers: {},
});
// actions
export const appActions = appSlice.actions;
// selectors

// reducer
export default appSlice.reducer;
