import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import * as NutritionActions from 'ActionCreators/Nutrition';
import { ApplicationState } from 'Reducers';
import { FoodItem } from 'Types/Nutrition';
import DropdownMenu from 'Components/LayoutElements/DropdownMenu';
import NutritionNavigation from './NutritionNavigation';
import CreateFoodItem from './CreateFoodItem';

interface OwnProps {
  getUserFoodItems: () => void;
  addUserFoodItem: (foodItem: FoodItem) => void;
}

type Props = OwnProps & ApplicationState;

function Nutrition(props: Props) {
  const { nutrition: { foodItems } } = props;

  useEffect(() => {
    props.getUserFoodItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (foodItem: FoodItem) => {
    props.addUserFoodItem(foodItem);
  };

  return (
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
    </Row>
  );
}

const mapStateToProps = ({ auth, nutrition, errors }: ApplicationState) => ({
  auth,
  nutrition,
  errors
});

export default connect(mapStateToProps, NutritionActions)(Nutrition);