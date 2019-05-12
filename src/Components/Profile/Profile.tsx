import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Paper, CssBaseline, Typography } from '@material-ui/core';

import { Select, TextField } from 'Components/LayoutElements/FormElements';
import { ApplicationState } from 'Reducers';
import useStyles from 'material/styles';

function Profile() {
  const { main: mainWrapper, paper, root, submit } = useStyles();
  const [sex, setSex] = useState('Male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  const sexOptions = [{ value: 'Male' }, { value: 'Female' }];
  const canSubmit = true;

  return (
    <>
      <CssBaseline />
      <main className={mainWrapper}>
        <Paper className={paper}>
          <Typography component='h1' variant='h4' align='center'>
            Profile
          </Typography>
          <form name='form' className={root}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Select
                  value={sex}
                  onChange={e => setSex(e.target.value)}
                  options={sexOptions}
                  name='sex'
                  useInputLabel={false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  name='age'
                  placeholder='Age'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField value={weight} onChange={e => setWeight(e.target.value)} name='weight' />
              </Grid>
              <Grid container justify='center'>
                <Button
                  variant='contained'
                  className={submit}
                  color={!canSubmit ? 'secondary' : 'primary'}
                  type='submit'
                  disabled={!canSubmit}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    </>
  );
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  auth
});

export default connect(
  mapStateToProps,
  null
)(Profile);
