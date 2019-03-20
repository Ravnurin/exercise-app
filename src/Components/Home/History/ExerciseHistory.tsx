import React from 'react';
import { ProgramSchemaLayout } from 'Types/Program';
import { Row } from 'reactstrap';

interface Props {
  exercises: ProgramSchemaLayout[];
}

export default function ExerciseHistory(props: Props) {
  const exercises = props.exercises.filter((e, i) => i < props.exercises.length - 1);

  return <Row>{exercises.map(e => `${e}`)}</Row>;
}
