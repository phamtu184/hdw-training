import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { appActions, selectAppNotify } from 'features/app/appSlice';
import * as React from 'react';

function Notify() {
    const dispatch = useAppDispatch();
    const notify = useAppSelector(selectAppNotify);
    const { show, autoHideDuration, content, severity } = notify;
    const handleClose = () => {
        dispatch(appActions.closeNotify());
    };
    return (
        <Snackbar
            open={show}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
                {content}
            </Alert>
        </Snackbar>
    );
}
export default Notify;
