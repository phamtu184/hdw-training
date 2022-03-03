import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { appActions, selectConfirm } from 'features/app/appSlice';
import * as React from 'react';

const ConfirmDialog: React.FC = () => {
    const confirm = useAppSelector(selectConfirm);
    const { title, content, open, onCancel, onOk } = confirm;
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        dispatch(appActions.closeConfirm());
    };

    const handleOk = () => {
        if (onOk) {
            onOk();
        }
        dispatch(appActions.closeConfirm());
    };

    return (
        <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={open || false}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{content}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDialog;
