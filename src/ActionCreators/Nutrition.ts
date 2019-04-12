import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { Actions } from 'constants/Nutrition';
import { Actions as ErrorAction } from 'constants/Authentication';

export const getUserFoodItems = (username: string) => (dispatch: any) => {
  axios
    .post('/api/nutrition/user/foodItems', { username })
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
      toastr.error('Retrieval Failed', 'Retrieving user defined food items failed.');
    });
};