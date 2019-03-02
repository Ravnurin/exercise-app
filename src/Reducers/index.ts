import { combineReducers } from 'redux';
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';

import authReducer from './authenticationReducer';
import exerciseReducer from './exerciseReducer';
import errorReducer from './errorReducer';
import { AuthState } from 'Types/Authentication';
import { ErrorState } from 'Types/Errors';
import { ExerciseState } from '../Types/Exercise';

export interface ApplicationState {
  auth: AuthState;
  exercises: ExerciseState[];
  errors: ErrorState;
  toastr: ToastrState;
}

const rootReducer = combineReducers<ApplicationState>({
  auth: authReducer,
  exercises: exerciseReducer,
  errors: errorReducer,
  toastr: toastrReducer
});

export default rootReducer;
