import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Row from 'reactstrap/lib/Row';
import { Col, Form, FormGroup, Button } from 'reactstrap';

import { registerUser } from 'ActionCreators/Register';
import FormInput from 'Components/LayoutElements/FormInput';
import { AuthState } from 'Types/Authentication';
import { ErrorState } from 'Types/Errors';
import { SecureUser } from 'Types/User';
import { ApplicationState } from 'Reducers/index';

interface Props {
  auth: AuthState;
  errors: ErrorState;
  history: string[];
  registerUser: (user: any, history: string[]) => void;
}

interface RegisterUser extends SecureUser {
  passwordConfirm: string;
}

function RegisterPage(props: Props) {
  const { auth, errors } = props;
  const [user, setUser] = useState<RegisterUser>({
    username: '',
    password: '',
    passwordConfirm: ''
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.registerUser(user, props.history);
  }

  const formProps = { onChange: handleChange, errors };
  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={4}>
        <h2>Register</h2>
        <Form name='form' onSubmit={handleSubmit}>
          <FormInput placeholder='Username' value={user.username} name='username' {...formProps} />
          <FormInput placeholder='Password' value={user.password} name='password' type='password' {...formProps} />
          <FormInput placeholder='Confirm Password' value={user.passwordConfirm} type='password' name='passwordConfirm' {...formProps} />

          <FormGroup>
            <Button color='primary' type='submit'>Register</Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(RegisterPage as any));
