// @flow
import { ACTION } from './Actions';
import { EMPTY_STRING } from '../../config/constants';

export const isfetchingSearchRequest = (isLoading, moreResult) => ({
  type: ACTION.FETCH_SEARCH_REQUESTED,
  payload: isLoading,
  moreData: moreResult
});
export const isfetchingDetailsRequest = (isLoading) => ({
  type: ACTION.FETCH_DETAILS_REQUESTED,
  payload: isLoading
});
export const isfetchingBrowseRequest = (isLoading) => ({
  type: ACTION.FETCH_DETAILS_BROWSE_REQUESTED,
  payload: isLoading
});
export const isLockedRecordRequest = (isLoading) => ({
  type: ACTION.LOCK_RECORD_REQUESTED,
  payload: isLoading
});
export const isRecordDetailRequest = (isLoading) => ({
  type: ACTION.RECORD_DETAIL_REQUESTED,
  payload: isLoading
});
export const isFetchingTemplateByIdRequest = (isLoading) => ({
  type: ACTION.FETCH_TEMPLATE_GET_BY_ID,
  payload: isLoading
});
export const isfetchingDetailsAssociatedRequest = (isLoading) => ({
  type: ACTION.FETCH_DETAILS_ASSOCIATED_REQUESTED,
  payload: isLoading
});
export const isfetchingBrowseDetailsAssociatedRequest = (isLoading) => ({
  type: ACTION.FETCH_BROWSE_DETAILS_ASSOCIATED_REQUESTED,
  payload: isLoading
});
export const isfetchingAssociatedRequest = (isLoading) => ({
  type: ACTION.FETCH_ASSOCIATED_REQUESTED,
  payload: isLoading
});
export const isfetchingCounterRequest = (isLoading) => ({
  type: ACTION.FETCH_COUNTER_REQUESTED,
  payload: isLoading
});
export const isfetchingScanBrowseRequest = (isLoading) => ({
  type: ACTION.FETCH_BROWSE_FIRST_PAGE,
  payload: isLoading
});
export const fetchAssociatedBibRecords = (records, recordType) => ({
  type: ACTION.ASSOCIATED_BIB_REC_SUCCESS,
  payload: records,
  recType: recordType
});
export const fetchScanBrowsingRecords = (records, query) => ({
  type: ACTION.BROWSE_FIRST_PAGE_SUCCESS,
  payload: records,
  qBib: query,
});
export const fetchCountDocRecords = (records) => ({
  type: ACTION.COUNT_DOC_SUCCESS,
  payload: records
});
export const fetchBrowseAuthorityDetail = (records, isAuthority) => ({
  type: ACTION.AUTH_DETAILS_BROWSE_SUCCESS,
  payload: records,
  isAuthority
});
export const fetchDetailsRecords = (records, recordType) => ({
  type: ACTION.DETAILS_BY_TITLE,
  payload: records,
  recType: recordType
});
export const fetchAssociatedBibDetailsRecords = (records, recordType, mustOpenPanel) => ({
  type: ACTION.ASSOCIATED_DETAILS_SUCCESS,
  payload: records,
  recType: recordType,
  isDetailBibAssOpen: mustOpenPanel
});
export const fetchBrowseDetailAssociatedRecords = (records, mustOpenPanel) => ({
  type: ACTION.BROWSE_ASSOCIATED_DETAILS_SUCCESS,
  payload: records,
  mustOpenPanel
});
export const fetchSearchEngineRecords = (queryBib, queryAuth, to, moreData, bibliographicResults, bibCounter, authorityResults, authCounter, dataOld, oldBibArray, oldAuthArray) => ({
  type: ACTION.RECORD_SUCCESS,
  queryBib,
  queryAuth,
  to,
  moreData,
  bibliographicResults,
  bibCounter,
  authorityResults,
  authCounter,
  dataOld,
  oldBibArray,
  oldAuthArray
});

export const fetchBrowseDetail = (results, counter, isAuthority) => ({
  type: ACTION.DETAILS_BROWSE_SUCCESS,
  payload: results,
  count: counter,
  isAuthority
});
export const isFetchingLeaderTagRequest = (isLoading) => ({
  type: ACTION.FETCH_LEADER_VALUES_FROM_TAG,
  payload: isLoading
});
export const isFetchingTemplateViewRequest = (isLoading) => ({
  type: ACTION.FETCH_VIEW_TEMPLATE,
  payload: isLoading
});
export const fetchTemplateView = (records) => ({
  type: ACTION.VIEW_TEMPLATE_SUCCESS,
  payload: records
});
export const fetchTemplateById = (records) => ({
  type: ACTION.TEMPLATE_GET_BY_ID_SUCCESS,
  payload: records
});
export const lockedRecord = (record) => ({
  type: ACTION.LOCK_RECORD_SUCCESS,
  payload: record
});
export const recordDetailSuccess = (record) => ({
  type: ACTION.RECORD_DETAIL_SUCCESS,
  payload: record
});
export const fetchLeaderFromTag = (records) => ({
  type: ACTION.LEADER_VALUES_FROM_TAG_SUCCESS,
  payload: records
});
export const isFetchingHeadingByTag = (isLoading) => ({
  type: ACTION.FETCH_HEADING_BY_TAG,
  payload: isLoading
});
export const fetchHeadingByTag = (records) => ({
  type: ACTION.FETCH_HEADING_BY_TAG_SUCCESS,
  payload: records
});

export const fetchTotalCountBibRecords = (records) => ({
  type: ACTION.TOTAL_BIB_COUNT_SUCCESS,
  payload: records
});

export const fetchTotalCountAuthRecords = (records) => ({
  type: ACTION.TOTAL_AUTH_COUNT_SUCCESS,
  payload: records
});
export const isSettingsRequest = () => ({
  type: ACTION.SETTINGS,
  payload: {} // generic payload
});
export const fetchSuccess = (message) => ({
  type: ACTION.SUCCESS,
  payload: message
});
export const fetchFailure = (message) => ({
  type: ACTION.REJECT,
  payload: message
});
/**
 *
 * @param {*} payload
 */
export const filterAction = (payload: Object, filterName: string, isChecked: boolean) => {
  return {
    type: ACTION.FILTERS,
    payload,
    filterName,
    isChecked
  };
};
/**
 *
 * @param {*} payload
 */
export const resetFilter = () => {
  return {
    type: ACTION.FILTERS,
    payload: {},
    filterName: EMPTY_STRING,
    isChecked: false
  };
};

/**
 *
 * @param {*} payload
 */
export const addHistoryData = (data) => {
  return {
    type: ACTION.HISTORY,
    data,
  };
};


/**
 *
 * @return {*} payload
 */
export const resetStore = () => {
  return {
    type: ACTION.REQUEST_CLEAR,
  };
};
