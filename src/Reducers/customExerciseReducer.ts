import { Reducer } from 'redux';

import { Actions } from 'constants/CustomExercise';
import { CustomExerciseAction, CustomExerciseState } from 'Types/CustomExercise';

const initialState = [] as CustomExerciseState[];

const customExerciseReducer: Reducer<CustomExerciseState[], CustomExerciseAction> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CUSTOM_EXERCISES:
      return action.payload;
    case Actions.ADD_CUSTOM_EXERCISE:
      return action.payload;
    case Actions.DELETE_CUSTOM_EXERCISE:
      return action.payload;
    default:
      return state;
  }
};

export default customExerciseReducer;
