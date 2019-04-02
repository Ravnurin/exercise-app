import { Actions } from 'constants/CustomExercise';

export type CustomExerciseState = string;

export interface CustomExerciseAction {
  type: Actions;
  payload: string[];
}
