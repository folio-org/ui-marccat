import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer, scanBrowsingReducer, filterReducer, getDetailsRecord, searchAuthReducer } from './reducers/Reducer';
import { searchEpic, fetchScanBrowsingRecords, searchDetailEpic } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  authSearch: searchAuthReducer,
  scan: scanBrowsingReducer,
  details: getDetailsRecord,
  filter: filterReducer
});

export const epics = combineEpics(
  searchEpic,
  fetchScanBrowsingRecords,
  searchDetailEpic
);
