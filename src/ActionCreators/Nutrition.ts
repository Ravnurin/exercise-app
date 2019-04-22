import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/Nutrition';
import { Actions as ErrorAction } from 'constants/Authentication';
import { FoodItem } from 'Types/Nutrition';

export const getUserFoodItems = () => (dispatch: any) => {
  axios
    .get('/api/nutrition/user/foodItems')
    .then(res => {
      dispatch({
        type: Actions.GET_USER_FOOD_ITEMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Failed', 'Retrieving user food items failed');
    });
};

export const addUserFoodItem = (foodItem: FoodItem) => (dispatch: any) => {
  axios
    .post('/api/nutrition/user/foodItems/add', { foodItem })
    .then(res => {
      dispatch({
        type: Actions.ADD_USER_FOOD_ITEM,
        payload: res.data
      });
      toastr.success('Success', 'Food item added');
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Failed', 'Adding food item failed');
    });
};

export const deleteUserFoodItem = (foodItemIds: number[]) => (dispatch: any) => {
  axios
    .post('/api/nutrition/user/foodItems/delete', { foodItemIds })
    .then(res => {
      dispatch({
        type: Actions.DELETE_USER_FOOD_ITEM,
        payload: res.data
      });
      toastr.success('Success', 'Food item removed');
    })
    .catch(err => {
      dispatch({
        type: ErrorAction.GET_ERRORS,
        payload: err.response
      });
      toastr.error('Failed', 'Deleting food item failed');
    });
};