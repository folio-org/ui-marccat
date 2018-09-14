import { ActionTypes } from '../actions/Actions';

const initialState = {
  views: undefined,
  isLoading: false,
  error: null,
  repos: [],
  searchInputValue: ''
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SEARCH_INPUT_CHANGE':
    return Object.assign({}, state, { searchInputValue: action.value });
  case 'SET_REPOS':
    return Object.assign({}, state, { repos: action.repos });
  default:
    return state;
  }
};

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
      isLoading: false,
      error: null
    };
  case ActionTypes.FETCH_LOGICAL_VIEWS_FAILURE:
    return {
      views: [{}],
      isLoading: false,
      error: action.payload
    };
  default:
    return state;
  }
}
