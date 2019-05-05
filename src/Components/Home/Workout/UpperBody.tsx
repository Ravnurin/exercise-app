import React from 'react';

import Exercise, { Names } from './Exercise';
import { UpperBodySchema, FriendlyNames } from 'Types/Program';

interface Props {
  onChange: (names: Names, set: string) => void;
  upperBody: UpperBodySchema;
}

export default function UpperBody({ upperBody, onChange }: Props) {
  if (upperBody == null || Object.keys(upperBody).length === 0) {
    return null;
  }

  const exerciseProps = { onChange, stats: upperBody };
  const exerciseNames = Object.keys(FriendlyNames).filter(k => upperBody[k] != null) as Array<
    keyof UpperBodySchema
  >;

  return (
    <>
      {exerciseNames.map(key => (
        <Exercise key={`${upperBody}-${key}`} exerciseName={key} {...exerciseProps} />
      ))}
    </>
  );
}

export const upperBodyTemplate = {
  flatBench: [],
  row: [],
  inclineDbBench: [],
  pulldown: [],
  lateralRaise: [],
  rearDelt: [],
  triceps: [],
  biceps: []
};
