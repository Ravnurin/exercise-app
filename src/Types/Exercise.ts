import { Actions } from 'constants/Exercise';
import { Exercises } from './User';

export interface ExerciseState extends Exercises { }

export interface ExerciseAction {
  type: Actions;
  payload: Exercises[];
}
