import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { auth } from './firebase';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SignUpPage from './pages/SignUpPage';
import { useAppDispatch } from './hooks/useRedux';
import { setUser } from './store/authSlice';
import PublicRoute from './components/PublicRoute';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        const userDate: User = {
          uid: user.uid,
          displayName: user.displayName as string,
          email: user.email as string
        }
        dispatch(setUser(userDate));
      }
    });
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/product/:id' exact component={ProductPage} />
        <PublicRoute path='/login' exact component={LoginPage} />
        <PublicRoute path='/signup' exact component={SignUpPage} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
