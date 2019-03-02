import { Reducer } from 'redux';

import { Actions } from 'constants/Exercise';
import { ExerciseAction, ExerciseState} from 'Types/Exercise';
import { Exercises } from 'Types/User';

const initialState: ExerciseState[] = [{ }] as Exercises[];

const exerciseReducer: Reducer<ExerciseState[], ExerciseAction> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER_EXERCISES:
      return action.payload
    default:
      return state;
  }
};

export default exerciseReducer;
