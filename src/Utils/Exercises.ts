import { ExerciseSet } from '../Types/Program';
import { ProgramSchemaLayout, UpperBodySchema } from 'Types/Program';

export const isGroupEmpty = (exercises: ProgramSchemaLayout, groupName: 'upperBody' | 'lowerBody') => {
  const group = exercises[groupName] as UpperBodySchema;

  if (group == null) {
    return false;
  }
  let count = 0;

  Object.keys(group).map(k => group[k]).forEach((e: ExerciseSet[]) => {
    e.forEach(s => {
      if (s.reps != null || s.weight != null) {
        count++;
      }
    });
  });

  return count === 0;
};
