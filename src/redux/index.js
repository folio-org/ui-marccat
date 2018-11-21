import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer,
  filterReducer,
  getDetailsRecord,
  countDocReducer,
  getAssociatedBibRecord,
  scanBrowseReducer,
  detailsAssociatedReducer } from './reducers/Reducer';
import { searchEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic,
  scanBrowsingRecords } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  details: getDetailsRecord,
  filter: filterReducer,
  countDoc: countDocReducer,
  associatedRecords: getAssociatedBibRecord,
  associatedBibDetails: detailsAssociatedReducer,
  browse: scanBrowseReducer
});

export const epics = combineEpics(
  searchEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic,
  scanBrowsingRecords
);
