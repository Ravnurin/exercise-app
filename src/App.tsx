import React from 'react';
import { Router, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { Container, Jumbotron } from 'reactstrap';
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

export default function App() {
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
    <Jumbotron>
      <Container fluid className='App' style={{ marginTop: '5rem' }}>
        <Router history={history}>
          <div>
            <Header />
            {getToastr()}
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/customise' component={CustomiseExercises} />
            <PrivateRoute exact path='/nutrition' component={Nutrition} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </div>
        </Router>
      </Container>
    </Jumbotron>
  );
}
