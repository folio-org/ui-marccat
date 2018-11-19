import { ActionTypes } from './Actions';

export const isfetchingRequest = (isLoading) => ({
  type: ActionTypes.FETCH_REQUESTED,
  payload: isLoading
});
export const fetchAssociatedBibRecords = (records, recordType) => ({
  type: ActionTypes.ASSOCIATED_BIB_REC_SUCCESS,
  payload: records,
  recType: recordType
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
export const fetchSearchEngineRecords = (records, numFound) => ({
  type: ActionTypes.RECORD_SUCCESS,
  payload: records,
  count: numFound
});
export const fetchSearchAuthEngineRecords = (records, numFound) => ({
  type: ActionTypes.RECORD_AUTH_SUCCESS,
  payload: records,
  count: numFound
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
