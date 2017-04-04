import { createStore, applyMiddleware} from 'redux'
import {reducer} from './Reducers'
import {createEpicMiddleware} from 'redux-observable'
import {appEpic} from './Epic'

// const { createEpicMiddleware } = ReduxObservable;

const epicMiddleware = createEpicMiddleware(appEpic);

export const store = createStore(reducer,
  applyMiddleware(epicMiddleware)
);
