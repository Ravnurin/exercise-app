import React from 'react';
import { Grid, Input, InputLabel } from '@material-ui/core';

import { ExerciseName, Names } from './Exercise';
import { ExerciseSet } from 'Types/Program';

export type ModifiedName = 'weight' | 'reps';

interface SetComponentProps {
  setIndex: number;
  exerciseName: ExerciseName;
  stats: ExerciseSet[];
  isHistorySet?: boolean;
  onChange?: (names: Names, value: string) => void;
}

export default function Set({
  exerciseName,
  setIndex,
  stats,
  onChange,
  isHistorySet
}: SetComponentProps) {
  const set = Number(setIndex);
  const weight = (stats[set] && stats[set].weight) || '';
  const reps = (stats[set] && stats[set].reps) || '';

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name: modifiedName, value } = target as {
      name: ModifiedName;
      value: string;
    };
    onChange!({ modifiedName, exerciseName, setIndex: set }, value);
  };

  const inputProps = {
    onChange: !isHistorySet ? handleChange : () => ({}),
    disabled: isHistorySet
  };

  return (
    <Grid container>
      <Grid item md={4} lg={4}>
        <InputLabel htmlFor='reps'>
          <strong>Reps</strong>
        </InputLabel>
        <Input
          autoComplete={'off'}
          placeholder='Reps'
          value={reps}
          name='reps'
          {...inputProps}
        />
      </Grid>
      <Grid item md={4} lg={4}>
        <InputLabel htmlFor='weight'>
          <strong>Weight</strong>
        </InputLabel>
        <Input
          autoComplete={'off'}
          placeholder='Kg'
          value={weight}
          name='weight'
          {...inputProps}
        />
      </Grid>
    </Grid>
  );
}
