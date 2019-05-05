import React from 'react';
import { Grid, Typography } from '@material-ui/core';

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
    return (
      <Set
        key={`${exerciseName}-${i + 1}`}
        {...props}
        setIndex={i + 1}
        stats={stats[exerciseName]}
      />
    );
  });

  return (
    <Grid item sm={6} md={4} spacing={10}>
      <Typography variant='h6' align='center'>
        {FriendlyNames[exerciseName]}
      </Typography>
      <Set {...props} setIndex={0} stats={stats[exerciseName]} />
      {setComponents}
    </Grid>
  );
}
