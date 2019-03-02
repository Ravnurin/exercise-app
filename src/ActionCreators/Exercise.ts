import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/Exercise';
import { Actions as ErrorAction } from 'constants/Authentication';

  export const getUserExercises = (username: string) => (dispatch: any) => {
  axios.post('/api/users/exercises', { username })
    .then(res => {
      dispatch({
        type: Actions.GET_USER_EXERCISES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Loading Data Failed', 'Loading user exercises failed, please contact support if the error persists.');
    });
};
