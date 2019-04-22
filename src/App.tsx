import React from 'react';
import { Router, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { Grid, createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import jwt_decode from 'jwt-decode';

import setAuthToken from 'Auth/setAuthToken';
import { PrivateRoute } from 'Auth/PrivateRoute';
import { history } from 'Utils/history';
import store from 'Store';

import { setCurrentUser/* , logoutUser */ } from './ActionCreators/Authentication';
import Header from 'Layout/Header';
import { Home } from 'Components/Home';
import { CustomiseExercises } from 'Components/Customise';
import { Login } from 'Components/Login';
import { Register } from 'Components/Register';

import './styles/App.scss';
import { Nutrition } from 'Components/Nutrition';

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

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

interface Props extends WithStyles<typeof styles> { }

function App({ classes }: Props) {
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
  }
  return (
    <div className={classes.root}>
      <Grid container className='App' spacing={24}>
        <Grid item xs={12}>
          <Router history={history}>
            <Header />
            {getToastr()}
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/customise' component={CustomiseExercises} />
            <PrivateRoute exact path='/nutrition' component={Nutrition} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Router>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(App);