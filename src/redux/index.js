import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  searchEngineReducer,
  filterReducer,
  getDetailsRecord,
  countDocReducer,
  getAssociatedBibRecord,
  scanBrowsingReducer,
  detailsAssociatedReducer,
  detailsBrowseSearchReducer,
  browseDetailsAssociatedReducer,
  templateViewReducer,
  leaderValuesReducer,
  headerTypes006Reducer,
  headerTypes007Reducer,
  headerTypes008Reducer,
  tag006ValuesReducer,
  tag007ValuesReducer,
  tag008ValuesReducer,
  settingsReducer,
} from './reducers/Reducer';
import {
  searchEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic,
  scanBrowsingRecords,
  browseDetailEpic,
  browseAuthorityDetailEpic,
  browseDetailAssociatedEpic,
  templateViewEpic,
  leaderValuesEpic,
  templateByIdEpic,
  headerTypes006Epic,
  headerTypes007Epic,
  headerTypes008Epic,
  tag006ValuesEpic,
  tag007ValuesEpic,
  tag008ValuesEpic
} from './epic/epics';

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
  template: templateViewReducer,
  leaderValues: leaderValuesReducer,
  headerTypes006: headerTypes006Reducer,
  headerTypes007: headerTypes007Reducer,
  headerTypes008: headerTypes008Reducer,
  tag006Values: tag006ValuesReducer,
  tag007Values: tag007ValuesReducer,
  tag008Values: tag008ValuesReducer,
  settings: settingsReducer
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
  templateViewEpic,
  templateByIdEpic,
  leaderValuesEpic,
  headerTypes006Epic,
  headerTypes007Epic,
  headerTypes008Epic,
  tag006ValuesEpic,
  tag007ValuesEpic,
  tag008ValuesEpic
);
