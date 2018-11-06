import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer,
  scanBrowsingReducer,
  filterReducer,
  getDetailsRecord,
  searchAuthReducer,
  countDocReducer,
  getAssociatedBibRecord,
  detailsAssociatedReducer } from './reducers/Reducer';
import { searchEpic,
  fetchScanBrowsingRecords,
  searchDetailEpic,
  searchAuthEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  searchAssociatedBibDetailEpic } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  authSearch: searchAuthReducer,
  scan: scanBrowsingReducer,
  details: getDetailsRecord,
  filter: filterReducer,
  countDoc: countDocReducer,
  associatedRecords: getAssociatedBibRecord,
  associatedBibDetails: detailsAssociatedReducer
});

export const epics = combineEpics(
  searchEpic,
  searchAuthEpic,
  fetchScanBrowsingRecords,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  searchAssociatedBibDetailEpic
);
