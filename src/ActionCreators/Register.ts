import axios from 'axios';
import { History } from 'history';

import { Actions } from 'constants/Authentication';
import { SecureUser } from 'Types/User';

export const registerUser = (user: SecureUser, history: History) => (dispatch: any) => {
  axios.post('/api/users/register', user)
    .then(() => {
      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: Actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};
