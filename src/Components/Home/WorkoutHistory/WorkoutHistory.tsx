import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  ProgramSchemaLayout,
  FriendlyNames,
  LowerBodySchema,
  UpperBodySchema
} from 'Types/Program';
import Exercise from '../Workout/Exercise';
import { ApplicationState } from 'Reducers';

interface Props {
  exercises: ProgramSchemaLayout[];
}

function WorkoutHistory({ exercises }: Props) {
  if (exercises == null || exercises.length < 1) {
    return null;
  }

  let workout = exercises[exercises.length - 1] || {};

  if (typeof workout.date === 'string') {
    const mDate = moment(workout.date);

    if (mDate.isValid() && mDate.isSame(moment().startOf('day'))) {
      if (exercises.length > 1) {
        workout = exercises[exercises.length - 2];
      } else {
        return null;
      }
    }
  }

  const history = { ...workout.upperBody, ...workout.lowerBody };
  const exerciseNames = Object.keys(FriendlyNames).filter(
    k => history[k] != null && history[k].length > 0
  ) as Array<keyof UpperBodySchema & LowerBodySchema>;

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item xs={12}>
        {exerciseNames.map(key => (
          <Exercise
            key={`${history}-${key}`}
            exerciseName={key}
            stats={(history as any) as UpperBodySchema | LowerBodySchema}
            isHistorySet
          />
        ))}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({ auth, exercises, errors }: ApplicationState) => ({
  auth,
  exercises,
  errors
});

export default connect(
  mapStateToProps,
  null
)(WorkoutHistory);
