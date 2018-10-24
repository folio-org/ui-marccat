import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer, scanBrowsingReducer, filterReducer, getDetailsRecord, searchAuthReducer, countDocReducer } from './reducers/Reducer';
import { searchEpic, fetchScanBrowsingRecords, searchDetailEpic, searchAuthEpic, countDocEpic } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  authSearch: searchAuthReducer,
  scan: scanBrowsingReducer,
  details: getDetailsRecord,
  filter: filterReducer,
  countDoc: countDocReducer
});

export const epics = combineEpics(
  searchEpic,
  fetchScanBrowsingRecords,
  searchDetailEpic,
  countDocEpic
);
