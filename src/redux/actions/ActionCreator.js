import { ActionTypes } from './Actions';

export const isfetchingSearchRequest = (isLoading) => ({
  type: ActionTypes.FETCH_SEARCH_REQUESTED,
  payload: isLoading
});
export const isfetchingDetailsRequest = (isLoading) => ({
  type: ActionTypes.FETCH_DETAILS_REQUESTED,
  payload: isLoading
});
export const isfetchingBrowseRequest = (isLoading) => ({
  type: ActionTypes.FETCH_DETAILS_BROWSE_REQUESTED,
  payload: isLoading
});
export const isLockedRecordRequest = (isLoading) => ({
  type: ActionTypes.LOCK_RECORD_REQUESTED,
  payload: isLoading
});

export const isFetchingTemplateByIdRequest = (isLoading) => ({
  type: ActionTypes.FETCH_TEMPLATE_GET_BY_ID,
  payload: isLoading
});
export const isfetchingDetailsAssociatedRequest = (isLoading) => ({
  type: ActionTypes.FETCH_DETAILS_ASSOCIATED_REQUESTED,
  payload: isLoading
});
export const isfetchingBrowseDetailsAssociatedRequest = (isLoading) => ({
  type: ActionTypes.FETCH_BROWSE_DETAILS_ASSOCIATED_REQUESTED,
  payload: isLoading
});
export const isfetchingAssociatedRequest = (isLoading) => ({
  type: ActionTypes.FETCH_ASSOCIATED_REQUESTED,
  payload: isLoading
});
export const isfetchingCounterRequest = (isLoading) => ({
  type: ActionTypes.FETCH_COUNTER_REQUESTED,
  payload: isLoading
});
export const isfetchingScanBrowseRequest = (isLoading) => ({
  type: ActionTypes.FETCH_BROWSE_FIRST_PAGE,
  payload: isLoading
});
export const fetchAssociatedBibRecords = (records, recordType) => ({
  type: ActionTypes.ASSOCIATED_BIB_REC_SUCCESS,
  payload: records,
  recType: recordType
});
export const fetchScanBrowsingRecords = (records) => ({
  type: ActionTypes.BROWSE_FIRST_PAGE_SUCCESS,
  payload: records
});
export const fetchCountDocRecords = (records) => ({
  type: ActionTypes.COUNT_DOC_SUCCESS,
  payload: records
});
export const fetchBrowseAuthorityDetail = (records, isAuthority) => ({
  type: ActionTypes.AUTH_DETAILS_BROWSE_SUCCESS,
  payload: records,
  isAuthority
});
export const fetchDetailsRecords = (records, recordType) => ({
  type: ActionTypes.DETAILS_BY_TITLE,
  payload: records,
  recType: recordType
});
export const fetchAssociatedBibDetailsRecords = (records, recordType, mustOpenPanel) => ({
  type: ActionTypes.ASSOCIATED_DETAILS_SUCCESS,
  payload: records,
  recType: recordType,
  isDetailBibAssOpen: mustOpenPanel
});
export const fetchBrowseDetailAssociatedRecords = (records, mustOpenPanel) => ({
  type: ActionTypes.BROWSE_ASSOCIATED_DETAILS_SUCCESS,
  payload: records,
  mustOpenPanel
});
export const fetchSearchEngineRecords = (bibliographicResults, bibCounter, authorityResults, authCounter) => ({
  type: ActionTypes.RECORD_SUCCESS,
  bibliographicResults,
  bibCounter,
  authorityResults,
  authCounter
});
export const fetchBrowseDetail = (results, counter, isAuthority) => ({
  type: ActionTypes.DETAILS_BROWSE_SUCCESS,
  payload: results,
  count: counter,
  isAuthority
});
export const isFetchingLeaderTagRequest = (isLoading) => ({
  type: ActionTypes.FETCH_LEADER_VALUES_FROM_TAG,
  payload: isLoading
});
export const isFetchingHeaderTypes006 = (isLoading) => ({
  type: ActionTypes.FETCH_HEADER_TYPES_006,
  payload: isLoading
});
export const fetchHeaderTypes006 = (records) => ({
  type: ActionTypes.HEADER_TYPES_006_SUCCESS,
  payload: records
});
export const isFetchingHeaderTypes007 = (isLoading) => ({
  type: ActionTypes.FETCH_HEADER_TYPES_007,
  payload: isLoading
});
export const fetchHeaderTypes007 = (records) => ({
  type: ActionTypes.HEADER_TYPES_007_SUCCESS,
  payload: records
});
export const isFetchingHeaderTypes008 = (isLoading) => ({
  type: ActionTypes.FETCH_HEADER_TYPES_008,
  payload: isLoading
});
export const fetchHeaderTypes008 = (records) => ({
  type: ActionTypes.HEADER_TYPES_008_SUCCESS,
  payload: records
});
export const isFetchingTemplateViewRequest = (isLoading) => ({
  type: ActionTypes.FETCH_VIEW_TEMPLATE,
  payload: isLoading
});
export const fetchTemplateView = (records) => ({
  type: ActionTypes.VIEW_TEMPLATE_SUCCESS,
  payload: records
});
export const fetchTemplateById = (records) => ({
  type: ActionTypes.TEMPLATE_GET_BY_ID_SUCCESS,
  payload: records
});
export const lockedRecord = (record) => ({
  type: ActionTypes.LOCK_RECORD_SUCCESS,
  payload: record
});
export const fetchLeaderFromTag = (records) => ({
  type: ActionTypes.LEADER_VALUES_FROM_TAG_SUCCESS,
  payload: records
});
export const isFetchingTag006Request = (isLoading) => ({
  type: ActionTypes.FETCH_VALUES_FROM_TAG_006,
  payload: isLoading
});
export const fetchValuesFromTag006 = (records) => ({
  type: ActionTypes.VALUES_FROM_TAG_006_SUCCESS,
  payload: records
});
export const isFetchingTag007Request = (isLoading) => ({
  type: ActionTypes.FETCH_VALUES_FROM_TAG_007,
  payload: isLoading
});
export const fetchValuesFromTag007 = (records) => ({
  type: ActionTypes.VALUES_FROM_TAG_007_SUCCESS,
  payload: records
});
export const isFetchingTag008Request = (isLoading) => ({
  type: ActionTypes.FETCH_VALUES_FROM_TAG_008,
  payload: isLoading
});
export const isFetchingHeadingByTag = (isLoading) => ({
  type: ActionTypes.FETCH_HEADING_BY_TAG,
  payload: isLoading
});
export const fetchHeadingByTag = (records) => ({
  type: ActionTypes.FETCH_HEADING_BY_TAG_SUCCESS,
  payload: records
});
export const fetchValuesFromTag008 = (records) => ({
  type: ActionTypes.VALUES_FROM_TAG_008_SUCCESS,
  payload: records
});
export const isSettingsRequest = () => ({
  type: ActionTypes.SETTINGS,
  payload: {} // generic payload
});
export const fetchSuccess = (message) => ({
  type: ActionTypes.SUCCESS,
  payload: message
});
export const fetchFailure = (message) => ({
  type: ActionTypes.REJECT,
  payload: message
});
