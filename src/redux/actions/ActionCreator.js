import { ActionTypes } from './Actions';

export const isfetchingSearchRequest = (isLoading) => ({
  type: ActionTypes.FETCH_SEARCH_REQUESTED,
  payload: isLoading
});
export const isfetchingDetailsRequest = (isLoading) => ({
  type: ActionTypes.FETCH_DETAILS_REQUESTED,
  payload: isLoading
});
export const isfetchingDetailsAssociatedRequest = (isLoading) => ({
  type: ActionTypes.FETCH_DETAILS_ASSOCIATED_REQUESTED,
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
export const fetchSearchEngineRecords = (bibliographicResults, bibCounter, authorityResults, authCounter) => ({
  type: ActionTypes.RECORD_SUCCESS,
  bibliographicResults,
  bibCounter,
  authorityResults,
  authCounter
});
export const fetchSuccess = (message) => ({
  type: ActionTypes.SUCCESS,
  payload: message
});
export const fetchFailure = (message) => ({
  type: ActionTypes.REJECT,
  payload: message
});

/**
 * Action creator for querying a set of records
 * @param {String} type - resource type
 * @param {Object} params - query params
 * @param {String} options.path - path to use for the query
 */
export const fetch = (type, params, { path }) => ({
  type: ActionTypes.QUERY,
  data: {
    type,
    path,
    params,
    timestamp: Date.now()
  }
});
