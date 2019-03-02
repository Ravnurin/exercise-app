import { DecodeOptions } from 'jsonwebtoken';
import { History } from 'history';

import { Actions } from 'constants/Authentication';
import setAuthToken from 'Auth/setAuthToken';

export const setCurrentUser = (decoded: DecodeOptions) => ({
  type: Actions.SET_CURRENT_USER,
  payload: decoded
});

export const logoutUser = (history: History) => (dispatch: any) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/login');
};
