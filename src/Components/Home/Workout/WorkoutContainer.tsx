import React, { useEffect, useState, MouseEvent } from 'react';
import moment from 'moment';
import {
  Button,
  Grid,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup
} from '@material-ui/core';

import UpperBody, { upperBodyTemplate } from './UpperBody';
import LowerBody, { lowerBodyTemplate } from './LowerBody';
import { Names } from './Exercise';
import { getUpdatedExercises } from 'Components/Helpers/HomeHelpers';
import { ProgramSchemaLayout, UpperBodySchema, LowerBodySchema } from 'Types/Program';
import { connect } from 'react-redux';
import { updateUserWorkout } from 'ActionCreators/Exercise';
import { ApplicationState } from 'Reducers';
import useStyles from 'material/styles';

interface OwnProps {
  updateUserWorkout: (exercises: ProgramSchemaLayout) => void;
}

enum MuscleGroup {
  'UpperBody' = 'UpperBody',
  'LowerBody' = 'LowerBody'
}

type Props = OwnProps & Pick<ApplicationState, 'exercises'>;
type Page = MuscleGroup.UpperBody | MuscleGroup.LowerBody;

function WorkoutContainer(props: Props) {
  const classes = useStyles();
  const { exercises } = props;
  const [currentPage, setCurrentPage] = useState<Page>(MuscleGroup.UpperBody);

  const [lowerBodyExercises, setLowerBodyExercises] = useState<LowerBodySchema>(lowerBodyTemplate);
  const [upperBodyExercises, setUpperBodyExercises] = useState<UpperBodySchema>(upperBodyTemplate);

  useEffect(() => {
    const workout = exercises[exercises.length - 1] || {};

    if (typeof workout.date === 'string') {
      const mDate = moment(workout.date);

      if (mDate.isValid() && mDate.isSame(moment().startOf('day'))) {
        const { upperBody, lowerBody } = exercises[exercises.length - 1];

        setLowerBodyExercises(lowerBody);
        setUpperBodyExercises(upperBody);
      }
    }
  }, [exercises]);

  const handleUpperBodyChange = (names: Names, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    const updatedExercises = getUpdatedExercises<UpperBodySchema>({
      exerciseGroup: upperBodyExercises,
      names,
      value
    });

    setUpperBodyExercises(updatedExercises);
  };

  const handleLowerBodyChange = (names: Names, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    const updatedExercises = getUpdatedExercises<LowerBodySchema>({
      exerciseGroup: lowerBodyExercises,
      names,
      value
    });

    setLowerBodyExercises(updatedExercises);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedExericse: ProgramSchemaLayout = {
      upperBody: upperBodyExercises,
      lowerBody: lowerBodyExercises,
      date: moment().startOf('day')
    };

    props.updateUserWorkout(updatedExericse);
  };

  return (
    <Grid container spacing={0} justify='center' alignItems='center'>
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel component='legend'>Workout Split</FormLabel>
          <RadioGroup
            aria-label='workout-split'
            name='workout-split'
            className={classes.group}
            value={currentPage}
            onChange={(e: any) => setCurrentPage(e.target.value)}
            row>
            <FormControlLabel
              value={MuscleGroup.UpperBody}
              control={<Radio />}
              label='Upper Body'
            />
            <FormControlLabel
              value={MuscleGroup.LowerBody}
              control={<Radio />}
              label='Lower Body'
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid container justify='center'>
        {currentPage === MuscleGroup.UpperBody ? (
          <UpperBody onChange={handleUpperBodyChange} upperBody={upperBodyExercises} />
        ) : (
          <LowerBody onChange={handleLowerBodyChange} lowerBody={lowerBodyExercises} />
        )}
      </Grid>
      {(upperBodyExercises || lowerBodyExercises) && (
        <Grid container item justify='center'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            className={classes.submit}>
            Submit
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

const mapStateToProps = ({ auth, exercises }: ApplicationState) => ({
  auth,
  exercises
});

export default connect(
  mapStateToProps,
  { updateUserWorkout }
)(WorkoutContainer);
