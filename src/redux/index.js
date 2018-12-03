import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEngineReducer,
  filterReducer,
  getDetailsRecord,
  countDocReducer,
  getAssociatedBibRecord,
  scanBrowsingReducer,
  detailsAssociatedReducer,
  detailsBrowseSearchReducer,
  browseDetailsAssociatedReducer,
  templateViewReducer } from './reducers/Reducer';
import { searchEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic,
  scanBrowsingRecords,
  browseDetailEpic,
  browseAuthorityDetailEpic,
  browseDetailAssociatedEpic,
  templateViewEpic } from './epic/epics';

export const reducer = combineReducers({
  search: searchEngineReducer,
  details: getDetailsRecord,
  filter: filterReducer,
  countDoc: countDocReducer,
  associatedRecords: getAssociatedBibRecord,
  associatedBibDetails: detailsAssociatedReducer,
  browse: scanBrowsingReducer,
  browseDetails: detailsBrowseSearchReducer,
  browseDetailsAssociated: browseDetailsAssociatedReducer,
  template: templateViewReducer
});

export const epics = combineEpics(
  searchEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic,
  scanBrowsingRecords,
  browseDetailEpic,
  browseAuthorityDetailEpic,
  browseDetailAssociatedEpic,
  templateViewEpic
);
