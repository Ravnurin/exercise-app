import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/Authentication';
import { SecureUser } from 'Types/User';
import { setAuth } from 'Auth/setAuthToken';
import { setCurrentUser } from './Authentication';

export const loginUser = (user: SecureUser) => (dispatch: any) => {
  axios.post('/api/users/login', user)
    .then(({ data: { token }}: any) => {
      setAuth(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: Actions.CLEAR_ERRORS,
        payload: {}
      });
      toastr.success('Login Success', '');
    })
    .catch(err => {
      dispatch({
        type: Actions.GET_ERRORS,
        payload: err.response.data
      });
      toastr.error('Login Failed', '');
    });
};
