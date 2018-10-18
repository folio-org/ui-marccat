import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer, scanBrowsingReducer, getDetailsRecord } from './reducers/Reducer';
import { searchEpic, fetchScanBrowsingRecords, searchDetailEpic } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  scan: scanBrowsingReducer,
  details: getDetailsRecord
});

export const epics = combineEpics(
  searchEpic,
  fetchScanBrowsingRecords,
  searchDetailEpic
);
