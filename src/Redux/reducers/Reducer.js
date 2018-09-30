import { ActionTypes } from '../actions/Actions';

export function searchEngineReducer(state = {}, action) {
  switch (action.type) {
  case ActionTypes.SEARCH:
    return Object.assign({}, state, { results: action.results, isLoading: true });
  default:
    return state;
  }
}

export function logicalViewReducer(state = { resource: 'logical' }, action) {
  switch (action.type) {
  case ActionTypes.FETCH_LOGICAL_VIEWS:
    return {
      ...state,
      isLoading: true,
      error: null
    };
  case ActionTypes.FETCH_LOGICAL_VIEWS_SUCCESS:
    return {
      views: action.payload,
      isLoading: false,
      error: null
    };
  case ActionTypes.FETCH_LOGICAL_VIEWS_FAILURE:
    return {
      views: [{}],
      isLoading: false,
      error: action.error
    };
  default:
    return state;
  }
}
