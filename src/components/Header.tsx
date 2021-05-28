import { AppBar, Button, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import { selectAuth, signOut } from '../store/authSlice';
import { useAppDispatch } from './../hooks/useRedux';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  title: {
    marginRight: 'auto'
  }
}))

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const auth = useAppSelector(selectAuth);

  const handleSignOut = () => {
    dispatch(signOut());
  }

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Recomendation network
        </Typography>
        {!auth.authorized && <Button component={NavLink} to='/login' color='inherit'>Login</Button>}
        {!auth.authorized && <Button component={NavLink} to='/signup' color='inherit'>Sign Up</Button>}
        {auth.authorized && <Button component={NavLink} to='/' color='inherit' onClick={handleSignOut}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
