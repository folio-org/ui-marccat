import { actionTypes as ActionTypes } from '../actions/Actions';

export function searchInPreFlight(state = false, action) {
  switch (action.type) {
  case ActionTypes.SEARCH:
    return true;
  case ActionTypes.RECEIVED_SEARCH:
  case ActionTypes.CLEAR_SEARCH_RESULTS:
    return false;
  default:
    return state;
  }
}

const initialState = [];
export function userResults(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.RECEIVED_SEARCH:
    return action.payload.users;
  case ActionTypes.CLEAR_SEARCH_RESULTS:
    return initialState;
  default:
    return state;
  }
}
