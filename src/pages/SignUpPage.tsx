import React, {useEffect} from 'react';
import { TextField, makeStyles, Theme, Button } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import Layout from '../components/Layout';
import { useAppDispatch, useAppSelector } from './../hooks/useRedux';
import { selectAuth, signUp, removeError } from '../store/authSlice';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: `0 ${-theme.spacing(1)}px`,
  },
  formItem: {
    flex: '1 1 50%',
    padding: `0 ${theme.spacing(1)}px`,
    marginBottom: theme.spacing(2),
  },
  formInput: {
    width: '100%',
  },
  errorLabel: {
    color: theme.palette.secondary.main,
    fontSize: theme.typography.overline.fontSize,
  },
}));

const SignUpPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserInputs>();

  useEffect(() => {
    dispatch(removeError());
  }, [])

  const onSubmit: SubmitHandler<UserInputs> = ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    dispatch(signUp({ firstName, lastName, email, password }));
  };

  return (
    <Layout container='sm'>
      <form
        className={classes.form}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.formItem}>
          <TextField
            className={classes.formInput}
            id='firstName'
            label='First Name'
            variant='outlined'
            {...register('firstName', { required: true })}
          />
          {errors.firstName && (
            <span className={classes.errorLabel}>This field is required</span>
          )}
        </div>
        <div className={classes.formItem}>
          <TextField
            className={classes.formInput}
            id='lastName'
            label='Last Name'
            variant='outlined'
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <span className={classes.errorLabel}>This field is required</span>
          )}
        </div>
        <div className={classes.formItem}>
          <TextField
            className={classes.formInput}
            type='email'
            id='email'
            label='Email'
            variant='outlined'
            {...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          {errors.email && (
            <span className={classes.errorLabel}>This field is required</span>
          )}
        </div>
        <div className={classes.formItem}>
          <TextField
            className={classes.formInput}
            type='password'
            id='password'
            label='Password'
            variant='outlined'
            {...register('password', {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,'\-\|\[\]]{6,50}$/,
            })}
          />
          {errors.password && (
            <span className={classes.errorLabel}>This field is required</span>
          )}
        </div>

        <div className={classes.formItem}>
          <Button type='submit' variant='contained' color='primary'>
            Sign Up
          </Button>
        </div>
      </form>

      {auth.error && <Alert severity="error">{auth.error}</Alert>}
    </Layout>
  );
};

export default SignUpPage;
