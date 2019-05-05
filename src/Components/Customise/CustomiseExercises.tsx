import React, { MouseEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';

import * as CustomExerciseActions from 'ActionCreators/CustomExercises';
import { ApplicationState } from 'Reducers';
import { getCustomExerciseFriendlyName } from '../Helpers/CustomExerciseHelpers';
import { TextField } from 'Components/LayoutElements/FormElements';
import useStyles from 'material/styles';

interface FriendlyNameProps {
  name: string;
  onDelete: (dbName: string) => void;
}

export const FriendlyName = ({ name, onDelete }: FriendlyNameProps) => (
  <Grid item xs={12}>
    <Typography variant='subtitle1' align='center'>
      {getCustomExerciseFriendlyName(name)}
      <Button className='btn btn-sm btn-danger ml-3' onClick={() => onDelete(name)}>
        X
      </Button>
    </Typography>
  </Grid>
);

interface OwnProps {
  getCustomExercises: () => void;
  addCustomExercise: (customExerciseName: string) => void;
  deleteCustomExercise: (customExerciseName: string) => void;
}

type Props = OwnProps & ApplicationState;

function CustomiseExercises({
  errors,
  customExercises,
  getCustomExercises,
  addCustomExercise,
  deleteCustomExercise
}: Props) {
  const classes = useStyles();
  const [exerciseName, setExerciseName] = useState('');
  useEffect(() => {
    getCustomExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addCustomExercise(exerciseName);
    setExerciseName('');
  };

  const handleDelete = (dbName: string) => {
    deleteCustomExercise(dbName);
  };

  return (
    <>
      <Typography align='center' variant='h4' color='inherit' gutterBottom>
        Your saved exercises:
      </Typography>
      <Grid container>
        {customExercises.map((customExerciseName, i) => (
          <FriendlyName
            key={`${i}-${customExerciseName}`}
            name={customExerciseName}
            onDelete={handleDelete}
          />
        ))}
      </Grid>
      <form className={classes.form}>
        <Grid container direction='column' spacing={0}>
          <Grid container item justify='center'>
            <Grid item xs={6} md={3}>
              <TextField
                required
                autoFocus
                value={exerciseName}
                name='exerciseName'
                onChange={e => setExerciseName(e.target.value)}
                errors={errors}
              />
            </Grid>
            <Grid />
          </Grid>
          <Grid style={{ textAlign: 'center' }} container item justify='center'>
            <Grid item xs={4}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                className={classes.submit}
                disabled={exerciseName === ''}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

const mapStateToProps = ({ auth, customExercises, errors }: ApplicationState) => ({
  auth,
  customExercises,
  errors
});

export default connect(
  mapStateToProps,
  CustomExerciseActions
)(CustomiseExercises);
