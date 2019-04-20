import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

export enum View {
  FoodItemsList = 0,
  CreateFoodItem = 1
}

interface Props {
  value: View;
  onChange: (e: React.ChangeEvent, view: View) => void;
}

export default function FoodItemsList(props: Props) {
  return (
    <Paper>
      <Tabs
        value={props.value}
        onChange={props.onChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='Food Items List' />
        <Tab label='Create Foood Item' />
      </Tabs>
    </Paper>
  );
}