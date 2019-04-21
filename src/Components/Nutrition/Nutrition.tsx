import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import * as NutritionActions from 'ActionCreators/Nutrition';
import { ApplicationState } from 'Reducers';
import { FoodItem } from 'Types/Nutrition';
import NutritionNavigation, { View } from './NutritionNavigation';
import CreateFoodItem from './CreateFoodItem';
import FoodItemsList from './FoodItemsList';
/* import DropdownMenu from 'Components/LayoutElements/DropdownMenu';


 */



interface OwnProps {
  getUserFoodItems: () => void;
  addUserFoodItem: (foodItem: FoodItem) => void;
}

type Props = OwnProps & ApplicationState;

function Nutrition(props: Props) {
  const [activeView, setActiveView] = useState<View>(View.FoodItemsList);

  const { nutrition: { foodItems } } = props;

  useEffect(() => {
    props.getUserFoodItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (foodItem: FoodItem) => {
    props.addUserFoodItem(foodItem);
  };

  const handleChange = (_e: React.ChangeEvent, newView: View) => {
    setActiveView(newView);
  }

  return (
    <div>
      <Grid container>
        <Grid container item justify='center'>
          <NutritionNavigation onChange={handleChange} value={activeView} />
        </Grid>
      </Grid>
      <Grid container item alignItems='center' direction='column' justify='center'>
        {activeView === View.FoodItemsList && <FoodItemsList foodItems={foodItems} />}
        {activeView === View.CreateFoodItem && <CreateFoodItem onSubmit={handleSubmit} errors={props.errors} />}
      </Grid>
    </div>
  );
}

const mapStateToProps = ({ auth, nutrition, errors }: ApplicationState) => ({
  auth,
  nutrition,
  errors
});

export default connect(mapStateToProps, NutritionActions)(Nutrition);

/*

<Row className='justify-content-center text-center'>
      <Col xs={12} className='mb-5'>
        <NutritionNavigation />
      </Col>
      <Col xs={12}>
        <DropdownMenu options={foodItems} />
      </Col>
      <Col xs={12}>
        <Row>
          <Col sm={6} md={2} className='col-4 mx-auto'>
            <CreateFoodItem handleSubmit={handleSubmit} />
          </Col>
        </Row>
      </Col>
    </Row>*/