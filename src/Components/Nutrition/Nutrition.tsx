import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import * as NutritionActions from 'ActionCreators/Nutrition';
import { ApplicationState } from 'Reducers';
import { FoodItem } from 'Types/Nutrition';
import NutritionNavigation, { View } from './NutritionNavigation';
import CreateFoodItem from './CreateFoodItem';
import FoodItemsList from './FoodItemsList';

interface OwnProps {
  getUserFoodItems: () => void;
  addUserFoodItem: (foodItem: FoodItem) => void;
  deleteUserFoodItem: (foodItemIds: number[]) => void;
}

type Props = OwnProps & ApplicationState;

function Nutrition(props: Props) {
  const [activeView, setActiveView] = useState<View>(View.FoodItemsList);

  const {
    nutrition: { foodItems }
  } = props;

  useEffect(() => {
    props.getUserFoodItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (foodItem: FoodItem) => {
    props.addUserFoodItem(foodItem);
  };

  const handleDelete = (foodItemIds: number[]) => {
    props.deleteUserFoodItem(foodItemIds);
  };

  const handleChange = (_e: React.ChangeEvent, newView: View) => {
    setActiveView(newView);
  };

  return (
    <div>
      <Grid container>
        <Grid container item justify='center'>
          <NutritionNavigation onChange={handleChange} value={activeView} />
        </Grid>
      </Grid>
      <Grid container item alignItems='center' direction='column' justify='center'>
        {activeView === View.FoodItemsList && (
          <FoodItemsList foodItems={foodItems} handleDelete={handleDelete} />
        )}
        {activeView === View.CreateFoodItem && (
          <CreateFoodItem onSubmit={handleSubmit} errors={props.errors} />
        )}
      </Grid>
    </div>
  );
}

const mapStateToProps = ({ auth, nutrition, errors }: ApplicationState) => ({
  auth,
  nutrition,
  errors
});

export default connect(
  mapStateToProps,
  NutritionActions
)(Nutrition);
