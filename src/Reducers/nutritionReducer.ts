import { Reducer } from 'redux';

import { Actions } from 'constants/Nutrition';
import { NutritionAction, NutritionState } from 'Types/Nutrition';

const initialState = {
  foodItems: []
} as NutritionState;

const nutritionReducer: Reducer<NutritionState, NutritionAction> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.payload
      };
    case Actions.ADD_USER_FOOD_ITEM:
      return {
        ...state,
        foodItems: action.payload
      };
    case Actions.DELETE_USER_FOOD_ITEM:
      return {
        ...state,
        foodItems: action.payload
      };
    default:
      return state;
  }
};

export default nutritionReducer;
