import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/Exercise';
import { Actions as ErrorAction } from 'constants/Authentication';
import { ProgramSchemaLayout } from 'Types/Program';

export const getUserExercises = (username: string) => (dispatch: any) => {
  axios
    .post('/api/exercises/user', { username })
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
      toastr.error('Retrieval Failed', 'Retrieving user exercises failed.');
    });
};

export const updateUserExercises = (username: string, exercises: ProgramSchemaLayout[]) => (dispatch: any) => {
  axios
    .post('/api/exercises/user/update', { username, exercises })
    .then(res => {
      dispatch({
        type: Actions.UPDATE_USER_EXERCISES,
        payload: res.data
      });
      toastr.success('Update Success', '');
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Update Failed', 'Updating user exercises failed.');
    });
};
