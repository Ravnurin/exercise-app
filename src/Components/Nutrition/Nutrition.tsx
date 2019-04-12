import React from 'react';
import { connect } from 'react-redux';

import * as NutritionActions from 'ActionCreators/Nutrition';
import { ApplicationState } from 'Reducers';

interface OwnProps {
  getFoodItems: (username: string) => void;
}

type Props = OwnProps & ApplicationState;

function Nutrition(props: Props) {

  return (
    <div>
      Hello World
    </div>
  );
}

const mapStateToProps = ({ auth, nutrition, errors }: ApplicationState) => ({
  auth,
  nutrition,
  errors
});

export default connect(mapStateToProps, NutritionActions)(Nutrition);