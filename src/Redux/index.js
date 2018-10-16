import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { logicalViewReducer, searchEngineReducer, scanBrowsingReducer, getDetailsRecord } from './reducers/Reducer';
import { fetchLogicalViewsEpic, fetchSearchEngineRecords, fetchScanBrowsingRecords, fetchDetailsRecords } from './epic/epics';

export const reducer = combineReducers({
  data: logicalViewReducer,
  search: searchEngineReducer,
  scan: scanBrowsingReducer,
  details: getDetailsRecord
});

export const epics = combineEpics(
  fetchLogicalViewsEpic,
  fetchSearchEngineRecords,
  fetchScanBrowsingRecords,
  fetchDetailsRecords
);
