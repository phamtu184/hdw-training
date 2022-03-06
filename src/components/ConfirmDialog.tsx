import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import React, { useState } from 'react';

interface IConfirm {
    open?: boolean;
    title: string;
    content: string;
    onOk?: () => void | null;
    onCancel?: () => void | null;
}
const initialState: IConfirm = {
    open: false,
    title: '',
    content: '',
    onOk: () => null,
    onCancel: () => null,
};
export function useConfirmHook() {
    const [confirm, setConfirm] = useState(initialState);

    const openConfirm = (action: IConfirm) => {
        setConfirm({
            open: true,
            title: action.title,
            content: action.content,
            onOk: action.onOk,
            onCancel: action.onCancel,
        });
    };
    const closeConfirm = () => {
        setConfirm(initialState);
    };
    return { openConfirm, closeConfirm, confirm };
}
interface IProps {
    confirm: IConfirm;
    loading?: boolean;
}
const ConfirmDialog: React.FC<IProps> = ({ confirm, loading = false }) => {
    const { title, content, open, onCancel, onOk } = confirm;

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleOk = () => {
        if (onOk) {
            onOk();
        }
    };

    return (
        <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={open || false}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{content}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <LoadingButton onClick={handleOk} loading={loading}>
                    Ok
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDialog;
