import { Reducer } from 'redux';

import { Actions } from 'constants/Authentication';
import { ErrorAction, ErrorState } from 'Types/Errors';

const initialState: ErrorState = {};

const ErrorReducer: Reducer<ErrorState, ErrorAction> = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_ERRORS:
            return action.payload;
        case Actions.CLEAR_ERRORS:
            return action.payload;
        default:
            return state;
    }
};

export default ErrorReducer;
