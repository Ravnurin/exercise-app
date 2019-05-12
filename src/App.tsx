import React from 'react';
import { Router, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';

import setAuthToken from 'Auth/setAuthToken';
import { PrivateRoute } from 'Auth/PrivateRoute';
import { history } from 'Utils/history';
import store from 'Store';

import { setCurrentUser /* , logoutUser */ } from './ActionCreators/Authentication';
import Header from 'Layout/Header';
import { Home } from 'Components/Home';
import { CustomiseExercises } from 'Components/Customise';
import { Login } from 'Components/Login';
import { Register } from 'Components/Register';
import { Nutrition } from 'Components/Nutrition';
import { Profile } from 'Components/Profile';

import './styles/App.scss';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode<any>(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  /* const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    const logout = logoutUser as any;
    store.dispatch(logout(history));
    window.location.href = '/login';
  } */
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export default function App() {
  const classes = useStyles();
  const getToastr = () => {
    return (
      <ReduxToastr
        timeOut={4000}
        newestOnTop={true}
        preventDuplicates
        position='top-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        closeOnToastrClick
      />
    );
  };
  return (
    <div className={classes.root}>
      <Grid container className='App'>
        <Grid item xs={12}>
          <Router history={history}>
            <Header />
            {getToastr()}
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/customise' component={CustomiseExercises} />
            <PrivateRoute exact path='/nutrition' component={Nutrition} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Router>
        </Grid>
      </Grid>
    </div>
  );
}
