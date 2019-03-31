import React from 'react';
import { Col } from 'reactstrap';

import { UpperBodySchema, LowerBodySchema, FriendlyNames, ExerciseSet } from 'Types/Program';
import Set, { ModifiedName } from './Set';

export type ExerciseName = keyof (UpperBodySchema & LowerBodySchema);

export interface Names {
  exerciseName: ExerciseName;
  setIndex: number;
  modifiedName: ModifiedName;
}

interface ExerciseProps {
  exerciseName: ExerciseName;
  stats: UpperBodySchema | LowerBodySchema;
  isHistorySet?: boolean;
  onChange?: (names: Names, value: string) => void;
}

export default function Exercise(props: ExerciseProps) {
  const { stats, exerciseName } = props;

  const setComponents = stats[exerciseName].map((s: ExerciseSet, i: number) => {
    if (!s.reps && !s.weight) {
      return null;
    }
    return <Set key={`${exerciseName}-${i + 1}`} {...props} setIndex={i + 1} stats={stats[exerciseName]} />;
  });

  return (
    <Col sm={6} md={6} lg={4} className='mb-3'>
      <h4>
        <strong>{FriendlyNames[exerciseName]}</strong>
      </h4>
      <Set {...props} setIndex={0} stats={stats[exerciseName]} />
      {setComponents}
    </Col>
  );
}
