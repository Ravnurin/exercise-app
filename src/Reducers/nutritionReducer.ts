import { Reducer } from 'redux';

import { Actions } from 'constants/Nutrition';
import { NutritionAction, NutritionState } from 'Types/Nutrition';

const initialState = {} as NutritionState;

const nutritionReducer: Reducer<NutritionState, NutritionAction> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER_FOOD_ITEMS:
      return action.payload;
    default:
      return state;
  }
};

export default nutritionReducer;
