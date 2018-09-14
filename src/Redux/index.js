import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { logicalViewReducer } from './reducers/Reducer';
import marccatEpic from './epic/epics';

export const reducer = combineReducers({
  root: logicalViewReducer
});

export const epics = combineEpics(
  marccatEpic
);
