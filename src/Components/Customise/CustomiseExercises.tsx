import React, { FormEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Label, Form, Button } from 'reactstrap';
import { useFormState } from 'react-use-form-state';

import * as CustomExerciseActions from 'ActionCreators/CustomExercises';
import { ApplicationState } from 'Reducers';
import { getCustomExerciseFriendlyName } from '../Helpers/CustomExerciseHelpers';

interface FriendlyNameProps {
  name: string;
  onDelete: (dbName: string) => void;
}

export const FriendlyName = ({ name, onDelete }: FriendlyNameProps) => (
  <div>
    <h5>
      <strong>
        {(getCustomExerciseFriendlyName(name))}
      </strong>
      <Button className='btn btn-sm btn-danger ml-3' onClick={() => onDelete(name)}>X</Button>
    </h5>
  </div>
)

interface OwnProps {
  getCustomExercises: (username: string) => void;
  addCustomExercise: (username: string, customExerciseName: string) => void;
  deleteCustomExercise: (username: string, customExerciseName: string) => void;
}

type Props = OwnProps & ApplicationState;

function CustomiseExercises({ auth, customExercises, getCustomExercises, addCustomExercise, deleteCustomExercise }: Props) {
  const [formState, { label, text }] = useFormState<{ name: string }>(
    { name: '' },
    { withIds: true }
  );

  useEffect(() => {
    getCustomExercises(auth.user.username);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCustomExercise(auth.user.username, formState.values.name);
    (formState.values.name as any) = '';
  };

  const handleDelete = (dbName: string) => {
    deleteCustomExercise(auth.user.username, dbName);
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={2} className='col-4 mb-5 mx-auto text-center'>
        <h3>Your saved exercises:</h3>
        {customExercises.map((f, i) =>
          <FriendlyName key={`${i}-${name}`} name={f} onDelete={handleDelete} />
        )}
      </Col>
      <Col xs={12}>
        <Row>
          <Col sm={6} md={2} className='col-4 mx-auto text-center'>
            <Form name='form' onSubmit={handleSubmit}>
              <Label {...label('name')}>Create a new exercise</Label>
              <Input {...text('name')} type='text' placeholder='Exercise Name' />

              <Button className='mt-3' color='primary' type='submit' disabled={formState.values.name === ''}>Save</Button>
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
