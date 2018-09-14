import { ActionTypes } from './Actions';
import LogicalViews from '../models/LogicalViews';

const { FETCH_LOGICAL_VIEWS } = ActionTypes;

export const fetchLogicalViewAction = () => ({
  FETCH_LOGICAL_VIEWS,
});
export const fetchLogicalViewsSuccess = (views:LogicalViews) => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS_SUCCESS,
  payload: views
});

export const fetchLogicalViewsFailure = (message) => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS_FAILURE,
  payload: message
});
