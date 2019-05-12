import React, { FormEvent } from 'react';
import { InputAdornment, TextField, Button, Grid, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useFormState } from 'react-use-form-state';

import { FoodItem } from 'Types/Nutrition';
import { getCalculatedFoodItem } from '../Helpers/NutritionHelpers';
import { ErrorState } from 'Types/Errors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      with: 200
    },
    button: {
      marginTop: theme.spacing(3)
    }
  })
);

interface Props {
  onSubmit: (foodItem: FoodItem) => void;
  errors: ErrorState;
}

export default function CreateFoodItem(props: Props) {
  const classes = useStyles();
  const { errors } = props;
  const [formState, { text, number }] = useFormState<FoodItem>(
    {
      name: '',
      servingSize: '',
      carbohydrates: '',
      fats: '',
      protein: ''
    },
    { withIds: true }
  );

  const clearForm = () => {
    Object.keys(formState.values).forEach(k => {
      (formState as any).values[k] = '';
    });
  };

  const fieldProps = (adornment = true) => ({
    className: classes.textField,
    InputProps: adornment
      ? {
          endAdornment: <InputAdornment position='end'>Gr</InputAdornment>
        }
      : {},
    autoComplete: 'off'
  });

  const textFields = [
    { label: 'Food Name', id: 'foodName', ...fieldProps(false), ...text('name') },
    { label: 'Serving Size', id: 'servingSize', ...fieldProps(), ...number('servingSize') },
    { label: 'Carbohydrates', id: 'carbohydrates', ...fieldProps(), ...number('carbohydrates') },
    { label: 'Fats', id: 'fats', ...fieldProps(), ...number('fats') },
    { label: 'Protein', id: 'protein', ...fieldProps(), ...number('protein') },
    {
      label: 'Calories',
      id: 'calories',
      ...fieldProps(),
      ...number('calories'),
      value: getCalculatedFoodItem(formState.values).calories,
      disabled: true
    }
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foodItem = {
      ...formState.values,
      calories: textFields.filter(t => t.label === 'Calories')[0].value
    };
    props.onSubmit(foodItem);
    clearForm();
  };

  return (
    <form name='form' onSubmit={handleSubmit} className={classes.container}>
      <Grid container direction='row' justify='center'>
        {textFields.map(tf => (
          <Grid item key={tf.id} sm={3}>
            <TextField
              {...tf}
              error={
                errors[tf.id] != null
              } /* { ...tf.name === 'calories' ? {value: getCalculatedFoodItem(formState.values).calories} : {}} */
            />
          </Grid>
        ))}
        <Grid container justify='center'>
          <Button
            variant='contained'
            className={classes.button}
            color={formState.values.name === '' ? 'secondary' : 'primary'}
            type='submit'
            disabled={formState.values.name === ''}>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
