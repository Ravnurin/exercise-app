import React from 'react';

import Exercise, { Names } from './Exercise';
import { UpperBodySchema, FriendlyNames } from 'Types/Program';
import { Row } from 'reactstrap';

interface Props {
  onChange: (names: Names, set: number) => void;
  upperBody: UpperBodySchema[];
}

export default function UpperBody({ upperBody, onChange }: Props) {
  if (upperBody.length === 0 || Object.keys(upperBody[0]).length === 0) {
    return null;
  }
  const exerciseProps = { onChange, stats: upperBody };
  const exerciseNames = Object.keys(FriendlyNames).filter(k => upperBody[0][k] != null) as Array<keyof UpperBodySchema>;

  return (
    <Row>
      {exerciseNames.map(key => (
        <Exercise key={`${upperBody}-${key}`} exerciseName={key} {...exerciseProps} />
      ))}
    </Row>
  );
}
