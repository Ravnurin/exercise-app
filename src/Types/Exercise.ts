import { Actions } from 'constants/Exercise';
import { ProgramSchemaLayout } from './Program';

export type ExerciseState = ProgramSchemaLayout;

export interface ExerciseAction {
  type: Actions;
  payload: ProgramSchemaLayout[];
}
