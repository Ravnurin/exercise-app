import { Actions } from 'constants/CustomExercise';
import { CustomExercise } from './Program';

export type CustomExerciseState = CustomExercise;

export interface CustomExerciseAction {
  type: Actions;
  payload: CustomExercise[];
}
