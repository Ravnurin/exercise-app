import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/Authentication';
import { SecureUser } from 'Types/User';
import { setAuth } from 'Auth/setAuthToken';
import { setCurrentUser } from './Authentication';

export const loginUser = (user: SecureUser) => (dispatch: any) => {
  axios.post('/api/users/login', user)
    .then(res => {
      const { token } = res.data;
      const decoded = jwt_decode(token);
      setAuth(token);
      dispatch(setCurrentUser(decoded));
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
