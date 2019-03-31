import React, { useEffect, useState, FormEvent } from 'react';
import { Col, Row, Form, FormGroup, Button } from 'reactstrap';
import moment from 'moment';

import UpperBody, { upperBodyTemplate } from './UpperBody';
import LowerBody, { lowerBodyTemplate } from './LowerBody';
import { Names } from './Exercise';
import { getUpdatedExercises } from 'Components/Helpers/HomeHelpers';
import { ProgramSchemaLayout, UpperBodySchema, LowerBodySchema } from 'Types/Program';
import { connect } from 'react-redux';
import { updateUserWorkout } from 'ActionCreators/Exercise';
import { ApplicationState } from 'Reducers';

interface OwnProps {
  updateUserWorkout: (username: string, exercises: ProgramSchemaLayout) => void;
}

enum MuscleGroup {
  'UpperBody',
  'LowerBody'
}


type Props = OwnProps & Pick<ApplicationState, 'auth' | 'exercises'>;
type Page = MuscleGroup.UpperBody | MuscleGroup.LowerBody;

function WorkoutContainer(props: Props) {
  const { auth, exercises } = props;
  const [currentPage, setCurrentPage] = useState<Page>(MuscleGroup.UpperBody);

  const [lowerBodyExercises, setLowerBodyExercises] = useState<LowerBodySchema>(lowerBodyTemplate);
  const [upperBodyExercises, setUpperBodyExercises] = useState<UpperBodySchema>(upperBodyTemplate);

  useEffect(() => {
    const workout = exercises[exercises.length - 1] || {};

    if (typeof workout.date === 'string') {
      const mDate = moment(workout.date);

      if (mDate.isValid() && mDate.isSame(moment().startOf('day'))) {
        const { upperBody, lowerBody } = exercises[exercises.length - 1];

        setLowerBodyExercises(lowerBody);
        setUpperBodyExercises(upperBody);
      }
    }
  }, [exercises.length]);

  const handleUpperBodyChange = (names: Names, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    const updatedExercises = getUpdatedExercises<UpperBodySchema>({ exerciseGroup: upperBodyExercises, names, value });

    setUpperBodyExercises(updatedExercises);
  };

  const handleLowerBodyChange = (names: Names, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    const updatedExercises = getUpdatedExercises<LowerBodySchema>({ exerciseGroup: lowerBodyExercises, names, value });

    setLowerBodyExercises(updatedExercises);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedExericse: ProgramSchemaLayout = {
      upperBody: upperBodyExercises,
      lowerBody: lowerBodyExercises,
      date: moment().startOf('day')
    };

    props.updateUserWorkout(auth.user.username, updatedExericse);
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

const mapStateToProps = ({ auth, exercises }: ApplicationState) => ({
  auth,
  exercises
});

export default connect(mapStateToProps, { updateUserWorkout })(WorkoutContainer);