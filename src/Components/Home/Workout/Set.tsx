import React from 'react';
import { Grid, Input } from '@material-ui/core';

import { ExerciseName, Names } from './Exercise';
import { ExerciseSet } from 'Types/Program';
import useStyles from 'material/styles';
// import { TextField } from 'Components/LayoutElements/FormElements';

export type ModifiedName = 'weight' | 'reps';

interface SetComponentProps {
  setIndex: number;
  exerciseName: ExerciseName;
  stats: ExerciseSet[];
  isHistorySet?: boolean;
  onChange?: (names: Names, value: string) => void;
}

export default function Set({
  exerciseName,
  setIndex,
  stats,
  onChange,
  isHistorySet
}: SetComponentProps) {
  const set = Number(setIndex);
  const weight = (stats[set] && stats[set].weight) || '';
  const reps = (stats[set] && stats[set].reps) || '';
  const classes = useStyles();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name: modifiedName, value } = target as {
      name: ModifiedName;
      value: string;
    };
    onChange!({ modifiedName, exerciseName, setIndex: set }, value);
  };

  const inputProps = {
    onChange: !isHistorySet ? handleChange : () => ({}),
    disabled: isHistorySet
  };

  return (
    <Grid container justify='space-evenly' className={classes.inputField}>
      <Grid item sm={4}>
        <Input autoComplete={'off'} placeholder='Reps' value={reps} name='reps' {...inputProps} />
      </Grid>
      <Grid item sm={4}>
        <Input
          autoComplete={'off'}
          placeholder='Weight'
          value={weight}
          name='weight'
          {...inputProps}
        />
      </Grid>
    </Grid>
  );
}

/* <Grid container>
      <Grid item md={4} lg={4}>
        <InputLabel htmlFor='reps'>
          <strong>Reps</strong>
        </InputLabel>
        <Input autoComplete={'off'} placeholder='Reps' value={reps} name='reps' {...inputProps} />
      </Grid>
      <Grid item md={4} lg={4}>
        <InputLabel htmlFor='weight'>
          <strong>Weight</strong>
        </InputLabel>
        <Input
          className={classes.inputField}
          autoComplete={'off'}
          placeholder='Kg'
          value={weight}
          name='weight'
          {...inputProps}
        />
      </Grid>
    </Grid> */
