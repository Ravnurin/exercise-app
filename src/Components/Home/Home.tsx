import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row, Form } from 'reactstrap';

import { ApplicationState } from 'Reducers';
import { Exercises } from 'Types/User';
import { getUserExercises } from 'ActionCreators/Exercise';
import UpperBody from './UpperBody';
import { Names } from './Exercise';

interface ProfileState extends Exercises {
  exercises: Exercises[];
}

interface OwnProps {
  getUserExercises: (username: string) => void;
}

type Props = OwnProps & RouteComponentProps & ApplicationState;
type State = ProfileState & Partial<ApplicationState>;

function HomePage(props: Props) {
  useEffect(() => {
    props.getUserExercises(props.auth.user.username);
  }, []);
  
  const handleChange = (names: Names, value: number) => {

  };
  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={4}>
        <Form name='form'>
          { props.exercises[0].upperBody && 
            <UpperBody onChange={handleChange} upperBody={props.exercises[0].upperBody}/>
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

export default connect(mapStateToProps, { getUserExercises })(HomePage);
