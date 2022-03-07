import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ConfirmDialog, { useConfirmHook } from 'components/ConfirmDialog';
import AddEditEmployeeDialog from 'components/employee/AddEditDialog';
import CustomAppTable from 'components/Table';
import { FORM_MODE } from 'constants/employee';
import {
    employeeActions,
    selectEmployeeList,
    selectEmployeeLoading,
    selectOpenEmployeeDialog,
} from 'features/employee/employeeSlice';
import { IEmployee } from 'interface';
import React, { useEffect } from 'react';
interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
const columns: Column[] = [
    { id: 'id', label: 'id', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 150 },
    {
        id: 'gender',
        label: 'Gender',
        minWidth: 100,
    },
    {
        id: 'birthDate',
        label: 'Birth Date',
        minWidth: 100,
    },
    {
        id: 'salary',
        label: 'Salary',
        minWidth: 100,
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 100,
    },
];

const EmployeePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const employeeList = useAppSelector(selectEmployeeList);
    const loading = useAppSelector(selectEmployeeLoading);
    const openDialog = useAppSelector(selectOpenEmployeeDialog);
    useEffect(() => {
        const listParams = {
            _page: 1,
            _limit: 10,
        };
        dispatch(employeeActions.fetchEmployeeList(listParams));
        return () => {
            dispatch(employeeActions.clearEmployee());
        };
    }, []);

    const [mode, setMode] = React.useState(FORM_MODE.ADD);
    const [defaultValue, setDefaultValue] = React.useState<IEmployee | null>(null);
    const { openConfirm, confirm, closeConfirm } = useConfirmHook();

    const handleClickOpenDialog = (employeeData: IEmployee | null) => {
        if (employeeData === null) {
            setMode(FORM_MODE.ADD);
            setDefaultValue(null);
        }
        dispatch(employeeActions.openEmployeeDialog());
    };

    const handleCloseDialog = () => {
        dispatch(employeeActions.closeEmployeeDialog());
    };
    const handleEdit = (data: IEmployee) => {
        setMode(FORM_MODE.EDIT);
        dispatch(employeeActions.openEmployeeDialog());
        setDefaultValue(data);
    };
    const handleDelete = (data: IEmployee) => {
        const param = {
            data,
            callback: closeConfirm,
        };
        const payload = {
            title: 'Delete',
            content: `Are you sure to delete ${data.name} employee?`,
            onOk: () => {
                dispatch(employeeActions.deleteEmployee(param));
            },
            onCancel: closeConfirm,
        };
        openConfirm(payload);
    };
    return (
        <div>
            <LoadingButton variant="contained" onClick={() => handleClickOpenDialog(null)}>
                Add
            </LoadingButton>
            <ConfirmDialog confirm={confirm} loading={loading} />
            <CustomAppTable
                rows={employeeList}
                columns={columns}
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            ></CustomAppTable>
            <AddEditEmployeeDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                mode={mode}
                defaultValue={defaultValue}
            />
        </div>
    );
};

export default EmployeePage;
