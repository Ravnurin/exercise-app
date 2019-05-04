import React, { MouseEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { loginUser } from 'ActionCreators/Login';
import { ApplicationState } from 'Reducers/index';
import { SecureUser } from 'Types/User';
import FormInput from 'Components/LayoutElements/FormInput';
import useStyles from '../../material/styles';

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
  const classes = useStyles();
  const { auth, errors } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.loginUser({ username, password });
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push('/');
    }
  }, [auth.isAuthenticated, props.history]);

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormInput
            autoFocus
            name='username'
            onChange={e => setUsername(e.target.value)}
            placeholder='Username'
            value={username}
            errors={errors}
          />
          <FormInput
            name='password'
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
            value={password}
            errors={errors}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            className={classes.submit}>
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
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
