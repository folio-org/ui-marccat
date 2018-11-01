import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer, filterReducer, getDetailsRecord, searchAuthReducer, countDocReducer, getAssociatedBibRecord } from './reducers/Reducer';
import { searchEpic, searchDetailEpic, searchAuthEpic, countDocEpic, searchAssociatedBibRecords } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  authSearch: searchAuthReducer,
  details: getDetailsRecord,
  filter: filterReducer,
  countDoc: countDocReducer,
  associatedRecords: getAssociatedBibRecord
});

export const epics = combineEpics(
  searchEpic,
  searchAuthEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords
);
