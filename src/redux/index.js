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
  recordDeatilReducer,
  settingsReducer,
  panelsReducer,
  totalBibCountDocReducer,
  totalAuthCountDocReducer,
  customColumnReducer
} from './reducers/Reducer';
import {
  searchEpic,
  searchBibEpic,
  searchAuthEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic,
  scanBrowsingRecords,
  browseDetailEpic,
  browseAuthorityDetailEpic,
  browseDetailAssociatedEpic,
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
  recordDetail: recordDeatilReducer,
  settings: settingsReducer,
  panels: panelsReducer,
  totalBibRecords: totalBibCountDocReducer,
  totalAuthRecords: totalAuthCountDocReducer,
  customColumn: customColumnReducer,
  data,
  history
});

export const epics = combineEpics(
  searchEpic,
  searchBibEpic,
  searchAuthEpic,
  searchDetailEpic,
  countDocEpic,
  searchAssociatedBibRecords,
  associatedBibDetailEpic,
  scanBrowsingRecords,
  browseDetailEpic,
  browseAuthorityDetailEpic,
  browseDetailAssociatedEpic,
  totalCountBibEpic,
  totalCountAuthEpic,
  dataEpic
);
export { ACTION } from './actions/Actions';
export * from './actions/ActionCreator';
export * from './helpers/Selector';
