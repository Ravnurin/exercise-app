import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, Paper, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { getUserExercises } from 'ActionCreators/Exercise';
import { ApplicationState } from 'Reducers';
import { WorkoutContainer } from './Workout';
import { WorkoutHistory } from './WorkoutHistory';

enum View {
  'Workout' = 1,
  'History' = 0
}

interface OwnProps {
  getUserExercises: () => void;
}

type Props = OwnProps & ApplicationState;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(4)
    }
  })
);

function HomePage(props: Props) {
  const classes = useStyles();
  const [tab, setTab] = useState<View>(View.Workout);

  useEffect(() => {
    props.getUserExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Paper square className={classes.root}>
        <Tabs
          value={tab}
          indicatorColor='primary'
          textColor='primary'
          centered
          onChange={(e, value) => setTab(value)}>
          <Tab label='Workout' value={View.Workout} />
          <Tab label='History' value={View.History} />
        </Tabs>
      </Paper>
      {tab === View.Workout ? <WorkoutContainer /> : <WorkoutHistory />}
    </>
  );
}

const mapStateToProps = ({
  auth,
  errors,
  exercises
}: Partial<ApplicationState>) => ({
  auth,
  errors,
  exercises
});

export default connect(
  mapStateToProps,
  { getUserExercises }
)(HomePage);
