import { ActionTypes } from '../actions/Actions';

const initialState = {
  views: undefined,
  isLoading: false,
  error: null,
  repos: [],
  searchInputValue: ''
};

export function searchEngineReducer(state = initialState, action) {
  switch (action.type) {
  case '@@ui-marccat/SEARCH':
    return Object.assign({}, state, { repos: action.repos, isLoading: true });
  default:
    return state;
  }
}

export function logicalViewReducer(state = initialState, action) {
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
      isLoading: true,
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
