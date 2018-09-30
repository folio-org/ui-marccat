import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { logicalViewReducer, searchEngineReducer } from './reducers/Reducer';
import { fetchLogicalViewsEpic, epic } from './epic/epics';

export const reducer = combineReducers({
  data: logicalViewReducer,
  search: searchEngineReducer
});

export const epics = combineEpics(
  fetchLogicalViewsEpic,
  epic
);
