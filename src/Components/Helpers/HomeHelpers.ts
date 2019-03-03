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
  const updated = exercise.map((s: ExerciseSet, i: number) => i === setIndex ? { ...s, [modifiedName]: value} : s);
  
  if (exercise[setIndex] == null) {
    updated.push({ weight: '', reps: '', [modifiedName]: value });
  }

  return { ...exerciseGroup, [exerciseName]: updated } as unknown as T;
};
