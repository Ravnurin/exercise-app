import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Location } from 'history';

interface Props {
  component: React.ComponentClass;
  location?: Location;
  path: string;
  exact: boolean;
}

export const PrivateRoute = ({ component: Component, ...rest }: Props) => (
  <Route {...rest} render={props => (
    localStorage.jwtToken
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);
