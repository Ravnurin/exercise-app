import React, { useEffect, useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row, Form, FormGroup, Button } from 'reactstrap';

import { ApplicationState } from 'Reducers';
import * as ExerciseActions from 'ActionCreators/Exercise';
import UpperBody from './UpperBody';
import { Names } from './Exercise';
import LowerBody from './LowerBody';
import { getUpdatedExercises } from '../Helpers/HomeHelpers';
import { ProgramSchemaLayout, UpperBodySchema, LowerBodySchema } from 'Types/Program';

interface ProfileState {
  exercises: ProgramSchemaLayout[];
}

interface OwnProps {
  getUserExercises: (username: string) => void;
  updateUserExercises: (username: string, exercises: ProgramSchemaLayout[]) => void;
}

enum MuscleGroup {
  'UpperBody',
  'LowerBody'
}

type Props = OwnProps & RouteComponentProps & ApplicationState;
type State = ProfileState & Partial<ApplicationState>;
type Page = MuscleGroup.UpperBody | MuscleGroup.LowerBody;

function HomePage(props: Props) {
  const { exercises } = props;

  const [currentPage, setCurrentPage] = useState<Page>(MuscleGroup.UpperBody);
  const [lowerBodyExercises, setLowerBodyExercises] = useState<LowerBodySchema>(exercises[exercises.length - 1].lowerBody);
  const [upperBodyExercises, setUpperBodyExercises] = useState<UpperBodySchema>(exercises[exercises.length - 1].upperBody);

  useEffect(() => {
    props.getUserExercises(props.auth.user.username);
  }, []);

  useEffect(() => {
    if (currentPage === MuscleGroup.UpperBody) {
      setUpperBodyExercises(exercises[exercises.length - 1].upperBody);
    } else {
      setLowerBodyExercises(exercises[exercises.length - 1].lowerBody); 
    }
  }, [exercises[exercises.length - 1], currentPage]);
  
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

    const updatedExercises = exercises.map(e => {
      if (e.date === exercises[exercises.length - 1].date) {
        return { upperBody: upperBodyExercises, lowerBody: lowerBodyExercises } as ProgramSchemaLayout;
      }
      return e;
    });
    props.updateUserExercises(props.auth.user.username, updatedExercises);
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} sm={6} className='col-4 mx-auto text-center'>
        <h3>Which Split?</h3>
        <Button color='primary' className='mx-4' onClick={() => setCurrentPage(MuscleGroup.UpperBody)}>Upper Body</Button>
        <Button color='primary' onClick={() => setCurrentPage(MuscleGroup.LowerBody)}>Lower Body</Button>
      </Col>
      <Col xs={12} md={12}>
        <Form name='form' onSubmit={handleSubmit}>
          { currentPage === MuscleGroup.UpperBody
            ? <UpperBody onChange={handleUpperBodyChange} upperBody={upperBodyExercises} />
            : <LowerBody onChange={handleLowerBodyChange} lowerBody={lowerBodyExercises} />
          }
          { (upperBodyExercises || lowerBodyExercises) &&
          <FormGroup className='text-center'>
              <Button color='primary' type='submit'>Save</Button>
          </FormGroup>
        }
        </Form>
      </Col>
    </Row>
  );
}

const mapStateToProps = ({ auth, exercises, errors }: State) => ({
  auth,
  exercises,
  errors
});

export default connect(mapStateToProps, ExerciseActions)(HomePage);
