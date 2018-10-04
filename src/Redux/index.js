import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { logicalViewReducer, searchEngineReducer, scanBrowsingReducer } from './reducers/Reducer';
import { fetchLogicalViewsEpic, fetchSearchEngineRecords, fetchScanBrowsingRecords } from './epic/epics';

export const reducer = combineReducers({
  data: logicalViewReducer,
  search: searchEngineReducer,
  scan: scanBrowsingReducer
});

export const epics = combineEpics(
  fetchLogicalViewsEpic,
  fetchSearchEngineRecords,
  fetchScanBrowsingRecords
);
