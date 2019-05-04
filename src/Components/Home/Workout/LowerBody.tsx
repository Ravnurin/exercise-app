import React from 'react';
import { Grid } from '@material-ui/core';

import Exercise, { Names } from './Exercise';
import { FriendlyNames, LowerBodySchema } from 'Types/Program';

interface Props {
  onChange: (names: Names, set: string) => void;
  lowerBody: LowerBodySchema;
}

export default function LowerBody({ lowerBody, onChange }: Props) {
  if (lowerBody == null) {
    return null;
  }
  const exerciseProps = { onChange, stats: lowerBody };
  const exercises = Object.keys(FriendlyNames).filter(
    k => lowerBody[k] != null
  ) as Array<keyof LowerBodySchema>;

  return (
    <Grid container direction='row'>
      {exercises.map(key => (
        <Exercise
          key={`${lowerBody}-${key}`}
          exerciseName={key}
          {...exerciseProps}
        />
      ))}
    </Grid>
  );
}

export const lowerBodyTemplate = {
  squat: [],
  rdlOrLegCurl: [],
  legPress: [],
  legCurl: [],
  calfRaise: [],
  seatedCalfRaise: [],
  abs: [],
  lowBack: []
};
