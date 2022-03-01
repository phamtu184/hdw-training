import { Paper, Typography, Box, createTheme, TextField, Grid } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import loginSchema, { LoginFormValues } from 'validationForm/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectErrorMessage, selectLogging } from 'features/auth/authSlice';
import { LoadingButton } from '@mui/lab';

const theme = createTheme();

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    papper: {
        minWidth: '500px',
        padding: theme.spacing(3),
    },
    buttonBox: {
        display: 'flex',
        justifyContent: 'end',
    },
    contentBox: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

const LoginPage: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const errorResponse = useAppSelector(selectErrorMessage);
    const isLoadingBtn = useAppSelector(selectLogging);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    const handleLogin: SubmitHandler<LoginFormValues> = (data) => {
        dispatch(authActions.login(data));
    };
    return (
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <Paper elevation={2} className={classes.papper}>
                    <Typography variant="h5" component="h1" textAlign={'center'}>
                        Login
                    </Typography>
                    <Grid container spacing={2} className={classes.contentBox}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                {...register('username')}
                                error={(errors.username?.message ? true : false) || errorResponse ? true : false}
                                helperText={errors.username?.message || errorResponse}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type={'password'}
                                {...register('password')}
                                error={errors.password?.message ? true : false}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                    </Grid>
                    <Box className={classes.buttonBox}>
                        <LoadingButton variant="contained" type="submit" loading={isLoadingBtn}>
                            Submit
                        </LoadingButton>
                    </Box>
                </Paper>
            </form>
        </div>
    );
};

export default LoginPage;
