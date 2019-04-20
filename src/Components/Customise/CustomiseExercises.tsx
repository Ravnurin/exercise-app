import React, { FormEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Label, Form, Button, FormFeedback } from 'reactstrap';
import { useFormState } from 'react-use-form-state';

import * as CustomExerciseActions from 'ActionCreators/CustomExercises';
import { ApplicationState } from 'Reducers';
import { getCustomExerciseFriendlyName } from '../Helpers/CustomExerciseHelpers';
import FormGroup from 'reactstrap/lib/FormGroup';
import classnames from 'classnames';

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
  getCustomExercises: () => void;
  addCustomExercise: (customExerciseName: string) => void;
  deleteCustomExercise: (customExerciseName: string) => void;
}

type Props = OwnProps & ApplicationState;

function CustomiseExercises({ errors, customExercises, getCustomExercises, addCustomExercise, deleteCustomExercise }: Props) {
  const [formState, { label, text }] = useFormState<{ customExerciseName: string }>(
    { customExerciseName: '' },
    { withIds: true }
  );

  useEffect(() => {
    getCustomExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCustomExercise(formState.values.customExerciseName);
    (formState.values.customExerciseName as any) = '';
  };

  const handleDelete = (dbName: string) => {
    deleteCustomExercise(dbName);
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={2} className='col-4 mb-5 mx-auto text-center'>
        <h3>Your saved exercises:</h3>
        {customExercises.map((customExerciseName, i) =>
          <FriendlyName key={`${i}-${customExerciseName}`} name={customExerciseName} onDelete={handleDelete} />
        )}
      </Col>
      <Col xs={12}>
        <Row>
          <Col sm={6} md={2} className='col-4 mx-auto text-center'>
            <Form name='form' onSubmit={handleSubmit}>
              <FormGroup>
                <Label {...label('customExerciseName')}>Create a new exercise</Label>
                <Input
                  {...text('customExerciseName')}
                  type='text'
                  placeholder='Exercise Name'
                  className={classnames({ 'is-invalid': errors.customExerciseName })} />
                <FormFeedback valid={!errors.customExerciseName}>{errors.customExerciseName}</FormFeedback>

              </FormGroup>

              <Button className='mt-3' color='primary' type='submit' disabled={formState.values.customExerciseName === ''}>Save</Button>
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
