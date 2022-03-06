import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import employeeSchema from 'validationForm/employeeSchema';
import { IEmployee } from 'interface';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import DateMomentUtils from '@date-io/moment';
import { FORM_MODE } from 'constants/employee';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { employeeActions, selectEmployeeLoading } from 'features/employee/employeeSlice';

interface Props {
    open: boolean;
    handleClose: () => void;
    mode: FORM_MODE;
    defaultValue?: IEmployee | null;
}
const AddEditEmployeeDialog: React.FC<Props> = ({ handleClose, open, mode, defaultValue }) => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        clearErrors,
    } = useForm<IEmployee>({
        resolver: yupResolver(employeeSchema),
    });
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectEmployeeLoading);

    useEffect(() => {
        clearErrors();
        if (open && defaultValue) {
            setValue('name', defaultValue.name);
            setValue('gender', defaultValue.gender);
            setValue('birthDate', defaultValue.birthDate);
            setValue('salary', defaultValue.salary);
        } else if (!defaultValue) {
            setValue('name', '');
            setValue('gender', 'male');
            setValue('birthDate', new Date());
            setValue('salary', 0);
        }
    }, [defaultValue, open]);

    const handleAddEdit: SubmitHandler<IEmployee> = (data) => {
        if (mode === FORM_MODE.ADD) {
            dispatch(employeeActions.addEmployee(data));
        } else if (mode === FORM_MODE.EDIT) {
            dispatch(employeeActions.editEmployee({ ...data, id: defaultValue?.id || '' }));
        }
    };
    return (
        <Dialog open={open} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit(handleAddEdit)}>
                <DialogTitle>{mode === FORM_MODE.ADD ? 'Add' : 'Edit'}</DialogTitle>
                <DialogContent style={{ paddingTop: '20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                {...register('name')}
                                error={errors.name?.message ? true : false}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                select
                                fullWidth
                                label="Gender"
                                defaultValue={'male'}
                                inputProps={register('gender')}
                                error={errors.gender?.message ? true : false}
                                helperText={errors.gender?.message}
                            >
                                <MenuItem value={'male'}>Male</MenuItem>
                                <MenuItem value={'female'}>Female</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <LocalizationProvider dateAdapter={DateMomentUtils}>
                                <Controller
                                    name="birthDate"
                                    control={control}
                                    defaultValue={new Date()}
                                    render={({ field: { ref, ...rest } }) => (
                                        <DesktopDatePicker
                                            label="Birth date"
                                            inputFormat="DD/MM/YYYY"
                                            inputRef={ref}
                                            {...rest}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={errors.birthDate?.message ? true : false}
                                                    helperText={errors.birthDate?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Salary"
                                variant="outlined"
                                {...register('salary')}
                                type="number"
                                error={errors.salary?.message ? true : false}
                                helperText={errors.salary?.message}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton type="submit" variant="contained" loading={loading}>
                        Submit
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddEditEmployeeDialog;
