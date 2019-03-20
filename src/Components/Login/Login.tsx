import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Row } from 'reactstrap';

import { loginUser } from 'ActionCreators/Login';
import FormInput from 'Components/LayoutElements/FormInput';
import { ApplicationState } from 'Reducers/index';
import { SecureUser } from 'Types/User';

interface LoginState {
  username: string;
  password: string;
}

interface OwnProps {
  loginUser: (user: SecureUser) => void;
}

type Props = OwnProps & RouteComponentProps & ApplicationState;
type State = LoginState & Partial<ApplicationState>;

function LoginPage(props: Props) {
  const { auth, errors } = props;
  const [user, setUser] = useState<SecureUser>({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.loginUser(user);
  };

  useEffect(
    () => {
      if (auth.isAuthenticated) {
        props.history.push('/');
      }
    },
    [auth.isAuthenticated, Object.keys(errors).length]
  );

  const formProps = { errors, onChange: handleChange };
  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={4} xl={2}>
        <Form name='form' onSubmit={handleSubmit}>
          <FormInput
            placeholder='Username'
            value={user.username}
            name='username'
            {...formProps}
          />
          <FormInput
            placeholder='Password'
            value={user.password}
            type='password'
            name='password'
            {...formProps}
          />
          <FormGroup className='text-center'>
            <Button color='primary' type='submit'>
              Login
            </Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}

const mapStateToProps = ({ auth, errors }: State) => ({
  auth,
  errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
