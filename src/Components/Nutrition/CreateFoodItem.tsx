import React, { FormEvent } from 'react';
import { Form, Label, Input, Button } from 'reactstrap';
import { useFormState } from 'react-use-form-state';

import { FoodItem } from 'Types/Nutrition';
import { getCalculatedFoodItem } from '../Helpers/NutritionHelpers';

interface Props {
  handleSubmit: (foodItem: FoodItem) => void;
}

export default function CreateFoodItem(props: Props) {
  const [formState, { label, text }] = useFormState<FoodItem>(
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

    const foodItem = { ...formState.values };
    props.handleSubmit(foodItem);
    clearForm();
  };

  return (
    <Form name='form' onSubmit={handleSubmit}>
      <Input type='hidden' value='prayer' />
      <Label {...label('name')}>Food Name</Label>
      <Input {...text('name')} type='text' placeholder='Name your food' autoComplete={'off'} />

      <Label {...label('servingSize')}>Serving Size</Label>
      <Input {...text('servingSize')} type='text' placeholder='Grams' autoComplete={'off'} />

      <Label {...label('carbohydrates')}>Carbohydrates</Label>
      <Input {...text('carbohydrates')} type='number' placeholder='Grams' />

      <Label {...label('fats')}>Fats</Label>
      <Input {...text('fats')} type='number' placeholder='Grams' />

      <Label {...label('protein')}>Protein</Label>
      <Input {...text('protein')} type='number' placeholder='Grams' />

      <Label {...label('calories')}>Calories</Label>
      <Input {...text('calories')} type='number' readOnly value={getCalculatedFoodItem(formState.values).calories} style={{ cursor: 'default' }} />


      <Button className='mt-3' color='primary' type='submit' disabled={formState.values.name === ''}>Save</Button>
    </Form>
  );
}