import { actionTypes as ActionTypes } from './Actions';

export const FETCH_WHISKIES = 'FETCH_WHISKYS';
export const FETCH_WHISKIES_SUCCESS = 'FETCH_WHISKYS_SUCCESS';
export const FETCH_WHISKIES_FAILURE = 'FETCH_WHISKYS_FAILURE';

export const fetchLogicalViewAction = () => ({
  type: ActionTypes.REQUEST_LOGICAL_VIEW,
});

/* MARCCAT ACTIONS CREATOR */
export function requestLogicalView(view) {
  return {
    type: ActionTypes.REQUEST_LOGICAL_VIEW,
    payload: {
      view
    }
  };
}

export function receiveLogicalView(view, views) {
  return {
    type: ActionTypes.RECEIVED_LOGICAL_VIEW,
    payload: {
      view,
      views
    }
  };
}

export const fetchFailure = (message) => ({
  type: ActionTypes.REJECT,
  payload: message
});

export const fetchWhiskies = () => ({
  type: FETCH_WHISKIES,
});

export const fetchWhiskiesSuccess = (whiskies) => ({
  type: FETCH_WHISKIES_SUCCESS,
  payload: whiskies
});

export const fetchWhiskiesFailure = (message) => ({
  type: FETCH_WHISKIES_FAILURE,
  payload: message
});
