import React, { useEffect, useState, FormEvent } from 'react';
import { Col, Row, Form, FormGroup, Button } from 'reactstrap';

import UpperBody from './UpperBody';
import { Names } from './Exercise';
import LowerBody from './LowerBody';
import { getUpdatedExercises } from 'Components/Helpers/HomeHelpers';
import { ProgramSchemaLayout, UpperBodySchema, LowerBodySchema } from 'Types/Program';

interface Props {
  workout: ProgramSchemaLayout;
  username: string;
  updateUserWorkout: (username: string, exercises: ProgramSchemaLayout) => void;
}

enum MuscleGroup {
  'UpperBody',
  'LowerBody'
}

type Page = MuscleGroup.UpperBody | MuscleGroup.LowerBody;

export default function Workout({ workout, username, updateUserWorkout }: Props) {
  const [currentPage, setCurrentPage] = useState<Page>(MuscleGroup.UpperBody);
  const [lowerBodyExercises, setLowerBodyExercises] = useState<LowerBodySchema>(workout.lowerBody);
  const [upperBodyExercises, setUpperBodyExercises] = useState<UpperBodySchema>(workout.upperBody);

  useEffect(() => {
    setUpperBodyExercises(workout.upperBody);
    setLowerBodyExercises(workout.lowerBody);
  }, [workout]);

  const handleUpperBodyChange = (names: Names, value: number) => {
    const updatedExercises = getUpdatedExercises<UpperBodySchema>({ exerciseGroup: upperBodyExercises, names, value });

    setUpperBodyExercises(updatedExercises);
  };

  const handleLowerBodyChange = (names: Names, value: number) => {
    const updatedExercises = getUpdatedExercises<LowerBodySchema>({ exerciseGroup: lowerBodyExercises, names, value });

    setLowerBodyExercises(updatedExercises);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedExericse: ProgramSchemaLayout = {
      upperBody: upperBodyExercises,
      lowerBody: lowerBodyExercises,
      date: workout.date || new Date()
    };

    updateUserWorkout(username, updatedExericse);
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} sm={6} className='col-4 mx-auto text-center'>
        <Button color='primary' className='mx-4' onClick={() => setCurrentPage(MuscleGroup.UpperBody)}>
          Upper Body
        </Button>
        <Button color='primary' onClick={() => setCurrentPage(MuscleGroup.LowerBody)}>
          Lower Body
        </Button>
      </Col>
      <Col xs={12} md={12}>
        <Form name='form' onSubmit={handleSubmit}>
          {currentPage === MuscleGroup.UpperBody ? (
            <UpperBody onChange={handleUpperBodyChange} upperBody={upperBodyExercises} />
          ) : (
              <LowerBody onChange={handleLowerBodyChange} lowerBody={lowerBodyExercises} />
            )}
          {(upperBodyExercises || lowerBodyExercises) && (
            <FormGroup className='text-center'>
              <Button color='primary' type='submit'>
                Save
              </Button>
            </FormGroup>
          )}
        </Form>
      </Col>
    </Row>
  );
}
