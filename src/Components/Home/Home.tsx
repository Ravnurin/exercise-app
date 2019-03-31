import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'reactstrap';

import { getUserExercises } from 'ActionCreators/Exercise';
import { ApplicationState } from 'Reducers';
import { WorkoutContainer } from './Workout';
import { WorkoutHistory } from './WorkoutHistory';

enum PageView {
  'History',
  'Workout'
}

interface OwnProps {
  getUserExercises: (username: string) => void;
}

type Props = OwnProps & ApplicationState;

function HomePage(props: Props) {
  const [view, setPageView] = useState<PageView>(PageView.Workout);

  useEffect(() => {
    props.getUserExercises(props.auth.user.username);
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
        ? <WorkoutContainer />
        : <WorkoutHistory />
      }
    </div>
  );
}

const mapStateToProps = ({ auth, errors, exercises }: Partial<ApplicationState>) => ({
  auth,
  errors,
  exercises
});

export default connect(mapStateToProps, { getUserExercises })(HomePage);
