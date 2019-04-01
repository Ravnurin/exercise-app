import { combineReducers } from 'redux';
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';

import authReducer from './authenticationReducer';
import customExerciseReducer from './customExerciseReducer';
import exerciseReducer from './exerciseReducer';
import errorReducer from './errorReducer';

import { AuthState } from 'Types/Authentication';
import { ErrorState } from 'Types/Errors';
import { ExerciseState } from 'Types/Exercise';
import { CustomExercise } from 'Types/Program';

export interface ApplicationState {
  auth: AuthState;
  exercises: ExerciseState[];
  customExercises: CustomExercise[];
  errors: ErrorState;
  toastr: ToastrState;
}

const rootReducer = combineReducers<ApplicationState>({
  auth: authReducer,
  exercises: exerciseReducer,
  customExercises: customExerciseReducer,
  errors: errorReducer,
  toastr: toastrReducer
});

export default rootReducer;
