import React from 'react';

import Exercise, { Names } from './Exercise';
import { upperBody } from 'server/models/Program/UpperBody';

interface Props {
  onChange: (names: Names, set: number) => void;
  upperBody: typeof upperBody;
}

export default function UpperBody({ upperBody, onChange }: Props) {
  return (
    <div>
      <Exercise name='flatBench' onChange={onChange} stats={upperBody.flatBench as any}/>
    </div>
  )
};
