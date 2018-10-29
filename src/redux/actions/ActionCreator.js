import { ActionTypes } from './Actions';

export const fetchLogicalViewAction = () => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS,
});
export const fetchRecords = () => ({
  type: ActionTypes.SEARCH,
});
export const fetchDetailsRecords = (records, recordType) => ({
  type: ActionTypes.DETAILS_BY_TITLE,
  payload: records,
  recType: recordType
});
export const fetchAssociatedBibRecords = (records, recordType) => ({
  type: ActionTypes.ASSOCIATED_BIB_REC_SUCCESS,
  payload: records,
  recType: recordType
});
export const fetchRequestedAssociatedBibRecords = (isLoadingAssociatedBibRecords) => ({
  type: ActionTypes.FETCH_ASSOCIATED_BIB_REQUESTED,
  payload: isLoadingAssociatedBibRecords
});
export const fetchCountDocRecords = (records) => ({
  type: ActionTypes.COUNT_DOC_SUCCESS,
  payload: records
});
export const fetchScanBrowsingRecords = (records) => ({
  type: ActionTypes.SCAN_SUCCESS,
  payload: records
});
export const fetchRequested = (isLoading) => ({
  type: ActionTypes.FETCH_REQUESTED,
  payload: isLoading
});
export const fetchRequestedDetail = (isLoadingDetail) => ({
  type: ActionTypes.FETCH_DETAIL_REQUESTED,
  payload: isLoadingDetail
});
export const fetchRequestedCountDoc = (isLoading) => ({
  type: ActionTypes.FETCH_COUNT_DOC,
  payload: isLoading
});
export const fetchSearchEngineRecords = (records) => ({
  type: ActionTypes.FETCH_REQUESTED,
  payload: records
});
export const fetchSearchAuthEngineRecords = (records) => ({
  type: ActionTypes.RECORD_AUTH_SUCCESS,
  payload: records
});
export const fetchSuccesss = (message) => ({
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
