import { Names } from '../Home/Exercise';
import { LowerBodySchema, UpperBodySchema, ExerciseSet } from 'Types/Program';

interface UpdateExerciseFnProps {
  exerciseGroup: UpperBodySchema | LowerBodySchema;
  names: Names;
  value: number;
}

export const getUpdatedExercises = <T>({ exerciseGroup, names, value }: UpdateExerciseFnProps): T => {
  const { exerciseName, setIndex, modifiedName } = names;
  const exercise = exerciseGroup[exerciseName];
  const updated: ExerciseSet[] = exercise.map((s: ExerciseSet, i: number) => {
    if (i === setIndex) {
      return { ...s, [modifiedName]: value};
    }
    return s;
  })
  
  if (exercise[setIndex] == null) {
    updated.push({ weight: '', reps: '', [modifiedName]: value });
  }

  const noEmpties = updated.filter(u => !!u.weight || !!u.reps);

  return { ...exerciseGroup, [exerciseName]: noEmpties } as unknown as T;
};
