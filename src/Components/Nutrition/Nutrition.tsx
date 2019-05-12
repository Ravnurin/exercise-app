import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import * as NutritionActions from 'ActionCreators/Nutrition';
import { ApplicationState } from 'Reducers';
import { FoodItem } from 'Types/Nutrition';
import NutritionNavigation, { View } from './NutritionNavigation';
import CreateFoodItem from './CreateFoodItem';
import EnhancedTable from 'Components/LayoutElements/Table/EnhancedTable';
import useStyles from 'material/styles';

interface OwnProps {
  getUserFoodItems: () => void;
  addUserFoodItem: (foodItem: FoodItem) => void;
  deleteUserFoodItem: (foodItemIds: number[]) => void;
}

type Props = OwnProps & ApplicationState;

interface FoodItemsListProps {
  foodItems: FoodItem[];
  handleDelete: (foodItemIds: number[]) => void;
}

const FoodItemsList = ({ foodItems, handleDelete }: FoodItemsListProps) => (
  <Grid container direction='row' justify='center'>
    <EnhancedTable options={foodItems} onDelete={handleDelete} />
  </Grid>
);

function Nutrition(props: Props) {
  const classes = useStyles();
  const [activeView, setActiveView] = useState<View>(View.FoodItemsList);

  const { foodItems } = props.nutrition;

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
    <>
      <Grid container className={classes.container}>
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
    </>
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
