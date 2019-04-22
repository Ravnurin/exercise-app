import React, { FormEvent } from 'react';
import {
  InputAdornment,
  TextField,
  Button,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Grid
} from '@material-ui/core';
import { useFormState } from 'react-use-form-state';
import classNames from 'classnames';

import { FoodItem } from 'Types/Nutrition';
import { getCalculatedFoodItem } from '../Helpers/NutritionHelpers';
import { ErrorState } from 'Types/Errors';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

interface Props extends WithStyles<typeof styles> {
  onSubmit: (foodItem: FoodItem) => void;
  errors: ErrorState;
}

function CreateFoodItem(props: Props) {
  const { classes, errors } = props;
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
    className: classNames(classes.margin, classes.textField),
    InputProps: adornment ? {
      endAdornment: <InputAdornment position="end">Gr</InputAdornment>
    } : {},
    autoComplete: 'off'
  });

  const textFields = [
    { label: 'Food Name', id: 'foodName', ...fieldProps(false), ...text('name') },
    { label: 'Serving Size', id: 'servingSize', ...fieldProps(), ...number('servingSize') },
    { label: 'Carbohydrates', id: 'carbohydrates', ...fieldProps(), ...number('carbohydrates') },
    { label: 'Fats', id: 'fats', ...fieldProps(), ...number('fats') },
    { label: 'Protein', id: 'protein', ...fieldProps(), ...number('protein') },
    { label: 'Calories', id: 'calories', ...fieldProps(), ...number('calories'), value: getCalculatedFoodItem(formState.values).calories, disabled: true },
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foodItem = { ...formState.values, calories: textFields.filter(t => t.label === 'Calories')[0].value };
    props.onSubmit(foodItem);
    clearForm();
  };

  return (
    <form name='form' onSubmit={handleSubmit} className={classes.root}>
      <Grid container direction='row' justify='center'>
        {textFields.map(tf => (
          <Grid item key={tf.id} sm={3}>
            <TextField {...tf} error={errors[tf.id] != null} /* { ...tf.name === 'calories' ? {value: getCalculatedFoodItem(formState.values).calories} : {}} *//>
          </Grid>
        ))}
        <Grid container justify='center'>
          <Button variant='contained' className={classes.margin} color={formState.values.name === '' ? 'secondary' : 'primary'} type='submit' disabled={formState.values.name === ''}>Save</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default withStyles(styles)(CreateFoodItem);