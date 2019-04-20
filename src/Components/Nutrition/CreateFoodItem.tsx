import React, { FormEvent } from 'react';
import {
  InputAdornment,
  /*   FormHelperText,
    FormControl, */
  TextField,
  /*   MenuItem,
    IconButton, */
  Button,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Grid
} from '@material-ui/core';
// import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormState } from 'react-use-form-state';
import classNames from 'classnames';

import { FoodItem } from 'Types/Nutrition';
import { getCalculatedFoodItem } from '../Helpers/NutritionHelpers';
import { ErrorState } from '../../Types/Errors';

/* interface Props {
  handleSubmit: (foodItem: FoodItem) => void;
} */

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
      protein: '',
      calories: ''
    },
    { withIds: true }
  );

  const clearForm = () => {
    Object.keys(formState.values).forEach(k => {
      (formState as any).values[k] = '';
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const foodItem = { ...formState.values };
    // props.handleSubmit(foodItem);
    clearForm();
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

  return (
    <form name='form' onSubmit={handleSubmit} className={classes.root}>
      <Grid container direction='row' justify='center'>
        {textFields.map(tf => (
          <Grid item key={tf.id} sm={3}>
            <TextField {...tf} error={errors[tf.id] != null} />
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