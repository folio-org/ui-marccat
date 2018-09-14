import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import rootReducer from './reducers/Reducer';
import marccatEpic from './epic/epics';

export const reducer = combineReducers({
  root: rootReducer
});

export const epics = combineEpics(
  marccatEpic
);
