import { Store, createStore as reduxCreateStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import formReducer from "../reducers/FormReducers";
import IFormData from "../model/IFormData";

export function createStore(initialState?: IFormData): Store<IFormData> {
  const loggerMiddleware = createLogger();

  const middlewares = [
    thunkMiddleware,
    loggerMiddleware
  ];

  return reduxCreateStore(formReducer, initialState, compose(
    applyMiddleware(...middlewares)
  ));
}
