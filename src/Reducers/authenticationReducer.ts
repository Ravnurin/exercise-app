import { Reducer } from 'redux';

import { Actions } from 'constants/Authentication';
import { AuthState, AuthAction } from 'Types/Authentication';
import { BasicUser } from 'Types/User';
import isEmpty from '../Utils/isEmpty';

const initialState: AuthState = {
  isAuthenticated: false,
  user: {} as BasicUser
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
