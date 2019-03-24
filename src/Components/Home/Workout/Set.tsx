import React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';

import { ExerciseName, Names } from './Exercise';
import { ExerciseSet } from 'Types/Program';

export type ModifiedName = 'weight' | 'reps';

interface SetComponentProps {
  setIndex: number;
  exerciseName: ExerciseName;
  stats: ExerciseSet[];
  isHistorySet?: boolean;
  onChange?: (names: Names, value: number) => void;
}

export default function Set({ exerciseName, setIndex, stats, onChange, isHistorySet }: SetComponentProps) {
  const set = Number(setIndex);
  const weight = (stats[set] && stats[set].weight) || '';
  const reps = (stats[set] && stats[set].reps) || '';

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name: modifiedName, value } = target as { name: ModifiedName; value: string };
    onChange!({ modifiedName, exerciseName, setIndex: set }, Number(value));
  };

  const inputProps = {
    onChange: !isHistorySet ? handleChange : () => ({}),
    disabled: isHistorySet
  };

  return (
    <Row className='mb-2'>
      <Col className='col' md={6} lg={4}>
        <Label for='reps'><strong>Reps</strong></Label>
        <Input autoComplete='off' placeholder='Reps' value={reps} name='reps' {...inputProps} />
      </Col>
      <Col className='col' md={6} lg={4}>
        <Label for='weight'><strong>Weight</strong></Label>
        <Input autoComplete='off' placeholder='Kg' value={weight} name='weight' {...inputProps} />
      </Col>
    </Row>
  );
}
