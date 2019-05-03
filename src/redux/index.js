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
  totalBibCountDocReducer,
  totalAuthCountDocReducer,
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
  tag008ByLeaderEpic,
  totalCountBibEpic,
  totalCountAuthEpic
} from './epic/epics';

import {
  reducer as data,
  historyReducer as history,
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
  totalBibRecords: totalBibCountDocReducer,
  totalAuthRecords: totalAuthCountDocReducer,
  data,
  history
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
  tag008ByLeaderEpic,
  leaderEpic,
  totalCountBibEpic,
  totalCountAuthEpic,
  dataEpic
);
export { Redux } from './helpers/Redux';
export { findParam, buildUrl, qs } from '../utils/Function';
export { ACTION } from './actions/Actions';
export * from './actions/ActionCreator';
