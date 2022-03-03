import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import AddEditEmployeeDialog from 'components/employee/AddEditDialog';
import CustomAppTable from 'components/Table';
import { FORM_MODE } from 'constants/employee';
import { employeeActions, selectEmployeeList, selectEmployeeLoading } from 'features/employee/employeeSlice';
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

    const [openDialog, setOpenDialog] = React.useState(false);
    const [mode, setMode] = React.useState(FORM_MODE.ADD);

    const handleClickOpenDialog = (employeeData: IEmployee | null) => {
        if (employeeData === null) {
            setMode(FORM_MODE.ADD);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleEdit = (data: IEmployee) => {
        console.log('handleEdit', data);
    };
    const handleDelete = (data: IEmployee) => {
        console.log('handleDelete', data);
        dispatch(employeeActions.deleteEmployee(data));
    };
    return (
        <div>
            This is Employee management page
            <LoadingButton variant="contained" onClick={() => handleClickOpenDialog(null)}>
                Add
            </LoadingButton>
            <CustomAppTable
                rows={employeeList}
                columns={columns}
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            ></CustomAppTable>
            <AddEditEmployeeDialog open={openDialog} handleClose={handleCloseDialog} mode={mode} />
        </div>
    );
};

export default EmployeePage;
