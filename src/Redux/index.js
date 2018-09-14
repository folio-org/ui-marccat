import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { reducer as marccatReducer, rootReducer } from './reducers/Reducer';
import marccatEpic from './epic/epics';

export const reducer = combineReducers({
  data: marccatReducer,
  root: rootReducer
});

export const epics = combineEpics(
  marccatEpic
);
