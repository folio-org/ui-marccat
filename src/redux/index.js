import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer, scanBrowsingReducer, filterReducer, getDetailsRecord } from './reducers/Reducer';
import { searchEpic, fetchScanBrowsingRecords, searchDetailEpic } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  scan: scanBrowsingReducer,
  details: getDetailsRecord,
  filter: filterReducer
});

export const epics = combineEpics(
  searchEpic,
  fetchScanBrowsingRecords,
  searchDetailEpic
);
