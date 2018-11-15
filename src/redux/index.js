import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer,
  filterReducer,
  getDetailsRecord,
  searchAuthReducer,
  countDocReducer,
  getAssociatedBibRecord,
  detailsAssociatedReducer } from './reducers/Reducer';
import { searchEpic,
  searchDetailEpic,
  searchAuthEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  authSearch: searchAuthReducer,
  details: getDetailsRecord,
  filter: filterReducer,
  countDoc: countDocReducer,
  associatedRecords: getAssociatedBibRecord,
  associatedBibDetails: detailsAssociatedReducer
});

export const epics = combineEpics(
  searchEpic,
  searchAuthEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic
);
