import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/CustomExercise';
import { Actions as ErrorAction } from 'constants/Authentication';

export const getUserCustomExercises = (username: string) => (dispatch: any) => {
  axios
    .post('/api/customExercises/user', { username })
    .then(res => {
      dispatch({
        type: Actions.GET_USER_CUSTOM_EXERCISES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Retrieval Failed', 'Retrieving custom user exercises failed.');
    });
};

export const updateUserWorkout = (username: string, customExerciseName: string) => (dispatch: any) => {
  axios
    .post('/api/customExercises/user/update', { username, customExerciseName })
    .then(res => {
      dispatch({
        type: Actions.UPDATE_USER_CUSTOM_EXERCISES,
        payload: res.data
      });
      toastr.success('Update Success', '');
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Update Failed', 'Updating custom user exercises failed.');
    });
};
