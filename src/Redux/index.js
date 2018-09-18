import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { logicalViewReducer, searchEngineReducer } from './reducers/Reducer';
import { marccatEpic, searchEngineEpic } from './epic/epics';

export const reducer = combineReducers({
  root: logicalViewReducer,
  search: searchEngineReducer
});

export const epics = combineEpics(
  marccatEpic,
  searchEngineEpic
);
