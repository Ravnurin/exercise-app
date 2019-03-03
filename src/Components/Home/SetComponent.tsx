import React from 'react';
import { Row, Col, Input } from 'reactstrap';

import { ExerciseName, Names } from './Exercise';
import { ExerciseSet } from 'Types/Program';

export type ModifiedName = 'weight' | 'reps';

interface SetComponentProps {
  setIndex: number;
  exerciseName: ExerciseName;
  stats: ExerciseSet[];
  onChange: (names: Names, value: number) => void;
}

export default function SetComponent({ exerciseName, setIndex, stats, onChange }: SetComponentProps) {
  const set = Number(setIndex);
  const weight = stats[set] && stats[set].weight || '';
  const reps = stats[set] && stats[set].reps || '';

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name: modifiedName, value } = target as { name: ModifiedName, value: string };
    onChange({ modifiedName, exerciseName, setIndex: set }, Number(value));
  };

  return (
    <Row className='mb-2'>
      <Col sm={6} md={6} lg={4}>
        <Input autoComplete='off' placeholder='Reps' value={reps} name='reps' onChange={handleChange} />
      </Col>
      <Col sm={6} md={6} lg={4}>
        <Input autoComplete='off' placeholder='Kg' value={weight} name='weight' onChange={handleChange} />
      </Col>
    </Row>
  );
};