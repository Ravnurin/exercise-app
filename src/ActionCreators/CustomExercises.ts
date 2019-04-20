import axios from 'axios';
import { batch } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/CustomExercise';
import { Actions as ErrorAction } from 'constants/Authentication';

export const getCustomExercises = () => (dispatch: any) => {
  axios
    .get('/api/customExercises/user')
    .then(res => {
      dispatch({
        type: Actions.GET_CUSTOM_EXERCISES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response.data
      });
      toastr.error('Retrieval Failed', 'Retrieving custom exercises failed.');
    });
};

export const addCustomExercise = (customExerciseName: string) => (dispatch: any) => {
  axios
    .post('/api/customExercises/user/add', { customExerciseName })
    .then(res => {
      batch(() => {
        dispatch({
          type: Actions.ADD_CUSTOM_EXERCISE,
          payload: res.data
        });
        dispatch({
          type: ErrorAction.CLEAR_ERRORS,
          payload: {}
        })
      });
      toastr.success('Success', 'Exercise Added');
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response.data
      });
      toastr.error('Add Failed', err.response.data.customExerciseName);
    });
};

export const deleteCustomExercise = (customExerciseName: string) => (dispatch: any) => {
  axios
    .post('/api/customExercises/user/delete', { customExerciseName })
    .then(res => {
      batch(() => {
        dispatch({
          type: Actions.DELETE_CUSTOM_EXERCISE,
          payload: res.data
        });
        dispatch({
          type: ErrorAction.CLEAR_ERRORS,
          payload: {}
        })
      });
      toastr.success('Success', 'Exercise Deleted');
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response.data
      });
      toastr.error('Update Failed', 'Deleting custom exercise failed.');
    });
};