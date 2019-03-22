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
  recordDeatilReducer,
  leaderReducer,
  headerTypes006Reducer,
  headerTypes007Reducer,
  headerTypes008Reducer,
  tag006ValuesReducer,
  tag007ValuesReducer,
  tag008ValuesReducer,
  headingByTagReducer,
  change008ByLeaderReducer,
  settingsReducer,
  panelsReducer,
} from './reducers/Reducer';
import {
  searchEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic,
  scanBrowsingRecords,
  leaderEpic,
  browseDetailEpic,
  browseAuthorityDetailEpic,
  browseDetailAssociatedEpic,
  templateViewEpic,
  recordDetailEpic,
  headerTypes006Epic,
  headerTypes007Epic,
  headerTypes008Epic,
  tag006ValuesEpic,
  tag007ValuesEpic,
  tag008ValuesEpic,
  tag008ByLeaderEpic
} from './epic/epics';

import {
  reducer as data,
  epic as dataEpic,
} from './epic/epic';

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
  leaderData: leaderReducer,
  recordDetail: recordDeatilReducer,
  headerTypes006: headerTypes006Reducer,
  headerTypes007: headerTypes007Reducer,
  headerTypes008: headerTypes008Reducer,
  tag006Values: tag006ValuesReducer,
  tag007Values: tag007ValuesReducer,
  tag008Values: tag008ValuesReducer,
  headingByTag: headingByTagReducer,
  change008ByLeader: change008ByLeaderReducer,
  settings: settingsReducer,
  panels: panelsReducer,
  data
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
  headerTypes006Epic,
  headerTypes007Epic,
  headerTypes008Epic,
  tag006ValuesEpic,
  tag007ValuesEpic,
  tag008ValuesEpic,
  recordDetailEpic,
  tag008ByLeaderEpic,
  leaderEpic,
  dataEpic
);
export { StoreReducer } from './helpers/StoreReducer';
export { findParam, buildUrl, qs } from '../shared/Function';
