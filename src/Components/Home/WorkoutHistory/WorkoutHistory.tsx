import React from 'react';
import { ProgramSchemaLayout, FriendlyNames, LowerBodySchema, UpperBodySchema } from 'Types/Program';
import { Row } from 'reactstrap';
import Exercise from '../Workout/Exercise';

interface Props {
  exercises: ProgramSchemaLayout[];
}

export default function WorkoutHistory({ exercises }: Props) {
  if (exercises == null || exercises.length < 2) {
    return null;
  }

  const history = { ...exercises[exercises.length - 2].upperBody, ...exercises[exercises.length - 2].lowerBody };
  const exerciseNames = Object.keys(FriendlyNames).filter(k => history[k] != null && history[k].length > 0) as Array<keyof UpperBodySchema & LowerBodySchema>;

  return (
    <Row className='justify-content-center'>
      {exerciseNames.map(key => (
        <Exercise key={`${history}-${key}`} exerciseName={key} stats={history as any as UpperBodySchema | LowerBodySchema} isHistorySet />
      ))}
    </Row>
  );
}
