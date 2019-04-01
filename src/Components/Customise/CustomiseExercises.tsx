import React, { FormEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Label, Form, Button } from 'reactstrap';
import { useFormState } from 'react-use-form-state';

import * as CustomExerciseActions from 'ActionCreators/CustomExercises';
import { ApplicationState } from 'Reducers';
import { CustomExercise } from 'Types/Program';


interface OwnProps {
  getUserCustomExercises: (username: string) => void;
  updateUserWorkout: (username: string, customExerciseName: string) => void;
}

type Props = OwnProps & ApplicationState;

function CustomiseExercises(props: Props) {
  const [formState, { label, text }] = useFormState<CustomExercise>(
    { name: '' },
    { withIds: true }
  );

  useEffect(() => {
    props.getUserCustomExercises(props.auth.user.username);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.updateUserWorkout(props.auth.user.username, formState.values.name);
    (formState.values.name as any) = '';
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={2} className='col-4 mb-5 mx-auto text-center'>
        {props.customExercises.map(c => (
          <h4>{c}</h4>
        ))}
      </Col>
      <Col xs={12}>
        <Row>
          <Col sm={6} md={2} className='col-4 mx-auto text-center'>
            <Form name='form' onSubmit={handleSubmit}>
              <Label {...label('name')}>Create a new exercise</Label>
              <Input {...text('name')} type='text' placeholder='Exercise Name' />

              <Button className='mt-3' color='primary' type='submit'>Save</Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

const mapStateToProps = ({ auth, customExercises, errors }: ApplicationState) => ({
  auth,
  customExercises,
  errors
});

export default connect(mapStateToProps, CustomExerciseActions)(CustomiseExercises);
