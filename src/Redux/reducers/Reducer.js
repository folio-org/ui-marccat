import { ActionTypes } from '../actions/Actions';

const initialState = {
  views: undefined,
  isLoading: false,
  error: null
};

export default function rootReducer(state = initialState, action) {
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
