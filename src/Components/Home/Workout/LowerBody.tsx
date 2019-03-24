import React from 'react';

import Exercise, { Names } from './Exercise';
import { LowerBodySchema } from 'Types/Program';
import { Row } from 'reactstrap';
import { FriendlyNames } from '../../../Types/Program';

interface Props {
  onChange: (names: Names, set: number) => void;
  lowerBody: LowerBodySchema;
}

export default function LowerBody({ lowerBody, onChange }: Props) {
  if (lowerBody == null) {
    return null;
  }
  const exerciseProps = { onChange, stats: lowerBody };
  const exercises = Object.keys(FriendlyNames).filter(k => lowerBody[k] != null) as Array<keyof LowerBodySchema>;

  return (
    <Row>
      {exercises.map(key =>
        <Exercise key={`${lowerBody}-${key}`} exerciseName={key} {...exerciseProps} />
      )}
    </Row>
  );
};
