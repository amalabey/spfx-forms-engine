import { Store, createStore as reduxCreateStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import formReducer from "../reducers/FormReducers";
import IFormData from "../model/IFormData";
import { IState } from './IState';

export function createStore(initialState?: IState): Store<IState> {
  const loggerMiddleware = createLogger();

  const middlewares = [
    thunkMiddleware,
    loggerMiddleware
  ];

  return reduxCreateStore(formReducer, initialState, compose(
    applyMiddleware(...middlewares)
  ));
}
