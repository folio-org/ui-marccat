import { ActionTypes } from './Actions';
import LogicalViews from '../models/LogicalViews';

export const fetchLogicalViewAction = () => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS,
});
export const fetchRecords = () => ({
  type: ActionTypes.SEARCH,
});
export const fetchLogicalViewsSuccess = (views:LogicalViews) => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS_SUCCESS,
  payload: views
});
export const fetchSearchEngineRecords = (records) => ({
  type: ActionTypes.RECORD_SUCCESS,
  payload: records
});
export const fetchLogicalViewsFailure = (message) => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS_FAILURE,
  payload: message
});
