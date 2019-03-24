import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';

import * as ExerciseActions from 'ActionCreators/Exercise';
import { ApplicationState } from 'Reducers';
import { ProgramSchemaLayout } from 'Types/Program';
import { WorkoutContainer } from './Workout';
import { WorkoutHistory } from './WorkoutHistory';

interface OwnProps {
  getUserExercises: (username: string) => void;
  updateUserWorkout: (username: string, exercises: ProgramSchemaLayout) => void;
}

type Props = OwnProps & RouteComponentProps & ApplicationState;

enum PageView {
  'History',
  'Workout'
}

function HomePage({ auth, getUserExercises, updateUserWorkout, exercises }: Props) {
  const [view, setPageView] = useState<PageView>(PageView.Workout);

  useEffect(() => {
    getUserExercises(auth.user.username);
  }, []);

  return (
    <div>
      <Row className='mb-5'>
        <Col xs={12} sm={6} className='col-4 mx-auto text-center'>
          <Button color='primary' className='mx-4' onClick={() => setPageView(PageView.Workout)}>Workout</Button>
          <Button color='primary' onClick={() => setPageView(PageView.History)}>History</Button>
        </Col>
      </Row>
      {view === PageView.Workout
        ? (<WorkoutContainer
          workout={exercises[exercises.length - 1]}
          username={auth.user.username}
          updateUserWorkout={updateUserWorkout} />)
        : (<WorkoutHistory exercises={exercises} />)
      }
    </div>
  );
}

const mapStateToProps = ({ auth, exercises, errors }: ApplicationState) => ({
  auth,
  exercises,
  errors
});

export default connect(mapStateToProps, ExerciseActions)(HomePage);
