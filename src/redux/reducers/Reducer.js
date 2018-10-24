import { ActionTypes } from '../actions/Actions';

const isLoading = false;
const isLoadingDetail = false;


export function countDocReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ActionTypes.COUNT_DOC:
    return {
      ...state,
      isLoading: false,
      query: action.payload
    };
  case ActionTypes.FETCH_COUNT_DOC:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  case ActionTypes.COUNT_DOC_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false
    };
  default:
    return state;
  }
}

export function searchEngineReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ActionTypes.SEARCH:
    return {
      ...state,
      isLoading: false
    };
  case ActionTypes.FETCH_REQUESTED:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  case ActionTypes.RECORD_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false
    };
  default:
    return state;
  }
}

export function searchAuthReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ActionTypes.SEARCH_AUTH:
    return {
      ...state,
      isLoading: false
    };
  case ActionTypes.FETCH_REQUESTED:
    return {
      ...state,
      records: action.payload,
      isLoading: true
    };
  case ActionTypes.RECORD_AUTH_SUCCESS:
    return {
      ...state,
      records: action.payload,
      isLoading: false
    };
  default:
    return state;
  }
}

// TOBE REMOVED
export function getDetailsRecord(state = { isLoadingDetail }, action) {
  switch (action.type) {
  case ActionTypes.DETAILS:
    return {
      ...state,
      isLoadingDetail: false,
      query: action.payload
    };
  case ActionTypes.FETCH_DETAIL_REQUESTED:
    return {
      ...state,
      records: action.payload,
      isLoadingDetail: true
    };
  case ActionTypes.DETAILS_BY_TITLE:
    return {
      ...state,
      records: action.payload,
      isLoadingDetail: false
    };
  default:
    return state;
  }
}

export function scanBrowsingReducer(state = { isLoading }, action) {
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

export function filterReducer(state = { isLoading }, action) {
  switch (action.type) {
  case ActionTypes.FILTERS:
    return {
      ...state,
      filters: action.payload,
    };
  default:
    return state;
  }
}

