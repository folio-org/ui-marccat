import { actionTypes as ActionTypes } from './Actions';

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
