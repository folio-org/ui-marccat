import { ActionTypes } from '../actions/Actions';

export function searchEngineReducer(state = { resource: 'search' }, action) {
  switch (action.type) {
  case ActionTypes.SEARCH:
    return {
      ...state,
      isLoading: false
    };
  case ActionTypes.RECORD_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  default:
    return state;
  }
}

export function getDetailsRecord(state = { resource: 'details' }, action) {
  switch (action.type) {
  case ActionTypes.DETAILS:
    return {
      ...state,
      isLoading: false,
      query: action.payload
    };
  case ActionTypes.DETAILS_BY_TITLE:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  default:
    return state;
  }
}

export function scanBrowsingReducer(state = { resource: 'scan' }, action) {
  switch (action.type) {
  case ActionTypes.SCAN:
    return {
      ...state,
      isLoading: false
    };
  case ActionTypes.SCAN_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
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
    };
  case ActionTypes.FETCH_LOGICAL_VIEWS_SUCCESS:
    return {
      ...state,
      views: action.payload,
      isLoading: false,
    };
  default:
    return state;
  }
}
