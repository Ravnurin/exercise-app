import React, { useState, useEffect, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, CssBaseline, Paper, Typography } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

import { registerUser } from 'ActionCreators/Register';
import { Input } from 'Components/LayoutElements/FormElements';
import { AuthState } from 'Types/Authentication';
import { ErrorState } from 'Types/Errors';
import { ApplicationState } from 'Reducers/index';
import useStyles from 'material/styles';

interface Props {
  auth: AuthState;
  errors: ErrorState;
  history: string[];
  registerUser: (user: any, history: string[]) => void;
}

function RegisterPage(props: Props) {
  const classes = useStyles();
  const { auth, errors } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push('/');
    }
  }, [auth.isAuthenticated, props.history]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.registerUser({ username, password, passwordConfirm }, props.history);
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Input
          autoFocus
          name='username'
          onChange={e => setUsername(e.target.value)}
          placeholder='Username'
          value={username}
          errors={errors}
        />
        <Input
          name='password'
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          type='password'
          value={password}
          errors={errors}
        />
        <Input
          name='passwordConfirm'
          onChange={e => setPasswordConfirm(e.target.value)}
          placeholder='Confirm Password'
          type='password'
          value={passwordConfirm}
          errors={errors}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          className={classes.submit}>
          Register
        </Button>
      </Paper>
    </main>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterPage as any));
