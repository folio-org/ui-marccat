import { ActionTypes } from './Actions';
import LogicalViews from '../models/LogicalViews';

export const fetchLogicalViewAction = () => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS,
});
export const fetchLogicalViewsSuccess = (views:LogicalViews) => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS_SUCCESS,
  payload: views
});

export const fetchLogicalViewsFailure = (message) => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS_FAILURE,
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
