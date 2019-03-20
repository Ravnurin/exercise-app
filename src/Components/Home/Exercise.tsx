import React from 'react';
import { Col } from 'reactstrap';
import { UpperBodySchema, LowerBodySchema, FriendlyNames, ExerciseSet } from 'Types/Program';
import SetComponent, { ModifiedName } from './SetComponent';
import Row from 'reactstrap/lib/Row';

export type ExerciseName = keyof (UpperBodySchema & LowerBodySchema);

export interface Names {
  exerciseName: ExerciseName;
  setIndex: number;
  modifiedName: ModifiedName;
}

interface ExerciseProps {
  exerciseName: ExerciseName;
  stats: UpperBodySchema[] | LowerBodySchema;
  onChange: (names: Names, value: number) => void;
}

export default function Exercise(props: ExerciseProps) {
  const { stats, exerciseName } = props;

  let group = null as any;
  let prevGroup = null;

  if (stats instanceof Array) {
    group = stats[stats.length - 1] as UpperBodySchema;
    prevGroup = stats[stats.length - 2][exerciseName].map((s: ExerciseSet, i: number) => {
      if (!s.reps && !s.weight) {
        return null;
      }
      return (
        <Row key={`${exerciseName}-${s.reps}-${s.weight}`} className='text-center'>
          <Col xs={1} md={1}>{i + 1}.</Col>
          <Col xs={5} md={4}>
            <h4>{s.reps}</h4>
          </Col>
          <Col xs={5} md={4}>
            <h4>{s.weight}</h4>
          </Col>
        </Row>
      )
    });
  } else {
    group = stats
  }

  /* const group = stats instanceof Array ? stats[stats.length - 1] : stats;
  const prevGrup = stats instanceof Array ?  */

  const setComponents = group[exerciseName].map((s: ExerciseSet, i: number) => {
    if (!s.reps && !s.weight) {
      return null;
    }
    return <SetComponent key={`${exerciseName}-${i + 1}`} {...props} setIndex={i + 1} stats={group[exerciseName]} />;
  });

  return (
    <Col sm={6} md={6} lg={4} className='mb-3'>
      <h4>
        <strong>{FriendlyNames[exerciseName]}</strong>
      </h4>
      <SetComponent {...props} setIndex={0} stats={group[exerciseName]} />
      {setComponents}

      {prevGroup}
    </Col>
  );
}
