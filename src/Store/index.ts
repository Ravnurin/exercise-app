import { createStore, applyMiddleware/* , compose */ } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'Reducers';

const loggerMiddleware = createLogger();
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  /* compose(applyMiddleware(thunkMiddleware, loggerMiddleware)) */
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default store;
