import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/CustomExercise';
import { Actions as ErrorAction } from 'constants/Authentication';

export const getCustomExercises = (username: string) => (dispatch: any) => {
  axios
    .post('/api/customExercises/user', { username })
    .then(res => {
      dispatch({
        type: Actions.GET_CUSTOM_EXERCISES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Retrieval Failed', 'Retrieving custom exercises failed.');
    });
};

export const addCustomExercise = (username: string, customExerciseName: string) => (dispatch: any) => {
  axios
    .post('/api/customExercises/user/add', { username, customExerciseName })
    .then(res => {
      dispatch({
        type: Actions.ADD_CUSTOM_EXERCISE,
        payload: res.data
      });
      toastr.success('Update Success', '');
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Add Failed', 'Adding custom exercise failed.');
    });
};

export const deleteCustomExercise = (username: string, customExerciseName: string) => (dispatch: any) => {
  axios
    .post('/api/customExercises/user/delete', { username, customExerciseName })
    .then(res => {
      dispatch({
        type: Actions.ADD_CUSTOM_EXERCISE,
        payload: res.data
      });
      toastr.success('Update Success', '');
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Update Failed', 'Deleting custom exercise failed.');
    });
};