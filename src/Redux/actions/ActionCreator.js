import { actionTypes as ActionTypes } from './Actions';

export const FETCH_LOGICAL_VIEWS = 'FETCH_LOGICAL_VIEWS';

/* MARCCAT ACTIONS CREATOR */
export const fetchLogicalViewAction = () => ({
  FETCH_LOGICAL_VIEWS,
});
export const fetchLogicalViewsSuccess = (views) => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS_SUCCESS,
  payload: views
});

export const fetchLogicalViewsFailure = (message) => ({
  type: ActionTypes.FETCH_LOGICAL_VIEWS_FAILURE,
  payload: message
});
