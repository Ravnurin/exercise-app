import React from 'react';

import Exercise, { Names } from './Exercise';
import { UpperBodySchema, FriendlyNames } from 'Types/Program';
import { Row } from 'reactstrap';

interface Props {
  onChange: (names: Names, set: number) => void;
  upperBody: UpperBodySchema;
}

export default function UpperBody({ upperBody, onChange }: Props) {
  if (upperBody == null) {
    return null;
  }
  const exerciseProps = { onChange, stats: upperBody };
  const exercises = Object.keys(FriendlyNames).filter(k => upperBody[k] != null) as Array<keyof UpperBodySchema>;

  return (
    <Row>
      { exercises.map(key =>
        <Exercise key={`${upperBody}-${key}`} exerciseName={key} {...exerciseProps} />
      )}
    </Row>
  );
};
